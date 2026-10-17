/**
 * Renders the AI agent prompt standard from structured fields, so every
 * component's prompt has the same sections in the same order.
 */
export interface PromptSpec {
  name: string;
  site: string;
  archetype: string;
  stack: string;
  structure: string[];
  fonts: string[];
  colors: string;
  entrance: string;
  interaction: string;
  polish: string[];
  accessibility: string[];
}

const bullets = (lines: string[]) => lines.map((l) => `   - ${l}`).join("\n");

export function buildPrompt(s: PromptSpec): string {
  const article = /^[aeiou]/i.test(s.name) ? "an" : "a";
  return `You are building ${article} ${s.name} inspired by ${s.site}.
Aesthetic Archetype: ${s.archetype}.
Target Stack: ${s.stack}.

Key Requirements:
1. Visual Structure & Layout:
${bullets(s.structure)}
2. Typography & Color Palette:
${bullets(s.fonts.map((f, i) => `${i === 0 ? "Primary" : "Secondary"} Font: ${f}`))}
   - Colors: ${s.colors}
3. Animation Physics & Timing:
   - Entrance: ${s.entrance}
   - Interaction/Hover: ${s.interaction}
4. Micro-interactions & Polish:
${bullets(s.polish)}
5. Accessibility & Performance:
${bullets([
  ...s.accessibility,
  "Respect prefers-reduced-motion: skip or shorten every non-essential animation and render the final state.",
])}

Deliverable: Provide a completely self-contained, drop-in component with zero missing imports.`;
}

export interface SitePromptInput {
  title: string;
  originalUrl: string;
  themeName: string;
  techStack: string[];
  palette: string[];
  components: { name: string; summary: string; easing: string; duration: string }[];
}

/** "Copy Full Site Stack": one prompt that scaffolds the whole site's design system. */
export function buildSitePrompt(s: SitePromptInput): string {
  return `You are recreating the design system of ${s.title} (${s.originalUrl}) as an original, legally clean implementation.
Aesthetic Archetype: ${s.themeName}.
Original Tech Stack: ${s.techStack.join(", ")}.
Palette: ${s.palette.join(", ")}.

Build these components, in this order, sharing one set of CSS custom properties for color, type and easing:
${s.components.map((c, i) => `${i + 1}. ${c.name}: ${c.summary} (easing ${c.easing}, ${c.duration})`).join("\n")}

Rules:
- Use open-source font stand-ins and keep the original's rhythm: sizes, tracking, line-height.
- Define every easing curve once as a CSS variable and reuse it.
- Every animation must have a prefers-reduced-motion fallback and keyboard-reachable controls.
- No proprietary assets: draw shapes with SVG/CSS/canvas, use placeholder copy.

Deliverable: a runnable project with each component in its own file and a short README listing the tokens.`;
}
