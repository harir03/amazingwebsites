import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Strip / Grid Pill Switcher — inspired by Alan Menken's works view toggle.
 * A floating pill with a sliding thumb flips the collection between a row of strips
 * and a dense grid. Tiles glide to their new spots with a FLIP animation
 * (First, Last, Invert, Play) on the Web Animations API — no layout library.
 */
type Mode = "strips" | "grid";
type Tile = { title: string; color: string };
type Props = {
  tiles?: Tile[];
  total?: number;
  /** Demo mode: flip between views on a timer until the user clicks. */
  loop?: boolean;
};

const EASE = "cubic-bezier(0.6, 0, 0.1, 1)";
const SERIF = "'Playfair Display', 'Clearface ITC', Georgia, serif";
const TILES: Tile[] = [
  { title: "Aladdin", color: "#2b2f8f" },
  { title: "Tangled", color: "#8a5a2c" },
  { title: "Hercules", color: "#c99a3b" },
  { title: "Newsies", color: "#6e675a" },
  { title: "Enchanted", color: "#b8668a" },
  { title: "Pocahontas", color: "#b5532e" },
  { title: "Hunchback", color: "#5a4475" },
  { title: "Mermaid", color: "#1f7f86" },
  { title: "Beauty & the Beast", color: "#8e5a2a" },
  { title: "Little Shop", color: "#2f6b3a" },
];

export default function ViewSwitcher({ tiles = TILES, total = 42, loop = false }: Props) {
  const [mode, setMode] = useState<Mode>("strips");
  const [demo, setDemo] = useState(loop);
  const rootRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef(new Map<string, HTMLElement>());
  const firstRects = useRef(new Map<string, DOMRect>());

  const switchTo = (next: Mode) => {
    if (next === mode) return;
    // FIRST: remember where every tile is now.
    firstRects.current.clear();
    tileRefs.current.forEach((el, k) => firstRects.current.set(k, el.getBoundingClientRect()));
    setMode(next);
  };

  const switchRef = useRef(switchTo);
  switchRef.current = switchTo;
  useEffect(() => {
    if (!demo) return;
    const id = window.setInterval(() => switchRef.current(mode === "strips" ? "grid" : "strips"), 2800);
    return () => clearInterval(id);
  }, [demo, mode]);

  // LAST + INVERT + PLAY, before the browser paints the new layout.
  useLayoutEffect(() => {
    if (!firstRects.current.size || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = rootRef.current;
    // Rects are in screen pixels; transforms are in layout pixels. They differ if an ancestor is scaled.
    const scale = root ? root.getBoundingClientRect().width / root.offsetWidth || 1 : 1;
    tileRefs.current.forEach((el, k) => {
      const first = firstRects.current.get(k);
      if (!first) return;
      const last = el.getBoundingClientRect();
      const dx = (first.left - last.left) / scale;
      const dy = (first.top - last.top) / scale;
      const sx = first.width / last.width;
      const sy = first.height / last.height;
      el.animate([{ transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` }, { transform: "none" }], {
        duration: 800,
        easing: EASE,
      });
    });
    firstRects.current.clear();
  }, [mode]);

  return (
    <div ref={rootRef} className="@container relative h-full min-h-[340px] w-full overflow-hidden bg-[#e7e5df] text-[#1a1917]" style={{ fontFamily: SERIF }}>
      <div className="flex items-baseline justify-between px-5 pt-4">
        <h2 className="text-[clamp(22px,4cqw,36px)] italic">Selected works</h2>
        <span className="text-[11px] tracking-[0.2em] uppercase opacity-60" style={{ fontFamily: "'Inter', sans-serif" }}>
          {total} works
        </span>
      </div>

      <ul
        className={
          mode === "strips"
            ? "flex h-[calc(100%-118px)] gap-[3px] px-5 pt-4"
            : "grid h-[calc(100%-118px)] grid-cols-3 gap-2 overflow-hidden px-5 pt-4 @xl:grid-cols-5"
        }
        aria-label={`Works, ${mode} view`}
      >
        {tiles.map((t, i) => (
          <li
            key={t.title}
            ref={(el) => {
              if (el) tileRefs.current.set(t.title, el);
              else tileRefs.current.delete(t.title);
            }}
            className={`relative min-w-0 origin-top-left overflow-hidden rounded-[3px] ${mode === "strips" ? "flex-1" : "min-h-[48px]"}`}
            style={{ background: `linear-gradient(160deg, ${t.color}, #120f0c)` }}
          >
            <span
              className={`absolute text-white/90 italic ${
                mode === "strips" ? "bottom-3 left-1/2 -translate-x-1/2 rotate-180 text-[12px] whitespace-nowrap [writing-mode:vertical-rl]" : "bottom-2 left-2 text-[13px]"
              }`}
            >
              {t.title}
            </span>
            <span className="absolute top-2 left-2 text-[9px] text-white/60" style={{ fontFamily: "'Inter', sans-serif" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
          </li>
        ))}
      </ul>

      {/* Floating pill */}
      <div className="absolute inset-x-0 bottom-5 flex justify-center">
        <div role="radiogroup" aria-label="View mode" className="relative flex rounded-full bg-[#1a1917] p-1 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]" style={{ fontFamily: "'Inter', sans-serif" }}>
          <span
            aria-hidden="true"
            className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-[#e7e5df]"
            style={{ transform: mode === "grid" ? "translateX(100%)" : "none", transition: `transform 0.6s ${EASE}` }}
          />
          {(["strips", "grid"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={mode === m}
              onClick={() => {
                setDemo(false);
                switchTo(m);
              }}
              className="relative z-10 flex w-24 items-center justify-center gap-2 rounded-full py-2 text-[12px] capitalize transition-colors duration-500"
              style={{ color: mode === m ? "#1a1917" : "#e7e5df" }}
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                {m === "strips" ? (
                  <path d="M1 2h2v12H1zM5 2h2v12H5zM9 2h2v12H9zM13 2h2v12h-2z" />
                ) : (
                  <path d="M1 1h6v6H1zM9 1h6v6H9zM1 9h6v6H1zM9 9h6v6H9z" />
                )}
              </svg>
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
