# Operations & Development Guide

This guide covers local environment setup, everyday commands, database management, Filament admin dashboard operations, and production deployment.

---

## 1. Local Development Setup

### Prerequisites
- **PHP**: `^8.2` with `pdo_sqlite` or `pdo_mysql`, `curl`, `mbstring`, `openssl`
- **Composer**: `^2.x`
- **Node.js**: `^20.x` or `^22.x` & `npm`

### Starting the Local Development Servers
Run both backend and frontend watchers in separate terminal tabs:

**Tab 1: Backend PHP Server**
```bash
php artisan serve --port=8000
```
*Accessible at `http://127.0.0.1:8000`*

**Tab 2: Frontend Vite Asset Watcher**
```bash
npm run dev
```
*Runs HMR on port `5173`*

---

## 2. Production Build

Before deploying to live hosting, compile and optimize client-side assets:

```bash
# Clean and build production JavaScript/CSS bundles
npm run build

# Optimize Laravel route and config caches
php artisan optimize
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## 3. Database & Migrations

The application supports both SQLite (recommended for fast local testing) and MySQL (production standard).

```bash
# Run database migrations
php artisan migrate

# Seed initial database records
php artisan db:seed

# Clear application data cache manually (if needed)
php artisan cache:clear
```

---

## 4. Filament Admin Dashboard

- **URL**: `http://127.0.0.1:8000/admin` (or `https://surprisemfstech.com/admin`)
- **Key Resources**:
  - **Projects Resource**: Manage portfolio items, completion dates, tags, and featured images.
  - **Services Resource**: Manage services list, slugs, and descriptions.
  - **Team Members Resource**: Update team profiles and roles.
  - **Global Settings Page**: Update site name, hero copy, pricing tiers, social URLs, and contact email.
  - **Inquiries Resource**: Review project inquiries submitted through the contact modal.
  - **Cache Optimizer Page**: One-click purge and warm-up of cached database objects.

---

## 5. Contact Channels & Configuration

| Channel | Destination / Endpoint | Location in Codebase |
|---|---|---|
| **WhatsApp Direct** | `+2347066620068` | [`WhatsAppButton.jsx`](file:///Users/surprise/Desktop/projects/surprisemfstech-com/resources/js/Components/WhatsAppButton.jsx) |
| **Email Direct** | `surprisemfstech@gmail.com` | [`WhatsAppButton.jsx`](file:///Users/surprise/Desktop/projects/surprisemfstech-com/resources/js/Components/WhatsAppButton.jsx), [`Layout.jsx`](file:///Users/surprise/Desktop/projects/surprisemfstech-com/resources/js/Layouts/Layout.jsx) |
| **Contact Modal** | Route `inquiry.store` (`POST /inquiry`) | [`ContactTerminal.jsx`](file:///Users/surprise/Desktop/projects/surprisemfstech-com/resources/js/Components/ContactTerminal.jsx) |

---

## 6. Project Checklist for New Features

1. Keep components responsive across mobile (`375px+`), tablet, and desktop (`1440px+`).
2. Utilize predefined CSS utilities in [`THEME.md`](file:///Users/surprise/Desktop/projects/surprisemfstech-com/THEME.md) and avoid ad-hoc color declarations.
3. If new models are created, declare `booted()` event handlers to purge corresponding cache tags upon modification.
4. Always test production bundle generation (`npm run build`) before publishing commits.
