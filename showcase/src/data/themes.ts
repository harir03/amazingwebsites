import type { ComponentCategory, ThemeArchetype } from "./types";

export interface ThemeMeta {
  id: ThemeArchetype;
  name: string;
  short: string;
  /** Pen colour for this theme in the hub (curves, swatches). Dark enough to read on the paper background. */
  accent: string;
  blurb: string;
}

export const THEMES: ThemeMeta[] = [
  {
    id: "brutalist-pixel",
    name: "Brutalist Pixel & Kinetic Editorial",
    short: "Brutalist Pixel",
    accent: "#5f7d00",
    blurb: "High-contrast monochrome, pixel curtains, kinetic type, CRT grain.",
  },
  {
    id: "technical-cad",
    name: "Technical CAD & Blueprint Precision",
    short: "Technical CAD",
    accent: "#c43a0c",
    blurb: "Drafting grids, coordinate readouts, hairline rules, isometric wireframes.",
  },
  {
    id: "glassmorphic-fintech",
    name: "Clean Glassmorphic Fintech",
    short: "Fintech Glass",
    accent: "#23806a",
    blurb: "Frosted glass pills, luminous 1px borders, soft blur reveals.",
  },
  {
    id: "webgl-fluid",
    name: "Creative Agency WebGL Fluidity",
    short: "WebGL Fluid",
    accent: "#c2457a",
    blurb: "Canvas physics, springy bezier menus, cursor-reactive surfaces.",
  },
  {
    id: "cinematic-serif",
    name: "Cinematic Storybook & Musical Orchestration",
    short: "Cinematic Serif",
    accent: "#8a6a2c",
    blurb: "Signature draws, synced sound, storybook serif accordions.",
  },
  {
    id: "gamified-canvas",
    name: "Gamified Three.js & Canvas Satire",
    short: "Gamified Canvas",
    accent: "#c99200",
    blurb: "Cartoon HUDs, CSS 3D coin physics, procedural Web Audio.",
  },
  {
    id: "compute-particles",
    name: "GPGPU Compute Particle Surrealism",
    short: "Compute Particles",
    accent: "#6a3beb",
    blurb: "Morphing particle fields, glass docks, audio-gated entrances.",
  },
  {
    id: "architectural-botanical",
    name: "Architectural Botanical & Forest Editorial",
    short: "Botanical Canopy",
    accent: "#2f5c38",
    blurb: "Organic tree facades, frosted forest pills, architectural CAD blueprints.",
  },
  {
    id: "tactile-pop-ecommerce",
    name: "Tactile Pop & Kinetic Tape E-Commerce",
    short: "Tactile Pop Tape",
    accent: "#d97706",
    blurb: "Jagged adhesive strips, jaunty tilts, vibrant pop product carousels.",
  },
  {
    id: "sonic-interactive",
    name: "Interactive Sonic & Game Audio Architecture",
    short: "Sonic Spectrum",
    accent: "#65a30d",
    blurb: "Web Audio harmonic visualizers, multi-stem mixing decks, studio noir.",
  },
  {
    id: "kinetic-video-editorial",
    name: "Kinetic Video & Playful Motion Editorial",
    short: "Kinetic Video",
    accent: "#0038ff",
    blurb: "Magnetic physics collages, 3D pinned card stack decks, inertia momentum hovers, cursor marquee tickers.",
  },
  {
    id: "mediterranean-botanical-artisan",
    name: "Mediterranean Botanical & Artisan Gastronomy",
    short: "Mediterranean Artisan",
    accent: "#df5c32",
    blurb: "Warm linen parchment, Sicilian terracotta, Etna volcanic minerals, slow-cooked pantry jars.",
  },
  {
    id: "tactical-aerospace-hud",
    name: "Tactical Defense Aerospace & HUD Telemetry",
    short: "Aerospace HUD",
    accent: "#ff5500",
    blurb: "Targeting crosshairs, live coordinate telemetry, radar sweep grids, military threat matrices.",
  },
];

export const THEME_BY_ID = Object.fromEntries(THEMES.map((t) => [t.id, t])) as Record<ThemeArchetype, ThemeMeta>;

export const CATEGORIES: { id: ComponentCategory; label: string }[] = [
  { id: "navbar", label: "Navbars" },
  { id: "hero", label: "Heroes" },
  { id: "accordion", label: "Accordions" },
  { id: "floating-dock", label: "Docks" },
  { id: "loader", label: "Loaders" },
  { id: "particle-system", label: "Particles" },
  { id: "card-grid", label: "Card Grids" },
  { id: "footer", label: "Footers" },
];

export const CATEGORY_LABEL: Record<ComponentCategory, string> = {
  navbar: "Navbar",
  hero: "Hero",
  accordion: "Accordion",
  "floating-dock": "Dock",
  loader: "Loader",
  "particle-system": "Particles",
  "card-grid": "Card Grid",
  footer: "Footer",
};
