# QuickBaas.lk — Final Architecture Document
**SE2204 Software Project Management | Living Project Document**
*(මේ document එක project එක develop වෙන ගමන් update කරගෙන යන්න ඕන — "Update the project" කිව්වම මං update කරන්නම්)*

---

## 1. Project Overview

QuickBaas.lk කියන්නේ ශ්‍රී ලංකාවේ **homeowners** සහ **verified local repair technicians** (plumber, electrician, AC repair, carpenter) අතර සම්බන්ධ කරන centralized digital marketplace එකක්. දැනට තියෙන unverified social-media-based hiring එකට solution එකක් හැටියට, GPS matching, transparent pricing, dual-review system එකක් සමඟ trust ගොඩනගන platform එකක්.

- **Timeline:** සති 20ක් (2026 සැප්තැම්බර් 14 → 2027 පෙබරවාරි 11)
- **Budget:** Rs. 5,000,000 (WBS එකේ 5 phases වලට බෙදිලා)
- **Team:** සාමාජිකයන් 6ක්

---

## 2. Requirements

### 2.1 Functional Requirements (සාරාංශය)

| Feature | Priority |
|---|---|
| Homeowner Registration/Login | Must Have |
| Technician Registration + NIC Verification | Must Have |
| Service Request/Booking | Must Have |
| GPS-based Technician Matching | Must Have |
| Transparent Upfront Estimates | Must Have |
| Payment (Wallet + Cash-on-completion) | Must Have |
| Dual Review & Rating System | Must Have |
| Live Location Tracking | Should Have |
| Multi-language UI (Si/Ta/En) | Should Have |
| Admin Dashboard | *Suggested Requirement* |
| Dispute Resolution | *Suggested Requirement* |
| Push/Email Notifications | Should Have |

### 2.2 Non-Functional Requirements

| වර්ගය | අවශ්‍යතාව |
|---|---|
| **Performance** | Matching request එකකට seconds කිහිපයක් ඇතුළත response එකක් ලැබෙන්න ඕන |
| **Security** | Password hashing, JWT-based auth, NIC data encrypt කරලා store කරන්න ඕන |
| **Scalability** | MVP එකට medium traffic (users 100-500) ඉවසිය හැකි විදිහට; future scale කරන්න පුළුවන් architecture |
| **Reliability** | Booking/payment data loss වෙන්න බැහැ — database transactions use කරන්න ඕන |
| **Accessibility** | Mobile-first, low-bandwidth users සලකා UI light තියෙන්න ඕන |
| **Usability** | Sinhala/Tamil/English speakers ලාහසුවෙන් use කරන්න පුළුවන් UI |
| **Data Privacy** | NIC/personal data GDPR-style principles අනුව handle කරන්න ඕන |
| **Backup** | Managed DB (Supabase) automated daily backups |
| **Deployment** | Free-tier hosting මත deploy කරන්න ඕන |
| **Mobile Responsiveness** | > Requirement to Confirm — proposal එකේ "cross-platform mobile/web" කියලා තියෙන්නේ; native mobile app ද, mobile-responsive web/PWA ද කියලා team එකෙන් තහවුරු කරගන්න ඕන (මේ document එකේ PWA approach එකයි recommend කරන්නේ, budget/time අනුව) |

---

## 3. User Roles & Permission Matrix

| Role | View | Create | Edit | Delete |
|---|---|---|---|---|
| **Homeowner** | Own bookings, technician profiles, reviews | Booking request, review | Own profile, own booking (before confirm) | Own booking (before confirm) |
| **Technician** | Assigned jobs, own profile, own reviews | Service estimate, availability | Own profile, job status | — |
| **Admin** | සියල්ල (users, bookings, disputes, payments) | Announcements, dispute records | User/technician verification status | Fraudulent accounts, disputed listings |
| **Guest** | Landing page, general service info | Registration only | — | — |

---

## 4. Main Features (MVP scope)

Booking flow එක (proposal එකේ diagram එකට අනුව):
```
REQUEST → MATCH → ESTIMATE → BOOK → SERVICE → REVIEW
```

