import { defineComponent } from "../define";
import type { WebsiteEntry } from "../types";

const site = { title: "ZIRKA (ZRK)", theme: "tactical-aerospace-hud" as const };

const MONO = "'JetBrains Mono', 'Geist Mono', monospace";
const SANS = "'Inter', -apple-system, sans-serif";
const ORIGINAL = ["JetBrains Mono", "Inter", "Webflow Icons"];
const COLORS = {
  bgDark: "#0A0C0E",
  bgSurface: "#11151A",
  borderHud: "#1C242C",
  white: "#FFFFFF",
  dim: "#7B8B9B",
  alertAmber: "#FF5500",
  radarCyan: "#00F0FF",
  radarGreen: "#00FF66",
};

const HUD_EASE = "cubic-bezier(0.19, 1, 0.22, 1)";

export const zrkTechnology: WebsiteEntry = {
  id: "zrk",
  title: site.title,
  theme: site.theme,
  themeDisplayName: "Tactile Defense Aerospace & HUD Telemetry",
  originalUrl: "https://www.zrk.technology/",
  localDevUrl: "http://localhost:3010/",
  repoPath: "devtools/zrk",
  description:
    "An autonomous counter-UAS interceptor platform engineered in Ukraine to defeat mass Shahed-class drone terror attacks using high-speed auto-guidance and optical terminal lock. Winner of Awwwards Site of the Day (Nov 9, 2026).",
  tagline: "Destroy drones using drones: interactive radar reticles, telemetry HUDs, and comparative threat matrices.",
  previewThumbnail: "live:zrk-telemetry-interceptor-hero",
  techStack: ["Webflow", "GSAP 3", "ScrollTrigger", "Observer", "Lenis", "Aerospace HUD"],
  palette: ["#FF5500", "#00F0FF", "#0A0C0E", "#00FF66"],
  components: [
    defineComponent(site, {
      id: "zrk-telemetry-interceptor-hero",
      name: "Tactical Telemetry Interceptor Hero",
      category: "hero",
      summary:
        "Stealth defense aerospace HUD with pointer-aimed crosshairs, live azimuth and range telemetry calculation, and an active conic radar sweep.",
      tags: ["aerospace", "hud", "radar", "crosshair", "telemetry", "defense", "interceptor", "military tech"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: HUD_EASE,
        easingSource: "cubic-bezier(0.19, 1, 0.22, 1)",
        duration: "Real-time pointer sync",
        triggers: "hover",
        notes: "Real-time pointer tracking updates targeting crosshairs and live mathematical azimuth and kilometer range readouts inside the radar canvas.",
        parameters: { "Radar Sweep Spin": "6s linear infinite", "Crosshair Sync": "Immediate pointer tracking" },
      },
      designTokens: {
        fontFamilies: [MONO, SANS],
        originalFonts: ORIGINAL,
        colors: COLORS,
        materials: ["radar grid canvas", "conic gradient sweep", "crosshair reticle line"],
      },
      prompt: {
        structure: [
          "Header status strip with brand reticle, active telemetry link, carrier frequency (433.92 MHz), and armed status indicator.",
          "Left column features tactical threat class badge, heavy headline 'Destroy drones using [drones]' with amber text-glow, and coordinate telemetry readout.",
          "Right column contains an interactive radar box with 360-degree conic sweep, concentric range circles, target blip, and a mouse-guided targeting reticle with live azimuth/range readout.",
          "Bottom telemetry row details 240+ km/h intercept speed, 4,000m ceiling, AI optical terminal seeker, and sub-5% missile engagement cost.",
        ],
        fonts: [SANS + " for heavy display text", MONO + " for aerospace telemetry and coordinates"],
        colors: "stealth dark #0A0C0E, alert amber #FF5500, radar cyan #00F0FF, radar green #00FF66",
        entrance: "Terminal boots up with rapid telemetry fade-in.",
        interaction: "Moving mouse within the radar frame points the reticle and updates live azimuth and range calculations.",
        polish: ["Conic radar beam rotation", "Pulsing green telemetry link LED", "Target blip pulse"],
        accessibility: ["High contrast neon indicators on deep black", "Descriptive aria labels for radar controls"],
      },
    }),
    defineComponent(site, {
      id: "zrk-threat-specification-matrix",
      name: "Threat Dynamics & Interceptor Matrix",
      category: "card-grid",
      summary:
        "Comparative military specification matrix detailing enemy Shahed-136 drone capabilities against Zirka counter-UAS interceptor superiority parameters.",
      tags: ["threat matrix", "defense", "specifications", "aerospace", "telemetry", "comparative"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: HUD_EASE,
        easingSource: "cubic-bezier(0.19, 1, 0.22, 1)",
        duration: "0.25s hover focus",
        triggers: "hover",
        notes: "Tactical borders illuminate on hover with subtle glow states.",
        parameters: { "Card Glow": "0 0 40px rgba(255,85,0,0.08)", "Border Accent": "3px solid" },
      },
      designTokens: {
        fontFamilies: [MONO, SANS],
        originalFonts: ORIGINAL,
        colors: COLORS,
        materials: ["tactile dark surface #11151A", "crimson threat bar", "amber interceptor glow"],
      },
      prompt: {
        structure: [
          "Header with cyan eyebrow and bold headline: 'Written by the threat itself'.",
          "Two-column grid: left card represents Threat Profile (Shahed-136 / Geran-2) with red alert bar; right card represents Countermeasure (Zirka Interceptor) with amber superiority bar.",
          "Monospaced data rows compare cruise speed, warhead, ceiling altitude, navigation, and economic defense sustainability.",
        ],
        fonts: [SANS + " for section headings", MONO + " for technical specifications and data tables"],
        colors: "surface #11151A, threat red #E53E3E, amber #FF5500, radar cyan #00F0FF, radar green #00FF66",
        entrance: "Cards enter with crisp technical precision.",
        interaction: "Hovering cards intensifies the neon accent glow.",
        polish: ["Tabular monospaced alignment", "Colored superiority indicators"],
        accessibility: ["Semantic grid structure", "Accessible contrast on dark backgrounds"],
      },
    }),
  ],
};
