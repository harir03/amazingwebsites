import { Check, Copy, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { CatalogComponent } from "../../data/catalog";
import { THEME_BY_ID } from "../../data/themes";
import { useCopy } from "../../hooks/toast";
import { useInView } from "../../hooks/useInView";
import { describeBezier, parseBezier } from "../../lib/easing";
import { BezierCurve } from "../BezierCurve";
import { CodeBlock } from "../CodeBlock";

const DEMO_MS = 1200;

export function SectionHeading({ id, children, action }: { id: string; children: string; action?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <h2 id={id} className="type-display text-[32px] leading-none">
        {children}
      </h2>
      {action}
    </div>
  );
}

export function MotionSection({ item }: { item: CatalogComponent }) {
  const m = item.motionSpecs;
  const curve = parseBezier(m.easingCurve);
  const accent = THEME_BY_ID[item.site.theme].accent;
  const { copy, copiedKey } = useCopy();
  const [at, setAt] = useState(false);
  const [tick, setTick] = useState(0);
  const [raceRef, raceInView] = useInView<HTMLDivElement>("-80px");
  const played = useRef(false);

  const replay = useCallback(() => {
    setAt(false);
    setTick((t) => t + 1);
    requestAnimationFrame(() => requestAnimationFrame(() => setAt(true)));
  }, []);

  // Run the race once when it first scrolls into view: it is the clearest way to read the curve.
  useEffect(() => {
    if (raceInView && !played.current) {
      played.current = true;
      replay();
    }
  }, [raceInView, replay]);

  const slug = item.id.replace(/^[a-z]+-/, "");
  const snippet = curve
    ? `/* CSS */\n:root { --ease-${slug}: ${m.easingCurve}; }\n.el { transition: transform ${(DEMO_MS / 1000).toFixed(1)}s var(--ease-${slug}); }\n\n/* GSAP (CustomEase plugin) */\nCustomEase.create("${slug}", "M0,0 C${curve[0]},${curve[1]} ${curve[2]},${curve[3]} 1,1");\n\n/* framer-motion */\ntransition={{ duration: ${(DEMO_MS / 1000).toFixed(1)}, ease: [${curve.join(", ")}] }}`
    : m.easingCurve;

  return (
    <section aria-labelledby="motion" className="scroll-mt-20">
      <SectionHeading id="motion">Motion</SectionHeading>

      <div className="grid gap-6 sm:grid-cols-[minmax(0,240px)_minmax(0,1fr)]">
        <div className="rounded-xl bg-tray p-2">{curve && <BezierCurve curve={curve} color={accent} className="h-auto w-full" />}</div>
        <div className="flex min-w-0 flex-col gap-4">
          <div>
            <div className="flex items-center gap-2">
              <code className="truncate font-mono text-[15px] text-ink">{m.easingCurve}</code>
              <button
                type="button"
                onClick={() => copy(m.easingCurve, "easing curve", `ease-${item.id}`)}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-ink-2 hover:bg-tray hover:text-ink"
                aria-label="Copy easing curve"
              >
                {copiedKey === `ease-${item.id}` ? <Check className="h-3.5 w-3.5 text-ok" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            {curve && <p className="mt-1 text-[15px] text-ink-2 first-letter:uppercase">{describeBezier(curve)}.</p>}
            <p className="mt-1.5 text-[14px] leading-relaxed text-muted">Measured from: {m.easingSource}</p>
          </div>
          <dl className="grid grid-cols-3 gap-4 border-t border-rule pt-4 text-[14px]">
            {[
              ["Engine", m.engine],
              ["Trigger", m.triggers],
              ["Duration", m.duration],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[13px] text-muted">{k}</dt>
                <dd className="mt-0.5 leading-snug text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Same distance, same time: linear against this curve */}
        <div ref={raceRef} className="mt-6 rounded-xl border border-rule bg-tray p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[14px] text-muted">Same distance, same {DEMO_MS}ms</p>
            <button
              type="button"
              onClick={replay}
              className="flex items-center gap-1.5 rounded-lg border border-rule bg-surface px-2.5 py-1 text-[13px] font-medium text-ink hover:border-purple/40 hover:text-purple transition-colors"
            >
              <Play className="h-3.5 w-3.5" aria-hidden="true" /> Replay
            </button>
          </div>
          {[
            { label: "Linear", ease: "linear", color: "#a5ada4" },
            { label: "This curve", ease: m.easingCurve, color: accent },
          ].map((row) => (
            <div key={row.label + tick} className="mb-2 flex items-center gap-3 last:mb-0">
              <span className="w-20 shrink-0 text-[13px] text-muted">{row.label}</span>
              <div className="relative h-7 flex-1 rounded-lg border border-rule bg-surface">
                <span
                  className="absolute top-1.5 h-4 w-4 rounded-full"
                  style={{
                    background: row.color,
                    left: at ? "calc(100% - 22px)" : "6px",
                    transition: at ? `left ${DEMO_MS}ms ${row.ease}` : "none",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-2 text-[16px] font-semibold text-ink">Timing breakdown</h3>
          <table className="w-full text-left text-[14px]">
            <tbody>
              {Object.entries(m.parameters).map(([k, v]) => (
                <tr key={k} className="border-b border-rule last:border-0">
                  <th scope="row" className="w-2/5 py-2 pr-3 align-top font-normal text-muted">
                    {k}
                  </th>
                  <td className="py-2 text-ink">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="mb-2 text-[16px] font-semibold text-ink">How it works</h3>
          <p className="max-w-[68ch] text-[15px] leading-relaxed text-ink-2">{m.notes}</p>
        </div>
      </div>

      <div className="mt-8">
        <CodeBlock code={snippet} language="javascript" filename="Easing for CSS, GSAP and framer-motion" copyLabel="easing snippet" maxHeight="16rem" />
      </div>
    </section>
  );
}
