# 🧩 Components Inventory — The Design Society Lyon

This folder contains modular, copy-paste ready frontend components extracted and reconstructed from [The Design Society Lyon](https://www.thedesignsociety.fr/).

---

## 1. CRT Monitor & Chromatic Aberration (`CRTOverlay.js` / `crt.css`)
- **Location**: `src/components/CRTOverlay.js`, `src/styles/crt.css`
- **What it does**: Full-screen retro terminal simulation with SVG RGB chromatic aberration (`#crt-chroma`), phosphor scanlines, ambient tube glare, vignette corner falloff, animated fractal grain, and inset bezel shadow.
- **Usage**:
  ```javascript
  import { initCRTOverlay } from './components/CRTOverlay.js';
  import './styles/crt.css';

  initCRTOverlay(true); // pass false to toggle off
  ```

---

## 2. Two-Step Navigation Drawer & Tracking Eye (`Navigation.js` / `nav.css`)
- **Location**: `src/components/Navigation.js`, `src/styles/nav.css`
- **What it does**: Expanding floating drawer navbar with smooth backdrop blur. Features an animated eye SVG whose iris tracks the user's cursor across the viewport with clamped radius, an animated eyelid blink cycle, and a cyberpunk text scrambler on link hover.
- **Usage**:
  ```javascript
  import { renderNavigation, initNavigation } from './components/Navigation.js';
  import './styles/nav.css';

  document.body.prepend(renderNavigation());
  initNavigation();
  ```

---

## 3. Boot Sequence Loader (`Loader.js` / `loader.css`)
- **Location**: `src/components/Loader.js`, `src/styles/loader.css`
- **What it does**: Retro terminal boot sequence with progress percentage ticker, polygon clip-path logo fill animation, and pixel transition curtains.
- **Usage**:
  ```javascript
  import { renderLoader, initLoader } from './components/Loader.js';
  import './styles/loader.css';

  document.body.appendChild(renderLoader());
  initLoader(() => console.log('Boot complete'));
  ```

---

## 4. Hero Section with Draggable Stickers & Cursor Trail (`HeroSection.js` / `hero.css`)
- **Location**: `src/components/HeroSection.js`, `src/styles/hero.css`
- **What it does**: Giant pixel eye header with interactive floating sticker cards featuring 4-point corner pixel handles. When the mouse moves, it leaves behind an ephemeral trail of decaying sticker graphics (`beer`, `taco`, `eye`).
- **Usage**:
  ```javascript
  import { renderHeroSection, initHeroInteractions } from './components/HeroSection.js';
  import './styles/hero.css';

  app.appendChild(renderHeroSection());
  initHeroInteractions();
  ```

---

## 5. Kinetic About / Manifesto (`AboutSection.js` / `about.css`)
- **Location**: `src/components/AboutSection.js`, `src/styles/about.css`
- **What it does**: Kinetic typography in large display font (`FKRasterRomanCompact`) where each word illuminates and rises as the user scrolls through the section. Includes metadata pills for legal and association details.
- **Usage**:
  ```javascript
  import { renderAboutSection, initAboutScrollAnimation } from './components/AboutSection.js';
  import './styles/about.css';

  app.appendChild(renderAboutSection());
  initAboutScrollAnimation();
  ```

---

## 6. Expandable Event Slots (`EventsSection.js` / `events.css`)
- **Location**: `src/components/EventsSection.js`, `src/styles/events.css`
- **What it does**: Multi-slot interactive event slider. The active card expands using `flex: 2.2` with cubic-bezier easing, runs an auto-progress bar (5.5s cycle), and showcases speaker portraits, date badges, and direct registration links.
- **Usage**:
  ```javascript
  import { renderEventsSection, initEventsInteractions } from './components/EventsSection.js';
  import './styles/events.css';

  app.appendChild(renderEventsSection());
  initEventsInteractions();
  ```

---

## 7. Team Showcase ("Les Saints Représentants") (`TeamSection.js` / `team.css`)
- **Location**: `src/components/TeamSection.js`, `src/styles/team.css`
- **What it does**: 5 founder cards featuring animated fluid-color SVG glyphs (`fondue-fluide` keyframe oscillating between lime green and electric blue). Hovering over any portrait smoothly swaps the photo into an 8-bit pixel art version.
- **Usage**:
  ```javascript
  import { renderTeamSection } from './components/TeamSection.js';
  import './styles/team.css';

  app.appendChild(renderTeamSection());
  ```

---

## 8. Footer & Infinite Marquee (`FooterSection.js` / `footer.css`)
- **Location**: `src/components/FooterSection.js`, `src/styles/footer.css`
- **What it does**: 3D kinetic mesh deformation text ("The Design Society") that skews and rotates in perspective based on cursor proximity. Includes floating sticker link cards, an infinite looping horizontal marquee strip, and a click-to-copy email button with toast feedback.
- **Usage**:
  ```javascript
  import { renderFooterSection, initFooterInteractions } from './components/FooterSection.js';
  import './styles/footer.css';

  app.appendChild(renderFooterSection());
  initFooterInteractions();
  ```
