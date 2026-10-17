import { defineComponent } from "../define";
import type { WebsiteEntry } from "../types";

const site = { title: "Don't Look Up", theme: "gamified-canvas" as const };

const DISPLAY = "'Luckiest Guy', 'Marsipan', cursive";
const BODY = "'Nunito', system-ui, sans-serif";
const ORIGINAL = ["Marsipan", "Luckiest Guy", "Nunito (variable 400–800)"];
const COLORS = { paper: "#F4F3EF", ink: "#14140F", red: "#C0342A", coinLight: "#F8E08A", coin: "#F2C31A", coinDark: "#C98F06", convert: "#9ABEEF", follow: "#2B5A9B" };

export const dontLookUp: WebsiteEntry = {
  id: "dontlookup",
  title: site.title,
  theme: site.theme,
  themeDisplayName: "Gamified Three.js & Canvas Satire",
  originalUrl: "https://www.dontlookup.app/",
  localDevUrl: "http://localhost:3003/",
  repoPath: "media/dontlookup",
  description:
    "A satirical Three.js game: you are a giant standing on a crowd, keeping them distracted so they keep paying. Cartoon type, hard ink shadows, CSS coin physics and 100% synthesised sound.",
  tagline: "Keep them distracted. Keep them paying.",
  previewThumbnail: "live:dlu-coin-pile-loader",
  techStack: ["Three.js", "GLTF / Draco", "Raycasting", "Web Audio API", "CSS 3D keyframes", "Vite"],
  palette: ["#F4F3EF", "#14140F", "#F2C31A", "#C0342A", "#9ABEEF"],
  components: [
    defineComponent(site, {
      id: "dlu-coin-pile-loader",
      name: "CSS Coin Pile Loader",
      category: "loader",
      summary: "Coins drop one by one and stack into three wobbly columns, then the pile fades and it starts again. Pure CSS, generated keyframes.",
      tags: ["coin drop", "CSS keyframes", "loader", "stacking", "bounce", "no-JS animation"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: "cubic-bezier(0.4, 0, 0.9, 0.42)",
        easingSource: "Fall curve from the source keyframes (accelerates like gravity), then ease-out for the bounce",
        duration: "5s cycle, 0.13s per coin",
        triggers: "loop",
        notes:
          "The original's comment explains the trick: no animation-delay. A delay gives every coin its own cycle boundary, so the first coin would fall again before the last one landed. Instead every coin shares one 5s cycle and its keyframe percentages are offset by i × 0.13s. A separate pilewipe animation (opacity 1 until 85%, 0 by 93%) clears the pile.",
        parameters: { Cycle: "5s, shared by all coins", Stagger: "0.13s per coin (as keyframe offset)", "Fall": "−200px, 1.05s", "Bounce": "−8px at +0.1s, settle at +0.2s", "Stack step": "12px per coin", "Wipe": "opacity 85% → 93%" },
      },
      designTokens: { fontFamilies: [DISPLAY, BODY], originalFonts: ORIGINAL, colors: COLORS, materials: ["ink-outlined coins", "hard 2px 3px shadows", "text-stroke wordmark"] },
      prompt: {
        structure: [
          "Centered column: stroked cartoon wordmark, a 180×150 pile container, and a pill status label with animated dots.",
          "18 coin spans absolutely positioned at bottom center. Each coin = ::after face (radial gold gradient, 2px ink border, elliptical) + ::before darker edge offset 6px below.",
          "Generate one @keyframes per coin in JS (or a build step) from a layout list of [column, height].",
        ],
        fonts: [DISPLAY + " for the wordmark (text-stroke 2px ink, shadow 3px 4px 0 ink)", BODY + " 800 for the label"],
        colors: "paper #F4F3EF, ink #14140F, coin #F8E08A → #F2C31A → #C98F06",
        entrance: "Loop only.",
        interaction:
          "Per coin i with start s = i×0.13s on a 5s cycle: 0%…s at translate3d(x, lift − 200px, 90px) rotate(spin), opacity 0, timing cubic-bezier(0.4, 0, 0.9, 0.42); s+0.08s opacity 1; s+1.05s land at translate3d(x, lift, h px) rotate(tilt) with ease-out; s+1.15s up 8px; s+1.25s→100% landed. lift = −height × 12px. Pile container runs opacity 1→0 between 85% and 93%.",
        polish: ["z-index = height × 3 + 1 so higher coins overlap lower ones", "Dots: content '' → '...' with steps(4) over 1.4s"],
        accessibility: ["role=status with readable label text; coins aria-hidden", "Reduced motion: show the finished pile, no animation"],
      },
    }),
    defineComponent(site, {
      id: "dlu-wealth-hud",
      name: "Wealth HUD & Danger Meter",
      category: "navbar",
      summary: "Neo-brutalist game HUD: ticking wealth counter, bobbing +$/s sticker, timer, and a 'looking up' meter that triggers a flashing alarm banner past 70%.",
      tags: ["HUD", "counter", "meter", "alarm", "neo-brutalism", "game UI"],
      motionSpecs: {
        engine: "rAF",
        easingCurve: "cubic-bezier(0.2, 1.5, 0.32, 1)",
        easingSource: "Overshooting 'pop' curve from the source CSS, used for the banner drop and button kick",
        duration: "0.5s banner, 900ms alarm pulse",
        triggers: "loop",
        notes: "Values advance with real elapsed time (dt), not per frame, so the counter is correct at any refresh rate. Source keyframes: urgent (background #000 ↔ #C0342A, 900ms), feeBob (translateY 0 → −6px with −1.1° tilt, 2.3s), feePlus (press into the shadow).",
        parameters: { "Danger rise": "+7.5 per second", "Distract": "−38 danger for $50k", "Warn / alarm": "≥ 40 / ≥ 70", "Banner": "translateY −110% → 0, 0.5s pop", "Bob": "2.3s ease-in-out" },
      },
      designTokens: { fontFamilies: [DISPLAY, BODY], originalFonts: ORIGINAL, colors: COLORS, materials: ["2px ink borders", "2px 3px 0 ink shadows", "12px radii"] },
      prompt: {
        structure: [
          "Alarm banner absolutely positioned at the top (hidden at translateY(−110%)).",
          "HUD row of white cards: wordmark, wealth (coin icon + label + big number + bobbing rate sticker), timer.",
          "Meter card: label row (👀 Looking up + status text) and a pill track with a fill bar. A big 'Distract' button below.",
        ],
        fonts: [DISPLAY + " for numbers and buttons", BODY + " 800 for labels"],
        colors: "paper #F4F3EF, ink #14140F, coin gold #F2C31A, calm #9ABEEF, warning text #8A5D02, alarm #C0342A, calm text #2B5A9B",
        entrance: "None.",
        interaction:
          "rAF loop with dt: wealth += rate × dt, danger += 7.5 × dt. Fill colour: <40 #9ABEEF, <70 #F2C31A, else #C0342A. ≥70: banner slides in over 0.5s cubic-bezier(0.2, 1.5, 0.32, 1) and pulses background #000↔#C0342A every 900ms. Distract: −$50k, danger −38, button kicks scale 1.12 in 0.4s. Button :active translate(2px,3px) and loses its shadow.",
        polish: ["tabular-nums on every number", "Rate sticker bobs: translateY(0 ↔ −6px) rotate(−1.1deg), 2.3s"],
        accessibility: ["role=meter with aria-valuenow/min/max", "Banner role=alert, aria-hidden while hidden", "Timer has an aria-label in seconds"],
      },
    }),
    defineComponent(site, {
      id: "dlu-distraction-dock",
      name: "Distraction Launcher Dock",
      category: "floating-dock",
      summary: "Tilted sticker-card dock with springy overshoot; buying a prop presses the card into its shadow, drops it on stage and plays procedural Web Audio SFX.",
      tags: ["Web Audio", "procedural sound", "dock", "spring hover", "game shop", "oscillator"],
      hasAudio: true,
      motionSpecs: {
        engine: "Web Audio",
        easingCurve: "cubic-bezier(0.2, 1.5, 0.32, 1)",
        easingSource: "Pop curve from the source CSS (y2 = 1.5 overshoots ~10%)",
        duration: "0.35s hover, 0.6s land",
        triggers: "click",
        notes: "Every sound is synthesised: no audio files. 'Place' = a sine thud sweeping 180 → 48Hz over 0.28s plus two square-wave clinks (G6, C7). 'Deny' = a sawtooth buzz 140 → 90Hz. One AudioContext is created lazily on the first click to satisfy autoplay policy.",
        parameters: { Hover: "translateY(−10px) rotate(0) scale(1.06), 0.35s pop", Press: "translate(2px, 3px), shadow → 0, 0.08s", Thud: "sine 180 → 48Hz, 0.28s, gain 0.5", Clink: "square 1568Hz + 2093Hz, 0.07/0.12s", Deny: "sawtooth 140 → 90Hz + 0.4s shake" },
      },
      designTokens: { fontFamilies: [DISPLAY, BODY], originalFonts: ORIGINAL, colors: COLORS, materials: ["sticker cards ±2.5° tilt", "dashed stage", "emoji props (GLB models in the original)"] },
      prompt: {
        structure: ["Top row: 'Distracted: N%' chip and a wallet chip with a coin.", "Stage area (dashed border) where the last bought prop lands.", "Bottom dock: horizontally scrollable list of 72px card buttons (emoji, name, cost pill), alternating ±2.5° rotation."],
        fonts: [DISPLAY + " for names and wallet", BODY + " 800–900 for chips"],
        colors: "paper #F4F3EF, ink #14140F, cost pill #F2C31A, white cards with 2px ink border and 2px 3px 0 ink shadow",
        entrance: "Prop lands: translateY(−120%) scale(0.6) → none over 0.6s cubic-bezier(0.2, 1.4, 0.35, 1).",
        interaction:
          "Card hover/focus: translateY(−10px) rotate(0) scale(1.06) over 0.35s cubic-bezier(0.2, 1.5, 0.32, 1). Click: press into the shadow for 140ms; if affordable play place SFX, deduct cost, raise distraction, drop the prop; else play deny SFX and shake (±6px, 0.4s). Wallet refills +5 every 600ms.",
        polish: ["Build each SFX as oscillator → gain with setValueAtTime + exponentialRampToValueAtTime envelopes", "Close the AudioContext on unmount"],
        accessibility: ["Cards are buttons with aria-label including cost and affordability", "Wallet is aria-live polite", "Honour a global mute flag", "Reduced motion: no hover lift or landing animation"],
      },
    }),
  ],
};
