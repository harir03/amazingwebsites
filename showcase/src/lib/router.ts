import { useEffect, useMemo, useSyncExternalStore, type RefObject } from "react";
import { flushSync } from "react-dom";

/**
 * A small History API router. Pages are real URLs so any component or site can be linked to,
 * and page changes run through the View Transitions API where the browser supports it.
 */

export type Route =
  | { name: "home" }
  | { name: "component"; id: string }
  | { name: "site"; id: string }
  | { name: "curves" }
  | { name: "prompt" }
  | { name: "notfound" };

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export const paths = {
  home: "/",
  component: (id: string) => `/components/${id}`,
  site: (id: string) => `/sites/${id}`,
  curves: "/easing-curves",
  prompt: "/prompt-standard",
};

export const withBase = (to: string) => (to.startsWith("/") ? `${BASE}${to}` : to);

function parse(): Route {
  let path = window.location.pathname;
  if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length);
  path = path.replace(/\/+$/, "") || "/";
  if (path === "/") return { name: "home" };
  let m = path.match(/^\/components\/([\w-]+)$/);
  if (m) return { name: "component", id: m[1] };
  m = path.match(/^\/sites\/([\w-]+)$/);
  if (m) return { name: "site", id: m[1] };
  if (path === paths.curves) return { name: "curves" };
  if (path === paths.prompt) return { name: "prompt" };
  return { name: "notfound" };
}

// Links from the earlier single-page hub (?c=… opened the viewer, ?site=… filtered by site).
{
  const p = new URLSearchParams(window.location.search);
  const c = p.get("c");
  const site = p.get("site");
  if (c) window.history.replaceState(null, "", withBase(paths.component(c)));
  else if (site) window.history.replaceState(null, "", withBase(paths.site(site)));
}

if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";

const key = () => window.location.pathname + window.location.search;
let snapshot = key();
let navCount = 0;
/** Which card's preview should carry the shared-element name, e.g. "c:heron-crosshair-hero". */
let morphKey: string | null = null;
const listeners = new Set<() => void>();

function emit() {
  snapshot = key();
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

/**
 * Elements that can morph carry data-morph="<key>". Only the one matching morphKey gets the
 * shared name, so the old and new page each have at most one element called "morph-preview".
 */
function applyMorphNames() {
  document.querySelectorAll<HTMLElement>("[data-morph]").forEach((el) => {
    el.style.viewTransitionName = el.dataset.morph === morphKey ? "morph-preview" : "";
  });
}

function withTransition(update: () => void) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("startViewTransition" in document) || reduce) {
    update();
    return;
  }
  applyMorphNames();
  document.startViewTransition(() => flushSync(update));
}

window.addEventListener("popstate", (e) => {
  // A hash-only change (skip link) is not a page change.
  if (key() === snapshot) return;
  const y = (e.state as { scroll?: number } | null)?.scroll ?? 0;
  withTransition(() => {
    navCount++;
    emit();
    window.scrollTo(0, y);
  });
});

export function navigate(to: string, opts: { replace?: boolean; morph?: string | null } = {}) {
  if (opts.morph !== undefined) morphKey = opts.morph;
  const scroll = window.scrollY;
  withTransition(() => {
    if (opts.replace) {
      window.history.replaceState({ scroll: 0 }, "", withBase(to));
    } else {
      // Remember where this page was scrolled so Back returns to the same spot.
      window.history.replaceState({ ...(window.history.state ?? {}), scroll }, "");
      window.history.pushState({ scroll: 0 }, "", withBase(to));
    }
    navCount++;
    emit();
    window.scrollTo(0, 0);
  });
}

/** Rewrites the current URL's query (filters, search) without adding a history entry. */
export function replaceQuery(params: URLSearchParams) {
  const qs = params.toString();
  window.history.replaceState(window.history.state, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
  snapshot = key();
}

export function useRoute(): Route {
  const loc = useSyncExternalStore(subscribe, () => snapshot);
  return useMemo(() => parse(), [loc]); // eslint-disable-line react-hooks/exhaustive-deps
}

/** Props for an element that can morph between pages: a card's preview, or a page's main preview. */
export const morphProps = (k: string) => ({ "data-morph": k, style: { viewTransitionName: morphKey === k ? "morph-preview" : undefined } });

/** A detail page claims the morph so Back (or any link home) shrinks it into the matching card. */
export function useClaimMorph(k: string) {
  useEffect(() => {
    morphKey = k;
  }, [k]);
}

export function useDocumentTitle(title: string | null) {
  useEffect(() => {
    document.title = title ? `${title} | Frontend Copied Hub` : "Frontend Copied Hub";
  }, [title]);
}

/** After an in-app page change, move focus to the page heading so screen readers announce the new page. */
export function useFocusOnNavigate(ref: RefObject<HTMLElement | null>, dep: unknown) {
  useEffect(() => {
    if (navCount > 0) ref.current?.focus({ preventScroll: true });
  }, [ref, dep]);
}
