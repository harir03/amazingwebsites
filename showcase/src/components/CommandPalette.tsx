import { motion } from "framer-motion";
import { CornerDownLeft, Globe, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { ALL_COMPONENTS, CATALOG } from "../data/catalog";
import { CATEGORY_LABEL, THEME_BY_ID } from "../data/themes";
import { searchComponents, siteMatches } from "../lib/search";

type Result = { kind: "component"; id: string; title: string; meta: string; accent: string } | { kind: "site"; id: string; title: string; meta: string; accent: string };

interface Props {
  onClose: () => void;
  onOpenComponent: (id: string) => void;
  onOpenSite: (id: string) => void;
}

const SUGGESTIONS = ["glass", "scroll", "Web Audio", "cubic-bezier(0.16", "loader", "particles", "hover"];

export function CommandPalette({ onClose, onOpenComponent, onOpenSite }: Props) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    return () => prev?.focus?.({ preventScroll: true });
  }, []);

  const results = useMemo<Result[]>(() => {
    const comps = searchComponents(ALL_COMPONENTS, q)
      .slice(0, q ? 9 : 6)
      .map((c) => ({
        kind: "component" as const,
        id: c.id,
        title: c.name,
        meta: `${CATEGORY_LABEL[c.category]} from ${c.site.title}, ${c.motionSpecs.engine}`,
        accent: THEME_BY_ID[c.site.theme].accent,
      }));
    const sites = CATALOG.filter((s) => !q || siteMatches(s, q))
      .slice(0, q ? 4 : 7)
      .map((s) => ({ kind: "site" as const, id: s.id, title: s.title, meta: `${s.themeDisplayName}, ${s.components.length} components`, accent: THEME_BY_ID[s.theme].accent }));
    return [...comps, ...sites];
  }, [q]);

  const choose = (r: Result | undefined) => {
    if (!r) return;
    if (r.kind === "component") onOpenComponent(r.id);
    else onOpenSite(r.id);
  };

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  let lastKind: Result["kind"] | null = null;

  return (
    <motion.div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} aria-hidden="true" />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        initial={{ opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.98 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-rule bg-surface shadow-2xl"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-rule px-4">
          <Search className="h-4 w-4 text-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            placeholder="Search components, sites, easing curves…"
            className="h-14 flex-1 bg-transparent text-[17px] text-ink placeholder:text-muted focus:outline-none"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-results"
            aria-activedescendant={results[active] ? `pr-${active}` : undefined}
            aria-autocomplete="list"
          />
          <kbd className="rounded-md border border-rule bg-tray px-1.5 py-0.5 font-sans text-[12px] text-ink-2">Esc</kbd>
        </div>

        {!q && (
          <div className="flex flex-wrap items-center gap-1.5 border-b border-rule px-4 py-2.5">
            <span className="mr-1 text-[13px] text-muted">Try</span>
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => setQ(s)} className="rounded-full bg-tray px-2.5 py-0.5 text-[13px] text-ink-2 hover:bg-tray-2 hover:text-ink">
                {s}
              </button>
            ))}
          </div>
        )}

        <ul id="palette-results" ref={listRef} role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-8 text-center text-[15px] text-ink-2">Nothing matches “{q}”. Try an engine (GSAP, Canvas), a trigger (hover, scroll) or a site name.</li>}
          {results.map((r, i) => {
            const header = r.kind !== lastKind ? (r.kind === "component" ? "Components" : "Sites") : null;
            lastKind = r.kind;
            return (
              <li key={`${r.kind}-${r.id}`} role="presentation">
                {header && <p className="px-3 pt-2 pb-1 text-[13px] text-muted">{header}</p>}
                <div
                  id={`pr-${i}`}
                  data-index={i}
                  role="option"
                  aria-selected={i === active}
                  onMouseMove={() => setActive(i)}
                  onClick={() => choose(r)}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 ${i === active ? "bg-tray" : ""}`}
                >
                  {r.kind === "site" ? <Globe className="h-4 w-4 shrink-0" style={{ color: r.accent }} aria-hidden="true" /> : <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: r.accent }} />}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] text-ink">{r.title}</p>
                    <p className="truncate text-[13px] text-muted">{r.meta}</p>
                  </div>
                  {i === active && <CornerDownLeft className="h-3.5 w-3.5 text-muted" aria-hidden="true" />}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-4 border-t border-rule px-4 py-2 text-[13px] text-muted">
          <span>↑↓ to move</span>
          <span>Enter to open</span>
          <span className="ml-auto">{ALL_COMPONENTS.length} components indexed</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
