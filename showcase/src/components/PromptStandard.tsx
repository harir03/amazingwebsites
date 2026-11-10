/** The structure every component prompt follows, shown on the Prompt standard page. */
export const TEMPLATE = `You are building an [Component Name] inspired by [Original Website Name].
Aesthetic Archetype: [Theme Archetype].
Target Stack: [React + TailwindCSS / Vanilla HTML5 + CSS + JS].

Key Requirements:
1. Visual Structure & Layout:
   - [DOM hierarchy, grid / flex coordinates, positioning]
2. Typography & Color Palette:
   - Primary Font: [font + web-safe fallback stack]
   - Colors: [background, text, border, accent / glow]
3. Animation Physics & Timing:
   - Entrance: [duration, delay, cubic-bezier]
   - Interaction/Hover: [transforms, springs, lerp factor]
4. Micro-interactions & Polish:
   - [sound, cursor physics, particles, backdrop blur]
5. Accessibility & Performance:
   - [ARIA, focus, prefers-reduced-motion fallback]

Deliverable: Provide a completely self-contained, drop-in component with zero missing imports.`;

export const POINTS = [
  ["Measured, not guessed", "Easing curves and timings come from each recreation's source: CustomEase paths, keyframe percentages, spring constants."],
  ["Same structure every time", "Five numbered sections in a fixed order, so agents and humans both know where to look."],
  ["Reference code optional", "Attach the React or HTML file to a prompt when you want the agent to match the timing exactly."],
  ["Accessible by default", "Every prompt asks for ARIA, keyboard support and a prefers-reduced-motion fallback."],
] as const;
