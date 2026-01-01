# Maintainer's Guide for Azulita Holistics Website

**For: Someone who's good at figuring things out but new to coding**

This guide will help you maintain the Azulita Holistics website independently. Don't worry if terms like "terminal" or "repository" are new - I'll explain everything step by step.

---

## 📚 Table of Contents

1. [What You Need to Know First](#what-you-need-to-know-first)
2. [Setting Up Your Computer (One-Time)](#setting-up-your-computer-one-time)
3. [Most Common Tasks](#most-common-tasks)
4. [Understanding How the Website Works](#understanding-how-the-website-works)
5. [Troubleshooting](#troubleshooting)
6. [Emergency Contacts & Resources](#emergency-contacts--resources)

---

## What You Need to Know First

### The Big Picture

Your website is made of:
- **Code files** that live on your computer (and on GitHub)
- **Vercel** - the service that shows your website to the world
- **GitHub** - where backup copies of everything are stored

When you make changes:
1. Edit files on your computer
2. Test them locally (on your computer only)
3. Push changes to GitHub
4. Vercel automatically updates the live website (takes ~2 minutes)

### Key Concepts (Explained Simply)

| Term | What It Means |
|------|---------------|
| **Terminal** | A window where you type commands (like a text-only control panel) |
| **npm** | A tool that runs commands for your website (like "start" or "check") |
| **Git** | Software that tracks changes to your files |
| **Repository** | The folder with all your website files |
| **Commit** | Saving a snapshot of your changes with a note about what you did |
| **Push** | Uploading your changes to GitHub (and triggering the website to update) |
| **Deploy** | The process of making your changes appear on the live website |

---

## Setting Up Your Computer (One-Time)

You'll need to do this once on any new computer.

### 1. Install Required Software

Download and install these (in this order):

1. **VSCode** (text editor for code)
   - Go to: https://code.visualstudio.com/
   - Download and install
   - This is where you'll edit files

2. **Node.js** (required to run the website locally)
   - Go to: https://nodejs.org/
   - Download the "LTS" version (the recommended one)
   - Install with default settings

3. **Git** (for saving and uploading changes)
   - Go to: https://git-scm.com/
   - Download and install
   - You might already have this on Mac

### 2. Get the Website Files

1. **Open Terminal** (or "Command Prompt" on Windows)
   - Mac: Press `Cmd + Space`, type "terminal", press Enter
   - Windows: Press `Windows Key`, type "cmd", press Enter

2. **Navigate to where you want the files**
   ```bash
   cd Documents
   mkdir Code
   cd Code
   ```

3. **Download the website files**
   ```bash
   git clone git@github.com:aadjones/azulita.git
   cd azulita
   ```

4. **Install dependencies** (this downloads needed tools)
   ```bash
   npm install
   ```
   (This takes 1-2 minutes the first time)

### 3. Test That Everything Works

```bash
npm run dev
```

You should see:
```
▲ Next.js 16.0.7
- Local:        http://localhost:3000
```

Open your browser and go to http://localhost:3000

You should see your website! Press `Ctrl + C` in the terminal to stop it.

---

## Most Common Tasks

### Task 1: Changing Website Text (Most Common!)

**What You're Editing:** All text on the website

**Files to Edit:**
- [content/en.ts](../content/en.ts) - English text
- [content/es.ts](../content/es.ts) - Spanish text

**Steps:**

1. **Open VSCode**
   ```bash
   code .
   ```
   (The dot means "open this folder")

2. **Open the file you want to edit**
   - Left sidebar: Click `content` → `en.ts` (for English)
   - Or click `es.ts` (for Spanish)

3. **Find what you want to change**
   - Use `Cmd + F` (Mac) or `Ctrl + F` (Windows) to search
   - Example: Search for "Book Your Consultation" to find the homepage button text

4. **Make your change**
   - Only change text inside `"quotes"`
   - Example:
     ```typescript
     cta: "Book Your Consultation"  // ← Change this
     ```
     becomes
     ```typescript
     cta: "Schedule Your Session"  // ← New text
     ```

5. **Save the file**
   - `Cmd + S` (Mac) or `Ctrl + S` (Windows)

6. **Test your change**
   ```bash
   npm run check
   ```
   - If you see "✓" checkmarks, you're good!
   - If you see errors, see [Troubleshooting](#troubleshooting)

7. **See it in your browser**
   ```bash
   npm run dev
   ```
   - Go to http://localhost:3000
   - Check if it looks right
   - Press `Ctrl + C` to stop when done

8. **Publish your change** (see "Publishing Changes" below)

**📖 Full details:** See [EDITING_COPY.md](./EDITING_COPY.md)

---

### Task 2: Changing Colors, Fonts, or Spacing

**What You're Editing:** The visual style of the website

**Files to Edit:**
- [styles/theme.css](../styles/theme.css) - Colors, fonts, sizes (the design system)
- [styles/globals.css](../styles/globals.css) - Specific component styles

**Common Changes:**

**Change the main purple color:**
```css
/* In styles/theme.css */
--purple: #8b5cf6;  /* ← Change this hex code */
```

**Change the heading font size:**
```css
/* In styles/theme.css */
--text-4xl: 3.5rem;  /* ← Make bigger or smaller */
```

**📖 Full details:** See [EDITING_STYLES.md](./EDITING_STYLES.md)

---

### Task 3: Publishing Changes to the Live Website

**When:** After you've made changes and tested them locally

**Steps:**

1. **Check what you changed**
   ```bash
   git status
   ```
   You'll see a list of files you modified

2. **Save all your changes**
   ```bash
   git add .
   ```
   (The dot means "add everything I changed")

3. **Create a commit** (a snapshot with a note)
   ```bash
   git commit -m "Update homepage button text"
   ```
   Replace the text in quotes with a short description of what you did

4. **Upload to GitHub**
   ```bash
   git push
   ```

5. **Wait ~2 minutes**
   - Vercel will automatically detect the change
   - It will rebuild and deploy your website
   - You'll get an email when it's done (if notifications are set up)

6. **Check the live site**
   - Go to your actual website URL
   - Refresh the page (`Cmd + R` or `Ctrl + R`)
   - You should see your changes!

---

### Task 4: Adding a New Service

**Steps:**

1. **Open the content file**
   - English: [content/en.ts](../content/en.ts)
   - Spanish: [content/es.ts](../content/es.ts)

2. **Find the services section**
   - Search for `services: [`
   - You'll see a list of services like:
     ```typescript
     services: [
       {
         title: "Homeopathy",
         description: "Gentle, natural remedies...",
         details: [...]
       },
       // More services...
     ]
     ```

3. **Copy an existing service and modify it**
   - Copy everything from `{` to `}` (one complete service)
   - Paste it after the last service
   - Add a comma after the previous service
   - Change the title, description, and details

4. **Do the same in BOTH language files**
   - English and Spanish must have the same structure
   - Just translate the text content

5. **Test and publish** (follow the steps above)

---

### Task 5: Updating Your Email or Social Media Links

**Files:** [content/en.ts](../content/en.ts) and [content/es.ts](../content/es.ts)

**Steps:**

1. **Search for "footer"**
   ```typescript
   footer: {
     contact: {
       email: "azulitaholistics@gmail.com",  // ← Change this
       instagram: "@azulitaholistics"         // ← Change this
     }
   }
   ```

2. **Change in both files** (English and Spanish)

3. **Test and publish**

---

## Understanding How the Website Works

### Folder Structure

```
azulita/
├── app/              ← Pages of your website
│   ├── page.tsx      ← Homepage (English)
│   ├── about/        ← About page
│   ├── services/     ← Services page
│   └── es/           ← Spanish versions of all pages
│
├── components/       ← Reusable pieces (like navigation bar, footer)
│   ├── Hero.tsx
│   ├── Navigation.tsx
│   └── ...
│
├── content/          ← ALL THE TEXT on your website ⭐
│   ├── en.ts         ← English text
│   └── es.ts         ← Spanish text
│
├── styles/           ← Visual styling
│   ├── theme.css     ← Colors, fonts, spacing (design tokens)
│   └── globals.css   ← Component styles
│
├── public/           ← Images and files
│   ├── logo.svg
│   └── og-image.jpg
│
├── docs/             ← Guides (like this one!)
└── package.json      ← Project settings and scripts
```

### What You'll Edit Most Often

**95% of the time:** [content/en.ts](../content/en.ts) and [content/es.ts](../content/es.ts)

**4% of the time:** [styles/theme.css](../styles/theme.css)

**1% of the time:** Everything else (ask for help first!)

---

## Troubleshooting

### "npm: command not found"

**Problem:** Node.js isn't installed or terminal can't find it

**Fix:**
1. Install Node.js from https://nodejs.org/
2. Close and reopen your terminal
3. Try again

---

### "Permission denied" or "Access denied"

**Problem:** Git needs authentication to push to GitHub

**Fix:**
1. You need to set up SSH keys or use a personal access token
2. Ask for help with this - it's a one-time setup
3. Or: Use GitHub Desktop instead (easier for beginners)

**Using GitHub Desktop (Easier Alternative):**
1. Download from https://desktop.github.com/
2. Sign in to GitHub
3. Open your repository
4. Make changes in VSCode
5. Use GitHub Desktop to commit and push (visual interface)

---

### TypeScript Errors When Running `npm run check`

**Example Error:**
```
Type 'string' is not assignable to type 'number'
```

**Common Causes:**
- Missing comma or quote
- Extra or missing bracket `{`, `}`, `[`, `]`
- English and Spanish files have different structures

**Fix:**
1. Read the error message - it tells you the line number
2. Go to that line in VSCode
3. Look for:
   - Missing commas between items
   - Unclosed quotes `"`
   - Mismatched brackets
4. Compare with the other language file - they should look similar

---

### Website Shows Old Content After Pushing

**Problem:** Vercel hasn't deployed yet, or your browser is cached

**Fix:**
1. Wait 2-3 minutes for Vercel to deploy
2. Hard refresh your browser:
   - Mac: `Cmd + Shift + R`
   - Windows: `Ctrl + Shift + R`
3. Check Vercel dashboard to see deployment status

---

### "Port 3000 is already in use"

**Problem:** The development server is already running somewhere

**Fix:**
```bash
npm run dev:clean
```
This kills whatever's on port 3000 and starts fresh.

---

### Can't Find a File

**Problem:** You're lost in the folder structure

**Fix:**
- Use VSCode's search: `Cmd + P` (Mac) or `Ctrl + P` (Windows)
- Type the filename you're looking for
- Press Enter to open it

---

### Accidentally Broke Something

**Problem:** You made changes and now things are broken

**Fix 1: Undo Recent Changes**
```bash
git status                    # See what you changed
git checkout -- filename.ts   # Undo changes to one file
git checkout -- .             # Undo ALL changes (careful!)
```

**Fix 2: Go Back to Last Working Version**
```bash
git log                       # See recent commits
git reset --hard abc123       # Go back to commit "abc123"
```
(Replace `abc123` with the actual commit ID from `git log`)

**Fix 3: Ask for Help**
- Nothing is permanently broken if it's committed to Git!
- Reach out and we can recover any version

---

## Emergency Contacts & Resources

### When Something Breaks

**1. Check the error message carefully**
- Most errors tell you exactly what's wrong and where
- Search the error message online - someone else has had this problem!

**2. Use the built-in checker**
```bash
npm run check
```
This catches most common mistakes.

**3. Check Recent Changes**
```bash
git status        # What files did I change?
git diff          # What exactly did I change?
```

### Useful Resources

**Learning Git & Terminal:**
- [GitHub's Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Command Line Crash Course](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line)

**VSCode Tips:**
- [VSCode Basics](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)
- Use `Cmd + Shift + P` (Mac) or `Ctrl + Shift + P` (Windows) to open command palette

**This Project's Docs:**
- [How to Edit Copy](./EDITING_COPY.md) - Detailed guide to changing text
- [How to Edit Styles](./EDITING_STYLES.md) - Detailed guide to visual changes
- [Architecture Guide](./ARCHITECTURE.md) - How everything works (technical)

### Quick Reference: Terminal Commands

| Command | What It Does |
|---------|--------------|
| `cd azulita` | Go into the azulita folder |
| `code .` | Open current folder in VSCode |
| `npm run dev` | Start local development server |
| `npm run check` | Check for errors |
| `git status` | See what files you changed |
| `git add .` | Stage all your changes |
| `git commit -m "message"` | Save a snapshot of changes |
| `git push` | Upload changes to GitHub |
| `git log` | See history of changes |
| `ls` | List files in current folder |
| `pwd` | Show current folder path |
| `Ctrl + C` | Stop a running command |

---

## Confidence Builders

### Things You Can't Permanently Break

- **Content files** - You can always undo changes with Git
- **Styles** - Worst case, it looks weird temporarily
- **Your local copy** - The live site won't change until you push

### Things That Are Protected

- **The live website** - Only changes when you push to GitHub
- **Past versions** - Git saves everything, you can always go back
- **The structure** - TypeScript will yell at you before you break it

### You're Doing Great If...

✅ You can start the local server (`npm run dev`)
✅ You can find and edit text in content files
✅ You can run `npm run check` without errors
✅ You can commit and push changes

Everything else is just practice!

---

## Your First Solo Edit Checklist

Try this to build confidence:

- [ ] Open terminal
- [ ] Navigate to the project: `cd Documents/Code/azulita`
- [ ] Start the server: `npm run dev`
- [ ] Open VSCode: `code .`
- [ ] Open `content/en.ts`
- [ ] Find the homepage hero title
- [ ] Change it to something silly (just to test)
- [ ] Save the file
- [ ] Refresh your browser at http://localhost:3000
- [ ] See your change!
- [ ] Change it back
- [ ] Run: `npm run check`
- [ ] Commit: `git add . && git commit -m "Test edit"`
- [ ] Push: `git push`
- [ ] Wait 2 minutes
- [ ] Check the live site

**Congratulations!** You just did a full development cycle. Everything else is variations of this.

---

## Remember

- **Read error messages** - they're trying to help you
- **Test locally first** - `npm run dev` before pushing
- **Commit often** - small changes are easier to undo
- **Don't be afraid** - nothing is permanently broken
- **Google is your friend** - copy/paste error messages into search
- **You've got this!** 💪

---

*Last updated: December 2024*
