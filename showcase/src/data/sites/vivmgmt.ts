import { defineComponent } from "../define";
import type { WebsiteEntry } from "../types";

const site = { title: "ViV MGMT", theme: "minimalist-editorial-monolith" as const };

const SERIF = "'Cormorant Garamond', 'EB Garamond', serif";
const SANS = "'Inter', -apple-system, sans-serif";
const MONO = "'JetBrains Mono', 'Geist Mono', monospace";
const ORIGINAL = ["Garamond Narrow", "Helvetica Now Display", "Inter"];

const COLORS = {
  bgWhite: "#FFFFFF",
  bgZinc: "#FAFAFA",
  textBlack: "#000000",
  dim: "#71717A",
  hairline: "#E4E4E7",
};

const QUENTIN_EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

export const vivMgmt: WebsiteEntry = {
  id: "vivmgmt",
  title: site.title,
  theme: site.theme,
  themeDisplayName: "Minimalist Editorial & Photography Agency Monolith",
  originalUrl: "https://vivmgmt.com/",
  localDevUrl: "http://localhost:3012/",
  repoPath: "portfolio/vivmgmt",
  description:
    "Representing commercial photographers, directors, and creatives while providing full-service photo and video production for brands nationwide. Winner of Awwwards Site of the Day and Developer Award (Nov 6, 2026), designed and developed by Sam Dallyn.",
  tagline: "We make beautiful work: staggered chromatic artist galleries, live studio timezones, and high-fashion editorial serif typography.",
  previewThumbnail: "live:viv-artist-roster-marquee",
  techStack: ["Astro", "GSAP 3", "Lenis", "Swup", "Tailwind CSS"],
  palette: ["#000000", "#FFFFFF", "#71717A", "#E4E4E7"],
  components: [
    defineComponent(site, {
      id: "viv-artist-roster-marquee",
      name: "Staggered Chromatic Artist Gallery",
      category: "card-grid",
      summary:
        "High-fashion photographic roster with staggered column offsets, smooth B&W to full-color bloom on hover, and active category filtering.",
      tags: [
        "artist roster",
        "photography",
        "agency",
        "staggered grid",
        "grayscale",
        "chromatic bloom",
        "fashion",
        "editorial",
        "minimalist",
      ],
      motionSpecs: {
        engine: "CSS",
        easingCurve: QUENTIN_EASE,
        easingSource: "cubic-bezier(0.23, 1, 0.32, 1)",
        duration: "0.6s Quentin filter transition",
        triggers: "hover",
        notes:
          "Hovering on individual artist tiles triggers a smooth grayscale-to-color transition and subtle 1.04x scale transform with Quentin easing.",
        parameters: {
          "Grayscale Filter": "100% to 0%",
          "Hover Scale": "scale(1.04)",
          "Easing": "cubic-bezier(0.23, 1, 0.32, 1)",
        },
      },
      designTokens: {
        fontFamilies: [SERIF, SANS, MONO],
        originalFonts: ORIGINAL,
        colors: COLORS,
        materials: ["hairline borders #E4E4E7", "matte monochrome photography", "high-fashion serif titles"],
      },
      prompt: {
        structure: [
          "Top filter bar with active category pills (ALL, PHOTOGRAPHERS, DIRECTORS) and instructional prompt.",
          "Staggered grid of artist portfolio cards featuring alternating aspect ratios (3:4, 4:5) and vertical column offsets.",
          "Each tile features a black-and-white commercial photograph, uppercase discipline pill (e.g. 'DIRECTOR · NYC'), serif artist name, and commercial client roster.",
          "Footer metadata strip with verified Awwwards Site of the Day attribution.",
        ],
        fonts: [SERIF + " for artist names", SANS + " for base structure", MONO + " for metadata and pills"],
        colors: "pure white #FFFFFF, deep black #000000, zinc #71717A, hairline #E4E4E7",
        entrance: "Gallery initializes with calm architectural stillness.",
        interaction: "Hovering over cards transforms grayscale imagery into vivid full-color. Category tabs filter visible cards seamlessly.",
        polish: ["Subtle hairline divider lines", "Font italicization on card hover", "Staggered layout offsets"],
        accessibility: ["Descriptive image alt text", "High contrast black and white palette"],
      },
    }),
    defineComponent(site, {
      id: "viv-editorial-strapline-hero",
      name: "Minimalist Editorial Strapline Hero",
      category: "hero",
      summary:
        "High-fashion agency hero featuring oversized serif typography, live multi-city studio clocks (NYC, LDN, LA), and architectural borders.",
      tags: [
        "hero",
        "editorial",
        "strapline",
        "agency",
        "live clock",
        "timezones",
        "serif",
        "minimalist",
        "high fashion",
      ],
      motionSpecs: {
        engine: "CSS",
        easingCurve: QUENTIN_EASE,
        easingSource: "cubic-bezier(0.23, 1, 0.32, 1)",
        duration: "Real-time clock interval (10s)",
        triggers: "loop",
        notes: "Real-time Intl.DateTimeFormat calculations synchronize studio hours for New York, London, and Los Angeles.",
        parameters: {
          "Clock Sync": "10000ms loop",
          "Pulse LED": "2s ease-in-out infinite",
        },
      },
      designTokens: {
        fontFamilies: [SERIF, SANS, MONO],
        originalFonts: ORIGINAL,
        colors: COLORS,
        materials: ["hairline divider borders", "editorial serif headline", "studio clock readout"],
      },
      prompt: {
        structure: [
          "Header bar with ViV serif mark, uppercase company descriptor, and live studio clocks for NYC, LDN, and LA with a pulsing green indicator.",
          "Prominent hero strapline: 'ViV is an artist management & commercial photo production company' rendered in oversized high-fashion serif.",
          "Description block with call-to-action button ('DISCOVER ROSTER ↓').",
          "Footer metrics row detailing representation size (8 ARTISTS), studio offices, disciplines, and Awwwards recognition.",
        ],
        fonts: [SERIF + " for monumental strapline", MONO + " for timezones and metrics", SANS + " for description"],
        colors: "clean white #FFFFFF, stark black #000000, zinc muted #71717A",
        entrance: "Smooth fade-in with architectural restraint.",
        interaction: "Live clocks update automatically with actual wall-clock hours in New York, London, and Los Angeles.",
        polish: ["Emerald pulse indicator for active studio hours", "Refined italic emphasis on 'photo production'"],
        accessibility: ["Semantic header and time elements", "Screen-reader accessible time formatting"],
      },
    }),
  ],
};
