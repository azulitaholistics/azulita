# Azulita Holistics - Product Requirements Document

## Overview

Azulita Holistics is a bilingual (English/Spanish) landing site for a holistic healing practice offering homeopathy, reiki, and related services. The site serves as a professional hub and booking funnel for new patients, with a calm, approachable aesthetic that balances legitimacy with warmth. Primary goal: convert visitors into scheduled initial consultations.

## Core User Journey

1. **Arrival** - Visitor lands on homepage, sees services overview and practitioner introduction
2. **Language Selection** - Visitor toggles between English/Spanish if needed (preference persists)
3. **Exploration** - Visitor navigates to About or Services pages for more context
4. **Booking Decision** - Visitor clicks prominent "Book Consultation" CTA
5. **Appointment Scheduling** - Cal.com widget opens, visitor selects time slot and optionally adds message
6. **Confirmation** - Calendar event created, both parties receive confirmation

## Technical Architecture

### Tech Stack
- **Frontend:** Next.js 16 with React 19 + TypeScript - Type-safe content/props, cleaner routing
- **Styling:** Tailwind CSS v4 with CSS variables - Centralized theming using `@theme inline` syntax without class sprawl
- **Internationalization:** Middleware-based routing with `/es/*` paths - No Next.js i18n config (incompatible with static export), manual but simple
- **Booking:** Cal.com embedded widget - Open source, syncs with Google Calendar, includes optional message field
- **Hosting:** Vercel - Zero-config deployment, CDN distribution, good mobile performance
- **State Management:** React Context for language preference - Persists to localStorage, accessible via `useLanguage()` hook

### Key Components

### Key Components

**Core Infrastructure:**
- `lib/i18n/LanguageContext.tsx` - React Context providing current language and setter
- `lib/i18n/useLanguage.ts` - Hook returning `{ language, setLanguage, t }` where `t(key)` fetches translated content
- `lib/i18n/content.ts` - Type-safe content loader with shape validation
- `lib/i18n/types.ts` - TypeScript interfaces for all content structures

**Layout & Navigation:**
- `components/Layout.tsx` - Wrapper with header, nav, language toggle, footer
- `components/LanguageToggle.tsx` - Uses `useLanguage()` to switch `/about` ↔ `/es/about`
- `components/Navigation.tsx` - Home, About, Services links (responsive mobile menu)
- `components/Footer.tsx` - Instagram link, email contact, copyright/branding
- `components/ErrorBoundary.tsx` - Catches Cal.com embed failures, shows fallback

**Content Components:**
- `components/Hero.tsx` - Homepage hero with headline, subhead, primary CTA
- `components/ServicesOverview.tsx` - Card grid of service offerings
- `components/AboutSection.tsx` - Practitioner bio and philosophy
- `components/BookingCTA.tsx` - Reusable call-to-action component linking to Cal.com
- `components/CalEmbed.tsx` - Wrapped Cal.com embed with error handling

**Pages:**
- `app/page.tsx` - Home (hero + services overview + booking CTA)
- `app/about/page.tsx` - About page
- `app/services/page.tsx` - Services page
- `app/es/page.tsx` - Spanish home
- `app/es/about/page.tsx` - Spanish about
- `app/es/services/page.tsx` - Spanish services
- `app/layout.tsx` - Root layout wrapping LanguageProvider

**Content Structure:**
```typescript
// content/en.ts
export const en = {
  nav: {
    home: "Home",
    about: "About",
    services: "Services"
  },
  home: {
    hero: {
      title: "Welcome to Azulita Holistics",
      subtitle: "Healing through natural methods",
      cta: "Book Consultation"
    },
    services: [
      { title: "Reiki", description: "..." },
      { title: "Homeopathy", description: "..." }
    ]
  },
  // ... structured by page/component
}

// content/es.ts - Same structure, Spanish translations
// content/index.ts - Exports both, provides type safety
```

**Design System:**
- `styles/theme.css` - CSS custom properties for all design tokens
- `tailwind.config.ts` - References CSS variables, defines semantic utilities
- `styles/globals.css` - Base styles, component classes using @layer
- Components use semantic Tailwind classes that reference CSS variables

