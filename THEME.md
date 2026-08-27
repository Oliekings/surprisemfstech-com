# Design System & Theme Documentation

This document outlines the design tokens, visual principles, typography, and UI component standards used across **Surprise-MFs Tech** (`surprisemfstech.com`).

---

## 1. Visual Identity & Design Philosophy

- **Vibe**: Modern, warm, welcoming, and high-performance digital agency.
- **Aesthetic**: Deep dark background (`#000000`, `#09090B`) paired with warm amber/gold primary accents and soft teal secondary accents.
- **Tone**: Human, confident, clear, and client-centric — avoiding robotic or generic "AI-generated" tropes.
- **Motion**: Purposeful, spring-based micro-interactions powered by `framer-motion`.

---

## 2. Color Palette & Tokens

### Primary & Accent Colors
| Role | Name | Hex Code | Usage |
|---|---|---|---|
| **Primary Accent** | Amber / Gold | `#F59E0B` | Main CTAs, badges, active states, glowing orbs |
| **Primary Light** | Amber Light | `#FBBF24` | Gradient highlights, text highlights |
| **Primary Dark** | Amber Dark | `#D97706` | Hover borders, dark contrast accents |
| **Secondary Accent**| Teal | `#14B8A6` | Gradients, counter stats, secondary badges |
| **Secondary Light** | Teal Light | `#2DD4BF` | Gradient stops, subtle glows |
| **Direct Action** | WhatsApp Green | `#25D366` | WhatsApp button & direct communication triggers |
| **Direct Action Dark**| WhatsApp Dark | `#128C7E` | Hover state for WhatsApp triggers |

### Neutral Base
| Role | Hex / Value | Usage |
|---|---|---|
| **Background Dark** | `#000000` / `#09090B` | Page canvas, section containers |
| **Surface Dark** | `#18181B` (`zinc-900`) | Cards, modals, drawers |
| **Surface Elevated** | `#27272A` (`zinc-800`) | Hovered elements, input fields |
| **Border / Stroke** | `rgba(255, 255, 255, 0.06)` | Glassmorphism borders |
| **Warm Border** | `rgba(245, 158, 11, 0.15)` | Warm-themed card borders |
| **Text Primary** | `#FFFFFF` / `#FAFAFA` | Headings, main copy |
| **Text Secondary** | `#A1A1AA` (`zinc-400`) | Subtitles, descriptions |
| **Text Muted** | `#71717A` (`zinc-500`) | Metadata, section tags |

---

## 3. Typography

The site utilizes two complementary Google/Bunny fonts configured in `resources/views/app.blade.php` and `resources/css/app.css`:

1. **Sans-Serif (Body & Display)**: `Inter`
   - Weight spectrum: `300 (Light)`, `400 (Regular)`, `500 (Medium)`, `600 (Semi-Bold)`, `700 (Bold)`, `800 (Extra-Bold)`, `900 (Black)`
   - Used for main headings, body text, buttons, and navigation.

2. **Monospace (Accents & Metadata)**: `JetBrains Mono`
   - Weight spectrum: `400 (Regular)`, `500 (Medium)`, `600 (Semi-Bold)`
   - Used for category tags, dates, and subtle system labels.

---

## 4. Reusable CSS Utilities (`resources/css/app.css`)

### Glassmorphism Classes
- `.glass`: Translucent background with backdrop blur (`blur(20px)`) and subtle white border.
- `.glass-warm`: Amber-tinted translucent glass with amber border glow.
- `.glass-strong`: High-opacity glass with heavy backdrop blur (`blur(40px)`).

### Gradients & Text Glows
- `.text-gradient-static`: Amber (`#FBBF24`) through gold (`#F59E0B`) to teal (`#14B8A6`).
- `.text-gradient-warm`: Pure amber-gold linear gradient.
- `.border-gradient`: Dynamic gradient border with mask exclusion.
- `.line-glow`: Glowing horizontal section separator.
- `.glow-warm`: Radial gradient background glow for ambient lighting.

### Animation Classes
- `.animate-float`: 6-second vertical floating keyframe animation.
- `.animate-pulse-whatsapp`: Expanding radar pulse for direct WhatsApp interaction.
- `.animate-pulse-glow`: Warm amber ambient pulse.
- `.animate-spin-slow` / `.animate-reverse-spin`: Smooth rotational elements.

---

## 5. UI Components Guidelines

### Contact & WhatsApp Integration
- **`WhatsAppButton.jsx`**: Floating expandable action button (FAB) positioned at `bottom-6 right-6`. Includes instant link to `+2347066620068` and direct email fallback (`surprisemfstech@gmail.com`).
- **`ContactTerminal.jsx`**: Friendly 3-step interactive contact modal (Identity -> Budget -> Project Scope) with escape key listeners and post-submission direct links.

### Navigation & Header (`Layout.jsx`)
- Fixed header with background blur that transitions on scroll.
- Responsive mobile drawer with direct WhatsApp and inquiry access.
- 4-column structured footer: Navigation, Services, Contact, and Social Links.
