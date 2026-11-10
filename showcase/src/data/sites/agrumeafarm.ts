import { defineComponent } from "../define";
import type { WebsiteEntry } from "../types";

const site = { title: "Agrumea Farm", theme: "mediterranean-botanical-artisan" as const };

const SERIF = "'Instrument Serif', Georgia, serif";
const SANS = "'Plus Jakarta Sans', -apple-system, sans-serif";
const ORIGINAL = ["Editorial Old", "Helvetica Neue", "Plus Jakarta Sans"];
const COLORS = {
  parchment: "#F8F5EE",
  cream: "#FFFDF9",
  noir: "#1C1917",
  muted: "#57534E",
  terracotta: "#DF5C32",
  olive: "#364B38",
  citrusYellow: "#F5CE43",
};

const SMOOTH_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export const agrumeaFarm: WebsiteEntry = {
  id: "agrumeafarm",
  title: site.title,
  theme: site.theme,
  themeDisplayName: "Mediterranean Botanical & Artisan Gastronomy",
  originalUrl: "https://www.agrumeafarm.it/en",
  localDevUrl: "http://localhost:3009/",
  repoPath: "ecommerce/agrumeafarm",
  description:
    "A premier Sicilian artisan agriturismo and preserve producer celebrating volcanic soil biodiversity, sun-ripened Val di Noto citrus, Etna pistachios, and slow copper-kettle cooking craft. Winner of Awwwards Site of the Day (Nov 5, 2026).",
  tagline: "Autentici Sapori di Sicilia: sunlit parchment, artisanal jar selectors, and volcanic mineral provenance.",
  previewThumbnail: "live:ag-citrus-flavor-hero",
  techStack: ["Nuxt 3", "Vue 3", "TailwindCSS", "CSS Transitions"],
  palette: ["#DF5C32", "#364B38", "#F5CE43", "#F8F5EE"],
  components: [
    defineComponent(site, {
      id: "ag-citrus-flavor-hero",
      name: "Mediterranean Citrus Flavor Hero",
      category: "hero",
      summary:
        "Sunlit linen parchment hero with high-contrast Italian luxury serif typography, floating Val di Noto orchard badge, and a 4-column volcanic soil provenance strip.",
      tags: ["mediterranean", "citrus", "hero", "botanical", "editorial serif", "sicily", "artisan"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: SMOOTH_EASE,
        easingSource: "cubic-bezier(0.16, 1, 0.3, 1)",
        duration: "0.3s elevation hover",
        triggers: "hover",
        notes: "Soft visual lift on action buttons and subtle parallax depth across orchard photography.",
        parameters: { "Button Lift": "translateY -2px, 0.2s ease", "Shadow": "0 20px 48px rgba(0,0,0,0.05)" },
      },
      designTokens: {
        fontFamilies: [SERIF, SANS],
        originalFonts: ORIGINAL,
        colors: COLORS,
        materials: ["warm linen parchment", "terracotta pill buttons", "frosted glass badge"],
      },
      prompt: {
        structure: [
          "Header row with brand logo, Sicilian provenance tag, and language switcher.",
          "Dual-column hero: left side features category eyebrow, bold editorial serif title with terracotta italic accent, and call to action; right side shows framed grove photography with frosted overlay badge.",
          "Bottom 4-column metric strip highlighting 85% fruit content, 0% additives, 100% Sicilian raw materials, and Mount Etna volcanic minerals.",
        ],
        fonts: [SERIF + " for luxury editorial headings", SANS + " for UI controls and telemetry"],
        colors: "parchment #F8F5EE, terracotta #DF5C32, olive grove #364B38, noir #1C1917",
        entrance: "Fades in smoothly with gentle opacity and vertical float.",
        interaction: "Hovering CTAs and badges elevates cards with subtle shadows.",
        polish: ["Refined 1px sand borders", "Volcanic soil credential indicators"],
        accessibility: ["High contrast ratios on warm parchment", "Screen-reader friendly metric labels"],
      },
    }),
    defineComponent(site, {
      id: "ag-artisanal-jar-selector",
      name: "Artisanal Pantry Jar Selector",
      category: "card-grid",
      summary:
        "Interactive Sicilian preserve switcher detailing ingredient breakdowns, origin certifications, and gastronomic pairing recommendations.",
      tags: ["jar selector", "e-commerce", "pantry", "ingredients", "pairing", "sicily", "pestos", "marmalades"],
      motionSpecs: {
        engine: "CSS",
        easingCurve: SMOOTH_EASE,
        easingSource: "cubic-bezier(0.16, 1, 0.3, 1)",
        duration: "0.25s data morph",
        triggers: "click",
        notes: "Clicking product pills seamlessly transitions product images, ingredient breakdown tags, and pairing callouts.",
        parameters: { "Pill Active": "0.15s ease", "Image Fade": "0.3s cubic-bezier(0.16, 1, 0.3, 1)" },
      },
      designTokens: {
        fontFamilies: [SERIF, SANS],
        originalFonts: ORIGINAL,
        colors: COLORS,
        materials: ["cream card background", "terracotta border-left callout", "artisan glass jar shadow"],
      },
      prompt: {
        structure: [
          "Header row with collection category and product pill selectors (Pesto Pistacchio, Arance Rosse, Crema Mandorle).",
          "Two-column product card: left column displays jar image with category badge, right column details name, description, ingredient composition tags, and pairing callout.",
        ],
        fonts: [SERIF + " for product names", SANS + " for ingredient tags and descriptions"],
        colors: "cream #FFFDF9, terracotta #DF5C32, olive #364B38, warm grey #57534E",
        entrance: "Card scales into view with soft paper shadow.",
        interaction: "Selecting a pill updates active jar imagery, percentage telemetry, and culinary pairings.",
        polish: ["Terracotta accented left-border on culinary pairing tips", "Pill hover states"],
        accessibility: ["Keyboard focusable pills with aria-selected states", "Clear semantic hierarchy"],
      },
    }),
  ],
};

