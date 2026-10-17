import { defineComponent } from "../define";
import type { WebsiteEntry } from "../types";

const site = { title: "Alan Menken", theme: "cinematic-serif" as const };

const SERIF = "'Playfair Display', 'Clearface ITC', Georgia, serif";
const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";
const ORIGINAL = ["Clearface ITC W01 (inlined base64 WOFF)"];
const COLORS = { linen: "#E7E5DF", ink: "#1A1917", night: "#0D0C0B" };
const EASE = "cubic-bezier(0.6, 0, 0.1, 1)";
const EASE_SOURCE = 'GSAP CustomEase.create("custom", "M0,0 C0.6,0 0.1,1 1,1"), read from the site bundle';

export const alanMenken: WebsiteEntry = {
  id: "alanmenken",
  title: site.title,
  theme: site.theme,
  themeDisplayName: "Cinematic Storybook & Musical Orchestration",
  originalUrl: "https://www.alanmenken.com/",
  localDevUrl: "http://localhost:3002/",
  repoPath: "portfolio/alanmenken",
  description:
    "The EGOT composer's site opens like a film: a signature draws itself, sound unlocks on your first click, and ten Disney and Broadway works sit in a cinematic strip accordion on warm linen.",
  tagline: "A signature, a downbeat, and ten strips of film.",
  previewThumbnail: "live:am-strip-accordion",
  techStack: ["HTML5", "CSS3", "GSAP", "CustomEase", "DrawSVG", "HTML5 video + audio sync"],
  palette: ["#E7E5DF", "#1A1917", "#0D0C0B"],
  components: [
    defineComponent(site, {
      id: "am-signature-splash",
      name: "Signature Draw Splash",
      category: "loader",
      summary: "Dark splash asks for sound while a handwritten signature draws itself; the Enter ring draws, and clicking plays a rolled chord and fades to linen.",
      tags: ["signature", "SVG draw", "stroke-dashoffset", "audio unlock", "Web Audio", "splash"],
      hasAudio: true,
      motionSpecs: {
        engine: "Web Audio",
        easingCurve: EASE,
        easingSource: EASE_SOURCE,
        duration: "2.2s draw, 0.4s ring, 0.9s fade",
        triggers: "entrance",
        notes:
          "Original uses GSAP DrawSVG with this CustomEase (drawSVG over 0.4s for the ring). Browsers block audio until a user gesture, so the Enter click is the audio unlock: the AudioContext is created inside the handler. The chord is a rolled Cmaj9 of triangle waves, 60ms apart, with a 3s exponential decay.",
        parameters: { "Signature": "stroke-dashoffset 1 → 0, 2.2s, +0.3s delay", "Flourish": "0.9s at 2.1s", "Ring": "0.4s once drawn", "Fade out": "opacity 0.9s", "Chord": "C4 E4 G4 B4 D5, triangle, 60ms roll" },
      },
      designTokens: { fontFamilies: [SERIF, SANS], originalFonts: ORIGINAL, colors: COLORS, materials: ["SVG pen stroke", "dark cinematic splash", "procedural audio"] },
      prompt: {
        structure: [
          "Two layers: the linen page (centered italic serif name + credits) and a dark splash on top.",
          "Splash: italic hint line, an SVG signature (one long cursive path + an underline flourish, both pathLength=1), a 64px round Enter button with an SVG ring (rotated −90°) and a play triangle, and a tiny 'Enter' label.",
        ],
        fonts: [SERIF + " (stand-in for Clearface ITC)", SANS + " for micro labels"],
        colors: "splash #0D0C0B with #E7E5DF strokes/text, page #E7E5DF with #1A1917 text",
        entrance: `Hint fades to 0.75 opacity (0.8s, +0.2s). Signature stroke-dashoffset 1→0 over 2.2s ${EASE} (+0.3s); flourish 0.9s at 2.1s. At ~2.9s the button ring draws in 0.4s and the play icon fades in.`,
        interaction: "Click Enter: create an AudioContext, play the chord (master gain ramps to 0.18 then decays over 3.2s), and fade the splash out over 0.9s, then hide it with visibility.",
        polish: ["Play icon scales 1.1 on hover", "Respect a muted flag; never autoplay audio"],
        accessibility: ["Enter is a real button with aria-label 'Enter site with sound'; disabled until ready", "Signature SVG role=img with aria-label", "Reduced motion: show everything drawn and ready"],
      },
    }),
    defineComponent(site, {
      id: "am-strip-accordion",
      name: "Musical Strip Accordion",
      category: "accordion",
      summary: "Ten poster strips in one row; hovering a strip grows it to 7× with the site's CustomEase and reveals a storybook-serif title card over drifting 'footage'.",
      tags: ["accordion", "flex-grow", "strips", "hover expand", "vertical text", "container query"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: EASE,
        easingSource: EASE_SOURCE,
        duration: "0.8s",
        triggers: "hover",
        notes: "Strips use flex: 1 1 0 and only flex-grow changes (1 → 7), so the row always fills its width and neighbours shrink together. Under ~670px the row becomes a column and the same flex-grow drives height. The original cross-fades a video on hover; the snippet uses a drifting gradient as a stand-in.",
        parameters: { "Grow": "flex-grow 1 → 7, 0.8s", "Card in": "opacity 0.5s (+0.25s), translateY 16px → 0 0.8s (+0.2s)", "Collapsed label": "fade 0.4s", "Footage drift": "background-position, 8s alternate" },
      },
      designTokens: {
        fontFamilies: [SERIF, SANS],
        originalFonts: ORIGINAL,
        colors: { ...COLORS, aladdin: "#2B2F8F", mermaid: "#2AA6A0", beauty: "#D4A72C", tangled: "#F2C14E" },
        materials: ["poster gradients", "vertical-rl titles", "frosted Listen pill"],
      },
      prompt: {
        structure: [
          "A ul flex row (3px gap) of 10 li strips with flex-basis 0, min-width 26px, 3px radius, overflow hidden.",
          "Each strip is a link containing: an absolutely positioned footage layer (video or gradient), a soft radial sheen, a collapsed label (vertical-rl italic title + number) and an expanded card (year · role, large italic title, Listen pill).",
        ],
        fonts: [SERIF + " italic for titles", SANS + " for year/role micro labels"],
        colors: "linen #E7E5DF around the row; each work has its own two-stop poster gradient; text #FFF",
        entrance: "None; one strip (Aladdin) starts expanded.",
        interaction: `On hover/focus: flex-grow 1→7 over 0.8s ${EASE}; collapsed label opacity→0 in 0.4s; card opacity→1 (0.5s, +0.25s delay) and translateY(16px→0) (0.8s, +0.2s); footage desaturation lifts. Mouse leaving the row returns to the default strip.`,
        polish: ["Inactive strips: saturate(0.55) brightness(0.85)", "Swap the gradient for a muted looping <video> to match the original"],
        accessibility: ["Strips are links with aria-label 'Title, Year'; focus expands them the same as hover", "Reduced motion: no transitions or drift"],
      },
    }),
    defineComponent(site, {
      id: "am-view-switcher",
      name: "Strip / Grid Pill Switcher",
      category: "floating-dock",
      summary: "A floating pill with a sliding thumb flips the works between strips and a grid; every tile glides to its new spot with a FLIP animation.",
      tags: ["FLIP", "layout animation", "segmented control", "Web Animations API", "floating pill"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: EASE,
        easingSource: EASE_SOURCE,
        duration: "0.8s FLIP, 0.6s thumb",
        triggers: "click",
        notes: "FLIP: record each tile's rect (First), switch the layout class, read rects again (Last), then animate from translate(Δx, Δy) scale(w0/w1, h0/h1) to none (Invert, Play) with element.animate(). Done in useLayoutEffect so the jump is never painted. If an ancestor is CSS-scaled, divide the deltas by that scale.",
        parameters: { "FLIP duration": "800ms", "Thumb": "translateX 0 → 100%, 0.6s", "Grid": "5 columns (3 when narrow), 8px gap", "Strips": "flex 1, 3px gap" },
      },
      designTokens: { fontFamilies: [SERIF, SANS], originalFonts: ORIGINAL, colors: COLORS, materials: ["ink pill with linen thumb", "transform-origin top left tiles"] },
      prompt: {
        structure: ["Header row: italic 'Selected works' + '42 works' counter.", "Tile list that renders as a flex row (strips) or a CSS grid.", "Fixed/absolute bottom-center pill: role=radiogroup with a sliding thumb span and two radio buttons with icons."],
        fonts: [SERIF + " italic", SANS + " 12px for the pill"],
        colors: "linen #E7E5DF, pill #1A1917 with #E7E5DF thumb; active label turns #1A1917",
        entrance: "None.",
        interaction: `On switch: FLIP every tile over 800ms ${EASE} (transform-origin top left); thumb translateX(0↔100%) over 0.6s with the same curve; labels cross-fade colour over 0.5s.`,
        polish: ["Strip titles switch to vertical-rl, grid titles sit bottom-left", "Tile backgrounds: work colour → #120F0C gradient"],
        accessibility: ["role=radiogroup / role=radio with aria-checked", "List aria-label announces the current view", "Reduced motion: switch instantly"],
      },
    }),
  ],
};
