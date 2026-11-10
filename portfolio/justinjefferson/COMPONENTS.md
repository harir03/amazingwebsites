# Justin Jefferson #18 — Component Architecture

This document catalogs the signature UI patterns extracted from the Justin Jefferson archive recreation for use across web applications and the Frontend Copied showcase hub.

---

## 1. Holographic 3D Trading Card (`jj-holographic-trading-card`)

A collectible 3D sports card component with cursor-tracking 3D tilt, specular glare, chromatic iridescent foil sheen, and click-to-flip telemetry inspect.

- **Use cases**: Collectibles, player stats, gaming decks, NFT displays, VIP badges, product showcases.
- **Key techniques**:
  - CSS 3D transforms (`perspective: 1400px`, `transform-style: preserve-3d`, `rotateX`, `rotateY`).
  - Specular sheen via dynamic `linear-gradient` aligned to mouse position.
  - Iridescent color-dodge overlay simulating high-grade holographic foil printing.
  - Double-sided flip card with backface culling.

---

## 2. Yardline Scrubber Rail (`jj-yardline-scrubber`)

An athletic yardline track that converts scroll progress into a football field yard indicator (`G` through `50` to `G`).

- **Use cases**: Sports journalism, longform scroll storytelling, progress indicators, timeline navigation.
- **Key techniques**:
  - CSS repeating linear gradients for football field tick marks.
  - Clamped scroll position interpolation with GPU-accelerated translate.
  - Dynamic gold highlight pulse.
