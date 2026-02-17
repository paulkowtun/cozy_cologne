# cozy! cologne — Website Build Spec

## Important: Build from Command Line
Do NOT use `create-next-app` or any interactive scaffolding wizard. Instead:
1. Create the project directory manually
2. Run `npm init -y`
3. Install all dependencies via `npm install` from the command line
4. Create all config files (`next.config.js`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, etc.) manually
5. Build the file structure from scratch

This gives full control over versions and configuration. Use the latest stable versions of all packages.

### Core Dependencies to Install
```bash
npm install next react react-dom
npm install -D typescript @types/react @types/node tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Install any additional packages you deem useful (e.g. `next-intl` or similar for i18n, image optimization libraries, etc.). You have full freedom to pick the best tools — the only requirements are:
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Deploys on Vercel without issues
- Scales well with 100+ listings

---

## Project Overview
Build a modern, polished website for **cozy! cologne**, a furnished apartment rental company in Cologne, Germany. The site showcases small apartments and larger flat-share (WG) concepts — all fully furnished, superior quality, fully renovated.

The website must be **fully bilingual: German (default) and English**, toggled by the user.

---

## Branding

### Logo
The logo is text-only: **cozy! cologne**
- "cozy!" is underlined (a clean, slightly thick underline — not a text-decoration default, use a custom styled element)
- "cologne" sits next to or below "cozy!" depending on layout
- Font: **Comfortaa** (Google Font) — used site-wide for headings and UI. Use a clean sans-serif (e.g. the system font stack or a lightweight Google Font like `Nunito` or `DM Sans`) for body text to ensure readability at small sizes.

### Colors
Use CSS variables:

| Token | Value | Usage |
|---|---|---|
| `--brand-warm-dark` | `#9D8D76` | Headings, accents, CTA buttons |
| `--brand-warm-light` | `#EDE6CF` | Backgrounds, cards, hover states |
| `--brand-gradient` | `linear-gradient(135deg, #9D8D76, #EDE6CF)` | Hero sections, decorative elements |
| `--neutral-dark` | `#7A7E81` | Body text, icons |
| `--neutral-light` | `#A6A8A5` | Secondary text, borders, muted UI |
| `--white` | `#FAFAF8` | Page background (slightly warm white) |
| `--black` | `#2C2C2C` | High-contrast text when needed |

### Design Direction
- **Refined, warm minimalism.** Think boutique hotel website, not generic real estate portal.
- Generous whitespace, soft rounded corners (8–12px), subtle shadows.
- Smooth scroll behavior. Subtle fade-in animations on scroll (Intersection Observer, no heavy libraries).
- Image-forward: large, high-quality apartment photos are the star.
- Responsive: mobile-first, looks great on all breakpoints.

---

## Internationalization (i18n)

### Requirements
- The website must support **German (de)** and **English (en)**.
- **German is the default language.**
- A **language toggle button** sits in the top-right corner of the header (e.g. "DE | EN" pill toggle or a small flag/text button).
- The toggle switches ALL UI text instantly (client-side, no page reload).
- The URL should reflect the language: `/de/...` and `/en/...` (use Next.js middleware or `next-intl` routing).
- SEO: each language variant should have proper `<html lang>`, `hreflang` tags, and localized metadata.

### Translation Strategy
- **Static UI text** (nav, headings, labels, filter names, footer, legal pages, about section, hero text): stored in translation files (e.g. `/messages/de.json` and `/messages/en.json` or similar depending on the i18n library chosen).
- **Listing content**: translated fields live directly in the listing JSON. German fields are the primary keys (`name`, `beschreibung`, `highlights`, `mindestmietdauer`), English equivalents use the `EN` suffix (`nameEN`, `beschreibungEN`, `highlightsEN`, `mindestmietdauerEN`). The data loading utility should resolve the correct field based on the active locale.
- **Listing JSON field names stay in German** — they are internal data keys, not user-facing.

### i18n Library
Use **`next-intl`** (recommended) or any equivalent that integrates well with Next.js App Router. Pick whatever works best and is most maintainable. Set up:
- Locale detection (default: `de`)
- Middleware for locale routing
- Translation hook/function accessible in all components

---

## Site Structure

