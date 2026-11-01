-- Legacy data is intentionally unclaimed. Assign ownerId to the rightful Clerk
-- account using an administrator-reviewed migration, never public self-claiming.
ALTER TABLE "Product" ADD COLUMN "ownerId" TEXT;
ALTER TABLE "Supplier" ADD COLUMN "ownerId" TEXT;
ALTER TABLE "TransactionHistory" ADD COLUMN "ownerId" TEXT;

CREATE INDEX "Product_ownerId_delete_idx" ON "Product"("ownerId", "delete");
CREATE INDEX "Supplier_ownerId_delete_idx" ON "Supplier"("ownerId", "delete");
CREATE INDEX "TransactionHistory_ownerId_createdAt_idx" ON "TransactionHistory"("ownerId", "createdAt");

CREATE TABLE "RequestNonce" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "RequestNonce_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "RequestNonce_createdAt_idx" ON "RequestNonce"("createdAt");
