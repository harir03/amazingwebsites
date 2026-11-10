import { defineComponent } from "../define";
import type { WebsiteEntry } from "../types";

const site = { title: "Extrafazant", theme: "kinetic-video-editorial" as const };

const SANS = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";
const ORIGINAL = ["Helvetica Now Subset", "Serrif Subset", "Inter"];
const COLORS = {
  offWhite: "#F4F4F4",
  black: "#101010",
  blue: "#0038FF",
  pink: "#FF77CD",
  yellow: "#FEE897",
  orange: "#FF5F04",
  crimson: "#D82234",
};

const OSMO_EASE = "cubic-bezier(0.625, 0.05, 0, 1)";
const MOVE_EASE = "cubic-bezier(0.3, 0.075, 0, 1)";
const POWER4_EASE = "cubic-bezier(0.25, 1, 0.5, 1)";

export const extrafazant: WebsiteEntry = {
  id: "extrafazant",
  title: site.title,
  theme: site.theme,
  themeDisplayName: "Kinetic Video & Playful Motion Editorial",
  originalUrl: "https://www.extrafazant.nl/",
  localDevUrl: "http://localhost:3008/",
  repoPath: "portfolio/extrafazant",
  description:
    "An energetic Dutch creative production studio and animation agency creating high-impact social content, 2D/3D motion graphics, brand films, and kinetic digital experiences with cursor-reactive physics, 3D pinned stack decks, and momentum inertia cards.",
  tagline: "Brengt je merk in beweging: cursor velocity physics, 3D card decks, and playful motion editorial.",
  previewThumbnail: "live:ef-cursor-cards-hero",
  techStack: ["Webflow", "GSAP", "Lenis", "Barba.js", "CustomEase", "InertiaPlugin"],
  palette: ["#0038FF", "#FF77CD", "#FEE897", "#101010"],
  components: [
    defineComponent(site, {
      id: "ef-cursor-cards-hero",
      name: "Velocity Tilt & Cycling Cursor Hero",
      category: "hero",
      summary:
        "High-contrast editorial hero featuring a floating preview card that tracks pointer velocity with responsive rotational tilts and cycles through portfolio cases upon cumulative cursor distance.",
      tags: ["cursor", "velocity", "tilt", "hero", "case switcher", "motion", "creative studio", "editorial"],
      motionSpecs: {
        engine: "GSAP",
        easingCurve: POWER4_EASE,
        easingSource: "gsap.quickTo(..., 'power4')",
        duration: "0.8s lerp velocity tilt",
        triggers: "hover",
        notes: "Tracks cumulative pointer travel distance; every 220px of movement seamlessly transitions to the next case study thumbnail with velocity-proportional tilt rotation.",
        parameters: {
          "Card Follow Lerp": "quickTo 0.8s power4",
          "Tilt Sensitivity": "Math.max(-12, Math.min(12, vx * 0.35))",
          "Case Switch Threshold": "220px travel distance",
        },
      },
      designTokens: {
        fontFamilies: [SANS, SERIF],
        originalFonts: ORIGINAL,
        colors: COLORS,
        materials: ["studio off-white backdrop", "electric blue pills", "glass blur badges"],
      },
      prompt: {
        structure: [
          "Top navigation bar with tilted monogram badge, brand label, and creative studio category pill.",
          "Gigantic high-contrast headline: 'Brengt je merk in [beweging]' with contrasting italic serif accent on 'beweging'.",
          "Floating cursor-following card that translates with quickTo lerp, tilts proportional to pointer delta X, and updates thumbnails on travel.",
          "Bottom strip with client credential ticker and active case indicator.",
        ],
        fonts: [SANS + " for bold geometric headline", SERIF + " for expressive italic contrast"],
        colors: "off-white #F4F4F4, obsidian #101010, electric blue #0038FF, hot pink #FF77CD",
        entrance: "Header and headline fade and slide in with crisp timing.",
        interaction: "Moving mouse across the canvas smoothly guides the floating preview card with velocity tilt and case cycling.",
        polish: ["Subtle rotation limits clamped to [-12deg, 12deg]", "Backdrop blur on metadata tags"],
        accessibility: ["Hides follower card on touch/coarse pointers", "High-contrast text tokens"],
      },
    }),
    defineComponent(site, {
      id: "ef-pinned-stack-deck",
      name: "3D Perspective Card Stack Deck",
      category: "card-grid",
      summary:
        "Pinned 3D card deck with depth layering, continuous spinning SVG badge sticker, and interactive deck peeling transitions.",
      tags: ["3D stack", "card deck", "perspective", "pinned", "sticker badge", "portfolio", "case study"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: OSMO_EASE,
        easingSource: "CustomEase 'osmo' (0.625, 0.05, 0, 1)",
        duration: "0.6s deck peel transition",
        triggers: "click",
        notes: "Cards are positioned in 3D perspective space with translateZ depth intervals (-60px) and vertical offsets (28px). Clicking or stepping peels the active card forward.",
        parameters: {
          "Z-Depth Step": "-60px per layer",
          "Y-Offset Step": "28px per layer",
          "Badge Spin": "14s linear continuous",
        },
      },
      designTokens: {
        fontFamilies: [SANS, SERIF],
        originalFonts: ORIGINAL,
        colors: COLORS,
        materials: ["butter yellow card", "electric blue card", "crimson stadium card", "spinning sticker"],
      },
      prompt: {
        structure: [
          "Header row with category eyebrow, 'Recent [Werk]' title with cursive serif accent, and rotating circular SVG badge.",
          "3D perspective card stack with 3 layered case cards (P. van der Niet, Odido, Willem II).",
          "Each card split into left typography details with tags and right full-bleed media asset.",
          "Footer control row with active case status and circular navigation buttons.",
        ],
        fonts: [SANS + " for bold grotesque headings", SERIF + " for italic cursive accent"],
        colors: "dark obsidian #101010, butter yellow #FEE897, electric blue #0038FF, crimson #D82234",
        entrance: "Cards stack into place with 3D depth perspective.",
        interaction: "Clicking cards or navigation arrows seamlessly brings the next case to front with smooth z-axis interpolation.",
        polish: ["Continuous circular SVG text path rotation", "Z-index ordering synchronization"],
        accessibility: ["Keyboard navigable next/prev buttons with aria labels", "Sufficient color contrast"],
      },
    }),
    defineComponent(site, {
      id: "ef-momentum-team-grid",
      name: "Inertia Momentum Team Cards",
      category: "card-grid",
      summary:
        "Physics-driven team grid where pointer velocity and entry trajectory impart angular momentum and rotational torque with elastic spring decay.",
      tags: ["momentum", "inertia", "physics", "team", "elastic", "rotational torque", "tilt"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: MOVE_EASE,
        easingSource: "CustomEase 'move' (0.3, 0.075, 0, 1) & elastic spring",
        duration: "0.8s elastic decay",
        triggers: "hover",
        notes: "Calculates instantaneous mouse entry vector (dx, dy) to induce 3D pitch (rotateX), yaw (rotateY), and roll (rotateZ). On pointer leave, the card snaps back with an elastic spring.",
        parameters: {
          "Torque Pitch": "clamp(-14, 14, dy * 0.6)",
          "Torque Roll": "clamp(-10, 10, dx * 0.35)",
          "Spring Decay": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        },
      },
      designTokens: {
        fontFamilies: [SANS, SERIF],
        originalFonts: ORIGINAL,
        colors: COLORS,
        materials: ["studio grey container", "white cards", "color badge dot"],
      },
      prompt: {
        structure: [
          "Header row with studio team subtitle, 'ABCDEF-[Team]' heading, and interaction guidance copy.",
          "Four-column card grid containing studio creatives (Tom, Willem, Daan, Fleur).",
          "Each card has photo with hover zoom, brand color dot, name, and role title.",
        ],
        fonts: [SANS + " for UI and member names", SERIF + " for expressive 'Team' script"],
        colors: "grey container #EFEFEF, white cards #FFFFFF, electric blue #0038FF, hot pink #FF77CD",
        entrance: "Cards enter in a staggered sequence.",
        interaction: "Moving mouse onto cards creates real-time angular momentum; pointer leave springs back elastically.",
        polish: ["GPU-accelerated transforms (transform-gpu)", "Subtle hover photo scale"],
        accessibility: ["Semantic headings for each member", "Focus rings on interactive cards"],
      },
    }),
  ],
};

