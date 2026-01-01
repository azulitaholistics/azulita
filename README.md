# Azulita Holistics

A bilingual (English/Spanish) website for a holistic healing practice.

## Documentation

📝 **[How to Edit Website Copy](./docs/EDITING_COPY.md)** - Change text on any page

🎨 **[How to Edit Visual Styles](./docs/EDITING_STYLES.md)** - Change colors, fonts, spacing

🏠 **[Architecture Guide](./docs/ARCHITECTURE.md)** - Understand how the website works

## Quick Start

```bash
npm install         # Install dependencies
npm run dev         # Start development server
npm run dev:clean   # Kill port 3000 and start fresh
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- Next.js 16 with React 19
- TypeScript
- Tailwind CSS v4
- Deployed on Vercel

## Features

- 🌐 Bilingual support (English/Spanish) with instant language switching
- ♿ Full accessibility (WCAG AA/AAA compliant)
- 🔍 SEO optimized for traditional and AI search engines
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Lightning fast (872KB bundle, static pre-rendering)

## Project Structure

```
azulita/
├── app/              # Pages (English and Spanish)
├── components/       # Reusable UI components (Hero, Navigation, etc.)
├── content/          # All website text
│   ├── en.ts        # English content
│   └── es.ts        # Spanish content
├── lib/
│   ├── i18n/        # Language switching system
│   └── metadata.ts  # SEO and social media metadata
└── styles/
    ├── theme.css    # Colors, fonts, spacing (design tokens)
    └── globals.css  # Component styles and CSS classes
```

## Deployment

Pushes to `main` automatically deploy to Vercel.

---

Built with Next.js, React, TypeScript, and Tailwind CSS.
