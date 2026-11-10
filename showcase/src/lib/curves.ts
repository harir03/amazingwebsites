import { useMemo } from "react";
import { ALL_COMPONENTS, type CatalogComponent } from "../data/catalog";
import { THEME_BY_ID } from "../data/themes";
import type { ThemeArchetype } from "../data/types";
import { bezierPoint, parseBezier, type Bezier } from "./easing";

export interface CurveEntry {
  key: string;
  value: string;
  curve: Bezier;
  color: string;
  themes: ThemeArchetype[];
  uses: CatalogComponent[];
}

const fmt = (b: Bezier) => `cubic-bezier(${b.join(", ")})`;

/** Every distinct easing curve in the catalog, with the components that use it. */
export function useCurves() {
  return useMemo(() => {
    const byKey = new Map<string, CurveEntry>();
    for (const c of ALL_COMPONENTS) {
      const curve = parseBezier(c.motionSpecs.easingCurve);
      if (!curve) continue;
      const key = curve.join(",");
      const hit = byKey.get(key);
      if (hit) {
        hit.uses.push(c);
        if (!hit.themes.includes(c.site.theme)) hit.themes.push(c.site.theme);
      } else {
        byKey.set(key, { key, value: fmt(curve), curve, color: THEME_BY_ID[c.site.theme].accent, themes: [c.site.theme], uses: [c] });
      }
    }
    const list = [...byKey.values()];
    let lo = 0;
    let hi = 1;
    for (const e of list) {
      for (let i = 0; i <= 40; i++) {
        const y = bezierPoint(e.curve, i / 40)[1];
        lo = Math.min(lo, y);
        hi = Math.max(hi, y);
      }
    }
    // Round the range out to the next 0.05 so the grid lands on whole cells.
    return { list, minY: Math.floor(lo * 20) / 20, maxY: Math.ceil(hi * 20) / 20 };
  }, []);
}
