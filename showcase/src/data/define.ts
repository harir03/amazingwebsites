import { getReactSource, getVanillaSource } from "../library/registry";
import { buildPrompt, type PromptSpec } from "./prompt";
import { THEME_BY_ID } from "./themes";
import type { ComponentItem, ThemeArchetype } from "./types";

export type ComponentSpec = Omit<ComponentItem, "aiPrompt" | "codeSnippets"> & {
  prompt: Omit<PromptSpec, "name" | "site" | "archetype" | "stack"> & { stack?: string };
};

const DEFAULT_STACK = "React 18 + TailwindCSS v4 (no animation library, native CSS / rAF / Web APIs) — or Vanilla HTML5 + CSS + JS";

/** Fills in the AI prompt (from the shared template) and the code (from src/library/<id>). */
export function defineComponent(site: { title: string; theme: ThemeArchetype }, spec: ComponentSpec): ComponentItem {
  const { prompt, ...item } = spec;
  return {
    ...item,
    aiPrompt: buildPrompt({
      ...prompt,
      name: spec.name,
      site: site.title,
      archetype: THEME_BY_ID[site.theme].name,
      stack: prompt.stack ?? DEFAULT_STACK,
    }),
    codeSnippets: {
      reactTailwind: getReactSource(spec.id),
      vanillaHtmlCss: getVanillaSource(spec.id),
    },
  };
}
