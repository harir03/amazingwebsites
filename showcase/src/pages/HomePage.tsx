import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { CornerDownRight, Search, SearchX, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ComponentCard } from "../components/ComponentCard";
import { Footer } from "../components/Footer";
import { SiteCard } from "../components/SiteCard";
import { ALL_COMPONENTS, CATALOG, STATS } from "../data/catalog";
import { CATEGORIES } from "../data/themes";
import type { ComponentCategory } from "../data/types";
import { replaceQuery, useDocumentTitle, useFocusOnNavigate } from "../lib/router";
import { searchComponents, siteMatches } from "../lib/search";

type View = "components" | "sites";
interface HomeState {
  q: string;
  cat: ComponentCategory | "all";
  view: View;
}

const CATEGORY_IDS = new Set<string>(CATEGORIES.map((c) => c.id));

function read(): HomeState {
  const p = new URLSearchParams(window.location.search);
  const cat = p.get("cat");
  return {
    q: p.get("q") ?? "",
    cat: cat && CATEGORY_IDS.has(cat) ? (cat as ComponentCategory) : "all",
    view: p.get("view") === "sites" ? "sites" : "components",
  };
}

function write(s: HomeState) {
  const p = new URLSearchParams();
  if (s.q) p.set("q", s.q);
  if (s.cat !== "all") p.set("cat", s.cat);
  if (s.view !== "components") p.set("view", s.view);
  replaceQuery(p);
}

/** Starting points that each match several components across sites. */
const SUGGESTIONS = [
  ["Loaders", "loader"],
  ["Web Audio", "web audio"],
  ["Scroll-driven", "scroll"],
  ["Glass", "glass"],
  ["Cursor tracking", "cursor"],
  ["Springs", "spring"],
  ["SVG line drawing", "stroke-dashoffset"],
  ["Particles", "particles"],
] as const;

