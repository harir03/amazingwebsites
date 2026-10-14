# The Design Society Lyon — Web Recreation

**Original**: [https://www.thedesignsociety.fr/](https://www.thedesignsociety.fr/)  
**Category**: Portfolio / Design Collective  
**Tech Stack**: HTML5, Vanilla CSS, JavaScript, GSAP 3.12, Lenis Smooth Scroll  
**Design Aesthetics**: Retro-futuristic Cyberpunk, CRT Monitor Simulation, Chromatic Aberration, Pixelated Typography, Neo-grotesque Sans, Glitch Aesthetics, Electric Blue `#350AFF` & Lime Green `#BCF015`.

---

## 🎨 Overview

An open-source, component-by-component faithful recreation of **The Design Society Lyon** website — a secret society / creative collective of designers based in Lyon, France. Features custom pixel raster typography, kinetic scroll-driven typography, CRT scanlines/chromatic aberration shaders, interactive cursor-following eye graphic, and pixelated card hover reveals.

## 🚀 Features & Components

- **CRT Monitor Overlay**: Complete retro display filter with scanlines, SVG chromatic aberration (`#crt-chroma`), screen glare, vignette, bezel shadow, and animated noise grain.
- **Two-Step Nav Drawer**: Expanding drawer menu with animated blinking eye whose pupil follows the mouse pointer, scramble-text hover links, and social badges.
- **Boot Loader Sequence**: Loading bar animation with pixel transition curtains and logo filling animation.
- **Hero Section (`mwg020`)**: Giant pixelated eye graphic, floating sticker cards with corner handle grabbers, interactive cursor image trail.
- **Kinetic About / Manifesto (`mwg005`)**: Scroll-driven word-by-word horizontal translation and marker reveals.
- **Interactive Event Slots (`section-6`)**: Stacked talk cards with live progress bars, speaker details (Hugo Douchet, Julien, Salomé), and category tags.
- **Team Showcase ("Les saints représentants") (`mwg008`)**: Interactive cards with fluid color-changing pixel glyphs (`fondue-fluide`) and hover-activated pixelated photo reveals.
- **Footer with 3D Text Deformation**: Warped mesh typography, floating interactive sticker links, and an infinite looping marquee ticker.

## 🛠️ Getting Started

```bash
# Navigate to this directory
cd portfolio/thedesignsociety

# Install dependencies
npm install

# Run Vite development server
npm run dev
```

Visit `http://localhost:5173` to explore the live recreation.

## 📂 Component Index

See [COMPONENTS.md](COMPONENTS.md) for detailed breakdown and code snippets of each reusable component.

## ⚖️ License & Disclaimer

MIT License. Educational recreation for frontend study. All original trademarks and designs belong to The Design Society Lyon.