### Design System Architecture

To avoid Tailwind class sprawl and enable runtime theming, all design decisions use CSS custom properties:

**`styles/theme.css`:**
```css
:root {
  /* Colors */
  --color-primary: #5A9C8E;
  --color-primary-light: #7FBFB2;
  --color-secondary: #2C4A5A;
  --color-neutral: #E8E4DC;
  --color-neutral-light: #F5F3EE;
  --color-accent: #89CFF0;
  
  /* Spacing */
  --spacing-section: 4rem;
  --spacing-card: 1.5rem;
  
  /* Typography */
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
}
```

**`styles/globals.css`:**
```css
@import "tailwindcss";
@import "./theme.css";

@theme inline {
  /* Colors */
  --color-primary: var(--color-primary);
  --color-primary-light: var(--color-primary-light);
  --color-secondary: var(--color-secondary);
  --color-neutral: var(--color-neutral);
  --color-neutral-light: var(--color-neutral-light);
  --color-accent: var(--color-accent);

  /* Typography */
  --font-heading: var(--font-heading);
  --font-body: var(--font-body);

  /* Spacing */
  --spacing-section: var(--spacing-section);
  --spacing-card: var(--spacing-card);
}
```

**Note on Tailwind v4:** Tailwind v4 uses `@theme inline` syntax instead of a separate `tailwind.config.ts` file. This keeps all configuration in CSS, making it simpler for non-technical editing.

@layer components {
  .btn-primary {
    @apply bg-primary text-white hover:bg-primary-light 
           transition-colors duration-[var(--transition-normal)]
           px-6 py-3 rounded-lg font-medium;
  }
  
  .btn-secondary {
    @apply border-2 border-primary text-primary 
           hover:bg-primary hover:text-white
           transition-all duration-[var(--transition-normal)]
           px-6 py-3 rounded-lg font-medium;
  }
  
  .card-base {
    @apply bg-white p-card rounded-xl 
           shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]
           transition-shadow duration-[var(--transition-normal)];
  }
  
  .card-feature {
    @apply bg-neutral-light p-card rounded-xl border border-neutral;
  }
}
```

**Component Usage:**
```tsx
// ❌ Bad - Tailwind spaghetti
<button className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-3 rounded-lg">
  Book Now
</button>

// ✅ Good - Semantic class
<button className="btn-primary">
  Book Now
</button>

// ✅ Also good - Composing with Tailwind when needed
<button className="btn-primary mt-4 w-full md:w-auto">
  Book Now
</button>
```

**Benefits:**
- Change colors in ONE place (`theme.css`) - affects entire site instantly
- No JavaScript required for theming
- Type-safe in Tailwind config
- Components stay clean and semantic
- Easy to add dark mode later (just swap CSS variable values)
- Girlfriend edits `theme.css` hex values, never touches components

## Feature Details

### Language Toggle Implementation
**Context Provider Pattern:**
```typescript
// lib/i18n/LanguageContext.tsx
type Language = 'en' | 'es'
type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string  // Translation helper
}

