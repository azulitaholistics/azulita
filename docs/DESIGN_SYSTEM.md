# Design System Documentation

## File Organization

Styles are now organized into focused files for easier maintenance:

```
styles/
├── globals.css        # Main entry point (imports only)
├── theme.css          # Design tokens (colors, spacing, etc.)
├── base.css           # Base HTML elements (body, headings)
├── components.css     # Reusable components (buttons, cards, CTAs)
├── pages.css          # Page layouts (hero, headers, sections)
└── utilities.css      # Utility classes
```

**To add new styles:**

- Buttons/Cards/CTAs → `components.css`
- Page-specific layouts → `pages.css`
- Base HTML styling → `base.css`

This organization means:

- ✅ Find button styles instantly in `components.css`
- ✅ No more hunting through 450+ line files
- ✅ Easy to onboard new developers
- ✅ Clear separation of concerns

## Component Classes for CTAs

To maintain consistent styling across the site, use these semantic class names instead of inline Tailwind utilities.

### Primary CTA Group

Use when you want to tightly couple text with a call-to-action button (e.g., "Free consultation" + "Book Now")

```html
<div class="cta-group-primary text-center">
  <p class="cta-text">Schedule your free initial consultation (20 min)</p>
  <a href="..." class="btn-primary-enhanced">BOOK YOUR CONSULTATION</a>
</div>
```

**Styling:**

- Tight spacing (0.75rem gap) between text and button
- Bottom margin: 3rem (mobile), 4rem (desktop)

### Secondary CTA Group

Use for lower-priority CTAs that appear later on the page

```html
<div class="cta-group-secondary text-center">
  <p class="cta-text-secondary">Let's talk to determine how I can help you.</p>
  <a href="..." class="btn-primary-enhanced">BOOK YOUR CONSULTATION</a>
</div>
```

**Styling:**

- Looser spacing (1rem gap) between text and button
- Top border separator for visual distinction
- Top margin: 4rem (mobile), 5rem (desktop)

### Buttons

#### `.btn-primary-enhanced`

Enhanced primary button with shadow effects

```html
<a href="..." class="btn-primary-enhanced">Click Me</a>
```

**Styling:**

- Larger padding (1rem vertical, 2rem horizontal)
- Font weight: 600
- Shadow on normal state, larger shadow on hover
- Responsive font size: 1rem → 1.125rem

#### `.btn-secondary`

Outlined button for secondary actions

```html
<a href="..." class="btn-secondary">Learn More</a>
```

### Text Styles

#### `.cta-text`

Primary CTA descriptive text (darker, medium weight)

#### `.cta-text-secondary`

Secondary CTA descriptive text (lighter)

### Page Headers

#### `.page-header-compact`

Compact page header with gradient background

```html
<section class="page-header-compact">
  <div class="container-custom">
    <h1 class="page-title">Services</h1>
    <p class="page-subtitle">Pricing for services is adjustable...</p>
  </div>
</section>
```

**Styling:**

- Gradient background
- Padding: 3rem top, 2rem bottom (mobile)
- Padding: 4rem top, 3rem bottom (desktop)

## Maintenance Guidelines

### To change CTA button styling site-wide:

Edit `.btn-primary-enhanced` in `/styles/components.css`

### To adjust spacing between CTA text and buttons:

Edit `.cta-group-primary` gap property in `/styles/components.css`

### To change CTA text color/size:

Edit `.cta-text` or `.cta-text-secondary` in `/styles/components.css`

### To modify page headers or hero sections:

Edit classes in `/styles/pages.css`

## Files Using These Classes

- `/components/Hero.tsx` - Homepage hero section
- `/components/ServicesPage.tsx` - Services page
- `/components/AboutPage.tsx` - About page

## Design Principles

1. **Tight coupling**: Related elements (text + button) use small gaps (0.75rem)
2. **Clear separation**: Different sections use generous margins (3-5rem)
3. **Semantic naming**: Class names describe purpose, not appearance
4. **Single source of truth**: One place to edit styling = easier maintenance
