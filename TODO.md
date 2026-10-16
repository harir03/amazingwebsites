# 🗺️ Master Roadmap & Component Showcase Platform (TODO)

An interactive showcase platform and component catalog built on top of `frontend_copied`—inspired by React Bits, Aceternity UI, and 21st.dev—designed to let developers browse faithfully recreated websites by design theme, inspect live components, copy production-grade code, and export tailored prompts for AI agents.

---

## 🎯 Platform Vision

Unlike component libraries that show isolated buttons or cards in a void, this platform presents:
1. **Full High-Fidelity Website Recreations**: Live, interactive embeds of complete websites categorized by design aesthetic.
2. **Atomic Component Decomposition**: Every website is broken down into its distinct, reusable architectural blocks (navbars, hero sections, kinetic typography, particle fields, floating docks, footer marquees).
3. **Animation Physics & Motion Parameters**: Exact easing curves (`cubic-bezier`), GSAP timelines, Lenis scrub speeds, and Three.js shader logic.
4. **Copy-Paste AI Prompts**: Ready-to-use prompts formulated for AI coding assistants (Antigravity, Cursor, Claude Code, Windsurf) allowing any developer to generate or integrate the component into their own stack instantly.
5. **Design System & Typography Tokens**: Color palettes, CSS custom properties, fonts used, and layout spacing.

---

## 🎨 Theme & Aesthetic Categorization

We segregate all sites and their respective components into distinctive design archetypes:

