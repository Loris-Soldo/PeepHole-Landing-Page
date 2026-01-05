# PeepHole Landing Page (GitHub Pages)

This is a single-page static landing page with:
- Dark background + subtle gradient blobs
- Frosted-glass cards
- Scroll-reveal animations
- Sticky floating nav
- Tiny micro-interactions (hover + focus glow)
- A fake waitlist form (client-side only)

## Structure

- `index.html`
- `assets/css/main.css`
- `assets/js/main.js`

## GitHub Pages quick setup

1. Create a repo (or use an existing one).
2. Put these files at the repo root.
3. In GitHub: **Settings → Pages**
   - Source: `Deploy from a branch`
   - Branch: `main` (or `master`) / `/ (root)`
4. Your site will be available at the GitHub Pages URL.

## Waitlist form

Right now it only shows a toast prevent-default.
Replace the TODO in `assets/js/main.js` with your real endpoint (Formspark, ConvertKit, Beehiiv, Supabase Edge Function, etc.).