## 5. MVP / V2 / Future

> **Scope Decision (confirmed):** මේක **prototype** එකක් — native mobile app (iOS/Android) build කරන්නේ නෑ, Web (PWA) විතරයි. Payment gateway එකත් real gateway integration එකක් නෙවෙයි — **simulated/mock payment flow** එකක් (UI එකෙන් "Pay" කරාම success/fail state එකක් simulate කරනවා, real money/real gateway API call එකක් නෑ). මේකෙන් scope එක "must-have" core features වලට narrow වෙනවා, timeline/budget එකට realistic වෙනවා.

| Phase | Features |
|---|---|
| **MVP (Prototype) — මේක විතරයි build කරන්නේ** | Registration/Login (Homeowner + Technician), NIC verification (manual admin approval — automated 3rd-party API එකක් 20 weeks ඇතුළත realistic නෑ), Booking request, GPS-based nearby-technician list, basic estimate display, booking confirmation, **mock/simulated payment (cash-on-completion + fake wallet flow)**, single review after job |
| **Version 2 (out of scope for now)** | Live real-time GPS tracking, **real payment gateway integration (PayHere/similar)**, dual (two-way) review, multi-language UI, notifications |
| **Future (out of scope)** | Dispute resolution automation, AI-based technician recommendation, **native mobile apps (iOS/Android)**, loyalty/rewards |

> **Rule:** Prototype scope එකෙන් පිට features (native app, real payment gateway, live tracking) Phase 3 (Weeks 1-16) වලදී build කරන්න යන්න එපා — proposal එකේම "minimum four functions implemented", "≥80% prototype completion" කියලා තියෙන්නේ මේකයි.

---

## 6. Recommended Tech Stack

### ඇයි මේ තෝරගත්තේ — Project Characteristics

- කණ්ඩායමට තියෙන්නේ HTML/CSS/JS knowledge — advanced backend languages ඉගෙනගන්න වෙලාවක් නෑ (weeks 20යි)
- Budget සීමිතයි → free-tier hosting අනිවාර්යයි
- GPS/location-based matching → Geospatial query support ඕන database එකක්
- Real-time-ish tracking → WebSocket/Realtime support ඕන
- Small-medium user base (student project prototype)

### Frontend
| | |
|---|---|
| **Technology** | React (Vite) — Progressive Web App (PWA) විදිහට |
| **Reason** | HTML/CSS/JS knowledge එක direct build කරන්න පුළුවන්; component-based; PWA කරාම "cross-platform mobile/web" requirement එක Web-First Launch (proposal 5.2) එකට align වෙනවා, native app දෙකක් (iOS+Android) build කරන්න වෙලාවක් නෑ |
| **Advantages** | Huge ecosystem, easy deployment (Vercel/Netlify), team skills මත build වෙනවා |
| **Disadvantages** | Native app store presence නෑ (Future phase එකට දාන්න පුළුවන්) |
| **Learning** | React components, hooks (useState/useEffect), React Router, fetch/axios API calls |

### Backend
| | |
|---|---|
| **Technology** | Node.js + Express |
| **Reason** | JavaScript එකම — frontend/backend language එකක්, syntax context-switch නෑ. Express simple, well-documented, large community |
| **Advantages** | Fast to learn, huge npm ecosystem, easy REST API building |
| **Disadvantages** | Large-scale traffic වලට NestJS වගේ structured framework එකක් වඩා හොඳයි (මේ project scale එකට අවශ්‍ය නෑ) |

### Database
| | |
|---|---|
| **Technology** | PostgreSQL (via **Supabase**) |
| **Reason** | Bookings/users/technicians/payments අතර strong relational data (foreign keys, transactions) ඕන. Supabase ⇒ Postgres + built-in **PostGIS** (GPS/location queries සඳහා) + Auth + Realtime (live tracking සඳහා) + free tier — එකම service එකකින් requirements ගොඩක් cover වෙනවා |
| **Alternative considered** | MongoDB Atlas — flexible ⁠ ⁠schema, නමුත් booking-payment-review අතර relational integrity (transactions) අවශ්‍ය නිසා NoSQL එක ideal නෑ |