function Pill({ selected, onClick, disabled, group, children }: { selected: boolean; onClick: () => void; disabled?: boolean; group: string; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={`relative shrink-0 rounded-full px-3 py-1.5 text-[14px] whitespace-nowrap transition-colors disabled:cursor-default disabled:opacity-40 ${selected ? "text-white" : "text-ink-2 hover:text-ink"}`}
    >
      {selected && <motion.span layoutId={group} className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
      <span className="relative flex items-center gap-1.5">{children}</span>
    </button>
  );
}

export function HomePage() {
  const [state, setState] = useState<HomeState>(read);
  const set = (patch: Partial<HomeState>) => setState((s) => ({ ...s, ...patch }));
  const headingRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLElement>(null);

  useEffect(() => write(state), [state]);
  useDocumentTitle(null);
  useFocusOnNavigate(headingRef, "home");

  const found = useMemo(() => searchComponents(ALL_COMPONENTS, state.q), [state.q]);
  const counts = useMemo(() => {
    const out: Record<string, number> = { all: found.length };
    for (const c of CATEGORIES) out[c.id] = found.filter((s) => s.category === c.id).length;
    return out;
  }, [found]);
  const components = state.cat === "all" ? found : found.filter((c) => c.category === state.cat);
  const sites = useMemo(() => CATALOG.filter((s) => !state.q || siteMatches(s, state.q) || found.some((c) => c.site.id === s.id)), [found, state.q]);

  const filtered = state.view === "components" ? !!state.q || state.cat !== "all" : !!state.q;
  const shown = state.view === "components" ? components.length : sites.length;
  const total = state.view === "components" ? ALL_COMPONENTS.length : CATALOG.length;
  const clear = () => set({ q: "", cat: "all" });

  const toGallery = () => galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="px-5 sm:px-8 lg:px-12">
      <section className="max-w-[1080px] pt-12 pb-12 sm:pt-16 sm:pb-14">
        <h1 ref={headingRef} tabIndex={-1} className="type-display max-w-[17ch] text-[clamp(42px,5.3vw,76px)] leading-[0.93] focus:outline-none">
          Curated website forensics &amp; drop-in components with <span className="whitespace-nowrap">1-click</span> AI prompts
        </h1>
        <p className="mt-5 max-w-[58ch] text-[17px] leading-relaxed text-ink-2 sm:text-[18px]">
          {STATS.sites} award-winning sites, rebuilt 1:1 and split into the parts worth reusing. Every component comes as React + Tailwind and plain HTML, with its easing and colours
          measured from the source and a prompt your coding agent can run.
        </p>

        <form
          role="search"
          className="mt-8 flex h-14 max-w-[640px] items-center gap-3 rounded-2xl border border-rule bg-tray px-4 transition-colors focus-within:border-rule-strong focus-within:bg-white focus-within:shadow-[0_8px_24px_-16px_rgb(27_39_66_/_0.35)]"
          onSubmit={(e) => {
            e.preventDefault();
            toGallery();
          }}
        >
          <Search className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={state.q}
            onChange={(e) => set({ q: e.target.value })}
            placeholder="Search by name, effect or engine"
            aria-label="Search components and sites"
            className="h-full min-w-0 flex-1 bg-transparent text-[17px] text-ink placeholder:text-muted focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {state.q && (
            <button type="button" onClick={() => set({ q: "" })} className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-2 hover:bg-tray-2 hover:text-ink" aria-label="Clear search">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </form>

        <ul className="mt-4 flex max-w-[680px] flex-wrap gap-x-5 gap-y-2" aria-label="Suggested searches">
          {SUGGESTIONS.map(([label, q]) => {
            const on = state.q === q;
            return (
              <li key={q}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => set({ q: on ? "" : q, cat: "all" })}
                  className={`flex items-center gap-1.5 text-[14px] transition-colors ${on ? "font-medium text-ink" : "text-ink-2 hover:text-ink"}`}
                >
                  <CornerDownRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section ref={galleryRef} aria-labelledby="gallery-heading" className="scroll-mt-20 pb-20">
        <h2 id="gallery-heading" className="sr-only">
          Gallery
        </h2>
        <LayoutGroup>
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-3">
            <div className="flex rounded-xl bg-tray p-1" role="group" aria-label="Show">
              {(
                [
                  ["components", "Components", STATS.components],
                  ["sites", "Sites", STATS.sites],
                ] as const
              ).map(([id, label, n]) => {
                const on = state.view === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => set({ view: id })}
                    className={`relative rounded-lg px-3.5 py-1.5 text-[14px] transition-colors ${on ? "font-medium text-ink" : "text-ink-2 hover:text-ink"}`}
                  >
                    {on && <motion.span layoutId="view-pill" className="absolute inset-0 rounded-lg bg-white shadow-[0_1px_2px_rgb(27_39_66_/_0.12),0_0_0_1px_rgb(27_39_66_/_0.05)]" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
                    <span className="relative">
                      {label} <span className="text-muted tabular-nums">{n}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {state.view === "components" && (
              <div className="scrollbar-none -mx-1 flex max-w-full gap-0.5 overflow-x-auto px-1" role="group" aria-label="Category">
                <Pill group="cat-pill" selected={state.cat === "all"} onClick={() => set({ cat: "all" })}>
                  All
                </Pill>
                {CATEGORIES.map((c) => (
                  <Pill key={c.id} group="cat-pill" selected={state.cat === c.id} disabled={!counts[c.id] && state.cat !== c.id} onClick={() => set({ cat: state.cat === c.id ? "all" : c.id })}>
                    {c.label}
                    <span className={`text-[12px] tabular-nums ${state.cat === c.id ? "text-white/70" : "text-muted"}`}>{counts[c.id]}</span>
                  </Pill>
                ))}
              </div>
            )}

            {filtered && (
              <p className="ml-auto flex items-center gap-3 text-[14px] text-muted tabular-nums" aria-live="polite">
                {shown} of {total}
                <button type="button" onClick={clear} className="text-ink underline underline-offset-4 hover:no-underline">
                  Clear
                </button>
              </p>
            )}
          </div>
        </LayoutGroup>

        {shown ? (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 2xl:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {state.view === "components" ? components.map((c) => <ComponentCard key={c.id} item={c} />) : sites.map((s) => <SiteCard key={s.id} site={s} />)}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-2xl bg-tray px-6 py-16 text-center">
            <SearchX className="h-6 w-6 text-muted" aria-hidden="true" />
            <p className="max-w-[46ch] text-[15px] text-ink-2">
              Nothing matches “{state.q}”{state.cat !== "all" ? " in this category" : ""}. Try an engine (GSAP, Canvas), a trigger (hover, scroll) or a site name.
            </p>
            <button type="button" onClick={clear} className="rounded-full bg-ink px-4 py-2 text-[14px] font-medium text-white hover:bg-ink-2">
              Show all {total}
            </button>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
