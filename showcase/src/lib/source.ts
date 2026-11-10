import type { CatalogComponent } from "../data/catalog";
import type { WebsiteEntry } from "../data/types";

/** The component a site card shows as its poster. */
export const posterOf = (site: WebsiteEntry) => site.previewThumbnail.replace(/^live:/, "");

export const pascal = (s: string) =>
  s
    .replace(/&/g, " ")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join("");

const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

/** A component's colours and font stacks as a :root block. */
export function cssVariables(item: CatalogComponent): string {
  const t = item.designTokens;
  const colors = Object.entries(t.colors).map(([k, v]) => `  --${kebab(k)}: ${v};`);
  const fonts = t.fontFamilies.map((f, i) => `  --font-${i === 0 ? "primary" : i === 1 ? "secondary" : `alt-${i}`}: ${f};`);
  return `:root {\n${[...colors, ...fonts].join("\n")}\n}`;
}

/** The component prompt, optionally with its reference implementation appended. */
export function promptWithCode(item: CatalogComponent, attach: "none" | "react" | "html"): string {
  if (attach === "none") return item.aiPrompt;
  const code = attach === "react" ? item.codeSnippets.reactTailwind : item.codeSnippets.vanillaHtmlCss;
  const lang = attach === "react" ? "tsx" : "html";
  return `${item.aiPrompt}\n\nReference implementation (match its behaviour and timing; adapt naming and structure to this codebase):\n\`\`\`${lang}\n${code.trim()}\n\`\`\``;
}

/** Saves text as a file through a temporary link. */
export function downloadText(text: string, filename: string, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
