import { defineComponent } from "../define";
import type { WebsiteEntry } from "../types";

const site = { title: "Heron AI", theme: "technical-cad" as const };

const SANS = "'Space Grotesk', 'BT Grotesk', Arial, sans-serif";
const MONO = "'Geist Mono', ui-monospace, monospace";
const ORIGINAL = ["BT Grotesk", "Geist Mono"];
const COLORS = { paper: "#FAFAFA", ink: "#282828", secondary: "#414140", rule: "#B3B3AF", muted: "#72726F", brand: "#FA3600" };

export const heronAi: WebsiteEntry = {
  id: "heronai",
  title: site.title,
  theme: site.theme,
  themeDisplayName: "Technical CAD & Blueprint Precision",
  originalUrl: "https://heronaiapp.com/",
  localDevUrl: "http://localhost:3000/",
  repoPath: "ai-ml/heronai",
  description:
    "AI review for CAD and BIM, designed like a drawing sheet: hairline rules, registration marks, millimetre rulers, isometric wireframes and pinned GSAP scroll sequences.",
  tagline: "A landing page drawn like an architectural sheet.",
  previewThumbnail: "live:heron-crosshair-hero",
  techStack: ["HTML5", "Webflow CSS", "GSAP 3.12", "ScrollTrigger", "SplitText", "Lenis 1.1", "Swiper 11"],
  palette: ["#FAFAFA", "#282828", "#B3B3AF", "#FA3600"],
  components: [
    defineComponent(site, {
      id: "heron-drafting-header",
      name: "Drafting Blueprint Header",
      category: "navbar",
      summary: "Hairline-ruled header with corner registration marks, isometric cube logo, a sliding hover pill and a live cursor coordinate readout.",
      tags: ["sliding pill", "coordinates", "hairline", "registration marks", "hamburger"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: "cubic-bezier(0.22, 1, 0.36, 1)",
        easingSource: "easeOutQuint, the most common curve in the site's custom CSS",
        duration: "0.4s pill slide",
        triggers: "hover",
        notes: "The pill is one absolutely positioned element whose left/width transition to the hovered link's offsetLeft/offsetWidth; it returns to the active link on mouseleave. Measurements re-run after web fonts load.",
        parameters: { "Pill slide": "left + width, 0.4s", "Text color swap": "0.3s", "Coordinate format": "XXXX.XX, zero-padded", "Status dot": "pulse 1.6s" },
      },
      designTokens: { fontFamilies: [SANS, MONO], originalFonts: ORIGINAL, colors: COLORS, materials: ["1px #B3B3AF hairlines", "24px drafting grid", "orange + registration marks"] },
      prompt: {
        structure: [
          "Header box with a 1px #B3B3AF border and four '+' glyphs absolutely placed at the corners (−7px offsets).",
          "Single 56px row divided into cells by 1px dividers: logo (isometric cube SVG + HERON), nav list, coordinate readout, CTA.",
          "Nav list is position:relative; first child is the pill element; links sit above it.",
        ],
        fonts: [SANS + " (stand-in for BT Grotesk)", MONO],
        colors: "paper #FAFAFA, ink #282828, rules #B3B3AF, muted #72726F, brand/CTA #FA3600",
        entrance: "None; header is static chrome.",
        interaction:
          "On link hover/focus, move the pill: left/width transition 0.4s cubic-bezier(0.22, 1, 0.36, 1); the hovered link text turns #FAFAFA over 0.3s. On mouseleave return to the active link. Coordinates update on pointermove, formatted toFixed(2).padStart(7,'0'). CTA arrow shifts 4px on hover.",
        polish: ["Re-measure the pill after document.fonts.ready and on resize", "Pulsing orange status dot labelled SYS · ONLINE"],
        accessibility: ["aria-current on the active link", "Coordinate readout is aria-hidden (decorative)", "Below ~680px collapse links into a toggle with aria-expanded"],
      },
    }),
    defineComponent(site, {
      id: "heron-crosshair-hero",
      name: "Crosshair Drafting Hero",
      category: "hero",
      summary: "Drafting grid with rulers, an orange crosshair that trails the cursor with a live mm readout, and an elevation drawing that plots itself.",
      tags: ["crosshair cursor", "lerp", "stroke-dashoffset", "rulers", "blueprint grid", "Lissajous"],
      motionSpecs: {
        engine: "rAF",
        easingCurve: "cubic-bezier(0.16, 1, 0.3, 1)",
        easingSource: "easeOutExpo for the line drawing",
        duration: "1.6s per stroke, 0.12s stagger",
        triggers: "hover",
        notes:
          "Crosshair lines are two 1px elements moved with translate3d every frame, lerping 0.12 toward the pointer. When the pointer leaves, the target follows a Lissajous path (sin 0.45t, sin 0.7t + 1) so the hero never sits still. Paths use pathLength=1 so dasharray/dashoffset are unitless.",
        parameters: { "Crosshair lerp": "0.12", "Idle path": "x = 0.5 + 0.32·sin(0.45t), y = 0.5 + 0.28·sin(0.7t + 1)", "Stroke draw": "1.6s, stagger 0.12s", "Grid": "24px minor / 120px major", "Ruler ticks": "8px minor / 40px major" },
      },
      designTokens: { fontFamilies: [SANS, MONO], originalFonts: ORIGINAL, colors: COLORS, materials: ["blueprint grid", "millimetre rulers", "SVG elevation linework"] },
      prompt: {
        structure: [
          "Full-bleed section with layered background-image grids (24px at 13% alpha, 120px at 33% alpha of #B3B3AF).",
          "16px rulers on the top and left edges drawn with repeating linear-gradients.",
          "Two-column grid: headline block (kicker, uppercase H1, subcopy, two CTAs) and an SVG elevation drawing. Crosshair = one vertical and one horizontal 1px line plus a dark coordinate tag, all pointer-events:none.",
        ],
        fonts: [SANS, MONO],
        colors: "paper #FAFAFA, ink #282828, grid #B3B3AF, crosshair rgba(250,54,0,0.7), tag #282828 on #FAFAFA",
        entrance: "Each SVG path animates stroke-dashoffset 1→0 (pathLength=1) over 1.6s cubic-bezier(0.16, 1, 0.3, 1), staggered 0.12s; the orange sun circle draws last at 1.4s.",
        interaction:
          "pos += (target − pos) × 0.12 every frame; vertical line translateX(pos.x), horizontal translateY(pos.y), tag at pos + 10px showing X/Y in mm. Without a pointer, drive the target along a Lissajous curve.",
        polish: ["cursor: crosshair on the section", "Divide pointer deltas by the element's CSS scale if it can be scaled"],
        accessibility: ["Crosshair and tag aria-hidden", "SVG has aria-label 'Elevation drawing'", "Reduced motion: lerp factor 1 (no trailing) and no draw-on"],
      },
    }),
    defineComponent(site, {
      id: "heron-isometric-grid",
      name: "Isometric Wireframe Grid",
      category: "card-grid",
      summary: "Four hairline cards ([01] Manual … [04] Slow) whose isometric wireframes re-plot themselves while the card inverts to ink.",
      tags: ["isometric", "stroke-dashoffset", "color inversion", "wireframe", "card hover"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: "cubic-bezier(0.22, 1, 0.36, 1)",
        easingSource: "easeOutQuint",
        duration: "0.9s draw, 0.45s inversion",
        triggers: "hover",
        notes: "Each shape is drawn twice: a static grey base layer and an overlay with stroke-dasharray 1 / dashoffset 1 (pathLength=1). Hover sets the overlay's dashoffset to 0 so the light wireframe redraws over the darkened base, with the orange accent following 0.15s later.",
        parameters: { "Inversion": "background + color 0.45s", "Draw": "stroke-dashoffset 1 → 0, 0.9s", "Accent delay": "0.15s", Columns: "4 → 2 → 1 by container width" },
      },
      designTokens: { fontFamilies: [SANS, MONO], originalFonts: ORIGINAL, colors: COLORS, materials: ["isometric SVG primitives", "collapsed-border grid", "ink inversion"] },
      prompt: {
        structure: [
          "Section header: uppercase H2 left, mono 'Fig. 02' caption right, 1px rule under it.",
          "Grid with a top/left border; every card adds right/bottom borders so lines never double. 4 columns ≥ 768px, 2 ≥ 448px, else 1.",
          "Card: mono tag '[01] MANUAL', a 120×120 SVG (base paths, resting accent, overlay paths with pathLength=1), short body copy.",
        ],
        fonts: [SANS, MONO],
        colors: "card #FAFAFA → #282828 on hover, base strokes #B3B3AF → #414140, overlay strokes #FAFAFA, accent #FA3600",
        entrance: "None.",
        interaction:
          "On hover or :focus-visible: background/color invert over 0.45s cubic-bezier(0.22, 1, 0.36, 1); overlay strokes stroke-dashoffset 1→0 over 0.9s with the same curve; accent shape 0.15s later; resting accent fades out in 0.3s.",
        polish: ["Shapes: cylinder through a plane, sphere on a cube, ring around a cube, stacked offset planes", "1.2px strokes for a drafting-pen feel"],
        accessibility: ["Cards are links, so keyboard focus triggers the same reveal", "SVGs are aria-hidden; the tag + body text carry meaning"],
      },
    }),
  ],
};
