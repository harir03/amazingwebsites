import { defineComponent } from "../define";
import type { WebsiteEntry } from "../types";

const site = { title: "Hello Monday", theme: "webgl-fluid" as const };

const SERIF = "'Zilla Slab', 'Clarendon', Georgia, serif";
const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";
const ORIGINAL = ["Clarendon BT Light", "NB International Pro"];
const COLORS = { paper: "#F8F6F5", ink: "#191919", graphite: "#2A2A2A", grey: "#C6C5C5", mist: "#F4F4F4" };

export const helloMonday: WebsiteEntry = {
  id: "hellomonday",
  title: site.title,
  theme: site.theme,
  themeDisplayName: "Creative Agency WebGL Fluidity",
  originalUrl: "https://www.hellomonday.com/",
  localDevUrl: "http://localhost:3001/",
  repoPath: "portfolio/hellomonday",
  description:
    "The DEPT® creative studio: a Pixi/Three background renderer, hand-drawn characters, rotating type and an elastic bezier side menu, all on warm off-white with a light slab serif.",
  tagline: "Springy canvas surfaces and a menu with an elastic edge.",
  previewThumbnail: "live:hm-fluid-canvas",
  techStack: ["Pixi.js", "Three.js", "WebGL", "GSAP", "Canvas sprite sheets"],
  palette: ["#F8F6F5", "#191919", "#C6C5C5", "#2A2A2A"],
  components: [
    defineComponent(site, {
      id: "hm-elastic-menu",
      name: "Elastic Bezier Menu",
      category: "navbar",
      summary: "Side drawer whose leading edge is a single bezier spring: it bows while sliding, wobbles on landing and leans toward the cursor.",
      tags: ["spring physics", "SVG path", "bezier", "drawer", "elastic", "cursor"],
      motionSpecs: {
        engine: "rAF",
        easingCurve: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        easingSource: "easeOutQuad from the site bundle, used for the staggered links (the edge itself is a spring, not a curve)",
        duration: "Spring settle ≈ 0.6s",
        triggers: "click",
        notes:
          "Two coupled springs per frame (semi-implicit Euler, dt clamped to 32ms). Drawer position: k = 120, c = 20. Edge bulge: k = 260, c = 9, with its target = −drawerVelocity × 70 + cursorPull. The SVG paints the whole panel so a negative bulge can bite into it. Source shape: #curve d='M0,0 C0,250 0,250 0,500 Z'.",
        parameters: { "Drawer spring": "k 120, c 20", "Edge spring": "k 260, c 9", "Velocity → bulge": "× −70 px", "Cursor pull": "≤ 46px within 160px of the edge", "Link stagger": "0.12s + i × 0.06s" },
      },
      designTokens: { fontFamilies: [SERIF, SANS], originalFonts: ORIGINAL, colors: COLORS, materials: ["SVG bezier edge", "ink drawer", "underline sweep"] },
      prompt: {
        structure: [
          "Header with serif wordmark and a black pill 'Menu' button (two dots that slide together when open).",
          "Drawer: absolutely positioned right panel, width min(380px, 82%). Inside, an SVG positioned left: −90px, width calc(100% + 90px), with one filled path; the nav content sits on top with a transparent background.",
        ],
        fonts: [SERIF + " 300 (stand-in for Clarendon BT Light)", SANS + " (stand-in for NB International Pro)"],
        colors: "page #F8F6F5, ink #191919, drawer #191919 with #F8F6F5 text, secondary #C6C5C5",
        entrance: "Links: opacity + translateX(30px→0), 0.5s/0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), delay 0.12s + i×0.06s when opening.",
        interaction:
          "Each rAF: vel += (−120(pos − target) − 20·vel)·dt; pos += vel·dt; bVel += (−260(bulge − (−vel·70 + pull)) − 9·bVel)·dt; bulge += bVel·dt. Panel translateX((1 − pos)(width + 90)). Path: M90,0 C90,0.6y  c,y−0.18h  c,y S90,h 90,h L90+w,h L90+w,0 Z with c = 90 − bulge and y = cursor height clamped to 15–85%.",
        polish: ["Hover underline grows with background-size 0% → 100% over 0.5s", "Cursor pull only while open and within 160px of the edge"],
        accessibility: ["aria-expanded/aria-controls on the toggle, Escape closes", "Drawer inert while closed", "Reduced motion: snap pos and zero the bulge"],
      },
    }),
    defineComponent(site, {
      id: "hm-rotating-type",
      name: "Rotating Type Hero",
      category: "hero",
      summary: "'We make [Experiences]' — the last word rolls out letter by letter as the next rolls in, the slot easing to the new width; a doodled face watches the cursor.",
      tags: ["word rotator", "letter stagger", "width animation", "character", "eye tracking"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        easingSource: "easeOutQuad (in) and cubic-bezier(0.6, 0.2, 0, 0.8) (out), both from the site CSS bundle",
        duration: "0.6s in / 0.45s out, every 2.4s",
        triggers: "loop",
        notes: "Outgoing and incoming words are stacked absolutely inside one slot. Each letter sits in its own overflow mask and rolls on the Y axis. An invisible measuring span gives the next word's width so the slot can transition width without layout jumps.",
        parameters: { Interval: "2.4s", "Letter stagger": "0.025s", "Roll distance": "105%", "Slot width": "0.6s", "Face look": "≤ 6px, 0.25s ease" },
      },
      designTokens: { fontFamilies: [SERIF, SANS], originalFonts: ORIGINAL, colors: { ...COLORS, sunshine: "#FFD25A" }, materials: ["letter masks", "hand-drawn SVG character"] },
      prompt: {
        structure: [
          "Hero: top bar (wordmark + 'Part of DEPT®' pill), then a large two-line serif H1 'We make' / [slot] + grey period, with a character illustration on the right.",
          "Slot: inline-block, height 1.08em, position relative; words are absolutely positioned rows of per-letter masks.",
          "A visually hidden live copy of the current word for screen readers.",
        ],
        fonts: [SERIF + " 300, tracking −0.02em", SANS],
        colors: "page #F8F6F5, ink #191919, period #C6C5C5, face #FFD25A with #191919 outline",
        entrance: "First word rolls in on mount.",
        interaction:
          "Every 2.4s: old letters animate translateY(0 → −105%) 0.45s cubic-bezier(0.6, 0.2, 0, 0.8); new letters translateY(105% → 0) 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); both staggered 0.025s per letter. Slot width transitions to the measured width over 0.6s. Face pupils/mouth translate up to 6px toward the pointer.",
        polish: ["Re-measure after document.fonts.ready", "Blink via a scaleY keyframe every 4s"],
        accessibility: ["Animated letters are aria-hidden; an sr-only span (aria-live polite in vanilla) carries the word", "Reduced motion: stop rotating"],
      },
    }),
    defineComponent(site, {
      id: "hm-fluid-canvas",
      name: "Fluid Dot Field",
      category: "particle-system",
      summary: "A canvas grid of spring-loaded dots: the cursor drags the surface along its velocity, clicks fire ring shockwaves, displaced dots darken.",
      tags: ["canvas", "spring grid", "ripple", "cursor velocity", "particles"],
      motionSpecs: {
        engine: "Canvas 2D",
        easingCurve: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        easingSource: "Physics-driven; the curve shown is the site's UI ease for reference",
        duration: "Continuous",
        triggers: "hover",
        notes: "Per dot: v = (v − d·0.045) × 0.88, d += v. Pointer adds its frame velocity × (1 − dist/110)² × 0.32. Click rings expand 7px/frame and push dots within an 18px band outward. Dots are batched into 4 shade buckets so each frame is only four fill() calls.",
        parameters: { Spacing: "22px", Spring: "0.045", Damping: "0.88", "Influence radius": "110px", "Ring speed / band": "7px per frame / 18px", "Idle ghost": "figure-8 after 1.2s still" },
      },
      designTokens: { fontFamilies: [SERIF, SANS], originalFonts: ORIGINAL, colors: { ...COLORS, dot1: "#CBCAC9", dot2: "#A9A8A8", dot3: "#6B6A6A" }, materials: ["HiDPI canvas", "typed-array physics"] },
      prompt: {
        structure: ["Container with a full-size canvas (DPR capped at 2) and an overlaid caption bottom-left (pointer-events none).", "Grid of points stored in Float32Arrays: base x/y, offset dx/dy, velocity vx/vy."],
        fonts: [SERIF + " 300 for the caption", SANS],
        colors: "background #F8F6F5; dot shades by displacement: #CBCAC9, #A9A8A8, #6B6A6A, #191919",
        entrance: "None.",
        interaction:
          "Each frame: for every dot within 110px of the pointer add pointerVelocity × (1 − d/110)² × 0.32; for each ripple ring (radius += 7) push dots within 18px of the ring outward; integrate v = (v − d×0.045)×0.88; d += v. Radius 1.3 + bucket×0.9, bucket = floor(|d| / 5). Decay pointer velocity ×0.6 per frame.",
        polish: ["Ghost cursor on a figure-eight when idle so the surface never freezes", "ResizeObserver rebuilds the grid"],
        accessibility: ["Canvas is aria-hidden; caption explains the interaction", "Reduced motion: no pointer forces or ghost"],
      },
    }),
  ],
};