// Reads from localStorage on mount, persists on change
// Provides current language to entire app via useLanguage() hook
```

**Routing Approach:**
- English pages: `/`, `/about`, `/services`
- Spanish pages: `/es`, `/es/about`, `/es/services`
- Language toggle uses Next.js `useRouter()` to switch routes
- Example: On `/about`, toggle redirects to `/es/about` and vice versa
- `useEffect` in LanguageProvider syncs localStorage with current route
- Fallback: If user lands on `/es` route but localStorage says 'en', respect the URL (bookmarked links)

### Cal.com Integration
- Wrapped in `ErrorBoundary` component with fallback UI showing email/phone contact
- Embedded iframe or popup widget (determine based on UX testing)
- Event type: "Initial Consultation" (30 min default, configurable)
- Required fields: name, email, phone
- Optional field: "Anything else you'd like to share?" (free text, 500 char limit)
- Confirmation emails sent by Cal.com to both practitioner and patient
- Practitioner manages availability via Google Calendar
- Lazy-loaded: Only fetches Cal.com script after user interaction with booking CTA

### SEO & Metadata Structure
```typescript
// content/metadata.ts
export const metadata = {
  en: {
    home: {
      title: "Azulita Holistics | Natural Healing & Wellness",
      description: "Professional homeopathy, reiki, and holistic healing services...",
      ogImage: "/og-images/home-en.jpg"
    },
    about: { title: "About | Azulita Holistics", ... },
    services: { title: "Services | Azulita Holistics", ... }
  },
  es: {
    home: {
      title: "Azulita Holistics | Sanación Natural y Bienestar",
      description: "Servicios profesionales de homeopatía, reiki...",
      ogImage: "/og-images/home-es.jpg"
    },
    // ... Spanish equivalents
  }
}
```

Each page uses Next.js `generateMetadata()` to pull language-specific SEO data. Includes Open Graph tags for social sharing.

### Mobile-First Responsive Design
- Breakpoints: mobile (<640px), tablet (640-1024px), desktop (>1024px)
- Hero text readable on mobile without zooming
- Navigation collapses to hamburger menu on mobile
- Cal.com booking widget adapts to screen size
- Images lazy-loaded, optimized for web

## Current Limitations

- **No content management system** - Copy changes require editing TS files and redeploying (acceptable for small site)
- **No testimonials or social proof** - Launching without patient reviews (can add later)
- **Single booking flow** - No distinction between service types (all route to same consultation)
- **No blog or resources section** - Purely informational landing site
- **Cal.com branding** - Free tier may show Cal.com logo on booking widget
- **No email capture beyond booking** - No newsletter or mailing list (could add later)
- **Static content** - No dynamic elements like appointment availability preview
- **No analytics** - Can add later if needed, deliberately omitted for simplicity

## Architecture Constraints

**Non-Negotiable:**
- Must use Next.js App Router (not Pages Router)
- Must use TypeScript (no plain JS)
- Must use CSS variables in `theme.css` for all design tokens
- Must implement `useLanguage()` hook (no prop drilling)
- Must wrap Cal.com embed in ErrorBoundary
- Must have proper TypeScript interfaces for all content structures
- Must use semantic HTML (no div soup)

**Strongly Recommended:**
- Keep components under 150 lines (extract if larger)
- No inline styles (everything through Tailwind or CSS classes)
- Content files organized by page, not by component
- One component per file
- Descriptive filenames (no `index.tsx` except for page routes)

**Flexibility Allowed:**
- Cal.com embed approach (iframe vs popup vs inline)
- Exact breakpoint values (as long as documented in theme)
- Navigation menu animation style
- Hero layout specifics (as long as mobile-first)

## Development Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel deploy
```

**Required setup:**
1. Create Cal.com account linked to practitioner's Google Calendar
2. Set up "Initial Consultation" event type in Cal.com
3. Copy Cal.com embed URL/code
4. Add to `content/shared.js` as `calComEmbedUrl`
5. Add logo and background images to `public/assets/`
6. Update domain in Vercel after deployment

**Environment variables:**
- None required for frontend-only static site
- Cal.com credentials managed separately in Cal.com dashboard

## Documentation for Non-Technical Editing

**Changing Copy:**
1. Open `content/en.ts` or `content/es.ts`
2. Find the section to edit (organized by page, clearly commented)
3. Update text in quotes - TypeScript will warn if structure is wrong
4. Save file - if you see red squiggles, ask for help (means structure mismatch)
5. Run `npm run build && vercel deploy` (or ask developer to deploy)

**Changing Colors:**
1. Open `styles/theme.css`
2. Update hex values in the `:root` section (e.g., `--color-primary: #5A9C8E`)
3. Color changes automatically apply everywhere on next deploy
4. No need to touch any other files
5. Redeploy

**Changing Spacing/Fonts:**
1. Open `styles/theme.css`
2. Update CSS variables for spacing (`--spacing-*`) or fonts (`--font-*`)
3. Changes propagate to all components automatically
4. Redeploy

