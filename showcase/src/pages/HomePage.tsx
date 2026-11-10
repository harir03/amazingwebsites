import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { CornerDownRight, Search, SearchX, X, ArrowDown, Layers, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ComponentCard } from "../components/ComponentCard";
import { SiteCard } from "../components/SiteCard";
import { Specimen } from "../components/Specimen";
import { FounderQuotes } from "../components/FounderQuotes";
import { FaqSection } from "../components/FaqSection";
import { Footer } from "../components/Footer";
import { V7HeroParticles } from "../components/v7/V7HeroParticles";
import { V7ArchetypeSelector } from "../components/v7/V7ArchetypeSelector";
import { V7WorkflowBento } from "../components/v7/V7WorkflowBento";
import { V7MetricsGrid } from "../components/v7/V7MetricsGrid";
import { V7SecurityTrust } from "../components/v7/V7SecurityTrust";
import { ALL_COMPONENTS, CATALOG, STATS } from "../data/catalog";
import { CATEGORIES, THEMES } from "../data/themes";
import type { ComponentCategory, ThemeArchetype } from "../data/types";
import { replaceQuery, useDocumentTitle, useFocusOnNavigate } from "../lib/router";
import { searchComponents, siteMatches } from "../lib/search";

type View = "components" | "sites";

interface HomeState {
  q: string;
  cat: ComponentCategory | "all";
  theme: ThemeArchetype | "all";
  view: View;
}

const CATEGORY_IDS = new Set<string>(CATEGORIES.map((c) => c.id));
const THEME_IDS = new Set<string>(THEMES.map((t) => t.id));

function read(): HomeState {
  const p = new URLSearchParams(window.location.search);
  const cat = p.get("cat");
  const theme = p.get("theme");
  return {
    q: p.get("q") ?? "",
    cat: cat && CATEGORY_IDS.has(cat) ? (cat as ComponentCategory) : "all",
    theme: theme && THEME_IDS.has(theme) ? (theme as ThemeArchetype) : "all",
    view: p.get("view") === "sites" ? "sites" : "components",
  };
}

function write(s: HomeState) {
  const p = new URLSearchParams();
  if (s.q) p.set("q", s.q);
  if (s.cat !== "all") p.set("cat", s.cat);
  if (s.theme !== "all") p.set("theme", s.theme);
  if (s.view !== "components") p.set("view", s.view);
  replaceQuery(p);
}

const SUGGESTIONS = [
  ["Loaders", "loader"],
  ["Web Audio", "audio"],
  ["Liquid Glass", "glass"],
  ["Cursor tracking", "crosshair"],
  ["Springs", "spring"],
  ["GPGPU Particles", "particle"],
] as const;

