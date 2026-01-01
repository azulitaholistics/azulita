# How to Edit Website Copy

All the text on the website lives in **two files**:

- `content/en.ts` - All English text
- `content/es.ts` - All Spanish text

## Quick Guide

1. **Find the file**: Open `content/en.ts` for English OR `content/es.ts` for Spanish
2. **Find the section**: Text is organized by page (home, about, services, etc.)
3. **Edit the text**: Change anything inside the `"quotes"`
4. **Save the file**
5. **Check it works**: Run `npm run check` in your terminal
6. **Deploy**: Commit and push to update the live site

## Where to Find Text

The content files are organized like this:

```typescript
{
  nav: { ... },           // Navigation menu
  home: { ... },          // Homepage text
  about: { ... },         // About page text
  services: { ... },      // Services page text
  footer: { ... }         // Footer text
}
```

## Example: Changing the Homepage Title

### English (content/en.ts)

```typescript
home: {
  hero: {
    title: "Welcome to Azulita Holistics",  // ← Change this
    subtitle: "Natural healing through...",
    cta: "Book Your Consultation"
  }
}
```

### Spanish (content/es.ts)

```typescript
home: {
  hero: {
    title: "Bienvenido a Azulita Holistics",  // ← Change this
    subtitle: "Sanación natural a través...",
    cta: "Reserva Tu Consulta"
  }
}
```

## Important Rules

### ✅ DO:
- Change any text inside `"quotes"`
- Add or remove items from lists (like services)
- Add new paragraphs to existing arrays

### ❌ DON'T:
- Change the structure (the words outside quotes like `home:`, `hero:`, etc.)
- Delete entire sections without understanding the structure
- Make the English and Spanish files have different structures

## Common Edits

### Change a Heading

```typescript
about: {
  title: "About Azulita Holistics",  // ← Edit this
  subtitle: "Compassionate care..."   // ← Or this
}
```

### Change a Paragraph

```typescript
bio: [
  "Welcome! I'm dedicated to...",  // ← First paragraph
  "With years of experience...",   // ← Second paragraph
  "Every individual is unique..."  // ← Third paragraph
]
```

### Change Service Details

```typescript
services: [
  {
    title: "Homeopathy",
    description: "Gentle, natural remedies...",
    details: [
      "Initial consultation (90 minutes)",    // ← Edit these
      "Follow-up sessions (60 minutes)",
      "Personalized remedy recommendations",
      "Ongoing support and adjustments"
    ]
  }
]
```

### Change Footer Contact Info

```typescript
footer: {
  contact: {
    title: "Get in Touch",
    email: "azulitaholistics@gmail.com",     // ← Update email
    instagram: "@azulitaholistics"            // ← Update Instagram
  }
}
```

## Checking Your Changes

After editing, run this in your terminal:

```bash
npm run check
```

If you see errors, it usually means:
- Missing a comma or quote
- English and Spanish structures don't match
- Typo in the structure names

## Testing Locally

To see your changes:

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Need Help?

If something breaks or you're unsure:
1. Check the other language file - they should look similar
2. Make sure all quotes are closed properly
3. Run `npm run check` to see specific errors
4. Ask for help if stuck!

---

**Remember**: You can only break the text content, not the whole site. The worst that happens is a build error, which is easy to fix.
