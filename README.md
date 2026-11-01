# 📦 StockPilot – Inventory Management System

**Live URL:** [https://stockpilot-app-ten.vercel.app/](https://stockpilot-app-ten.vercel.app/)

StockPilot is a powerful and scalable inventory management system that simplifies the management of products, suppliers, and transactions. Built with a modern tech stack, it offers a clean interface, robust backend, and seamless integration.

---

## 🚀 Local Setup

Fork and Clone

```bash
git clone https://github.com/<your-github-username>/StockPilot.git
cd StockPilot

```

Start the backend (Node.js 22+ recommended):

```bash
cd backend
cp .env.example .env
# Configure DATABASE_URL, GENAI_API_KEY (if needed), and INTERNAL_API_SECRET
npm ci
npx prisma migrate deploy
npx prisma generate
npm run build
npm start
```

In a second terminal, start the frontend:

```bash
cd frontend
cp .env.example .env.local
# Configure Clerk keys, FRONTEND_ORIGIN, BACKEND_INTERNAL_URL,
# and the same INTERNAL_API_SECRET as in the backend.
npm ci
npm run dev
```

For details about legacy data ownership and production deployment, see
[Security hardening](docs/security-hardening.md).


```
stock-pilot/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── generate/
│   │   ├── handler/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── validate/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── app/
│   │   ├── more/
│   │   ├── product/
│   │   ├── supplier/
│   │   ├── transaction/
│   │   ├── global.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   ├── config.ts
│   ├── package.json
│   └── tsconfig.json
├── vercel.json
└── README.md
```


## 🧰 Tech Stack

- **Frontend:** Next.js, Tailwind CSS, TypeScript  
- **Backend:** Node.js, Express.js, TypeScript  
- **Database:** PostgreSQL with Prisma ORM  
- **Validation:** Zod  
- **Deployment:** Vercel (Frontend), AWS EC2 (Backend)



## 🤝 Want to Contribute?

Contributions are always welcome!
Let’s build something great together 🚀
## API security and deployment

The inventory API is private. Users authenticate using Clerk in Next.js; all
requests are sent through the signed same-origin proxy and verified by Express.
**Do not expose the old unauthenticated API or deploy without completing the
ownership migration.** See [Security hardening and deployment](docs/security-hardening.md)
for required environment variables, migration/backfill instructions and a
security verification checklist.