### Decision Log (initial)

| Decision | Selected | Alternatives | Reason | Date |
|---|---|---|---|---|
| Frontend | React (PWA) | Vue, Vanilla JS | Team skill fit + PWA cross-platform | 2026-09-25 |
| Backend | Node.js + Express | NestJS, FastAPI | JS reuse, low learning curve | 2026-09-25 |
| Database | PostgreSQL (Supabase) | MongoDB Atlas | Relational integrity + built-in GIS/Auth/Realtime | 2026-09-25 |
| Auth | Supabase Auth (JWT-based) | Custom JWT | Saves dev time, secure by default | 2026-09-25 |
| Project Scope | Prototype (Web/PWA only, no native app) | Full native mobile + web | Timeline (20 weeks) + budget + team skill fit | 2026-09-25 |
| Payment | Simulated/mock payment flow | Real gateway (PayHere etc.) | Prototype scope — real gateway integration unnecessary complexity/risk for a 20-week student prototype | 2026-09-25 |

---

## 7. Frontend Architecture

```
frontend/
├── src/
│   ├── components/      # Button, Card, MapView වගේ reusable UI pieces
│   ├── pages/           # Home, Login, BookingPage, TechnicianDashboard
│   ├── layouts/         # HomeownerLayout, TechnicianLayout, AdminLayout
│   ├── services/        # api.js — backend calls (axios/fetch wrapper)
│   ├── hooks/           # useAuth.js, useGeolocation.js
│   ├── utils/           # formatCurrency.js, validators.js
│   ├── assets/          # images, icons
│   ├── styles/          # global.css / tailwind config
│   └── App.jsx
├── .env
└── package.json
```

- **Routing:** React Router — role-based protected routes (Homeowner/Technician/Admin)
- **State management:** Context API (project size එකට Redux අවශ්‍ය නෑ)
- **Forms/Validation:** react-hook-form + basic validators
- **Auth state:** Supabase session token localStorage/cookie එකේ තියාගෙන Context එකෙන් share කරනවා

---

## 8. Backend Architecture

```
backend/
├── src/
│   ├── controllers/     # bookingController.js, authController.js
│   ├── routes/          # bookingRoutes.js, userRoutes.js
│   ├── services/        # matchingService.js (GPS logic), pricingService.js
│   ├── models/          # DB queries/schemas
│   ├── middleware/      # authMiddleware.js, errorHandler.js
│   ├── validators/      # request body validation (joi/zod)
│   ├── config/          # db.js, supabase.js
│   ├── utils/
│   └── app.js
├── tests/
├── .env / .env.example
└── package.json
```

- **Business logic** (GPS matching, pricing) — `services/` layer එකේ, controller එකේ දාන්න එපා
- **Error handling:** central `errorHandler` middleware එකකින්
- **Logging:** basic `winston`/`morgan` — over-engineer කරන්න එපා

---

## 9. Database Design (ERD-style)

```
users (base table — role: 'homeowner' | 'technician' | 'admin')
│
├── homeowner_profiles (1–1 with users)
├── technician_profiles (1–1 with users)
│     ├── nic_number, verification_status, skills, base_rate
│     └── location (PostGIS point — GPS matching සඳහා)
│
├── bookings (homeowner_id FK, technician_id FK)
│     ├── status: requested | matched | estimated | confirmed | completed
│     ├── estimate_amount
│     └── created_at
│
├── payments (booking_id FK — 1–1)
│     ├── method: wallet (mock) | cash
│     ├── status
│     └── is_simulated: true  (prototype flag — real gateway නෑ කියලා පැහැදිලිව සටහන් කරන්න)
│
└── reviews (booking_id FK)
      ├── homeowner_review, technician_review (dual review)
      └── rating
```

**Relationships:** users→profiles (1–1), homeowner→bookings (1–many), technician→bookings (1–many), booking→payment (1–1), booking→review (1–1)

**Indexes:** technician_profiles.location (GIST index — GPS queries fast කරන්න), bookings.status

---

## 10. API Design (Initial)

| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| POST | /api/auth/register | Homeowner/Technician register | No |
| POST | /api/auth/login | Login | No |
| GET | /api/users/me | Current user profile | Yes |
| POST | /api/technicians/verify | NIC verification submit | Yes (Technician) |
| GET | /api/technicians/nearby?lat&lng | GPS-based matching | Yes (Homeowner) |
| POST | /api/bookings | New booking request | Yes (Homeowner) |
| PATCH | /api/bookings/:id/status | Status update (accept/complete) | Yes |
| POST | /api/bookings/:id/estimate | Technician estimate submit | Yes (Technician) |
| POST | /api/payments/simulate | Simulate payment (mock success/fail — real gateway නෑ) | Yes |
| POST | /api/reviews | Submit review (dual) | Yes |
| GET | /api/admin/technicians/pending | Pending verifications | Yes (Admin) |

---

## 11. Authentication & Authorization

- **Approach:** Supabase Auth (JWT-based, email/password + optional OTP)
- Password hashing — Supabase handles automatically (bcrypt-based)
- Role-based protected routes — JWT token එකේ `role` claim check කරලා middleware එකෙන් block/allow කරනවා
- Technician account "pending" status වලින් ඉන්නවා admin approve කරන කම්

---

## 12. Security Checklist

- **Frontend:** Input validation, sanitize user input (XSS), HTTPS only calls
- **Backend:** JWT verification middleware, rate limiting (`express-rate-limit`), CORS config, `helmet` security headers, never log NIC/passwords
- **Database:** Supabase Row Level Security (RLS) policies — user එකට තමන්ගේම data විතරක් access වෙන්න
- **Deployment:** `.env` secrets — Git එකට commit කරන්න එපා (`.gitignore` එකේ දාන්න), production/development config වෙනස් කරන්න

**Development vs Production:** dev එකේදී Supabase local emulator/test project එකක් use කරන්න, production වලට වෙනම Supabase project එකක්.

---

## 13. Project Folder Structure (Root)

```
quickbaas/
├── frontend/
├── backend/
├── database/          # SQL migration scripts
├── docs/
├── README.md
└── .gitignore
```

---

## 14. Git/GitHub Workflow

```
main
│
└── develop
    ├── feature/auth
    ├── feature/booking-flow
    ├── feature/gps-matching
    └── feature/admin-dashboard
```

- `main` — production-ready code විතරයි
- `develop` — active development branch
- Feature branches → Pull Request → Code Review (member 1කවත් review කරන්න ඕන) → `develop` merge
- Commit messages: `feat: add booking API`, `fix: NIC validation bug`

---

## 15. Team Responsibilities

(proposal එකේ නම් අනුව — actual division එක team එකෙන් තීරණය කරන්න ඕන)

| Team Member | Responsibility | Deliverables |
|---|---|---|
| Sandaru Lakshitha | Backend & Database | API endpoints, DB schema |
| Imesh Adithya | Frontend (Homeowner side) | Booking flow UI |
| Chamath Hirushan | Frontend (Technician side) | Technician dashboard UI |
| Sahan Siriwardana | GPS Matching & Backend Services | Matching logic, PostGIS queries |
| Dinuk Dilshan | Auth & Admin Dashboard | Login/verification flow |
| Sadeepa Lakshan | Testing, Documentation & DevOps | QA checklist, README, deployment |

*Responsibilities overlap කරන්න පුළුවන් — codebase එක review කරන්න ඕන team විදිහට.*

---

## 16. Local Development Setup

1. Node.js (LTS) install කරන්න
2. Git install කරලා GitHub account එකකට repo access ගන්න
3. VS Code install කරන්න
4. Repo clone: `git clone <repo-url>`
5. `.env.example` copy කරලා `.env` හදාගන්න (Supabase URL/Key දාන්න)
6. Frontend: `cd frontend && npm install && npm run dev`
7. Backend: `cd backend && npm install && npm run dev`
8. Supabase dashboard එකෙන් DB connect වෙනවද බලන්න

---

## 17. Hosting / Deployment Architecture

