import { defineComponent } from "../define";
import type { WebsiteEntry } from "../types";

const site = { title: "The Design Society", theme: "brutalist-pixel" as const };

const PIXEL = "'Silkscreen', 'VT323', monospace";
const MONO = "'Geist Mono', ui-monospace, monospace";
const ORIGINAL = ["FK Raster Roman Compact", "Geist Pixel", "KH Teka", "KH Interference"];
const COLORS = { blue: "#350AFF", lime: "#BCF015", ink: "#000000", paper: "#FFFFFF", fog: "#F2F2F2" };

export const theDesignSociety: WebsiteEntry = {
  id: "thedesignsociety",
  title: site.title,
  theme: site.theme,
  themeDisplayName: "Brutalist Pixel & Kinetic Editorial",
  originalUrl: "https://www.thedesignsociety.fr/",
  localDevUrl: "http://localhost:5173/",
  repoPath: "portfolio/thedesignsociety",
  description:
    "A secret society of designers from Lyon. Pixel raster type, CRT scanlines and chromatic aberration, a cursor-tracking eye, kinetic scroll typography and a pixel-curtain page router.",
  tagline: "Pixel curtains, CRT grain and a cursor-tracking eye.",
  previewThumbnail: "live:ds-boot-curtain-loader",
  techStack: ["HTML5", "Vanilla CSS", "JavaScript", "GSAP 3.12", "CustomEase", "Lenis"],
  palette: ["#350AFF", "#BCF015", "#000000", "#FFFFFF"],
  components: [
    defineComponent(site, {
      id: "ds-boot-curtain-loader",
      name: "Boot Curtain Loader",
      category: "loader",
      summary: "Terminal boot counter and rising pixel wordmark, then a grid of electric-blue pixels pops away in random order.",
      tags: ["pixel transition", "page loader", "counter", "stagger", "CustomEase", "curtain"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: "cubic-bezier(0.625, 0.05, 0, 1)",
        easingSource: "Site-wide CustomEase used by the GSAP loader timeline (13 uses in the recreation)",
        duration: "2.4s count + 0.9s curtain",
        triggers: "entrance",
        notes:
          "Original: a GSAP timeline with defaults { ease: 'loader', duration: 3 }, SplitText chars rising with stagger 0.02, then the background slides yPercent -101 over 1s. The curtain cells disappear instantly (0s transition) at randomized delays, which reads as pixels popping rather than fading.",
        parameters: {
          "Counter curve": "easeOutQuart over 2400ms",
          "Char rise": "0.6s, stagger 0.02s, translateY 110% → 0",
          "Curtain grid": "14 × 9 cells",
          "Cell pop": "opacity 0s at (rank / cells) × 900ms",
          "Hold before curtain": "350ms",
        },
      },
      designTokens: { fontFamilies: [PIXEL, MONO], originalFonts: ORIGINAL, colors: COLORS, materials: ["pixel grid", "terminal boot screen", "hard-edged progress bar"] },
      prompt: {
        structure: [
          "Root: relative, full-size container. Layer 1 = the revealed page; layer 2 = absolutely positioned CSS grid of 14×9 blue cells; layer 3 = black boot screen.",
          "Boot screen: flex column, space-between. Top row: 'Booting_' left and a zero-padded 3-digit percentage right. Middle: the wordmark split into one span per character, each inside an overflow:hidden mask. Bottom: a 3px progress bar scaled with scaleX.",
          "Expose onComplete and a loop flag; keep timers in refs and clear them on unmount.",
        ],
        fonts: [PIXEL + " (stand-in for FK Raster Roman Compact)", MONO],
        colors: "boot background #000, text #FFF, progress #BCF015, pixel cells #350AFF, revealed page #FFF with #350AFF headline",
        entrance:
          "Counter 0→100 over 2400ms with easeOutQuart; characters rise translateY(110%)→0 in 0.6s cubic-bezier(0.625, 0.05, 0, 1), stagger 0.02s; 350ms hold; boot screen hides, then each grid cell vanishes with a 0s opacity transition delayed by (shuffledRank / totalCells) × 900ms.",
        interaction: "None during boot. Reshuffle the cell order on every replay so the pattern never repeats.",
        polish: ["Pixel font with crisp edges, no anti-aliased fades on the curtain", "Optional: tie the counter to real asset loading progress"],
        accessibility: ["role=status + aria-live=polite on the boot screen, aria-busy on the root while booting", "aria-label with the full wordmark on the split heading"],
      },
    }),
    defineComponent(site, {
      id: "ds-eye-nav",
      name: "Two-Step Eye Navigation",
      category: "navbar",
      summary: "Floating brutalist bar with a pixel eye that tracks the cursor and blinks; the drawer opens width-first, then height, with scrambling links.",
      tags: ["cursor tracking", "text scramble", "drawer", "two-step", "blink", "lerp"],
      motionSpecs: {
        engine: "rAF",
        easingCurve: "cubic-bezier(0.625, 0.05, 0, 1)",
        easingSource: "Site CustomEase, applied to the width and grid-row transitions",
        duration: "0.5s width → 0.55s height",
        triggers: "click",
        notes:
          "The drawer is two sequential CSS transitions: width first, then grid-template-rows 0fr→1fr after a 0.35s delay. Closing reverses the delays. The pupil is lerped every frame toward a target clamped to a 5-unit radius.",
        parameters: {
          "Pupil lerp": "0.15 per frame",
          "Pupil max travel": "5 SVG units (distance / 12, clamped)",
          "Blink": "every 3.8s, lid scaleY 0→1→0 in 140ms",
          "Step delay": "0.35s",
          "Scramble": "resolves left→right, 1 char per 1.6 frames",
        },
      },
      designTokens: { fontFamilies: [PIXEL, MONO], originalFonts: ORIGINAL, colors: COLORS, materials: ["2px black outline", "hard offset shadow 4px 4px 0 #000", "pixel SVG eye"] },
      prompt: {
        structure: [
          "Centered floating nav (top: 12px) with 2px black border, 6px radius, hard shadow 4px 4px 0 #000.",
          "Bar row (48px): square 'DS' logo, inline SVG eye (pupil group + lid rect), black 'Menu' button.",
          "Below the bar: a grid wrapper (grid-template-rows 0fr/1fr) holding a min-height:0 overflow:hidden list of large pixel-font links.",
        ],
        fonts: [PIXEL, MONO],
        colors: "bar #FFF on page #F2F2F2, ink #000, pupil #350AFF with #BCF015 highlight, link hover #350AFF",
        entrance: "None on load. Open: width 360px→560px over 0.5s cubic-bezier(0.625, 0.05, 0, 1), then rows 0fr→1fr over 0.55s after 0.35s. Close runs the same steps in reverse order.",
        interaction:
          "Pupil: on pointermove compute the vector from eye center, clamp length to min(d/12, 5), lerp current→target by 0.15 each rAF. Links: on hover/focus scramble glyphs from '!<>-_\\/[]{}=+*^?#█▓▒░' and resolve left to right.",
        polish: ["Lid blink every 3.8s (scaleY with transform-origin at the top)", "Label swaps Menu ↔ Fermer"],
        accessibility: ["aria-expanded + aria-controls on the toggle, Escape closes", "Closed drawer is inert so hidden links are not tabbable", "Scrambled text is aria-hidden; the link keeps an aria-label with the real text"],
      },
    }),
    defineComponent(site, {
      id: "ds-kinetic-manifesto",
      name: "Kinetic Scroll Manifesto",
      category: "hero",
      summary: "Pinned pixel-type manifesto: words slide in and light up as you scroll, key words get a lime highlighter.",
      tags: ["scroll-driven", "kinetic typography", "sticky", "word reveal", "highlighter"],
      motionSpecs: {
        engine: "rAF",
        easingCurve: "cubic-bezier(0.625, 0.05, 0, 1)",
        easingSource: "Site CustomEase for the marker; word progress itself is linear in scroll",
        duration: "Scroll-linked (320% section height)",
        triggers: "scroll-scrub",
        notes:
          "Each word i has progress p = clamp((scroll × (N + spread) − i) / spread) with spread = 3, so about three words are mid-transition at any point. Opacity 0.12→1 and translateX 0.6em→0 follow p directly; the highlighter snaps in with a 0.5s transition once p reaches 1.",
        parameters: { "Section height": "320% of viewport", Spread: "3 words", "Opacity range": "0.12 → 1", "Slide": "0.6em → 0", "Marker": "scaleX 0→1, 0.5s" },
      },
      designTokens: { fontFamilies: [PIXEL, MONO], originalFonts: ORIGINAL, colors: { ...COLORS, ink: "#0A0A0A" }, materials: ["sticky stage", "lime marker highlight", "scroll progress hairline"] },
      prompt: {
        structure: [
          "A tall section (≈320vh) with a sticky 100vh stage inside.",
          "Stage: small mono kicker, then a flex-wrap paragraph where every word is its own inline-block span, then a 1px progress line.",
          "Marked words carry an absolutely positioned lime block behind the text (scaleX from the left).",
        ],
        fonts: [PIXEL, MONO],
        colors: "background #0A0A0A, text #FFF, marker #BCF015 with text flipping to #000, progress #350AFF",
        entrance: "None; everything is scroll-linked.",
        interaction:
          "progress = -rect.top / (rect.height - innerHeight); per word p = clamp((progress × (N+3) − i) / 3); opacity = 0.12 + 0.88p; transform translate3d((1−p)×0.6em,0,0). Marker transitions scaleX 0→1 in 0.5s cubic-bezier(0.625, 0.05, 0, 1) once p ≥ 1.",
        polish: ["Use translate3d + will-change for 60fps", "Batch DOM writes inside one rAF per scroll event"],
        accessibility: ["Text stays real DOM text, readable by screen readers at all times", "Reduced motion: render all words fully lit"],
      },
    }),
    defineComponent(site, {
      id: "ds-marquee-footer",
      name: "Kinetic Marquee Footer",
      category: "footer",
      summary: "Giant wordmark that tilts in 3D toward the cursor, tilted sticker links, a lime infinite marquee and copy-to-clipboard email.",
      tags: ["marquee", "3D tilt", "perspective", "stickers", "clipboard", "lerp"],
      motionSpecs: {
        engine: "rAF",
        easingCurve: "cubic-bezier(0.625, 0.05, 0, 1)",
        easingSource: "Site CustomEase for the copy feedback swap",
        duration: "18s marquee loop",
        triggers: "hover",
        notes:
          "Pointer position is normalised to −1…1 and lerped by 0.08 per frame into rotateY(x×14°) rotateX(−y×18°) skewX(x×−6°) with perspective(700px). The marquee duplicates its content and translates −50% so the loop is seamless.",
        parameters: { "Tilt lerp": "0.08", "rotateY range": "±14°", "rotateX range": "±18°", Perspective: "700px", Marquee: "translateX 0 → −50%, 18s linear" },
      },
      designTokens: { fontFamilies: [PIXEL, MONO], originalFonts: ORIGINAL, colors: COLORS, materials: ["sticker cards with hard shadows", "rotated marquee band", "3D perspective type"] },
      prompt: {
        structure: [
          "Footer: black, flex column justify-end, overflow hidden.",
          "Top-left: three rotated sticker links (lime / blue / white). Top-right: email button with two stacked labels in an overflow mask.",
          "Center-bottom: two-line wordmark in the pixel font with transform-origin bottom; below: a −2° rotated lime band containing the marquee track; legal row at the very bottom.",
        ],
        fonts: [PIXEL, MONO],
        colors: "background #000, text #FFF, band #BCF015 with #000 text and #350AFF separators",
        entrance: "None. Marquee runs continuously: duplicated content, translate3d(−50%) over 18s linear infinite.",
        interaction:
          "Wordmark: normalise pointer to −1…1, lerp 0.08 per rAF into perspective(700px) rotateY(x×14deg) rotateX(−y×18deg) skewX(x×−6deg); ease back to 0 on pointerleave. Stickers: hover translateY(−4px) and rotate to 0 over 0.3s. Email: on click write to clipboard and swap labels with translateY(±110%) over 0.5s cubic-bezier(0.625, 0.05, 0, 1).",
        polish: ["Stickers keep a hard white 3px offset shadow", "Feedback reverts after 1.6s"],
        accessibility: ["Marquee track is aria-hidden; the band has an aria-label listing the words", "Copy button announces via aria-live", "Reduced motion stops the marquee and the tilt"],
      },
    }),
  ],
};