| Theme / Archetype | Sites Included | Key Design Characteristics | Signature Typography & Materials |
|---|---|---|---|
| **Brutalist Pixel & Kinetic Editorial** | [The Design Society](portfolio/thedesignsociety/) | High-contrast monochrome, pixel curtains, kinetic marquee typography, color-shifting pixel emblems | Monospace + Display Serif (`Marsipan`, `Canela`), raw borders, `#000` on `#fff` |
| **Technical Drafting & CAD Precision** | [Heron AI](ai-ml/heronai/) | Blueprint grid overlays, coordinate trackers, monospaced data badges, technical dimension lines | Monospace (`Geist Mono`, `Space Mono`), dark navy/charcoal slate, emerald accents |
| **Clean Glassmorphic Fintech** | [Recursive](fintech/recursive/) | Frosted glass panels, subtle borders, luminous gradient glow, smooth tabbed transitions | Clean Geometric Sans (`Inter`, `Plus Jakarta Sans`), subtle indigo glows, neutral darks |
| **Creative Agency WebGL Fluidity** | [Hello Monday](portfolio/hellomonday/) | Interactive canvas, fluid particle ripples, custom cursor physics, smooth drag interactions | Neo-grotesque sans, soft pastels, WebGL post-processing shaders |
| **Cinematic Storybook & Musical Orchestration** | [Alan Menken](portfolio/alanmenken/) | Animated SVG signature draw, synchronized background audio/video, interactive multi-strip accordions | Editorial Storybook Serif (`Clearface ITC`), linen warm-gray backgrounds (`#e7e5df`) |
| **Gamified Three.js Satire** | [Don't Look Up](media/dontlookup/) | Real-time 3D crowds, raycast item placing, Web Audio procedural synth, animated coin physics | Handcrafted cartoon display (`Marsipan`, `Luckiest Guy`, `Nunito`), warm paper `#f4f3ef` |
| **GPGPU Compute Particle Surrealism** | [Emotion Agency](portfolio/emotionagency/) | 100k+ morphing particles, off-thread compute workers, planar water reflections, low-poly landscapes | High-fashion editorial serif (`Emotion Serif Light`), Swiss grotesque (`PP Neue Montreal`), twilight violet |

---

## 🏗️ Showcase Component Schema

For every dissected component, the showcase platform provides a standard specification card:

```typescript
interface ShowcaseComponent {
  id: string;                          // e.g. "emotion-particle-logo"
  name: string;                        // e.g. "GPGPU Compute Particle 'e' Logo"
  sourceSite: string;                  // e.g. "Emotion Agency"
  category: "Navbar" | "Hero" | "Accordion" | "Dock" | "Loader" | "Particles" | "Footer";
  theme: "Surrealism" | "Brutalist" | "CAD Drafting" | "Fintech" | "WebGL Fluid" | "Editorial";
  previewType: "iframe" | "interactive-canvas" | "dom";
  previewUrl: string;                  // Local route / embed target
  
  // Motion & Animation Specs
  motion: {
    engine: "GSAP" | "Three.js" | "CSS" | "Web Worker" | "Lenis";
    easing: string;                    // e.g. "cubic-bezier(0.16, 1, 0.3, 1)"
    duration: string | number;
    parameters: Record<string, any>;   // Spring stiffness, damping, particle count, lerp speed
  };

  // Design System Tokens
  designTokens: {
    fonts: Array<{ name: string; source: string; fallbacks: string[] }>;
    colors: Record<string, string>;    // Background, foreground, accents, glows
    materials: string[];               // e.g. "glassmorphism", "wireframe grid", "procedural water"
  };

  // Agentic AI Integration
  aiPrompt: string;                    // Copy-paste prompt for Cursor/Claude/Antigravity to recreate component

  // Implementation Code
  code: {
    vanilla: { html: string; css: string; js: string };
    react?: string;
    vue?: string;
  };
}
```

---

## 📋 Comprehensive Implementation Checklist (TODO)

### Phase 1: Component Extraction & Prompt Authoring
- [ ] **The Design Society**:
  - [ ] Extract `BootCurtainLoader` (Logo fill + cascading pixel curtain transition).
  - [ ] Extract `TwoStepPixelRouterNav` (Header with interactive navigation modal and pixel page router).
  - [ ] Extract `KineticScrollManifesto` (Scroll-driven typography distortion and letter transforms).
  - [ ] Extract `TeamEmblemGallery` (Hover portrait swap with dynamic color-shifting pixel matrix).
  - [ ] Extract `InfiniteMarqueeFooter` (Double-speed marquee with 3D link stickers).
  - [ ] Author AI prompts and token cards for all 5 components.

- [ ] **Heron AI**:
  - [ ] Extract `DraftingBlueprintHeader` (Technical coordinate navbar with status indicators).
  - [ ] Extract `MetricDimensionHero` (Interactive technical drafting grid with coordinate readouts).
  - [ ] Extract `SwiperCarouselShowcase` (Smooth architectural slide showcase with draggable track).
  - [ ] Author AI prompts and token cards for all 3 components.

- [ ] **Alan Menken**:
  - [ ] Extract `SignatureDrawSplash` (Handwritten SVG stroke animation with user-gesture audio unlock).
  - [ ] Extract `MusicalAccordionShowcase` (10-column interactive works accordion with video fade-in on hover).
  - [ ] Extract `StripGridPillSwitcher` (Floating pill toggle between accordion strip view and dense grid).
  - [ ] Author AI prompts and token cards for all 3 components.

- [ ] **Don't Look Up**:
  - [ ] Extract `CSSCoinPileLoader` (Pure CSS 3D coin drop physics loader with edge-thickness swap).
  - [ ] Extract `WebAudioSfxSynthesizer` (Dependency-free Web Audio oscillator array for UI sound effects).
  - [ ] Extract `FloatingDangerMeter` (Satirical live score, rate ticker, and crowd alarm banner).
  - [ ] Author AI prompts and token cards for all 3 components.

- [ ] **Emotion Agency**:
  - [ ] Extract `MorphingParticleMesh` (Off-main-thread Web Worker GPGPU particle simulator with mouse magnetics).
  - [ ] Extract `GlassmorphicDockNav` (Bottom floating pill dock with morphing Apple settings blob).
  - [ ] Extract `PlanarWaterReflection` (Real-time dual normal map water surface with mirror camera).
  - [ ] Extract `LenisStickyStorytelling` (Multi-stage pinned scroll container with smooth narrative reveal).
  - [ ] Author AI prompts and token cards for all 4 components.

---

### Phase 2: Showcase Platform Architecture & UI Design
- [ ] **Project Setup**:
  - [ ] Initialize `showcase/` application using React + Vite + TailwindCSS + Lucide Icons.
  - [ ] Configure dev server on dedicated port (e.g. `http://localhost:5000/`).
- [ ] **Aesthetic Gallery & Filter System**:
  - [ ] Implement filter bar by **Theme** (`All`, `Brutalist`, `CAD Drafting`, `Fintech`, `WebGL Fluid`, `Editorial`, `Surrealist 3D`).
  - [ ] Implement filter bar by **Component Type** (`All`, `Navbars`, `Heroes`, `Accordions`, `Docks`, `Loaders`, `Particles`, `Footers`).
  - [ ] Search input matching component names, animation tags, and tech stacks.
- [ ] **Component Viewer Modal / Page**:
  - [ ] Interactive live frame with breakpoint switcher (Desktop / Tablet / Mobile).
  - [ ] **"Copy AI Prompt"** button (1-click copy with toast notification).
  - [ ] **"Copy Code"** tabbed code editor (HTML/CSS/JS, React, Tailwind).
  - [ ] **Design Tokens Drawer**: Lists colors, typography, and required CDN/local assets.
  - [ ] **Animation Inspector**: Interactive visualizer showing duration, easing curve bezier graph, and triggers.

---

### Phase 3: AI Prompt Library Standards

Each component will feature an optimized prompt following this battle-tested structure:

```markdown
### 🤖 AI Agent Prompt Template:
"You are building a [Component Name] inspired by [Site Name].
Aesthetic: [Theme Archetype, e.g. Brutalist Pixel / Technical CAD].
Stack: [e.g. Vanilla CSS + JS / React + Tailwind / GSAP].

Key Requirements:
1. Visual Structure: [HTML hierarchy and element layout]
2. Typography & Colors: [Font choices, CSS variables, dark/light behavior]
3. Animation Physics:
   - Entrance: [Duration, easing curve, transforms]
   - Hover / Interaction: [Lerp speeds, transforms, state mutations]
4. Micro-interactions: [Sound effects, cursor physics, particle reaction]
5. Accessibility: [ARIA roles, keyboard navigation, prefers-reduced-motion fallback]

Code implementation: Provide a complete, self-contained, drop-in component code snippet."
```

---

## 📌 Status Tracker

- [x] Initial website forensic recreations completed (`recursive`, `thedesignsociety`, `heronai`, `hellomonday`, `alanmenken`, `dontlookup`, `emotionagency`).
- [x] All 7 sites running on dedicated local ports (`:5173`, `:3000`, `:3001`, `:3002`, `:3003`, `:3004`).
- [ ] Create `showcase/` application root.
- [ ] Build theme taxonomy and catalog metadata.
- [ ] Wire dynamic component code copy and AI prompt generator.
