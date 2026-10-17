# Frontend Copied Hub

A showcase for the recreations in this repo: browse the 7 sites by aesthetic, open any of the 23 extracted components, and copy it as React + Tailwind, plain HTML, or a ready-to-run prompt for an AI coding agent.

```bash
cd showcase
npm install
npm run dev      # http://localhost:5000
npm run build    # type-check + production build
npm run lint
```

## What's in it

The layout borrows from two references: Aceternity UI's components docs (a sidebar listing every page, one page per component) and Refero Styles (a search-first home, live work set in soft grey trays, and a split detail page with a sticky panel for everything you copy).

- **Overview** (`/`): search by name, effect or engine, with suggested searches underneath. Below it, a gallery with **Components** and **Sites** tabs and category filters. Every card is the real component running.
- **Component pages** (`/components/<id>`):
  - **Left side**: a preview stage (Desktop / Tablet / Mobile, React or HTML source, restart, autoplay, dark stage, mute, open the HTML in a new tab). Then the component's motion: the plotted curve, a race of linear against the curve that plays once when you scroll to it, the timing breakdown and copyable easing snippets. Then colours, typography, materials and more from the same site.
  - **Right side**: a sticky panel with **AI prompt** (optionally with the React or HTML code attached), **React**, **HTML** and **CSS variables**. Each can be copied or downloaded.
- **Site pages** (`/sites/<id>`): poster (signature component or the running local recreation), description, stack, palette, whole-site stack prompt, and the site's components.
- **Easing curves** (`/easing-curves`): every measured curve on one plot, each drawing in with its own timing. Point at a line to see which components use it.
- **Prompt standard** (`/prompt-standard`): the five-section template every prompt follows.
- **Search**: `Ctrl/⌘ K` or `/` opens a palette over components and sites from any page.
- **Motion**: each animation responds to something you did.
  - The card you click grows into the next page's preview, and shrinks back on Back (View Transitions API; other browsers get a plain page change).
  - Tab, filter and sidebar markers slide to the new selection.
  - The grid reflows as you filter.
  - Hovering a card runs a dot along its easing curve.
  - Reduced-motion settings turn these off.

## How it's put together

```
src/
  library/<component-id>/
    index.tsx      # live preview AND the React snippet (same file)
    vanilla.html   # HTML snippet AND the iframe preview
  library/registry.ts   # discovers components + raw sources via import.meta.glob
  data/sites/*.ts       # one file per site: specs, tokens, prompt fields
  data/prompt.ts        # the prompt template every component uses
  components/           # hub UI (cards, sidebar, preview stage, source panel, palette)
  pages/                # Home, Component, Site, Easing curves, Prompt standard
  lib/router.ts         # small History API router with view transitions
```

The code people copy is exactly the code running in the preview, and `npm run build` type-checks every snippet.

### Adding a component

1. Create `src/library/<site>-<name>/index.tsx` (default-export one self-contained component; only `react` imports; fill its parent; accept optional `loop` / `muted` props if relevant).
2. Add `vanilla.html` next to it: a complete standalone page.
3. Add an entry with `defineComponent(...)` to the site's file in `src/data/sites/`.

## Notes

- Hub look: white pages, soft grey trays (`tray` #F3F4F1) holding the live work, ballpoint-blue ink (`ink` #1B2742) for text and actions, Archivo with its width axis (`type-display` = condensed) and Fragment Mono for code only. Each theme has a "pen" colour in `data/themes.ts`, used for the curve tiles and plot lines. Tokens live in `src/index.css`; the components keep their own colours.
- Pages are real paths. `vite dev` and `vite preview` serve them; a static host needs a fallback that serves `index.html` for unknown paths (for example a `_redirects` or `404.html` copy). Old `?c=<id>` and `?site=<id>` links redirect to the new pages.
- Easing curves and timings were read from each recreation's source (CSS, keyframes, GSAP CustomEase paths). Where the original drives motion with physics, the spec lists the spring constants instead.
- Original proprietary fonts are replaced with open-source Google Fonts stand-ins; the original names are kept as fallbacks in each stack.
- The site cards probe each local dev server. Ports: Design Society 5173, Heron 3000, Hello Monday 3001, Alan Menken 3002, Don't Look Up 3003, Emotion 3004. Recursive has no fixed port, so it's listed at 5174 (Vite's next free port when Design Society holds 5173).
- Browsers log a failed request for each recreation that isn't running; that's the status probe, not an error.
