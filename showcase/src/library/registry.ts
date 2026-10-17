import type { ComponentType } from "react";
import type { PreviewProps } from "../data/types";

/**
 * Every folder in src/library is one component:
 *   index.tsx    → the live React preview AND the "React + Tailwind" snippet (same file)
 *   vanilla.html → the "HTML + CSS + JS" snippet AND the iframe preview
 * So the code people copy is exactly the code running in the preview.
 */
const modules = import.meta.glob<{ default: ComponentType<PreviewProps> }>("./*/index.tsx", { eager: true });
const reactSources = import.meta.glob<string>("./*/index.tsx", { eager: true, query: "?raw", import: "default" });
const vanillaSources = import.meta.glob<string>("./*/vanilla.html", { eager: true, query: "?raw", import: "default" });

export function getLibraryComponent(id: string): ComponentType<PreviewProps> | undefined {
  return modules[`./${id}/index.tsx`]?.default;
}

export function getReactSource(id: string): string {
  return reactSources[`./${id}/index.tsx`] ?? "";
}

export function getVanillaSource(id: string): string {
  return vanillaSources[`./${id}/vanilla.html`] ?? "";
}

export const LIBRARY_IDS = Object.keys(modules).map((k) => k.split("/")[1]);
