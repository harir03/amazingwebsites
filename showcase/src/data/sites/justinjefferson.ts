import { defineComponent } from "../define";
import type { WebsiteEntry } from "../types";

const site = { title: "Justin Jefferson", theme: "athletic-fashion-editorial" as const };

const DISPLAY = "'Barlow Condensed', 'Oswald', sans-serif";
const SANS = "'Inter', -apple-system, sans-serif";
const MONO = "'JetBrains Mono', 'Geist Mono', monospace";
const ORIGINAL = ["Beachwood Variable", "Inter", "Mono"];

const COLORS = {
  bgMidnight: "#0B0713",
  bgSurface: "#140D21",
  goldAccent: "#FDE047",
  goldMuted: "#CA8A04",
  vikingsPurple: "#4F2683",
  white: "#FFFFFF",
  dim: "#9496A1",
};

const JJ_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export const justinJefferson: WebsiteEntry = {
  id: "justinjefferson",
  title: site.title,
  theme: site.theme,
  themeDisplayName: "Athletic High-Fashion Editorial & Signature Archive",
  originalUrl: "https://jjettas.com/",
  localDevUrl: "http://localhost:3011/",
  repoPath: "portfolio/justinjefferson",
  description:
    "Official editorial archive and signature moments of Justin Jefferson (#18). High-fashion streetwear, NFL gridiron records, 3D holographic trading cards, and community impact. Winner of Awwwards Site of the Day (Nov 7, 2026).",
  tagline: "Records are made to be broken: 3D holographic sports cards, yardline scrubbers, and athletic luxury editorial.",
  previewThumbnail: "live:jj-holographic-trading-card",
  techStack: ["Next.js", "Tailwind CSS", "Lenis", "3D Gyroscope Transforms", "Web Audio API"],
  palette: ["#FDE047", "#4F2683", "#0B0713", "#FFFFFF"],
  components: [
    defineComponent(site, {
      id: "jj-holographic-trading-card",
      name: "Holographic 3D Trading Card",
      category: "card-grid",
      summary:
        "Collectible sports card with gyroscopic 3D perspective tilt, dual-layer holographic foil sheen (specular white beam + iridescent color-dodge rainbow), and click-to-flip career statistics inspect.",
      tags: [
        "trading card",
        "holographic",
        "foil",
        "3d tilt",
        "card flip",
        "athlete",
        "nfl",
        "sports",
        "collectibles",
        "specular glare",
      ],
      motionSpecs: {
        engine: "CSS",
        easingCurve: JJ_EASE,
        easingSource: "cubic-bezier(0.22, 1, 0.36, 1)",
        duration: "Real-time pointer sync",
        triggers: "hover",
        notes:
          "Real-time pointer tracking calculates 3D gyroscopic tilt (rotateX, rotateY) and updates the gradient offset of the specular and rainbow foil overlays.",
        parameters: {
          "Perspective": "1400px",
          "Tilt Angle": "±18deg",
          "Flip Transition": "0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        },
      },
      designTokens: {
        fontFamilies: [DISPLAY, SANS, MONO],
        originalFonts: ORIGINAL,
        colors: COLORS,
        materials: ["holographic specular glare", "color-dodge iridescent foil", "3d preserve-3d card container"],
      },
      prompt: {
        structure: [
          "Card stage with 1400px perspective and pointer-tracking hover state.",
          "Front face features athletic action photo, gold accent badges ('MIN #18', 'CROWN JEWEL'), headline 'THE CATCH VS BUFFALO', and game-day stat chips (4th & 18, 32 YDS, 1-HANDED).",
          "Dynamic specular glare line and iridescent color-dodge sheen layer synchronized with mouse cursor coordinates.",
          "Back face reveals officially verified historical telemetry, game score, and Pro Football Hall of Fame notes on click.",
        ],
        fonts: [DISPLAY + " for bold headlines", MONO + " for telemetry chips", SANS + " for descriptive text"],
        colors: "midnight dark #0B0713, electric gold #FDE047, purple accent #4F2683, white text #FFFFFF",
        entrance: "Card enters with subtle 3D scale spring.",
        interaction: "Hovering over the card tilts it in 3D space with matching light reflections. Clicking flips the card 180 degrees.",
        polish: ["Dual-layer iridescent color-dodge foil", "Smooth backface culling", "Drop shadow depth scaling on hover"],
        accessibility: ["Descriptive aria-labels for front and back faces", "Keyboard enter/space trigger for card flip"],
      },
    }),
    defineComponent(site, {
      id: "jj-yardline-scrubber",
      name: "Yardline Scrubber Rail & Field Telemetry",
      category: "hero",
      summary:
        "Athletic field position scrubber converting yardline position (G to 50 to G) into interactive play-by-play drive analysis and route telemetry.",
      tags: [
        "yardline",
        "scrubber",
        "telemetry",
        "slider",
        "football",
        "play-by-play",
        "progress track",
        "sports",
      ],
      motionSpecs: {
        engine: "CSS",
        easingCurve: JJ_EASE,
        easingSource: "cubic-bezier(0.22, 1, 0.36, 1)",
        duration: "Interactive scrub sync",
        triggers: "scroll-scrub",
        notes:
          "Maps progress along the 100-yard field to ball placement, yards to end zone, and dynamic catch probability algorithms.",
        parameters: {
          "Field Hash Marks": "20px repeating linear gradient",
          "Ball Indicator": "CSS translate interpolation with gold pulse glow",
        },
      },
      designTokens: {
        fontFamilies: [DISPLAY, SANS, MONO],
        originalFonts: ORIGINAL,
        colors: COLORS,
        materials: ["turf field track", "repeating yardline hash lines", "pulsing gold ball marker"],
      },
      prompt: {
        structure: [
          "Header bar displaying active drive context ('DRIVE: 4TH QUARTER', '4TH & 18').",
          "Prominent telemetry metrics displaying BALL ON ('OPP 32') and YARDS TO END ZONE ('32 YDS') with real-time numeric updates.",
          "Turf scrubber rail featuring football field yard numbers (G, 10, 20, 30, 40, 50, 40, 30, 20, 10, G) and white hash lines.",
          "Interactive slider allowing users to scrub field position or toggle drive simulation.",
          "Footer status displaying route profile and estimated catch probability.",
        ],
        fonts: [DISPLAY + " for oversized numbers", MONO + " for field markers and down/distance readouts"],
        colors: "surface #140D21, gold indicator #FDE047, dim #9496A1",
        entrance: "Metrics initialize with numeric odometer count.",
        interaction: "Dragging the slider recalculates field position, yards to goal, and catch probability in real time.",
        polish: ["Gold glow shadow around ball marker", "Automated drive simulation button with pause/play toggle"],
        accessibility: ["Standard range slider with accessible min/max values", "Screen reader readable yard text"],
      },
    }),
  ],
};