**Adding New Content Section:**
1. Add to `content/en.ts` and `content/es.ts` in the appropriate page object
2. Make sure structure matches exactly between languages
3. TypeScript will error if structures don't align - this prevents broken translations
4. Update the component to use the new content via `t('page.section.key')`

**Adding a New Page:**
- Requires developer assistance (needs routing + metadata setup)

**README.md includes:**
- Content editing guide with detailed examples
- Design system overview (how theme.css works)
- TypeScript basics for non-developers ("what red squiggles mean")
- Deployment instructions
- Common troubleshooting (language toggle, booking widget, build errors)
- How to verify changes locally before deploying
- Contact info for technical support

## Testing Philosophy

**What gets tested:**
- Language toggle functionality (localStorage, route switching)
- Responsive breakpoints render correctly
- Cal.com embed loads successfully
- Navigation links work on both language routes
- Images load and display properly

**What doesn't get tested:**
- Content accuracy (client's responsibility)
- Cal.com booking flow (third-party service)
- Google Calendar sync (handled by Cal.com)

**Manual testing focus:**
- Mobile booking flow (most common use case)
- Spanish language content renders without text overflow
- Cross-browser compatibility (Chrome, Safari, Firefox mobile)

## Performance Characteristics

- **Page load time:** <2 seconds on 3G (static site, minimal JS)
- **First contentful paint:** <1 second on cable/wifi
- **Mobile-optimized:** Touch targets >44px, readable text without zoom
- **Cal.com widget:** Lazy-loads on interaction (doesn't block initial render)
- **Image optimization:** Next.js Image component for automatic webp conversion and sizing
- **SEO:** Static pages with proper meta tags (title, description, og:image)

## Open Questions / Future Considerations

- **Do we want a simple contact form as backup to Cal.com?** (In case booking widget fails or for general inquiries) - Email in footer should cover this
- **Should we add a "What to Expect" section on Services page?** (First session flow, what to bring, etc.)
- **Pricing display?** - To be determined later, not in initial launch

## Accessibility Requirements

- **WCAG AA compliance** target (sufficient for most use cases)
- Semantic HTML structure (proper heading hierarchy, nav landmarks)
- Alt text for all images (logo, backgrounds, decorative elements)
- Keyboard navigation support (tab through links, skip to content)
- Color contrast validated (navy/cream, teal/cream combinations)
- Focus indicators visible on interactive elements
- Screen reader friendly (ARIA labels where needed, especially for language toggle)

## Architectural Decision Records

**Why TypeScript over JavaScript?**
- Prevents content structure mismatches between EN/ES (catches bugs at build time)
- Makes codebase more maintainable for future developers
- VS Code autocomplete helps girlfriend edit content files
- Negligible learning curve for simple content editing

**Why CSS Variables over Tailwind config only?**
- Single source of truth for colors (`theme.css` instead of scattered config)
- Enables runtime theming if needed later
- Simpler mental model for non-technical editing ("change the hex in theme.css")
- No build step needed to preview color changes locally

**Why manual i18n routing instead of Next.js i18n?**
- Next.js i18n config incompatible with static export (Vercel requirement for free tier)
- Manual approach is explicit and debuggable
- Gives full control over language switching UX
- Simpler to explain in documentation

**Why App Router over Pages Router?**
- Modern Next.js standard (better maintained going forward)
- Built-in `generateMetadata()` for per-page SEO
- Cleaner mental model for layouts and nested routes
- Server Components by default = better performance

**Why Context + Hook for language over URL params?**
- URL is source of truth, but Context caches current language state
- Hook pattern makes language access consistent across components
- localStorage persistence happens in one place (provider)
- Easy to test in isolation

---

**Next Steps:**
1. Review and approve this PRD
2. Finalize copy for all pages (English + Spanish)
3. Gather Instagram handle (EDIT: it will be @azulitaholistics) and contact email (EDIT: it will be azulitaholistics@gmail.com) for footer
4. Set up Cal.com account and configure event type
5. Hand off to Claude Code for implementation
6. Deploy to Vercel and test on real devices
7. Domain setup and DNS configuration
