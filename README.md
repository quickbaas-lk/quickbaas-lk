# 🏠 QuickBaas.lk — Verified Home Repair Marketplace

<p>
  <img src="https://img.shields.io/badge/STACK-REACT-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/BACKEND-NODE.JS-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/DATABASE-SUPABASE-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/STATUS-IN%20PROGRESS-F9A825?style=for-the-badge" alt="Status: In Progress" />
  <img src="https://img.shields.io/badge/SCOPE-PROTOTYPE%20(WEB%20ONLY)-8E24AA?style=for-the-badge" alt="Scope: Prototype" />
</p>

> 📌 Connecting homeowners with verified local repair technicians — one booking at a time.

---

## 🎯 Purpose of the Repository

> [!IMPORTANT]
> This repository documents the build of **QuickBaas.lk**, a prototype marketplace platform developed for **Software Project Management**, connecting homeowners with verified local repair technicians (plumbers, electricians, AC technicians, carpenters) across Sri Lanka.
>
> The scope is intentionally a **prototype**: a Web (PWA) application only — no native mobile app — with a **simulated payment flow** instead of a real payment gateway, built to demonstrate the core booking journey end-to-end within a 15-week academic timeline.

Whether you're a teammate picking up a feature branch, a reviewer checking the architecture, or just browsing the repo — this README tracks what's built, what's planned, and how the whole system fits together.

**Key highlights include:**
- 📍 GPS-based technician matching (PostGIS)
- 💳 Simulated payment flow (no real gateway, by design)
- 🔐 NIC-verified technician onboarding
- ⭐ Post-job review system
- 🧱 Full architecture, API spec, and team workflow documented in [`docs/`](./docs)

---

## 📖 Description

Finding a reliable home repair technician in Sri Lanka today usually means unverified social media posts or word of mouth — no accountability, no standard pricing, no quality control. **QuickBaas.lk** solves this with a centralized platform where:

- Homeowners can request a service and get matched with nearby verified technicians (GPS-based)
- Technicians get transparent, ongoing bookings with upfront pricing
- Both sides leave a review after the job is done

This repo contains the prototype implementation — built to demonstrate the core booking flow end-to-end, not a production-ready commercial product.

---

## ✨ Features (Prototype Scope)

| Feature | Status |
|---|---|
| Homeowner registration & login | ✅ MVP |
| Technician registration + NIC verification (manual admin approval) | ✅ MVP |
| Service booking request | ✅ MVP |
| GPS-based nearby technician matching | ✅ MVP |
| Upfront price estimate | ✅ MVP |
| Simulated payment (mock — no real gateway) | ✅ MVP |
| Single review after job completion | ✅ MVP |
| Live real-time GPS tracking | ⏭ Planned (V2) |
| Real payment gateway integration | ⏭ Planned (V2) |
| Two-way (dual) review | ⏭ Planned (V2) |
| Multi-language UI (Sinhala / Tamil / English) | ⏭ Planned (V2) |
| Native mobile app (iOS/Android) | 🔭 Future |
| Dispute resolution system | 🔭 Future |

> See [`docs/architecture.md`](./docs/architecture.md) for the full breakdown of MVP vs V2 vs Future scope.


---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) — Progressive Web App |
| Backend | Node.js + Express |
| Database | PostgreSQL via [Supabase](https://supabase.com) (includes PostGIS for GPS matching) |
| Auth | Supabase Auth (JWT-based) |
| Hosting | Vercel (frontend) · Render (backend) · Supabase (database) |

Full reasoning behind these choices: [`docs/architecture.md`](./docs/architecture.md)

---

## 📂 Project Structure

```
quickbaas/
├── frontend/           # React (Vite) PWA
├── backend/            # Node.js + Express API
├── database/           # SQL migration scripts
├── docs/               # requirements, architecture, api, setup docs
├── README.md
└── .gitignore
```

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- [Node.js](https://nodejs.org) (LTS version)
- [Git](https://git-scm.com)
- A free [Supabase](https://supabase.com) account/project
- A code editor (VS Code recommended)

### 1. Clone the repo
```bash
git clone https://github.com/<your-org>/quickbaas.git
cd quickbaas
```

### 2. Set up environment variables
Copy the example env files and fill in your own values:
```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

See [Environment Variables](#-environment-variables) below for what each value means.

### 3. Install dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 4. Run the app locally
```bash
# Terminal 1 — backend
cd backend
npm run dev
# runs on http://localhost:5000 (example)

# Terminal 2 — frontend
cd frontend
npm run dev
# runs on http://localhost:5173 (example)
```

### 5. Verify it's working
Open the frontend URL in your browser, register a test account, and confirm requests reach the backend and Supabase (check the Supabase dashboard's Table Editor).

---

## 🔑 Environment Variables

**`backend/.env`**
```env
PORT=5000
DATABASE_URL=your_supabase_postgres_connection_string
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret
```

**`frontend/.env`**
```env
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
---

## 📡 API Overview

| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register (homeowner/technician) | No |
| POST | `/api/auth/login` | Login | No |
| GET | `/api/users/me` | Get current user profile | Yes |
| POST | `/api/technicians/verify` | Submit NIC for verification | Yes (Technician) |
| GET | `/api/technicians/nearby` | GPS-based technician matching | Yes (Homeowner) |
| POST | `/api/bookings` | Create booking request | Yes (Homeowner) |
| PATCH | `/api/bookings/:id/status` | Update booking status | Yes |
| POST | `/api/bookings/:id/estimate` | Submit price estimate | Yes (Technician) |
| POST | `/api/payments/simulate` | Simulate payment (mock, no real gateway) | Yes |
| POST | `/api/reviews` | Submit a review | Yes |
| GET | `/api/admin/technicians/pending` | List pending verifications | Yes (Admin) |

Full API spec: [`docs/api.md`](./docs/api.md)

---

## 🌿 Git Workflow

```
main
│
└── develop
    ├── feature/auth
    ├── feature/booking-flow
    ├── feature/gps-matching
    └── feature/admin-dashboard
```

- `main` — production-ready code only
- `develop` — active development
- Work in a `feature/*` branch → open a Pull Request → get at least one review → merge into `develop`
- Commit style: `feat: add booking API`, `fix: NIC validation bug`, `docs: update README`

---

## ☁️ Deployment

```
GitHub
│
├── Frontend → Vercel (free tier)
│
└── Backend → Render (free tier)
        │
        ↓
   Supabase (Database + Auth, free tier)
```

---

## 🤝 Contributing

1. Create a feature branch off `develop`: `git checkout -b feature/your-feature-name`
2. Follow the existing code style and folder structure
3. Test your changes locally before opening a PR
4. Open a Pull Request into `develop` and request a review from at least one teammate
5. No secrets, API keys, or `.env` values in commits

---

## 📄 License

Academic project — Software Project Management
