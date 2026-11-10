export type ThemeArchetype =
  | "brutalist-pixel"
  | "technical-cad"
  | "glassmorphic-fintech"
  | "webgl-fluid"
  | "cinematic-serif"
  | "gamified-canvas"
  | "compute-particles"
  | "architectural-botanical"
  | "tactile-pop-ecommerce"
  | "sonic-interactive";

export type ComponentCategory =
  | "navbar"
  | "hero"
  | "accordion"
  | "floating-dock"
  | "loader"
  | "particle-system"
  | "card-grid"
  | "footer";

export type MotionEngine = "GSAP" | "Three.js" | "CSS" | "Web Worker" | "Lenis" | "Web Audio" | "Canvas 2D" | "rAF";

export type MotionTrigger = "scroll-scrub" | "hover" | "click" | "loop" | "entrance";

export interface ComponentItem {
  id: string;
  name: string;
  category: ComponentCategory;
  summary: string;
  /** Free-text tags that search matches against (animation names, techniques). */
  tags: string[];
  motionSpecs: {
    engine: MotionEngine;
    easingCurve: string; // always a cubic-bezier(...) string so it can be plotted
    /** The name the original code uses for that curve, e.g. GSAP "power2.out" or a CustomEase path. */
    easingSource: string;
    duration: string;
    triggers: MotionTrigger;
    notes: string;
    /** Timing breakdown shown in the Motion inspector: stagger, delays, lerp, spring values. */
    parameters: Record<string, string>;
  };
  designTokens: {
    fontFamilies: string[];
    /** The proprietary faces the original site ships, replaced by the open-source stacks above. */
    originalFonts: string[];
    colors: Record<string, string>;
    materials: string[];
  };
  aiPrompt: string;
  codeSnippets: {
    reactTailwind: string;
    vanillaHtmlCss: string;
  };
  /** Components that play sound get a mute control in the viewer. */
  hasAudio?: boolean;
}

export interface WebsiteEntry {
  id: string;
  title: string;
  theme: ThemeArchetype;
  themeDisplayName: string;
  originalUrl: string;
  localDevUrl: string;
  /** Folder of the full recreation inside this repository. */
  repoPath: string;
  description: string;
  /** Short hero line used on the website card. */
  tagline: string;
  previewThumbnail: string;
  techStack: string[];
  palette: string[];
  components: ComponentItem[];
}

/** Props every library component accepts so the hub can drive previews. */
export interface PreviewProps {
  /** Silence any Web Audio output. */
  muted?: boolean;
  /** Replay one-shot sequences (loaders, intros) forever, for gallery previews. */
  loop?: boolean;
}
