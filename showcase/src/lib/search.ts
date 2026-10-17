import type { CatalogComponent } from "../data/catalog";
import type { WebsiteEntry } from "../data/types";
import { CATEGORY_LABEL, THEME_BY_ID } from "../data/themes";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function haystack(c: CatalogComponent): { text: string; weight: number }[] {
  return [
    { text: c.name, weight: 6 },
    { text: c.tags.join(" "), weight: 4 },
    { text: `${c.category} ${CATEGORY_LABEL[c.category]}`, weight: 3 },
    { text: c.site.title, weight: 3 },
    { text: `${THEME_BY_ID[c.site.theme].name} ${THEME_BY_ID[c.site.theme].short}`, weight: 2 },
    { text: `${c.motionSpecs.engine} ${c.motionSpecs.easingCurve} ${c.motionSpecs.easingSource} ${c.motionSpecs.triggers}`, weight: 2 },
    { text: c.summary, weight: 1 },
  ];
}

/** Every query word must match somewhere; score favours names and tags. */
export function scoreComponent(c: CatalogComponent, query: string): number {
  const words = norm(query).split(/\s+/).filter(Boolean);
  if (!words.length) return 1;
  const fields = haystack(c).map((f) => ({ text: norm(f.text), weight: f.weight }));
  let total = 0;
  for (const w of words) {
    let best = 0;
    for (const f of fields) {
      const i = f.text.indexOf(w);
      if (i === -1) continue;
      const wordStart = i === 0 || /[\s\-(,'"]/.test(f.text[i - 1]);
      best = Math.max(best, f.weight * (wordStart ? 2 : 1));
    }
    if (!best) return 0;
    total += best;
  }
  return total;
}

export function searchComponents(list: CatalogComponent[], query: string): CatalogComponent[] {
  if (!query.trim()) return list;
  return list
    .map((c) => ({ c, s: scoreComponent(c, query) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((r) => r.c);
}

export function siteMatches(site: WebsiteEntry, query: string): boolean {
  const words = norm(query).split(/\s+/).filter(Boolean);
  const text = norm(`${site.title} ${site.techStack.join(" ")} ${site.themeDisplayName} ${site.description}`);
  return words.every((w) => text.includes(w));
}