### Pages
1. **Home** (`/[locale]/`) — Header, Hero, About, Apartment Search/Grid, Contact Form, Footer
2. **Listing Detail** (`/[locale]/[slug]`) — Individual apartment page
3. **Impressum** (`/[locale]/impressum`) — Legal notice (placeholder content, both languages)
4. **Datenschutz / Privacy** (`/[locale]/datenschutz`) — Privacy policy (placeholder content, both languages)

---

## Page Sections (Home)

### 1. Header / Navigation
- Sticky top nav, white/transparent bg that becomes solid on scroll
- Logo left
- Nav links center or right: "Wohnungen"/"Apartments", "Über uns"/"About", "Kontakt"/"Contact" (anchor links to home sections), "Impressum"
- **Language toggle** top-right (DE | EN)
- Mobile: hamburger menu with slide-in drawer, language toggle always visible

### 2. Hero Section
- Full-width section with brand gradient background or large hero image with gradient overlay
- Headline (DE): "Voll möbliert. Voll renoviert. Voll Köln."
- Headline (EN): "Fully furnished. Fully renovated. Fully Cologne."
- Subheadline: brief value proposition (1–2 sentences)
- CTA button scrolls to apartment section

### 3. Über uns / About
- id="about"
- Short section: who we are, what we offer
- Two columns: text left, image/illustration right
- Key points: fully furnished, superior quality, fully renovated, apartments & flat-share concepts
- Concise, warm, inviting

### 4. Apartments Section
- id="apartments"
- **Filter bar** at top (sticky within section or always visible):
  - Zimmer / Rooms: dropdown or button group (1, 2, 3, 4+)
  - Quadratmeter / Square Meters: range slider or min/max input
  - Typ / Type: "Wohnung"/"Apartment" or "WG"/"Flat Share" toggle
  - Terrasse / Terrace: Yes/No toggle
  - Aufzug / Elevator: Yes/No toggle
  - Parkplatz / Parking: Yes/No toggle
  - Stadtteil / City Part: dropdown (populated dynamically from listing data)
  - Reset filters button
  - All filter labels switch with locale
- **Results grid** below:
  - Responsive cards: 1 col mobile, 2 col tablet, 3 col desktop
  - Card: first image as thumbnail, name (localized), stadtteil, rooms, sqm, type badge, warmmiete, feature icons
  - Click card → `/[locale]/[slug]`
  - Empty state if no results
  - Sort by: rent (low→high, high→low), square meters
- **Performance for scale**: if there are 100+ listings, consider pagination or "load more" instead of rendering all cards at once. Use `next/image` with lazy loading. Keep filter logic efficient (client-side is fine up to ~500 listings).

### 5. Contact Form
- id="contact"
- Fields: Name, E-Mail, Telefon (optional), Nachricht/Message, Submit
- On submit: `console.log` data + show success toast. Leave a clearly marked comment for email integration (Resend, SendGrid, etc.).
- All labels and placeholders localized

### 6. Footer
- Logo
- Anchor links: Wohnungen/Apartments, Über uns/About, Kontakt/Contact
- Legal links: Impressum, Datenschutz/Privacy
- © 2025 cozy! cologne
- "Made with ❤️ in Köln"

---

## Listing Detail Page (`/[locale]/[slug]`)

- **Image gallery**: large main image + thumbnail strip. Click thumbnail to swap. Lightbox for fullscreen.
- **Listing info** (all labels localized):
  - Name (h1, localized)
  - Address
  - Type badge (Wohnung/Apartment or WG/Flat Share)
  - Key stats: Zimmer/Rooms, qm/sqm, Etage/Floor
  - Rent breakdown: Warmmiete, Kaltmiete, Nebenkosten
  - Verfügbar ab / Available from
  - Mindestmietdauer / Min. rental period (localized)
  - Features as icon chips (localized labels)
  - Highlights (localized list)
  - Description (localized full text)
- **Contact CTA**: button that scrolls to contact section or opens prefilled contact modal
- **Back to overview** link

---

## Data Architecture

### Folder Structure
```
/public/listings/
  ehrenfeld-venloer-2z/          ← folder name = URL slug
    listing.json                  ← apartment data (German primary, EN suffixed fields)
    images/                       ← photos, sorted alphabetically
      01-wohnzimmer.jpg
      02-kueche.jpg
      03-schlafzimmer.jpg
```