```
GitHub
│
├── Frontend → Vercel (free tier)
│
└── Backend → Render (free tier)
        │
        ↓
   Supabase (DB + Auth + Realtime, free tier)
```

> **Rule 4/5 reminder:** Vercel/Render/Supabase free-tier limits (sleep-time, bandwidth, row limits) currently-valid options විදිහට තෝරගත්තා — නමුත් project deploy කරන අවස්ථාවේදී current pricing/limits official site එකෙන් නැවත verify කරන්න ඕන.

---

## 18. CI/CD

```
Developer → Feature Branch → Pull Request → Review → Merge (develop) → Auto-deploy (Vercel/Render preview)
```

GitHub Actions වලින් basic lint/test check එකක් — over-engineer කරන්න එපා.

---

## 19. Testing Strategy

- Manual testing — සෑම feature එකකටම checklist එකක්
- Basic unit tests (Jest) — matching logic, pricing calculation වගේ critical logic සඳහා
- API testing — Postman/Thunder Client
- End-to-end — MVP scope එකට optional

---

## 20. Documentation

```
docs/
├── requirements.md
├── architecture.md   (මේ document එකම)
├── database.md
├── api.md
├── setup.md
└── team-workflow.md
```

---

## 21. Development Roadmap (Proposal Gantt + WBS එකට align කරලා)

| Phase | Weeks | Objective |
|---|---|---|
| 1. Initiation | (WBS 1.0) | Aim/needs/feasibility define කිරීම |
| 2. Planning | Weeks 1-8 | Requirements, architecture, DB design, 20-week schedule |
| 3. Execution | Weeks 9-16 | Auth, booking engine + GPS, payment/review, platform dev |
| 4. Control | Weeks 13-18 | Unit/system/security audits, field beta testing |
| 5. Closure | Weeks 17-20 | Cloud hosting, web-first launch, ≥80% prototype, final presentation |

---

## 22. Learning Roadmap

```
HTML/CSS/JS (දැනටමත් දන්නවා)
↓
Git/GitHub
↓
React (components, hooks, routing)
↓
Node.js + Express (REST API)
↓
PostgreSQL/Supabase (queries, relations, PostGIS basics)
↓
Auth (JWT concept)
↓
Deployment (Vercel/Render)
```

සෑම concept එකක්ම implement කරන ගමන් ඉගෙනගන්න — වෙනම theory course එකක් කරන්න යන්න එපා.

---

## 23. Open Questions

- ~~Native mobile app අවශ්‍යද?~~ **තීරණය වුනා:** නෑ — Web (PWA) prototype විතරයි
- ~~Payment gateway — real integration ද?~~ **තීරණය වුනා:** නෑ — simulated/mock payment prototype විතරයි
- NIC verification — manual admin review ද, 3rd-party verification API එකක් ද? *(තවම open)*
- Live GPS tracking — prototype එකට static/basic location matching ප්‍රමාණවත්ද, real-time tracking ඕනද? *(V2 එකට දාලා තියෙන්නේ — confirm කරගන්න)*

---

## 24. First Milestone

**ඉලක්කය:** Frontend → Backend → Database → Backend → Frontend සම්පූර්ණ chain එක වැඩ කරනවා කියලා prove කිරීම, feature එකක් හදන්න කලින්.

```
Simple test: Homeowner registers → API hits backend → Supabase DB save වෙනවා → Response frontend එකට එනවා → UI update වෙනවා
```

---

## Current Project State

- **Phase:** Architecture Finalized
- **Completed:** Requirements analysis, Tech stack decision, Architecture design
- **In Progress:** —
- **Next:** GitHub repo setup, project folder initialization, DB schema creation
- **Architecture:** Frontend – React (PWA) | Backend – Node.js/Express | Database – PostgreSQL (Supabase) | Hosting – Vercel/Render/Supabase | Auth – Supabase Auth (JWT)
- **Scope:** Prototype (Web/PWA only) — real payment gateway නෑ, simulated payment flow විතරයි
- **Open Questions:** Section 23 බලන්න
- **Team Tasks:** Section 15 බලන්න
