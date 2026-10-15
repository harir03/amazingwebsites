# 🧩 Heron AI — Reusable Components Directory

This document details the modular components extracted from the Heron AI website for reuse in CAD, BIM, engineering, and AI tool landing pages.

---

### 1. `Header`
- **Class**: `.header`
- **Purpose**: Fixed drafting navigation bar with technical borders and isometric 3D cube logo.
- **Interactions**: Active route indicator, hover pill highlight, mobile responsive hamburger.

### 2. `HeroSection`
- **Class**: `.home-hero`
- **Purpose**: Centerpiece architectural drawing with interactive drafting crosshair lines.
- **Motion**: Crosshair lines track cursor with subtle damping; ruler tick marks adjust dynamically.

### 3. `IntroSection`
- **Class**: `.home-intro`
- **Purpose**: High-contrast brutalist tower graphic with orange sun and logo marquee.
- **Motion**: Swiper auto-scroll partner logo marquee with manual navigation arrows.

### 4. `ProblemSection`
- **Class**: `.home-problem`
- **Purpose**: 4-column isometric wireframe comparison grid.
- **Motion**: Hovering over cards triggers SVG `stroke-dashoffset` wireframe line drawing and color inversion.

### 5. `MapSection`
- **Class**: `.home-map`
- **Purpose**: Numbered interactive CAD model scan visualization.
- **Motion**: Sequential line-by-line path reveal synchronized with scroll position.

### 6. `PlatformSection`
- **Class**: `.home-platform`
- **Purpose**: Horizontal card pin and scrub (*"RIGHT THERE WITH YOU"*).
- **Motion**: GSAP ScrollTrigger pinning the section while viewport scrubs horizontally across tool views.

### 7. `WhySection`
- **Class**: `.home-why`
- **Purpose**: 3D perspective stacked card reveals (*"BUILT TO WORK THE WAY YOU DO"*).
- **Motion**: Stacked card scale and opacity transitions as user scrolls.

### 8. `UseCaseSection`
- **Class**: `.home-usecase`
- **Purpose**: Discipline tabs for Architects, Engineers, Interior Designers, BIM Managers.
- **Motion**: Instant image cross-fade and accordion expansion.

### 9. `CTASection`
- **Class**: `.cta`
- **Purpose**: High-impact closing banner with architectural sketch preview.
- **Motion**: Subtle parallax shift on sketch lines upon mouse movement.

### 10. `Footer`
- **Class**: `.footer`
- **Purpose**: Technical directory with drafting grid line separators.
