# How to Edit Visual Styles

Visual styles are controlled from **two files**:

- `styles/theme.css` - Design tokens (colors, fonts, spacing)
- `styles/globals.css` - Component styles (buttons, cards, headings)

**For most edits**, you'll use `theme.css` to change colors, fonts, and spacing. These changes automatically update everywhere on the site.

## Quick Guide

1. **Open the file**: `styles/theme.css`
2. **Find what you want to change**: Colors, spacing, fonts, etc.
3. **Update the value**: Change the hex code, size, or font name
4. **Save the file**
5. **Refresh your browser**: Changes appear instantly in dev mode

## Changing Colors

All colors are at the top of `styles/theme.css`:

```css
:root {
  /* Main brand colors */
  --color-primary: #5A9C8E;           /* Main teal/green color */
  --color-primary-light: #7FBFB2;     /* Lighter version (for hover states) */
  --color-secondary: #2C4A5A;         /* Dark blue/gray */
  --color-neutral: #E8E4DC;           /* Light beige */
  --color-neutral-light: #F5F3EE;     /* Very light beige (backgrounds) */
  --color-accent: #89CFF0;            /* Light blue accent */

  /* Page colors */
  --color-background: #FFFFFF;        /* Page background (white) */
  --color-foreground: #2C4A5A;        /* Main text color */
}
```

### Example: Change the Main Brand Color

Find this line:
```css
--color-primary: #5A9C8E;
```

Change the hex code to your new color:
```css
--color-primary: #8B5A9C;  /* Now it's purple! */
```

**This changes:**
- Button colors
- Headings
- Navigation highlights
- Links

### Finding Color Codes

Use a color picker tool:
- [Google Color Picker](https://g.co/kgs/7YqKzE)
- [Coolors.co](https://coolors.co/)
- Or just search "color picker" in Google

Copy the hex code (starts with `#`) and paste it in.

## Changing Spacing

```css
/* Space between sections */
--spacing-section: 4rem;     /* Default: 4rem (64px) */

/* Padding inside cards */
--spacing-card: 1.5rem;      /* Default: 1.5rem (24px) */

/* Other spacing */
--spacing-xs: 0.5rem;        /* Extra small */
--spacing-sm: 1rem;          /* Small */
--spacing-md: 1.5rem;        /* Medium */
--spacing-lg: 2rem;          /* Large */
--spacing-xl: 3rem;          /* Extra large */
```

### Example: Make Sections More Spacious

```css
--spacing-section: 6rem;  /* Increased from 4rem */
```

## Changing Fonts

```css
/* Headings font */
--font-heading: 'Inter', -apple-system, sans-serif;

/* Body text font */
--font-body: 'Inter', -apple-system, sans-serif;
```

### Example: Use a Different Font

To use Google Fonts:

1. Go to [Google Fonts](https://fonts.google.com/)
2. Choose a font (e.g., "Playfair Display")
3. Get the import code
4. Add it to the top of `styles/theme.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');
```

5. Update the font variable:

```css
--font-heading: 'Playfair Display', serif;
```

## Changing Font Sizes

```css
/* Font sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

These aren't used directly in the current site, but you can reference them if needed.

## Changing Shadows

```css
/* Shadow effects */
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);      /* Subtle */
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);      /* Medium */
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);    /* Strong */
```

### Example: Make Cards Have Stronger Shadows

The card shadow is defined in `styles/globals.css`. Find this line:

```css
.card-feature {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);  /* Change this */
}
```

Change it to use a theme variable:

```css
.card-feature {
  box-shadow: var(--shadow-lg);  /* Now using the strong shadow */
}
```

## Changing Border Radius (Roundness)

```css
/* How rounded corners are */
--radius-sm: 0.375rem;   /* Slightly rounded */
--radius-md: 0.5rem;     /* Medium rounded */
--radius-lg: 0.75rem;    /* More rounded */
--radius-xl: 1rem;       /* Very rounded */
```

Used on buttons, cards, and other elements.

## Common Customizations

### Make Everything More Colorful

```css
--color-primary: #FF6B6B;        /* Coral red */
--color-accent: #4ECDC4;         /* Turquoise */
--color-secondary: #45B7D1;      /* Sky blue */
```

### Make It More Minimal/Clean

```css
--color-primary: #000000;        /* Black */
--color-secondary: #666666;      /* Gray */
--color-neutral: #F5F5F5;        /* Light gray */
--spacing-section: 6rem;         /* More whitespace */
```

### Make It Warmer/Earthier

```css
--color-primary: #D4A574;        /* Warm tan */
--color-secondary: #8B6F47;      /* Brown */
--color-neutral: #F5EFE7;        /* Cream */
--color-accent: #C9ADA7;         /* Dusty rose */
```

## Testing Your Changes

When running `npm run dev`, changes to `theme.css` usually show up immediately when you save the file. Just refresh your browser.

If changes don't appear:
1. Hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
2. Stop and restart the dev server

## Important Notes

- **Hex codes** always start with `#` followed by 6 characters (e.g., `#5A9C8E`)
- **rem units**: 1rem = 16px by default
- **Changes apply everywhere**: One color change updates buttons, headings, etc. automatically
- **Can't break anything**: Worst case, colors look weird. Just undo your changes!

## Advanced: Editing Component Styles

Most visual changes happen in `theme.css`, but if you want to change how specific components look (like buttons or cards), edit `styles/globals.css`.

This file contains semantic CSS classes:

```css
/* Button styles */
.btn-primary {
  background-color: var(--color-primary);
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  /* ... */
}

/* Hero section styles */
.hero-section {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  padding: 4rem 0;
  /* ... */
}
```

**Tip**: These classes use variables from `theme.css`, so changing a color in `theme.css` automatically updates all components that use it!

## Need Help?

If something looks broken:
1. Check that you didn't delete a semicolon (`;`)
2. Make sure hex codes start with `#` and have 6 characters
3. Undo your changes and try again
4. Ask for help if stuck!

---

**Remember**: Experiment! You can always undo changes. The design system makes it safe to try different colors and spacing.
