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
