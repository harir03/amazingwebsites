import { defineComponent } from "../define";
import type { WebsiteEntry } from "../types";

const site = { title: "Belgrade Arbor", theme: "architectural-botanical" as const };

const SERIF = "'Instrument Serif', 'Newsreader', Georgia, serif";
const SANS = "'Work Sans', 'Inter', system-ui, sans-serif";
const MONO = "'JetBrains Mono', 'Geist Mono', monospace";
const ORIGINAL = ["Editorial Old", "Work Sans"];
const COLORS = {
  forest: "#1F261E",
  olive: "#3E562E",
  sand: "#FAF8F5",
  cream: "#F5F2EB",
  golden: "#C5A880",
};
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_SOURCE = "GSAP Expo.out extracted from Next.js chunks";

export const belgradeArbor: WebsiteEntry = {
  id: "belgradearbor",
  title: site.title,
  theme: site.theme,
  themeDisplayName: "Architectural Botanical & Forest Editorial",
  originalUrl: "https://belgradearbor.rs/en",
  localDevUrl: "http://localhost:3005/",
  repoPath: "portfolio/belgradearbor",
  description:
    "An award-winning luxury residential complex in New Belgrade defined by a tree canopy-inspired facade, muted gold emblems, frosted floating navigation, and interactive architectural floorplans.",
  tagline: "Canopy facades, frosted forest pills, and blueprint precision.",
  previewThumbnail: "live:ba-floating-navbar",
  techStack: ["Next.js", "React", "GSAP", "Lenis", "TailwindCSS", "SVG Floorplans"],
  palette: ["#1F261E", "#3E562E", "#FAF8F5", "#C5A880"],
  components: [
    defineComponent(site, {
      id: "ba-floating-navbar",
      name: "Botanical Floating Navbar",
      category: "navbar",
      summary: "Translucent frosted pill navbar with animated hamburger to X icon, golden tree monogram, and dual-layer rolling 'Inquire' action button.",
      tags: ["navbar", "floating pill", "backdrop blur", "hamburger animation", "rolling text", "luxury"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: EASE,
        easingSource: EASE_SOURCE,
        duration: "0.3s roll, 0.4s drawer expand",
        triggers: "hover",
        notes: "Button label uses overflow hidden and a flex column of two spans. On hover, transform translateY(-50%) smoothly flips Inquire to Connect.",
        parameters: { "Button Roll": "translateY -50%, 0.3s cubic-bezier(0.16, 1, 0.3, 1)", "Drawer Scale": "scale 0.95 → 1, 0.2s" },
      },
      designTokens: { fontFamilies: [SERIF, SANS, MONO], originalFonts: ORIGINAL, colors: COLORS, materials: ["frosted forest glass", "golden metallic SVG", "pill outline"] },
      prompt: {
        structure: [
          "A rounded-full header nav with backdrop-blur and 90% opacity deep forest green background.",
          "Left: two-bar hamburger button with smooth cross transform on open.",
          "Center: botanical tree monogram with italic serif brand title.",
          "Right: rolling pill button with two vertical label states.",
          "Expandable 4-column drawer below with district & residence links.",
        ],
        fonts: [SERIF + " for title", SANS + " for navigation labels", MONO + " for micro telemetry"],
        colors: "nav #1F261E/90 with #FAF8F5 text and #C5A880 gold accents",
        entrance: "Fades in smoothly from top on page load.",
        interaction: "Hovering the CTA button rolls the text up 50% to reveal 'Connect ✦'. Clicking Menu expands the multi-column luxury directory.",
        polish: ["Backdrop blur 12px", "Subtle white 10% 1px border highlight"],
        accessibility: ["Aria-expanded on menu toggle", "Focus rings on interactive elements", "High contrast text"],
      },
    }),
    defineComponent(site, {
      id: "ba-residence-filter",
      name: "Residence Floorplan Inspector",
      category: "card-grid",
      summary: "Interactive CAD floorplan inspector allowing buyers to toggle between Penthouses, Duplexes, and 2-Bedroom residences with live dimension telemetry.",
      tags: ["floorplan", "CAD", "blueprint", "residence filter", "real estate", "interactive SVG"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: EASE,
        easingSource: EASE_SOURCE,
        duration: "0.25s tab switch",
        triggers: "click",
        notes: "Tab clicks trigger state transitions that update floorplan SVG highlights, square meter counters, and solar exposure telemetry.",
        parameters: { "Tab Switch": "transition 0.2s ease-out", "Telemetry Fade": "opacity 0.25s" },
      },
      designTokens: { fontFamilies: [SERIF, SANS, MONO], originalFonts: ORIGINAL, colors: COLORS, materials: ["CAD drafting lines", "cream linen background", "architectural badges"] },
      prompt: {
        structure: [
          "Center header with category tag and serif title.",
          "Segmented pill tabs with active state contrast.",
          "Two-column inspector card: left side shows an architectural CAD floorplan SVG with highlighted living & terrace zones, right side displays square meter, room count, and solar exposure readouts.",
        ],
        fonts: [SERIF + " for unit title and metrics", SANS + " for descriptions", MONO + " for CAD dimensions"],
        colors: "card #FFFFFF with #1F261E text and #C5A880 gold accents over #FAF8F5 canvas",
        entrance: "Blueprint schematics scale subtly on mount.",
        interaction: "Clicking any unit button instantly recalculates internal living area, balcony space, and switches blueprint room layouts.",
        polish: ["Dashed architectural wall dividing lines", "Subtle drop shadow on main stage"],
        accessibility: ["Semantic tab buttons with aria-pressed", "Screen-reader friendly metric definitions"],
      },
    }),
    defineComponent(site, {
      id: "ba-monolith-hero",
      name: "Architectural Canopy Hero",
      category: "hero",
      summary: "Luxury architectural hero with high-contrast serif display typography, GPS coordinates pill badge, and lush living canopy banner.",
      tags: ["hero", "editorial typography", "architectural", "canopy", "coordinates", "botanical"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: EASE,
        easingSource: EASE_SOURCE,
        duration: "0.8s entrance",
        triggers: "entrance",
        notes: "Coordinates badge pulses gently while the display headline renders with tight line height and an italicized green emphasis word.",
        parameters: { "Pulse": "opacity 0.7 ↔ 1, 2s infinite", "Fade In": "translateY 20px → 0, 0.8s" },
      },
      designTokens: { fontFamilies: [SERIF, SANS, MONO], originalFonts: ORIGINAL, colors: COLORS, materials: ["canopy gradient", "editorial headline", "floating pill"] },
      prompt: {
        structure: [
          "GPS coordinates pill badge with pulsing status dot.",
          "Monumental editorial serif headline: 'Harmony of modern living and natural greenery'.",
          "Balanced lead paragraph followed by a forest-to-canopy gradient visual showcase banner.",
        ],
        fonts: [SERIF + " for display title", SANS + " for body text", MONO + " for GPS badge"],
        colors: "canvas #FAF8F5 with #1F261E text and #3E562E forest green accent",
        entrance: "Headline and banner reveal on scroll with gentle ease.",
        interaction: "Responsive scaling across all viewport widths.",
        polish: ["Italicized accent word in headline", "Living canopy statistics readout"],
        accessibility: ["Proper h1/h2 document hierarchy", "Relative units for responsive typography"],
      },
    }),
  ],
};
