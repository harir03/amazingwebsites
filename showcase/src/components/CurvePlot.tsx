import { useEffect, useState, type KeyboardEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { THEMES } from "../data/themes";
import type { ThemeArchetype } from "../data/types";
import { useCurves, type CurveEntry } from "../lib/curves";
import { bezierPoint, describeBezier, type Bezier } from "../lib/easing";

// Plot geometry (SVG units).
const W = 560;
const H = 470;
const M = { top: 14, right: 14, bottom: 34, left: 46 };
const PW = W - M.left - M.right;
const PH = H - M.top - M.bottom;


export function CurvePlot({ onOpen }: { onOpen: (id: string) => void }) {
  const { list, minY, maxY } = useCurves();
  const reduce = useReducedMotion();
  const [drawn, setDrawn] = useState(!!reduce);
  const [hover, setHover] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [themeHover, setThemeHover] = useState<ThemeArchetype | null>(null);

  useEffect(() => {
    if (reduce) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setDrawn(true)));
    return () => cancelAnimationFrame(id);
  }, [reduce]);

  const sx = (x: number) => M.left + x * PW;
  const sy = (y: number) => M.top + ((maxY - y) / (maxY - minY)) * PH;
  const pathOf = (b: Bezier) =>
    Array.from({ length: 61 }, (_, i) => bezierPoint(b, i / 60))
      .map(([x, y], i) => `${i ? "L" : "M"}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`)
      .join("");

  const activeKey = hover ?? pinned;
  const active = list.find((e) => e.key === activeKey) ?? null;
  const isLit = (e: CurveEntry) => (activeKey ? e.key === activeKey : themeHover ? e.themes.includes(themeHover) : true);

  const xs = Array.from({ length: 21 }, (_, i) => i / 20);
  const ys = Array.from({ length: Math.round((maxY - minY) * 20) + 1 }, (_, i) => +(minY + i / 20).toFixed(2));

  const onKey = (e: KeyboardEvent, key: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setPinned((p) => (p === key ? null : key));
    } else if (e.key === "Escape") {
      setPinned(null);
    }
  };

  return (
    <figure className="overflow-hidden rounded-2xl bg-tray">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full touch-manipulation" role="group" aria-label={`${list.length} easing curves measured from the recreations`} onMouseLeave={() => setHover(null)}>
        {/* Chart paper: fine cells every 0.05, heavier lines every 0.25 */}
        <g aria-hidden="true">
          {xs.map((x) => (
            <line key={`x${x}`} x1={sx(x)} x2={sx(x)} y1={M.top} y2={M.top + PH} stroke={Math.round(x * 20) % 5 === 0 ? "#b9cbbe" : "#dfe6e0"} strokeWidth={Math.round(x * 20) % 5 === 0 ? 1 : 0.6} />
          ))}
          {ys.map((y) => (
            <line key={`y${y}`} x1={M.left} x2={M.left + PW} y1={sy(y)} y2={sy(y)} stroke={Math.round(y * 20) % 5 === 0 ? "#b9cbbe" : "#dfe6e0"} strokeWidth={Math.round(y * 20) % 5 === 0 ? 1 : 0.6} />
          ))}
          <line x1={M.left} x2={M.left + PW} y1={sy(0)} y2={sy(0)} stroke="#1b2742" strokeWidth="1.2" />
          <line x1={M.left} x2={M.left} y1={M.top} y2={M.top + PH} stroke="#1b2742" strokeWidth="1.2" />
          <line x1={M.left} x2={M.left + PW} y1={sy(1)} y2={sy(1)} stroke="#1b2742" strokeWidth="0.8" strokeDasharray="3 4" />
          <g fill="#586174" fontSize="12" fontFamily="Archivo, sans-serif">
            {[0, 0.5, 1].map((t) => (
              <text key={`tx${t}`} x={sx(t)} y={M.top + PH + 16} textAnchor="middle">
                {t}
              </text>
            ))}
            {[0, 0.5, 1].map((t) => (
              <text key={`ty${t}`} x={M.left - 8} y={sy(t) + 4} textAnchor="end">
                {t}
              </text>
            ))}
            <text x={M.left + PW} y={M.top + PH + 30} textAnchor="end">
              time
            </text>
            <text x={M.left - 8} y={M.top + 10} textAnchor="end">
              value
            </text>
          </g>
        </g>

        {/* Active curve's control handles: the four numbers made visible */}
        {active && (
          <g aria-hidden="true" stroke="#1b2742" strokeWidth="1">
            <line x1={sx(0)} y1={sy(0)} x2={sx(active.curve[0])} y2={sy(active.curve[1])} />
            <line x1={sx(1)} y1={sy(1)} x2={sx(active.curve[2])} y2={sy(active.curve[3])} />
            <circle cx={sx(active.curve[0])} cy={sy(active.curve[1])} r="5" fill="#ffffff" />
            <circle cx={sx(active.curve[2])} cy={sy(active.curve[3])} r="5" fill="#ffffff" />
          </g>
        )}

        {list.map((e, i) => {
          const lit = isLit(e);
          const on = e.key === activeKey;
          const label = `${e.value}, used by ${e.uses.map((u) => u.name).join(", ")}`;
          return (
            <g
              key={e.key}
              role="button"
              tabIndex={0}
              aria-label={label}
              aria-pressed={pinned === e.key}
              className="cursor-pointer outline-none [&:focus-visible>path:last-child]:[stroke-width:5]"
              onMouseEnter={() => setHover(e.key)}
              onFocus={() => setHover(e.key)}
              onBlur={() => setHover(null)}
              onClick={() => setPinned((p) => (p === e.key ? null : e.key))}
              onKeyDown={(ev) => onKey(ev, e.key)}
            >
              <path d={pathOf(e.curve)} fill="none" stroke="transparent" strokeWidth="16" />
              <path
                d={pathOf(e.curve)}
                fill="none"
                stroke={e.color}
                strokeWidth={on ? 3.5 : 2}
                strokeLinecap="round"
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: drawn ? 0 : 1,
                  opacity: lit ? 1 : 0.18,
                  // Each line draws with its own timing function.
                  transition: `stroke-dashoffset 1.5s ${e.value} ${0.2 + i * 0.09}s, opacity .25s, stroke-width .2s`,
                }}
              />
            </g>
          );
        })}
      </svg>

      <figcaption className="min-h-[9.5rem] border-t border-rule bg-white px-4 py-3.5 sm:px-5" aria-live="polite">
        {active ? (
          <div>
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <code className="font-mono text-[15px] text-ink">{active.value}</code>
              <span className="text-[14px] text-muted first-letter:uppercase">{describeBezier(active.curve)}</span>
            </p>
            <p className="mt-2.5 text-[13px] text-muted">Used in</p>
            <ul className="mt-1 flex flex-wrap gap-1.5">
              {active.uses.map((u) => (
                <li key={u.id}>
                  <button type="button" onClick={() => onOpen(u.id)} className="rounded-lg bg-tray px-2.5 py-1 text-left text-[14px] leading-tight hover:bg-tray-2">
                    {u.name} <span className="text-muted">{u.site.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <p className="text-[13px] text-muted">Line colour is the theme. Point at a theme to pick out its curves.</p>
            <ul className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3" aria-label="Line colours">
              {THEMES.map((t) => (
                <li key={t.id} className="flex items-center gap-2 text-[13px] text-ink-2" onMouseEnter={() => setThemeHover(t.id)} onMouseLeave={() => setThemeHover(null)}>
                  <span aria-hidden="true" className="h-[3px] w-4 shrink-0 rounded-full" style={{ background: t.accent }} />
                  {t.short}
                </li>
              ))}
            </ul>
          </div>
        )}
      </figcaption>
    </figure>
  );
}