### Data Loading
- **Build time** via `generateStaticParams` + static data loading
- Scan `/public/listings/` for subdirectories
- Read `listing.json` from each
- Read `images/` folder, sort alphabetically
- Generate static pages per listing per locale
- Utility functions in `/lib/listings.ts`:
  - `getListings()` — returns all listings
  - `getListingBySlug(slug)` — returns single listing
  - `getLocalizedListing(listing, locale)` — resolves localized fields
  - Add a comment at the top explaining the listing upload workflow:
    ```
    // To add a new listing:
    // 1. Create a folder in /public/listings/ (folder name becomes the URL slug)
    // 2. Add a listing.json following the template (see listing-template.json)
    // 3. Add an images/ subfolder with photos (named 01-xxx.jpg, 02-xxx.jpg, etc.)
    // 4. Run `npm run build` or push to Vercel to deploy
    ```

### JSON Schema
Use the provided `listing-template.json`. The `typ` field must be `"wohnung"` or `"wg"`.

---

## Technical Requirements

- **Next.js 14+** with App Router
- **TypeScript** — strict mode
- **Tailwind CSS** — extend config with brand colors, Comfortaa font
- **next-intl** (or best alternative) for i18n with App Router
- **next/image** for all images
- **Metadata**: localized `<title>`, `<meta description>`, Open Graph tags, `hreflang`
- **Accessibility**: semantic HTML, ARIA labels, keyboard nav, color contrast
- **Performance**: lazy loading, minimal bundle, efficient filtering
- **SEO**: JSON-LD structured data per listing (Schema.org/Apartment), localized
- No external UI component library — Tailwind only
- Smooth scroll for anchor links
- Scroll-triggered fade-in animations (Intersection Observer)

---

## Vercel Deployment
- The project must work with `vercel build` and deploy to Vercel without additional configuration
- Ensure `next.config.js` is compatible with Vercel's build pipeline
- Static generation (SSG) for all listing pages — no serverless functions needed for core site
- Environment variables: none required for the base site (add comment for future email API keys)

---

## Scalability Considerations
- Listing data is loaded at build time. With 100+ listings, build times may increase. This is acceptable for now.
- If the listing count grows past ~500, add a comment suggesting migration to a headless CMS or database (e.g. Sanity, Contentful, or Supabase) with ISR (Incremental Static Regeneration).
- Client-side filtering is fine for up to ~500 listings. Beyond that, consider server-side search.
- Image optimization via `next/image` handles responsive sizes and lazy loading automatically.

---

## File Structure
```
/app
  /[locale]
    layout.tsx
    page.tsx              ← home
    /[slug]
      page.tsx            ← listing detail
    /impressum
      page.tsx
    /datenschutz
      page.tsx
/components
  Header.tsx
  Hero.tsx
  About.tsx
  ApartmentSearch.tsx
  ApartmentCard.tsx
  ContactForm.tsx
  Footer.tsx
  ListingGallery.tsx
  ListingDetails.tsx
  FilterBar.tsx
  Logo.tsx
  LanguageToggle.tsx
/lib
  listings.ts
  types.ts
/messages
  de.json                 ← German UI translations
  en.json                 ← English UI translations
/public
  /listings
    /_example
      listing.json
      /images
        01-placeholder.jpg
        02-placeholder.jpg
        03-placeholder.jpg
/middleware.ts             ← locale detection & routing
/next.config.js
/tailwind.config.ts
/tsconfig.json
```

---

## Example Listing
Include one example listing at `/public/listings/_example/` using the data from `listing-template.json`. Generate 3 placeholder images (solid brand-color backgrounds with centered text like "Wohnzimmer", "Küche", "Schlafzimmer") so the site renders with content.

---

## Summary
Build the complete site from scratch via the command line. Prioritize:
1. Clean, warm, professional design true to the brand
2. Full bilingual support (DE/EN) with seamless toggle
3. Fully working apartment search with all filter criteria
4. Dynamic listing detail pages generated from folder data
5. Responsive, accessible, performant, Vercel-ready
