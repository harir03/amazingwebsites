import { alanMenken } from "./sites/alanmenken";
import { dontLookUp } from "./sites/dontlookup";
import { emotionAgency } from "./sites/emotionagency";
import { heronAi } from "./sites/heronai";
import { helloMonday } from "./sites/hellomonday";
import { recursive } from "./sites/recursive";
import { theDesignSociety } from "./sites/thedesignsociety";
import type { ComponentItem, WebsiteEntry } from "./types";

export type { ComponentCategory, ComponentItem, ThemeArchetype, WebsiteEntry } from "./types";

export const CATALOG: WebsiteEntry[] = [theDesignSociety, heronAi, recursive, helloMonday, alanMenken, dontLookUp, emotionAgency];

export interface CatalogComponent extends ComponentItem {
  site: WebsiteEntry;
}

export const ALL_COMPONENTS: CatalogComponent[] = CATALOG.flatMap((site) => site.components.map((c) => ({ ...c, site })));

export const COMPONENT_BY_ID = new Map(ALL_COMPONENTS.map((c) => [c.id, c]));

export const STATS = {
  sites: CATALOG.length,
  components: ALL_COMPONENTS.length,
  curves: new Set(ALL_COMPONENTS.map((c) => c.motionSpecs.easingCurve.replace(/\s+/g, ""))).size,
};
