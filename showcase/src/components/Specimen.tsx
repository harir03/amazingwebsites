import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Copy } from "lucide-react";
import { useState } from "react";
import { COMPONENT_BY_ID } from "../data/catalog";
import { CATEGORY_LABEL, THEME_BY_ID } from "../data/themes";
import { useCopy } from "../hooks/toast";
import { parseBezier } from "../lib/easing";
import { paths } from "../lib/router";
import { CurveTile } from "./CurveTile";
import { Link } from "./Link";
import { LivePreview } from "./LivePreview";

/** Components that read well small and show off what was measured. */
const FEATURED = ["heron-crosshair-hero", "rec-flip-clock", "emo-particle-morph", "ds-kinetic-manifesto", "am-strip-accordion", "hm-fluid-canvas"];

/**
 * The hub in one exhibit: a component running live, labelled with what was measured
 * from it, and the prompt one click away. Changes only when you ask for the next one.
 */
export function Specimen({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  const { copy, copiedKey } = useCopy();
  const item = COMPONENT_BY_ID.get(FEATURED[i])!;
  const curve = parseBezier(item.motionSpecs.easingCurve);
  const accent = THEME_BY_ID[item.site.theme].accent;
  const colours = Object.values(item.designTokens.colors).slice(0, 6);
  const step = (d: number) => setI((n) => (n + d + FEATURED.length) % FEATURED.length);
  const copied = copiedKey === `specimen-${item.id}`;

  return (
    <figure className={`rounded-2xl bg-tray p-3 ${className}`} aria-label="Featured component">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-stage shadow-[0_0_0_1px_rgb(27_39_66_/_0.08),0_14px_30px_-20px_rgb(27_39_66_/_0.5)]">
        <AnimatePresence initial={false}>
          <motion.div key={item.id} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <LivePreview componentId={item.id} designWidth={900} lazy={false} />
          </motion.div>
        </AnimatePresence>
      </div>

      <figcaption className="px-1.5 pt-4 pb-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0" aria-live="polite">
            <p className="truncate text-[18px] leading-tight font-semibold">{item.name}</p>
            <p className="mt-0.5 truncate text-[14px] text-muted">
              {CATEGORY_LABEL[item.category]} from {item.site.title}
            </p>
          </div>
          <div className="flex shrink-0 gap-1">
            <button type="button" onClick={() => step(-1)} className="grid h-8 w-8 place-items-center rounded-lg text-ink-2 hover:bg-tray-2 hover:text-ink" aria-label="Previous featured component">
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => step(1)} className="grid h-8 w-8 place-items-center rounded-lg text-ink-2 hover:bg-tray-2 hover:text-ink" aria-label="Next featured component">
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* What was measured from the original */}
        <dl className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-2.5 border-t border-rule pt-4 text-[14px]">
          <dt className="text-muted">Easing</dt>
          <dd className="flex min-w-0 items-center gap-2">
            <CurveTile curve={curve} color={accent} size={22} />
            <code className="truncate font-mono text-[13px] text-ink">{item.motionSpecs.easingCurve}</code>
          </dd>
          <dt className="text-muted">Timing</dt>
          <dd className="truncate text-ink">
            {item.motionSpecs.duration}, {item.motionSpecs.engine}
          </dd>
          <dt className="text-muted">Colours</dt>
          <dd className="flex gap-1">
            {colours.map((c) => (
              <span key={c} title={c} className="h-[18px] w-[18px] rounded-full shadow-[inset_0_0_0_1px_rgb(27_39_66_/_0.14)]" style={{ background: c }} />
            ))}
          </dd>
        </dl>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => copy(item.aiPrompt, `AI prompt for ${item.name}`, `specimen-${item.id}`)}
            className="flex items-center gap-1.5 rounded-lg bg-ink px-3 py-2 text-[14px] font-medium text-white transition-colors hover:bg-ink-2"
          >
            {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copied ? "Copied" : "Copy AI prompt"}
          </button>
          <Link to={paths.component(item.id)} className="flex items-center rounded-lg px-3 py-2 text-[14px] text-ink shadow-[inset_0_0_0_1px_rgb(27_39_66_/_0.16)] transition-colors hover:bg-white">
            Open component
          </Link>
        </div>
      </figcaption>
    </figure>
  );
}
