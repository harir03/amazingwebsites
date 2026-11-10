import { defineComponent } from "../define";
import type { WebsiteEntry } from "../types";

const site = { title: "SweetTape", theme: "tactile-pop-ecommerce" as const };

const SANS = "'Syne', 'Work Sans', system-ui, sans-serif";
const MONO = "'JetBrains Mono', 'Geist Mono', monospace";
const ORIGINAL = ["Syne", "Work Sans"];
const COLORS = {
  yellow: "#F7D000",
  coral: "#FF7B5F",
  cyan: "#50CBFF",
  navy: "#2E3EAC",
  black: "#111111",
  cream: "#FAF8F2",
};
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_SOURCE = "CSS spring cubic-bezier(0.16, 1, 0.3, 1)";

export const sweetTape: WebsiteEntry = {
  id: "sweettape",
  title: site.title,
  theme: site.theme,
  themeDisplayName: "Tactile Pop & Kinetic Tape E-Commerce",
  originalUrl: "https://sweet-tape.com/",
  localDevUrl: "http://localhost:3006/",
  repoPath: "ecommerce/sweettape",
  description:
    "A vibrant Malaysian tape brand site celebrating three generations of adhesive manufacturing with pop-art colors, tilted tape strips, drop shadows, and interactive tape roll spec selectors.",
  tagline: "Stick by you: pop colors, adhesive physics, and tactile tape rolls.",
  previewThumbnail: "live:st-tape-strip-banner",
  techStack: ["Next.js", "React", "TailwindCSS", "CSS Transforms", "Tactile Physics"],
  palette: ["#F7D000", "#FF7B5F", "#50CBFF", "#111111"],
  components: [
    defineComponent(site, {
      id: "st-tape-strip-banner",
      name: "Tactile Adhesive Tape Banner",
      category: "hero",
      summary: "Jaunty tilted adhesive tape strips with hard drop shadows, serrated cutter ends, and interactive hover peel elevation.",
      tags: ["tape", "adhesive", "tactile", "pop", "tilt", "banner", "drop shadow", "retro"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: EASE,
        easingSource: EASE_SOURCE,
        duration: "0.25s hover tilt",
        triggers: "hover",
        notes: "Hovering any adhesive tape strip applies an active lift (translateY -5px, rotate 0deg, scale 1.02) simulating a peeling tape corner.",
        parameters: { "Lift": "translateY -5px scale 1.02, 0.25s", "Shadow": "0 16px 32px rgba(0,0,0,0.18)" },
      },
      designTokens: { fontFamilies: [SANS, MONO], originalFonts: ORIGINAL, colors: COLORS, materials: ["adhesive crepe paper", "vinyl film", "neo-brutalist 2px border"] },
      prompt: {
        structure: [
          "Retro badge: 'Made in Malaysia Since 1978' with -2deg tilt.",
          "Bold heavy headline: 'STICK BY YOU' with high-contrast coral highlight tag.",
          "Three layered tape strips at alternating jaunty angles (-1.5deg, +1.2deg, -0.8deg) with solid black borders and 4px offset drop shadows.",
        ],
        fonts: [SANS + " for heavy display text", MONO + " for tape specifications"],
        colors: "yellow #F7D000, coral #FF7B5F, cyan #50CBFF with #111111 borders over #FAF8F2 cream",
        entrance: "Strips snap into place with a springy physical feel.",
        interaction: "Hovering any strip straightens its tilt and elevates the card.",
        polish: ["Hard offset 4px 4px drop shadow with zero blur", "Subtle border radius 12px"],
        accessibility: ["Keyboard focusable cards", "High contrast color pairings"],
      },
    }),
    defineComponent(site, {
      id: "st-tape-selector",
      name: "Interactive Tape Spec Selector",
      category: "card-grid",
      summary: "Dynamic product carousel switching between 4 tape roll models to display adhesion force, tensile strength, and backing thickness.",
      tags: ["product selector", "tape roll", "specs", "e-commerce", "carousel", "adhesion"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: EASE,
        easingSource: EASE_SOURCE,
        duration: "0.3s roll color transition",
        triggers: "click",
        notes: "Clicking a tape type updates the roll background color and smoothly reveals technical specifications for peel adhesion, tensile force, and thickness.",
        parameters: { "Color Morph": "background-color 0.3s ease", "Tab Select": "0.15s instant active toggle" },
      },
      designTokens: { fontFamilies: [SANS, MONO], originalFonts: ORIGINAL, colors: COLORS, materials: ["tape roll core", "spec matrix", "pop pill tabs"] },
      prompt: {
        structure: [
          "Centered title and mono category pill.",
          "Pill buttons for Cloth Duct, Crepe Masking, BOPP Packaging, and Double-Sided.",
          "Two-column card: left side shows an interactive circular tape roll with core label and tilted tagline ribbon, right side details SKU, name, description, and a 3-column metric grid.",
        ],
        fonts: [SANS + " for headings", MONO + " for SKUs and telemetry"],
        colors: "card #FFFFFF with #111111 borders and colorful roll fills over #FAF8F2",
        entrance: "Fades in with crisp neo-brutalist shadows.",
        interaction: "Selecting a tape dynamically recolors the roll and updates technical measurements.",
        polish: ["Tilted tagline badge pinned to bottom corner of the roll", "Clear tabular numerals for specifications"],
        accessibility: ["Semantic tab buttons with aria-pressed", "Readable metric labels"],
      },
    }),
  ],
};
