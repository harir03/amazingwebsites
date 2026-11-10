import { useRef } from "react";
import { CurvePlot } from "../components/CurvePlot";
import { useCurves } from "../lib/curves";
import { CurveTile } from "../components/CurveTile";
import { Footer } from "../components/Footer";
import { describeBezier } from "../lib/easing";
import { navigate, paths, useDocumentTitle, useFocusOnNavigate } from "../lib/router";
import { Link } from "../components/Link";

export function CurvesPage() {
  const { list } = useCurves();
  const headingRef = useRef<HTMLHeadingElement>(null);
  useDocumentTitle("Easing curves");
  useFocusOnNavigate(headingRef, "curves");
  const sorted = [...list].sort((a, b) => b.uses.length - a.uses.length);

  return (
    <div className="px-4 pt-10 sm:px-8 lg:px-12">
      <header className="max-w-[62ch]">
        <h1 ref={headingRef} tabIndex={-1} className="type-display text-[clamp(44px,5vw,72px)] leading-[0.93] focus:outline-none">
          Easing curves
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-2">
          Every timing curve measured from the recreations, on one plot. Each line draws itself with its own easing. Point at one to see which components use it, then open them.
        </p>
      </header>

      <div className="mt-10 grid gap-10 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] xl:items-start">
        <div className="xl:sticky xl:top-20">
          <CurvePlot onOpen={(id) => navigate(paths.component(id))} />
        </div>

        <ul className="divide-y divide-rule border-y border-rule">
          {sorted.map((e) => (
            <li key={e.key} className="flex gap-4 py-4">
              <CurveTile curve={e.curve} color={e.color} size={44} />
              <div className="min-w-0 flex-1">
                <code className="block truncate font-mono text-[14px] text-ink">{e.value}</code>
                <p className="mt-0.5 text-[14px] text-muted first-letter:uppercase">{describeBezier(e.curve)}</p>
                <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[14px]">
                  {e.uses.map((u) => (
                    <Link key={u.id} to={paths.component(u.id)} className="text-ink underline decoration-rule-strong underline-offset-4 hover:decoration-ink">
                      {u.name}
                    </Link>
                  ))}
                </p>
              </div>
              <span className="shrink-0 text-[13px] text-muted tabular-nums">{e.uses.length === 1 ? "1 use" : `${e.uses.length} uses`}</span>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
