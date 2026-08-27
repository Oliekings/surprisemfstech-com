# System Architecture Documentation

**Surprise-MFs Tech** (`surprisemfstech.com`) is a full-stack digital product and agency platform built using modern PHP and JavaScript ecosystems.

---

## 1. High-Level Technology Stack

```
                               ┌────────────────────────────────┐
                               │       Client (Browser)         │
                               └────────────────┬───────────────┘
                                                │
                                      HTTP / HTTPS Requests
                                                │
                                                ▼
                               ┌────────────────────────────────┐
                               │  Web Server (.htaccess/Apache) │
                               │  - Brotli/Gzip Compression     │
                               │  - Asset Caching (1 Year)      │
                               │  - Subdomain Isolation         │
                               └────────────────┬───────────────┘
                                                │
                                                ▼
                               ┌────────────────────────────────┐
                               │       Laravel 12 Framework     │
                               │  - Inertia.js SSR / Bridge     │
                               │  - Filament 3 Admin Panel      │
                               │  - Repository & Caching Layer  │
                               └───────┬────────────────┬───────┘
                                       │                │
                        Query Caching  │                │ Render Props
                                       ▼                ▼
                         ┌─────────────────┐    ┌─────────────────┐
                         │ SQLite / MySQL  │    │  React 18 + SPA │
                         │ Database Engine │    │  Vite Bundler   │
                         └─────────────────┘    └─────────────────┘
```

### Core Technologies
- **Backend Framework**: Laravel 12.x (PHP 8.2+)
- **Frontend Layer**: React 18.x with Inertia.js 1.x
- **Styling**: TailwindCSS 4.x + Vanilla CSS Utilities
- **Animation**: Framer Motion
- **Admin Dashboard**: Filament v3.x
- **Build Tooling**: Vite 5.x

---

## 2. Directory Structure

```
surprisemfstech-com/
├── app/
│   ├── Filament/                # Filament Admin Dashboard Resources & Pages
│   │   ├── Pages/               # Custom admin views (ManageGlobalSettings, CacheOptimizer)
│   │   └── Resources/           # CRUD resources (Projects, Services, Team, Inquiries)
│   ├── Http/
│   │   ├── Controllers/         # Application HTTP Controllers
│   │   └── Middleware/          # HandleInertiaRequests (cached global state)
│   └── Models/                  # Eloquent models with automatic cache invalidation
├── bootstrap/                   # App bootstrapping & service providers
├── config/                      # Application configurations (database, cache, mail)
├── database/                    # Migrations, seeders, and factory definitions
├── public/                      # Public entry point (`index.php`, compiled assets)
├── resources/
│   ├── css/                     # Primary Tailwind/CSS styles (`app.css`)
│   ├── js/                      # Inertia React components
│   │   ├── Components/          # Reusable UI (WhatsAppButton, ContactTerminal, etc.)
│   │   ├── Layouts/             # Master Layouts (`Layout.jsx`, `GuestLayout.jsx`)
│   │   └── Pages/               # Route views (`Welcome.jsx`, `Projects/`, `Team/`)
│   └── views/                   # Root Blade template (`app.blade.php`)
├── routes/                      # Route definitions (`web.php`, `auth.php`, `console.php`)
└── subdomains/                  # Root project folders for sister subdomains
```

---

## 3. Data Flow & Inertia.js Bridge

1. **Routing**: Standard Laravel routes in `routes/web.php` handle requests.
2. **Global Shared Props**: `HandleInertiaRequests` middleware shares global data (such as `site_settings`, active `services`, and authentication status) across all views.
3. **Data Delivery**: Controllers return `Inertia::render('PageName', [...data])`, serializing models directly into React component props without requiring standalone REST endpoints.
4. **Client Navigation**: Page transitions are performed via Inertia's single-page router (`<Link href="...">` and `router.post()`), eliminating full-page browser reloads.

---

## 4. Performance & Caching Strategy

To ensure ultra-low latency (< 1ms per cached page request), the application employs a multi-tiered caching strategy:

### A. Forever Caching for Static Models
Database queries for site settings, team members, featured projects, and services are wrapped in `Cache::rememberForever()`:
- `site_settings`: Global configuration, pricing, contact info, socials.
- `site_services`: Published agency services and descriptions.
- `site_projects`: Portfolio and featured showcase work.
- `site_team`: Team members and public bios.

### B. Automated Cache Invalidation
Every Eloquent model (`Project`, `Service`, `TeamMember`, `Setting`, `SiteSetting`) utilizes Laravel model lifecycle hooks:
```php
protected static function booted(): void
{
    static::saved(fn () => Cache::forget('cache_key_name'));
    static::deleted(fn () => Cache::forget('cache_key_name'));
}
```
Whenever an administrator updates records via the Filament dashboard, the affected cache tags are purged automatically without manual intervention.

### C. Server-Level Asset Caching & Compression (`.htaccess`)
- Static assets (`.js`, `.css`, `.woff2`, `.svg`, `.png`, `.jpg`) are served with `Cache-Control: max-age=31536000, immutable`.
- `mod_deflate` and Brotli compress HTML, JSON, JS, and CSS payloads.
- Subdomain isolation rules prevent main-domain rewrites from interfering with sibling directories.

---

## 5. Subdomain & Multi-Project Ecosystem

The root directory hosts multiple standalone projects and subdomains alongside the main application. Rewrite rules in `.htaccess` ensure that existing physical folders (e.g., sister domains and sub-apps) bypass Laravel's root front controller.
