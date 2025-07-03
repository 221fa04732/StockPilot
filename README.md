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

```bash
cd frontend
# Create your .env.local file and paste NEXT_PUBLIC_BACKEND_URL to .env.local
npm install
npm run dev
```

```bash

cd backend
# Create your .env file based on .env.example
cp .env.example .env
npm install
npx prisma generate
npm start
```


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