import { defineComponent } from "../define";
import type { WebsiteEntry } from "../types";

const site = { title: "Emotion Agency", theme: "compute-particles" as const };

const SERIF = "'Cormorant Garamond', 'Emotion Serif', Georgia, serif";
const SANS = "'Inter Tight', 'PP Neue Montreal', 'Helvetica Neue', sans-serif";
const MONO = "'IBM Plex Mono', ui-monospace, monospace";
const ORIGINAL = ["Emotion Serif Light / Light Italic", "PP Neue Montreal Medium", "IBM Plex Mono Medium"];
const COLORS = { primary: "#9047FF", primaryActive: "#7114FF", lilac: "#F5EFFF", aubergine: "#2A1647", night: "#121212", card: "#181818", mutedLight: "#64698B", mutedDark: "#A3A6C1" };

export const emotionAgency: WebsiteEntry = {
  id: "emotionagency",
  title: site.title,
  theme: site.theme,
  themeDisplayName: "GPGPU Compute Particle Surrealism",
  originalUrl: "https://emotion-agency.com/",
  localDevUrl: "http://localhost:3004/",
  repoPath: "portfolio/emotionagency",
  description:
    "An agency site built as a WebGL world: 100k+ worker-driven particles morph into the brand 'e', a low-poly landscape reflects in planar water, a glass dock floats over it and you choose to enter with or without sound.",
  tagline: "Particles that become a letter, a world that answers with sound.",
  previewThumbnail: "live:emo-particle-morph",
  techStack: ["Nuxt / Vue", "Three.js", "Web Workers", "GPGPU particles", "KTX2 + Draco", "GSAP", "Lenis", "Howler"],
  palette: ["#9047FF", "#F5EFFF", "#2A1647", "#121212"],
  components: [
    defineComponent(site, {
      id: "emo-particle-morph",
      name: "Morphing Particle Field",
      category: "particle-system",
      summary: "Thousands of particles spring between the serif 'e', a spinning sphere, a ring and a cube; the cursor pushes them apart.",
      tags: ["particles", "morph", "Web Worker", "OffscreenCanvas", "typed arrays", "repulsion", "3D projection"],
      motionSpecs: {
        engine: "Web Worker",
        easingCurve: "cubic-bezier(0.16, 1, 0.3, 1)",
        easingSource: "Spring-driven; the curve shown is the site's dominant UI ease (9 uses)",
        duration: "Morph every 3.6s",
        triggers: "loop",
        notes:
          "Original: particleWorker.js computes 100k+ positions off the main thread and Three.js renders them. The vanilla snippet runs the same loop in a Blob Worker with canvas.transferControlToOffscreen() (main-thread fallback); the React snippet keeps it on the main thread with Float32Arrays so moving it to a worker is a copy-paste. Glyph targets are sampled from text drawn to a hidden canvas after document.fonts.ready.",
        parameters: { Count: "area / 70, clamped 1.8k–7k (9k in vanilla)", Stiffness: "0.055", Damping: "0.86", "Repel radius": "90px, force (1 − d/r) × 6", "Spin / tilt": "Y += 0.008 per frame, X 0.35 rad", Trails: "rgba(18,18,18,0.32) wash + 'lighter' blending" },
      },
      designTokens: { fontFamilies: [SERIF, MONO], originalFonts: ORIGINAL, colors: COLORS, materials: ["additive particles", "motion trails", "perspective projection"] },
      prompt: {
        stack: "React 18 + TailwindCSS with Canvas 2D (or Three.js Points); simulation loop written so it can run in a Web Worker with OffscreenCanvas",
        structure: ["Full-size container with a canvas; small serif 'emotion' wordmark top-left; mono shape counter bottom-left and 'click to morph' bottom-right."],
        fonts: [SERIF + " 300 italic (stand-in for Emotion Serif Light Italic)", MONO],
        colors: "background #121212; particles in three additive buckets rgba(113,20,255,.55), rgba(144,71,255,.75), rgba(226,214,255,.9); labels #A3A6C1",
        entrance: "Particles start scattered randomly and spring into the first shape.",
        interaction:
          "Targets per shape in normalised 3D (e: sample alpha > 128 pixels of an italic 'e'; sphere: Fibonacci points; ring: torus; cube: points on 12 edges). Each frame rotate around Y (t += 0.008) and tilt X 0.35, project with p = 1 / (1.9 − 0.45z), then a = (target − pos) × 0.055 + repulsion; v = (v + a) × 0.86; pos += v. Morph every 3.6s or on click.",
        polish: ["Fill the canvas with rgba(18,18,18,0.32) before drawing for soft trails", "Batch draws into 3 colour buckets with fillRect", "Cap DPR at 2"],
        accessibility: ["Canvas aria-hidden; visible text explains the interaction", "Reduced motion: no spinning; particles still settle"],
      },
    }),
    defineComponent(site, {
      id: "emo-glass-dock",
      name: "Glassmorphic Floating Dock",
      category: "floating-dock",
      summary: "Frosted capsule with brand mark, hover-pill links, a live equalizer sound toggle and a settings button that springs into a rounded panel with a theme switch.",
      tags: ["dock", "glassmorphism", "equalizer", "spring overshoot", "settings panel", "theme toggle"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        easingSource: "easeOutBack-style overshoot from the site CSS, used for the panel and switches",
        duration: "0.55s panel, 0.45s pill",
        triggers: "click",
        notes: "The settings panel scales from 0.2 at its bottom-right origin (near the gear) while its border-radius goes 999px → 24px, so it reads as the button stretching into a sheet. Theme switching swaps a token set (light #F5EFFF / dark #121212) with a 0.7s colour transition.",
        parameters: { Panel: "scale 0.2 → 1 + radius 999 → 24px, 0.55s", Pill: "left/width 0.45s cubic-bezier(0.16, 1, 0.3, 1)", Gear: "rotate 90°, 0.55s spring", Equalizer: "4 bars scaleY 0.3 ↔ 1, 0.6–1.1s", Glass: "blur(20px) saturate(160%)" },
      },
      designTokens: { fontFamilies: [SANS, SERIF, MONO], originalFonts: ORIGINAL, colors: COLORS, materials: ["glass 20px blur", "violet glow blobs", "spring switches"] },
      prompt: {
        structure: [
          "Page content behind (blurred violet/pink blobs, mono kicker, italic serif headline).",
          "Bottom-center nav capsule (p-1.5, fully rounded, glass): 40px violet 'e' mark, link list with a sliding hover pill, equalizer button, gear button, violet CTA.",
          "Settings dialog absolutely positioned above the dock, transform-origin bottom right, containing three role=switch toggles.",
        ],
        fonts: [SANS + " (stand-in for PP Neue Montreal)", SERIF + " italic for display", MONO + " for kickers"],
        colors: "light: bg #F5EFFF, fg #2A1647, glass rgba(255,255,255,.55), border rgba(255,255,255,.75); dark: bg #121212, fg #FFF, glass rgba(24,24,24,.55); primary #9047FF, hover #7114FF",
        entrance: "None.",
        interaction:
          "Gear toggles the panel: transform translateX(−30%) scale(0.2 ↔ 1) over 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s, border-radius 999px ↔ 24px; gear rotates 90°. Links: pill slides to hovered link (0.45s cubic-bezier(0.16, 1, 0.3, 1)). Sound button: bars animate scaleY(0.3↔1) with staggered durations, flatten to 0.25 when muted.",
        polish: ["Glass: background + backdrop-filter blur(20px) saturate(160%) + 1px light border + inset top highlight", "Dark mode transitions page colours over 0.7s"],
        accessibility: ["Gear: aria-expanded + aria-controls; Escape closes; closed panel inert", "Sound: aria-pressed with a changing label", "Toggles use role=switch + aria-checked"],
      },
    }),
    defineComponent(site, {
      id: "emo-audio-gate-loader",
      name: "Audio-Gated Entrance Loader",
      category: "loader",
      summary: "Mono percentage with a hairline violet bar, then a gate: enter with sound or without. Entering wipes the loader away with a clip-path curtain.",
      tags: ["loader", "audio gate", "clip-path", "curtain", "Web Audio pad", "percentage"],
      hasAudio: true,
      motionSpecs: {
        engine: "Web Audio",
        easingCurve: "cubic-bezier(0.65, 0, 0.35, 1)",
        easingSource: "easeInOutCubic from the site CSS, used for the curtain",
        duration: "2.2s load, 1.1s curtain",
        triggers: "entrance",
        notes: "Progress is shaped to feel real: linear to 70% over the first 60% of the time, a stall, then a quadratic finish. 'With sound' builds a pad inside the click handler: A2 / E3 / B3, each as two oscillators detuned ±6 cents, through a 900Hz low-pass, gain ramping in over 1.6s and out by 5.5s. The original uses Howler with main.webm / lofi_loop.webm.",
        parameters: { Progress: "0–70% in 60% of 2.2s, then quadratic", Curtain: "clip-path inset(0 0 0% 0) → inset(0 0 100% 0), 1.1s", "Headline": "translateY 30px → 0, 1.2s (+0.5s), cubic-bezier(0.16, 1, 0.3, 1)", Pad: "A2 E3 B3, ±6 cents, LPF 900Hz, 1.6s in" },
      },
      designTokens: { fontFamilies: [MONO, SERIF, SANS], originalFonts: ORIGINAL, colors: COLORS, materials: ["clip-path curtain", "hairline progress", "pill buttons"] },
      prompt: {
        structure: [
          "Revealed page underneath (#F5EFFF): mono '( 01 ) — Welcome' and a large italic serif headline.",
          "Loader on top (#121212): top row (serif wordmark, mono 'Loading experience'), centre (giant zero-padded mono percentage + gate buttons), bottom (1px track with violet fill, mono footer).",
        ],
        fonts: [MONO + " 300 for the percentage", SERIF + " italic", SANS + " for buttons"],
        colors: "loader #121212, text #FFF, muted #A3A6C1, bar #9047FF on white/15; primary button #9047FF (hover #7114FF), ghost button white/20 border",
        entrance: "Percentage climbs over 2.2s with the stall curve; at 100% the gate fades/rises in (0.6s cubic-bezier(0.16, 1, 0.3, 1)).",
        interaction:
          "Either button: loader clip-path inset(0 0 0% 0) → inset(0 0 100% 0) over 1.1s cubic-bezier(0.65, 0, 0.35, 1); page headline rises 30px and fades in (1.2s, +0.5s). 'With sound' starts the Web Audio pad (or your audio library) from the click.",
        polish: ["Uneven progress feels more believable than linear", "Focus the primary button when the gate appears, but only if nothing else has focus"],
        accessibility: ["role=status, aria-live polite; percentage has an aria-label", "Buttons are not focusable until ready", "Never start audio without a click; offer a clear silent option"],
      },
    }),
  ],
};
