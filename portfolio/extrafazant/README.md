# Extrafazant — Social Content, Video's & Animatie

A high-fidelity recreation of the award-winning official website for [Extrafazant](https://www.extrafazant.nl/), an energetic Dutch creative production studio and animation agency creating high-impact social content, 2D/3D motion graphics, brand films, and kinetic digital experiences.

## 🚀 Live Demo & Development

- **Live Reference**: [https://www.extrafazant.nl/](https://www.extrafazant.nl/)
- **Local Dev Server**: http://localhost:3008/

### Running Locally

```bash
cd portfolio/extrafazant
npm install
npm run dev
```

## 🎨 Creative & Engineering Highlights

1. **Custom Cursor with Marquee Ticker (`[data-cursor-marquee-status]`)**:
   - Smooth lerp cursor tracking with `gsap.quickTo`.
   - Dynamic expand into a capsule marquee badge displaying `"Bekijk case →"` when hovering interactive case studies.

2. **Hero Mouse-Tracking Preview Cards (`[data-cursor-cards]`)**:
   - Floating media card that tracks cursor velocity with responsive rotation tilts (`power4` ease).
   - Dynamically swaps case studies (Odido, Willem II, P. van der Niet, Fontys) based on cumulative cursor travel distance.

3. **Interactive Collage (`[data-interactive-collage]`)**:
   - Overlapping editorial cards with multi-plane parallax and momentum repulsion when mouse enters proximity.

4. **3D Pinned Featured Stack Deck (`[data-featured-stack]`)**:
   - Perspective 3D layered card deck with continuous rotating sticker badge.
   - Smooth z-depth layering (`translateZ(0px)`, `-80px`, `-160px`) and interactive deck peeling transitions.

5. **Momentum Inertia Team Cards (`[data-momentum-hover]`)**:
   - Mouse entry velocity detection with rotational torque and spring-back inertia physics (`elastic.out`).

6. **Lenis + GSAP Motion Sync**:
   - Butter-smooth scrolling with `lenis@1.1.18` and `ScrollTrigger` tick alignment.

