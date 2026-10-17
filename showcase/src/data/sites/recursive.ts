import { defineComponent } from "../define";
import type { WebsiteEntry } from "../types";

const site = { title: "Recursive", theme: "glassmorphic-fintech" as const };

const DISPLAY = "'Outfit', 'Plus Jakarta Sans', sans-serif";
const BODY = "'DM Sans', system-ui, sans-serif";
const NUM = "'Bebas Neue', 'Oswald', sans-serif";
const ORIGINAL = ["Outfit", "DM Sans", "Bebas Neue", "Geist Mono"];
const COLORS = { fog: "#EEF3EB", ink: "#142617", forest: "#1C3320", moss: "#2F5527", leaf: "#5C8C3A", sprout: "#8FC45A", honey: "#E2B93B" };

export const recursive: WebsiteEntry = {
  id: "recursive",
  title: site.title,
  theme: site.theme,
  themeDisplayName: "Clean Glassmorphic Fintech",
  originalUrl: "https://recursive.money/",
  localDevUrl: "http://localhost:5174/",
  repoPath: "fintech/recursive",
  description:
    "Alternative credit scoring for people without a bureau file. Sage-green glass, a liquid pill navbar, split-flap countdown, blur-in scroll copy and calm, numbered FAQs.",
  tagline: "Frosted sage glass for a five-minute credit score.",
  previewThumbnail: "live:rec-liquid-glass-nav",
  techStack: ["React 19", "Vite", "TailwindCSS 4", "TanStack Router", "GSAP", "ScrollTrigger", "Radix UI", "Zustand"],
  palette: ["#EEF3EB", "#142617", "#5C8C3A", "#8FC45A", "#E2B93B"],
  components: [
    defineComponent(site, {
      id: "rec-liquid-glass-nav",
      name: "Liquid Glass Pill Navbar",
      category: "navbar",
      summary: "Floating capsule of frosted glass with a screen-blended sheen, inset highlights and a 2-bar hamburger that morphs into an X.",
      tags: ["glassmorphism", "backdrop-filter", "hamburger morph", "staggered menu", "pill"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: "cubic-bezier(0.22, 1, 0.36, 1)",
        easingSource: "easeOutQuint (the toggle bars use 260ms with this curve in the original)",
        duration: "0.45s bars, 0.4s sheet, 0.05s stagger",
        triggers: "click",
        notes: "Glass recipe from the source: rgba(255,255,255,0.42) + blur(34px) saturate(190%), outer shadow 0 14px 44px rgba(14,30,16,0.24), inset top highlight, plus a 145° white→transparent→green gradient with mix-blend-mode: screen on top.",
        parameters: { "Backdrop": "blur(34px) saturate(190%)", "Fill": "rgba(255,255,255,0.42)", "Bar morph": "±5px translate + ±45° rotate", "Sheet links": "opacity + 14px rise, stagger 0.05s from 0.08s" },
      },
      designTokens: { fontFamilies: [DISPLAY, BODY], originalFonts: ORIGINAL, colors: COLORS, materials: ["frosted glass 34px", "screen-blend sheen", "inset 1px highlights"] },
      prompt: {
        structure: [
          "Fixed nav wrapper (top 16px, centered, max-width 860px). Inside: an isolated, overflow-hidden, fully rounded glass container.",
          "An absolutely positioned sheen span (z-10, pointer-events none) above the glass; the content row (z-20, 56px) holds brand, links, CTA and the toggle.",
          "A separate full-screen glass sheet for mobile with a staggered list of large links.",
        ],
        fonts: [DISPLAY, BODY],
        colors: "page #EEF3EB, ink #142617, CTA #1C3320, link #24472A, sheen tint rgba(143,196,90,0.12); colourful blurred blobs behind so the glass reads",
        entrance: "None for the bar. Sheet: opacity 0→1 over 0.4s; each link opacity + translateY(14px→0) over 0.45s cubic-bezier(0.22, 1, 0.36, 1), delay 0.08s + i×0.05s.",
        interaction: "Toggle: two 2px bars translateY(±5px) and rotate(±45deg) over 0.45s with the same curve. Links: hover background rgba(255,255,255,0.6) over 0.3s. CTA: scale(1.04) on hover.",
        polish: ["Exact glass shadow: 0 14px 44px rgba(14,30,16,0.24), inset 0 1px 1px rgba(255,255,255,0.7), inset 0 -1px 2px rgba(47,85,39,0.08)", "Sheen: linear-gradient(145deg, rgba(255,255,255,.6) 0%, rgba(255,255,255,.06) 32%, transparent 60%, rgba(143,196,90,.12) 100%) with mix-blend-mode: screen"],
        accessibility: ["Toggle has aria-expanded, aria-controls and a changing aria-label", "Closed sheet is inert; Escape closes", "Provide a solid fallback background where backdrop-filter is unsupported"],
      },
    }),
    defineComponent(site, {
      id: "rec-flip-clock",
      name: "Split-Flap Countdown",
      category: "hero",
      summary: "Departure-board countdown: top flap folds, new bottom flap drops, a shadow sweeps the lower half and vapour puffs from the seam.",
      tags: ["flip clock", "split flap", "countdown", "rotateX", "perspective", "keyframes"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: "cubic-bezier(0.16, 0.95, 0.3, 1)",
        easingSource: "Drop flap curve from the source CSS (fold uses cubic-bezier(0.4, 0, 0.7, 1))",
        duration: "260ms fold + 300ms drop",
        triggers: "loop",
        notes: "Perspective lives on the animation wrapper, not the card: the card clips (overflow hidden), and overflow forces transform-style: flat, which would flatten the flaps. Each half shows a full-height numeral aligned to its top or bottom edge, so the two halves line up at the seam with no transforms.",
        parameters: { Fold: "rotateX 0 → −90°, 260ms, cubic-bezier(0.4,0,0.7,1)", Drop: "rotateX 90° → 0, 300ms at +260ms", "Cast shadow": "opacity 0.9 → 0, 560ms", "Vapour": "4 puffs, 800ms, staggered 50ms", "Card": "w = clamp(), h = w × 1.42, radius = w × 0.14" },
      },
      designTokens: { fontFamilies: [NUM, DISPLAY, BODY], originalFonts: ORIGINAL, colors: { ...COLORS, faceTop: "#3A5A31", faceBottom: "#16240F", digit: "#F4F7EC" }, materials: ["split-flap cards", "seam shadow", "blurred radial vapour"] },
      prompt: {
        structure: [
          "Board of 4 groups (Days/Hours/Min/Sec), each two digit cards + a label.",
          "Card = relative cell; inside an overflow-hidden rounded face with top half, bottom half, a seam line and a gloss overlay. During a change, add an animation wrapper with perspective containing a folding top flap (old digit), a dropping bottom flap (new digit) and a cast shadow.",
          "Vapour: an unclipped 1×1 anchor at the card center with four blurred radial-gradient circles.",
        ],
        fonts: [NUM + " for digits", DISPLAY + " for the heading"],
        colors: "top face gradient #3A5A31→#2A4324, bottom #1E3218→#16240F, digits #F4F7EC, page radial #DCEAD8→#EEF3EB",
        entrance: "None; digits render immediately.",
        interaction:
          "On each digit change: fold keyframes rotateX(0→−90deg) 260ms cubic-bezier(0.4, 0, 0.7, 1) with transform-origin 50% 100%; drop keyframes rotateX(90deg→0) 300ms cubic-bezier(0.16, 0.95, 0.3, 1) delayed 260ms with origin 50% 0%; cast shadow fades 0.9→0 over 560ms. Remove the animation layer after 650ms.",
        polish: ["backface-visibility hidden on both flaps", "font-variant-numeric: tabular-nums", "Optional vapour puffs: translate to (--x, --y) and scale to --sc over 800ms"],
        accessibility: ["role=timer with an aria-label like '3 Days, 4 Hours, 7 Min, 12 Sec'; cards aria-hidden", "Reduced motion: hide the animation wrapper and smoke so digits just swap"],
      },
    }),
    defineComponent(site, {
      id: "rec-blur-reveal-words",
      name: "Blur Reveal Words",
      category: "hero",
      summary: "Scroll-scrubbed copy where each word sharpens from a 6px blur, rises 4px and brightens, lagging the scrollbar like GSAP scrub: 0.7.",
      tags: ["scroll reveal", "blur", "scrub", "stagger", "GSAP ScrollTrigger"],
      motionSpecs: {
        engine: "GSAP",
        easingCurve: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        easingSource: "GSAP power1.out per word (plotted as its cubic-bezier equivalent); stagger ease 'none'",
        duration: "Scroll-linked, scrub 0.7s",
        triggers: "scroll-scrub",
        notes: "Original: ScrollTrigger { start: 'top 84%', end: 'bottom 38%', scrub: 0.7 (0.35 on touch) } on a fromTo { opacity: 0.72, y: 4, blur 6px } → { opacity 1, y 0, blur 0 } with stagger.each 0.035 (0.018 on touch). The snippet reproduces it without GSAP: word i's local progress = (t − i×0.035) / 0.5, and the scrub lag is an exponential smoother with τ = scrub / 3.",
        parameters: { "Start → end": "top 84% → bottom 38%", Scrub: "0.7s (0.35 touch)", Stagger: "0.035s (0.018 touch)", "From": "opacity 0.72, y 4px, blur 6px", "Tween": "0.5s, power1.out" },
      },
      designTokens: { fontFamilies: [DISPLAY, BODY], originalFonts: ORIGINAL, colors: COLORS, materials: ["CSS blur filter", "pill kicker", "progress track"] },
      prompt: {
        stack: "React 18 + TailwindCSS (GSAP + ScrollTrigger optional; include a no-GSAP fallback) — or Vanilla HTML5 + CSS + JS",
        structure: ["Section with a small pill kicker and one or more large paragraphs.", "Split every word into an inline-block span (keep a trailing non-breaking space)."],
        fonts: [DISPLAY + " 600, tracking −0.02em", BODY],
        colors: "page #EEF3EB, text #142617, pill text #2D6325 on white/60 with a #5C8C3A dot",
        entrance: "None; scroll-linked.",
        interaction:
          "GSAP: timeline({ scrollTrigger: { trigger, start: 'top 84%', end: 'bottom 38%', scrub: 0.7 } }).fromTo(words, { opacity: 0.72, y: 4, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'power1.out', stagger: { each: 0.035, ease: 'none' } }). On touch/small screens use scrub 0.35 and stagger 0.018.",
        polish: ["force3D / translate3d on words", "Refresh ScrollTrigger after fonts load and after any intro overlay finishes"],
        accessibility: ["Words stay real text", "Reduced motion: set final state immediately and skip the timeline"],
      },
    }),
    defineComponent(site, {
      id: "rec-faq-accordion",
      name: "Numbered FAQ Accordion",
      category: "accordion",
      summary: "Bebas-numbered questions with a round chevron button; panels animate height with grid-template-rows 0fr → 1fr, one open at a time.",
      tags: ["accordion", "grid-template-rows", "height auto", "FAQ", "chevron"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: "cubic-bezier(0.22, 1, 0.36, 1)",
        easingSource: "easeOutQuint",
        duration: "0.45s height, 0.3s chevron",
        triggers: "click",
        notes: "Height animation needs no JavaScript measuring: the panel is a grid whose single row transitions 0fr → 1fr, and the child has min-height: 0 + overflow hidden. The answer text fades in 0.1s after the panel starts opening.",
        parameters: { Height: "grid-template-rows 0fr → 1fr, 0.45s", Chevron: "rotate 180°, 0.3s", "Answer": "opacity 0.35s (+0.1s delay), translateY −6px → 0" },
      },
      designTokens: { fontFamilies: [NUM, DISPLAY, BODY], originalFonts: ORIGINAL, colors: { ...COLORS, rule: "rgba(47,85,39,0.2)" }, materials: ["hairline dividers", "white/80 round icon button"] },
      prompt: {
        structure: ["Heading, then a list with a top rule; each item has a bottom rule.", "Item: h3 > button (number + question + round chevron), then a region panel built as a one-row grid."],
        fonts: [NUM + " for numbers (24–36px, #2F5527)", BODY + " bold for questions", DISPLAY + " for the heading"],
        colors: "page #EEF3EB, text #121A12, rules rgba(47,85,39,0.2), numbers/hover #2F5527, chevron button white/80 with a #2F5527/15 border",
        entrance: "None.",
        interaction: "Click toggles; opening one closes the others. Panel grid-template-rows 0fr↔1fr over 0.45s cubic-bezier(0.22, 1, 0.36, 1); chevron rotate(180deg) over 0.3s; row hover background white/50.",
        polish: ["Answer text indented to align with the question, not the number"],
        accessibility: ["button aria-expanded + aria-controls; panel role=region aria-labelledby", "Buttons live inside h3 so headings navigation works"],
      },
    }),
  ],
};
