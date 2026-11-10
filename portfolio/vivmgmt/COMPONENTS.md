# ViV MGMT — Component Architecture

This document catalogs the signature UI patterns extracted from the ViV Management recreation for use across web applications and the Frontend Copied showcase hub.

---

## 1. Staggered Chromatic Artist Gallery (`viv-artist-roster-marquee`)

A minimalist photographic gallery grid with staggered column offsets, smooth B&W to full-color bloom on hover, and custom cursor tagging.

- **Use cases**: Artist portfolios, photography agencies, fashion lookbooks, model management, luxury design studios.
- **Key techniques**:
  - CSS grayscale filter transitions with Quentin easing (`cubic-bezier(0.23, 1, 0.32, 1)`).
  - Staggered translation offsets (`sm:translate-y-12`, `sm:translate-y-6`).
  - Active category filtering without layout jumps.

---

## 2. Minimalist Monolith Agency Hero (`viv-editorial-strapline-hero`)

A high-fashion agency hero featuring oversized editorial serif typography, live multi-city studio clocks (NYC, LDN, LA), and architectural hairline borders.

- **Use cases**: Creative studios, architectural firms, boutique agencies, production houses.
- **Key techniques**:
  - High-fashion serif typography (`Cormorant Garamond`).
  - Real-time `Intl.DateTimeFormat` timezone clocks.
  - Hairline border geometry.
