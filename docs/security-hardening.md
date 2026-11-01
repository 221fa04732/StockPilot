# Security hardening: authenticated API boundary and tenant isolation

## Scope and original finding

This patch targets the source at Git commit `9fc4631b21e5991457a373b5632bc5067e5aceb8`.
There is **no `share.js` file** in that commit or its tracked files. This PR
therefore does **not** claim to patch a sharing endpoint. It fixes the observed
exposure: the public Express API accepted anonymous reads and mutations, and
its Prisma queries were not scoped to an authenticated account.

Do not publish sensitive proof-of-concept requests or production records in a
public issue. Coordinate with maintainers through GitHub's private
security-advisory process before publicly disclosing exploit specifics.

## Design

- Next.js uses the existing `@clerk/nextjs` dependency to authenticate users.
- The browser sends inventory requests to same-origin `/api/stockpilot/api/v1/*`.
- Next.js permits only an explicit list of upstream API paths and methods.
- The Next.js route validates Clerk authentication and enforces a same-origin
  check for state-changing requests (CSRF prevention).
- The server-side proxy signs method, exact path/query, Clerk user ID,
  timestamp, one-time nonce, and SHA-256 of the raw JSON body with a shared
  HMAC-SHA256 secret. Client-provided user IDs and signatures are never trusted.
- Express verifies signatures using a constant-time comparison, a 30-second
  timestamp limit, and a database-backed one-time nonce uniqueness constraint.
  A malformed, unsigned, expired or replayed request is rejected.
- Every Prisma read, mutation, dashboard aggregate and AI context query is
  restricted by the authenticated `ownerId`. Object IDs alone never authorize
  access. Stock increments/decrements use conditional atomic updates.
- Responses are `no-store`, and frontend SWR data is cleared on account change.

This avoids adding a new dependency to the Express package; it does require
that both Next.js and Express are deployed with the same *server-side* secret.
Clerk runs at the trusted Next.js boundary, not in a browser-controlled header.

## Deployment prerequisites

- A Clerk application with `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and
  `CLERK_SECRET_KEY` set for the Next.js deployment. Both must refer to the
  same Clerk instance. Never put `CLERK_SECRET_KEY` in a `NEXT_PUBLIC_` value.
- An HTTPS-reachable backend (or `http://localhost:3001` for local development).
  Set `BACKEND_INTERNAL_URL` only in the Next.js server environment.
- `FRONTEND_ORIGIN` in Next.js must exactly match the browser origin, including
  scheme, hostname and port, with no trailing slash.
- A random base64-encoded `INTERNAL_API_SECRET` of at least 32 bytes, configured
  identically in Next.js and Express. Never commit the actual secret:

  ```sh
  node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
  ```

- `DATABASE_URL` and, if using AI, `GENAI_API_KEY` on Express.

See `frontend/.env.example` and `backend/.env.example`.

## Migration and cutover

**Back up the database before migration.** Run in backend directory:

```sh
npm ci
npx prisma migrate deploy
npx prisma generate
npm run build
npm run test:security # requires Node.js 22+
```

Run in frontend directory:

```sh
npm ci
npm run build
```

The migration adds *nullable* `ownerId` fields to Product, Supplier and
TransactionHistory and creates the RequestNonce table. Existing records are
intentionally **unclaimed**, inaccessible to all accounts until an administrator
verifies ownership. This prevents a newly registered user from claiming
somebody else's preexisting inventory.

For a known single-user database, after separately verifying the rightful
Clerk account ID, an authorized administrator can backfill in a transaction:

```sql
BEGIN;
UPDATE "Product" SET "ownerId" = 'user_REPLACE_WITH_VERIFIED_CLERK_ID' WHERE "ownerId" IS NULL;
UPDATE "Supplier" SET "ownerId" = 'user_REPLACE_WITH_VERIFIED_CLERK_ID' WHERE "ownerId" IS NULL;
UPDATE "TransactionHistory" SET "ownerId" = 'user_REPLACE_WITH_VERIFIED_CLERK_ID' WHERE "ownerId" IS NULL;
COMMIT;
```

For multi-user existing data, ownership **cannot be inferred** from this
schema. Do not run the blanket UPDATE. Prepare a reviewed per-row mapping of
legacy records to Clerk IDs and backfill only verified records. Null owner
records remain quarantined. Deploy the backend guard and migration before
opening the frontend to users. Expect a short maintenance window during cutover.

Where possible, restrict ingress to Express by network/firewall rules as a
second layer. Never rely on CORS for API access control.

## Required security checks before merge and deployment

1. Verify no auth: direct `GET /api/v1/product` to Express returns `401`;
   direct POST mutations with arbitrary JSON also return `401`.
2. Unauthenticated Next.js proxy call returns `401`.
3. Signed-in user A creates inventory and reads it back normally.
4. Signed-in user B sees no A records and receives `404` for attempted
   updates/deletes against A's product or supplier IDs (no information leaks).
5. A POST with the wrong Origin is rejected with `403` by Next.js.
6. Change the signed request body, method, query string or timestamp:
   signature validation must reject the request.
7. Replay a valid signed request with the same nonce: the second request must
   return `401` even when directed to another Express instance.
8. Negative, zero and fractional trade quantities are rejected with `400`;
   selling beyond stock returns `409`, with no history record.
9. Submit two concurrent sell requests on low stock: only sales backed by
   available stock may succeed, and history entries must match successful trades.
10. Switch Clerk users in the same tab: private SWR results from A must not
    appear for B, including immediately after switching.
11. Confirm that previously existing inventory is inaccessible before
    explicit, reviewed ownership backfill and becomes visible only to its owner.
12. Deploy to staging and run both backend and frontend type checks/builds.

## Limitations and later improvements

- This patch is security-focused, not a new sharing implementation. If an
  external `share.js` endpoint is discovered, it requires a separate review.
- Changing the shared signing secret requires coordinated deployment. Plan
  rotation and incident-response procedures before going live.
- Long-term, consider a dedicated API authentication SDK with verified Clerk
  JWTs if the backend needs to accept direct calls from other clients.
- This does not include general-purpose endpoint quotas or cost budgets for
  the AI provider; set gateway-level rate limits and provider billing limits.
- A production system should have an automatic scheduled cleanup for expired
  RequestNonce rows. This patch includes opportunistic cleanup only.
- The AI feature sends selected account data to its configured model provider;
  independently review privacy notices, retention and contractual controls.