function FilterPill({
  selected,
  onClick,
  disabled,
  group,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  group: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={`relative shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors disabled:cursor-default disabled:opacity-40 ${
        selected ? "text-page" : "text-muted hover:text-ink hover:bg-tray/60"
      }`}
    >
      {selected && (
        <motion.span
          layoutId={group}
          className="absolute inset-0 rounded-full bg-ink shadow-sm"
          transition={{ type: "spring", stiffness: 500, damping: 38 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
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

  const components = useMemo(() => {
    let list = found;
    if (state.cat !== "all") list = list.filter((c) => c.category === state.cat);
    if (state.theme !== "all") list = list.filter((c) => c.site.theme === state.theme);
    return list;
  }, [found, state.cat, state.theme]);

  const sites = useMemo(() => {
    let list = CATALOG;
    if (state.theme !== "all") list = list.filter((s) => s.theme === state.theme);
    if (state.q) list = list.filter((s) => siteMatches(s, state.q) || found.some((c) => c.site.id === s.id));
    return list;
  }, [found, state.q, state.theme]);

  const filtered = state.view === "components" ? !!state.q || state.cat !== "all" || state.theme !== "all" : !!state.q || state.theme !== "all";
  const shown = state.view === "components" ? components.length : sites.length;
  const total = state.view === "components" ? ALL_COMPONENTS.length : CATALOG.length;
  const clear = () => set({ q: "", cat: "all", theme: "all" });

  const toGallery = () => galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleSelectTheme = (themeId: ThemeArchetype) => {
    set({ theme: themeId });
    toGallery();
  };

  return (
    <div className="relative min-h-screen px-4 sm:px-6 lg:px-12">
      {/* V7 Labs Style Hero Section */}
      <section className="relative z-10 pt-16 pb-14 sm:pt-28 sm:pb-20 flex flex-col items-center text-center max-w-4xl mx-auto overflow-hidden">
        {/* Converging Stream Particles from V7 Labs */}
        <V7HeroParticles />

        {/* Editorial Serif Headline (V7 Labs exact typographic signature) */}
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="type-display text-[clamp(44px,6.8vw,86px)] leading-[0.98] font-normal tracking-tight text-ink focus:outline-none max-w-3xl"
        >
          Complex UI physics.
          <br />
          Zero room for <em className="italic font-normal">error</em>.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-[56ch] text-[16px] sm:text-[18px] leading-relaxed text-muted">
          Frontend Copied automates the forensic extraction of {STATS.sites} award-winning web applications into {STATS.components} drop-in components. Pure React + Tailwind TypeScript and standalone Vanilla HTML, with measured cubic-beziers and copy-ready AI prompts.
        </p>

        {/* High-Contrast Pill Action Buttons (V7 Labs exact CTA style) */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5 z-10">
          <button
            type="button"
            onClick={toGallery}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[14.5px] font-semibold text-page shadow-sm hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <span>Explore {STATS.components} Components</span>
            <ArrowDown className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              set({ view: "sites" });
              toGallery();
            }}
            className="inline-flex items-center gap-2 rounded-full border border-rule bg-surface px-6 py-3.5 text-[14px] font-medium text-ink hover:border-rule-strong hover:bg-tray transition-all shadow-2xs"
          >
            <Layers className="h-4 w-4 text-orange-500" />
            <span>{STATS.sites} Archetype Stacks</span>
          </button>
        </div>

        {/* V7 Labs Partner Logo Bar: "Shaping the future of..." */}
        <div className="mt-16 pt-8 border-t border-rule/60 w-full max-w-2xl z-10">
          <p className="text-[12.5px] font-serif text-muted mb-4">
            Shaping the <em className="italic text-ink font-serif">future</em> of forensic web engineering
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5 text-xs font-semibold text-muted tracking-wider">
            <span className="hover:text-orange-500 transition-colors">KVANT STUDIO</span>
            <span className="text-rule-strong font-light">/</span>
            <span className="hover:text-orange-500 transition-colors">ALAN MENKEN</span>
            <span className="text-rule-strong font-light">/</span>
            <span className="hover:text-orange-500 transition-colors">BELGRADE ARBOR</span>
            <span className="text-rule-strong font-light">/</span>
            <span className="hover:text-orange-500 transition-colors">SWEETTAPE</span>
            <span className="text-rule-strong font-light">/</span>
            <span className="hover:text-orange-500 transition-colors">OVERWORLD AUDIO</span>
            <span className="text-rule-strong font-light">/</span>
            <span className="hover:text-orange-500 transition-colors">DON'T LOOK UP</span>
            <span className="text-rule-strong font-light">/</span>
            <span className="hover:text-orange-500 transition-colors">RECURSIVE</span>
          </div>
        </div>
      </section>

      {/* "Pick your archetype. See the components at work." (V7 Labs exact section) */}
      <V7ArchetypeSelector onSelectTheme={handleSelectTheme} />

      {/* Live Interactive Specimen Stage */}
      <div className="mx-auto max-w-4xl my-16">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-muted">Real-Time Inspection Stage</span>
            <h3 className="type-serif text-2xl font-normal text-ink">Component in motion: Zero approximation</h3>
          </div>
          <button
            type="button"
            onClick={toGallery}
            className="text-xs font-semibold text-orange-500 hover:text-orange-600 inline-flex items-center gap-1 transition-colors"
          >
            <span>View all {STATS.components} in library</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <Specimen />
      </div>

      {/* V7 Labs "Build frontend workflows on everything your team knows" Bento */}
      <V7WorkflowBento />

      {/* V7 Labs 3-Column Performance & ROI Impact Metrics Grid */}
      <V7MetricsGrid />

      {/* Interactive 23-Component & 7-Archetype Gallery */}
      <section ref={galleryRef} aria-labelledby="gallery-heading" className="scroll-mt-20 py-16">
        <div className="mb-8 flex flex-col gap-5 border-b border-rule pb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-muted">Complete Archive</span>
              <h2 id="gallery-heading" className="type-serif text-3xl sm:text-4xl font-normal text-ink mt-1">
                {state.view === "components" ? `Browse ${STATS.components} Drop-in Bits` : `Explore ${STATS.sites} Recreated Archetype Stacks`}
              </h2>
            </div>

            {/* View Switcher: Components vs Sites */}
            <div className="flex rounded-full border border-rule bg-tray p-1" role="group" aria-label="View toggle">
              {(
                [
                  ["components", "Components", STATS.components],
                  ["sites", "Archetype Stacks", STATS.sites],
                ] as const
              ).map(([id, label, n]) => {
                const on = state.view === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => set({ view: id })}
                    className={`relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
                      on ? "text-page font-semibold" : "text-muted hover:text-ink"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="view-toggle-pill"
                        className="absolute inset-0 rounded-full bg-ink shadow-sm"
                        transition={{ type: "spring", stiffness: 500, damping: 38 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {label}
                      <span className={`rounded-full px-1.5 py-0.2 text-[11px] font-mono tabular-nums ${on ? "bg-page/20 text-page" : "bg-tray-2 text-muted"}`}>
                        {n}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Bar with Focus Elevation */}
          <form
            role="search"
            className="flex h-13 max-w-xl items-center gap-3 rounded-2xl border border-rule bg-surface px-4 shadow-2xs transition-all focus-within:border-rule-strong focus-within:shadow-md"
            onSubmit={(e) => e.preventDefault()}
          >
            <Search className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
            <input
              type="search"
              value={state.q}
              onChange={(e) => set({ q: e.target.value })}
              placeholder="Search components by name, effect, engine or stack..."
              aria-label="Search components and sites"
              className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-ink placeholder:text-muted focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {state.q && (
              <button
                type="button"
                onClick={() => set({ q: "" })}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-muted hover:bg-tray hover:text-ink transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </form>

          {/* Suggestion Chips */}
          <ul className="flex max-w-2xl flex-wrap items-center gap-x-3 gap-y-2 text-[13px]" aria-label="Suggested searches">
            <span className="text-muted text-[12px] font-medium">Quick suggestions:</span>
            {SUGGESTIONS.map(([label, q]) => {
              const on = state.q === q;
              return (
                <li key={q}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => set({ q: on ? "" : q, cat: "all" })}
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs transition-colors ${
                      on ? "bg-ink text-page font-semibold" : "text-muted hover:text-ink hover:bg-tray"
                    }`}
                  >
                    <CornerDownRight className="h-3 w-3 text-orange-500" aria-hidden="true" />
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>

          <LayoutGroup>
            {/* Category Pills (React Bits Category Bar) */}
            {state.view === "components" && (
              <div className="scrollbar-none -mx-1 flex max-w-full gap-1.5 overflow-x-auto px-1 py-1" role="group" aria-label="Category filter">
                <FilterPill group="cat-pill" selected={state.cat === "all"} onClick={() => set({ cat: "all" })}>
                  All
                  <span className="text-[11px] font-mono opacity-80">{found.length}</span>
                </FilterPill>
                {CATEGORIES.map((c) => (
                  <FilterPill
                    key={c.id}
                    group="cat-pill"
                    selected={state.cat === c.id}
                    disabled={!counts[c.id] && state.cat !== c.id}
                    onClick={() => set({ cat: state.cat === c.id ? "all" : c.id })}
                  >
                    {c.label}
                    <span className="text-[11px] font-mono opacity-80">{counts[c.id]}</span>
                  </FilterPill>
                ))}
              </div>
            )}

            {/* Archetype Filter Chips with signature color dots */}
            <div className="scrollbar-none -mx-1 flex max-w-full items-center gap-1.5 overflow-x-auto px-1 py-1 text-[12px]">
              <span className="text-muted text-[11px] font-semibold uppercase tracking-wider mr-1">Archetype:</span>
              <button
                type="button"
                onClick={() => set({ theme: "all" })}
                className={`rounded-lg px-2.5 py-1 transition-colors ${
                  state.theme === "all" ? "bg-ink text-page font-semibold" : "text-muted hover:text-ink"
                }`}
              >
                All
              </button>
              {THEMES.map((t) => {
                const on = state.theme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => set({ theme: on ? "all" : t.id })}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 whitespace-nowrap transition-colors ${
                      on
                        ? "border-ink bg-ink text-page font-semibold"
                        : "border-rule bg-surface text-muted hover:border-rule-strong hover:text-ink"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: t.accent }} />
                    {t.short}
                  </button>
                );
              })}

              {filtered && (
                <div className="ml-auto flex items-center gap-2 pl-3">
                  <span className="text-[12px] text-muted tabular-nums">
                    {shown} of {total}
                  </span>
                  <button
                    type="button"
                    onClick={clear}
                    className="text-[12px] font-medium text-orange-500 hover:underline"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </LayoutGroup>
        </div>

        {/* Component / Site Cards Grid */}
        {shown ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {state.view === "components"
                ? components.map((c) => <ComponentCard key={c.id} item={c} />)
                : sites.map((s) => <SiteCard key={s.id} site={s} />)}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-rule bg-surface px-6 py-16 text-center">
            <SearchX className="h-8 w-8 text-muted" aria-hidden="true" />
            <p className="max-w-[46ch] text-[15px] text-muted">
              Nothing matches your criteria. Try adjusting the search term, clearing category filters, or selecting "All Archetypes".
            </p>
            <button
              type="button"
              onClick={clear}
              className="mt-2 rounded-xl bg-ink px-5 py-2 text-[13px] font-semibold text-page shadow-sm hover:opacity-90"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {/* Testimonials / Quotes from Engineering Leaders */}
      <FounderQuotes />

      {/* V7 Labs Enterprise-Grade Purity & Trust Badges */}
      <V7SecurityTrust />

      {/* FAQ Accordion Section */}
      <FaqSection />

      {/* V7-Inspired Footer */}
      <Footer />
    </div>
  );
}
