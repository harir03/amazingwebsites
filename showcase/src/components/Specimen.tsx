import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { COMPONENT_BY_ID } from "../data/catalog";
import { CATEGORY_LABEL, THEME_BY_ID } from "../data/themes";
import { useCopy } from "../hooks/toast";
import { parseBezier } from "../lib/easing";
import { paths } from "../lib/router";
import { CurveTile } from "./CurveTile";
import { Link } from "./Link";
import { LivePreview } from "./LivePreview";

const FEATURED = [
  "rec-liquid-glass-nav",
  "heron-crosshair-hero",
  "emo-particle-morph",
  "rec-flip-clock",
  "hm-elastic-menu",
  "am-strip-accordion",
  "dlu-wealth-hud",
  "ds-kinetic-manifesto",
];

export function Specimen({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  const { copy, copiedKey } = useCopy();
  const item = COMPONENT_BY_ID.get(FEATURED[i])!;
  const curve = parseBezier(item.motionSpecs.easingCurve);
  const accent = THEME_BY_ID[item.site.theme].accent;
  const colours = Object.values(item.designTokens.colors).slice(0, 5);
  const step = (d: number) => setI((n) => (n + d + FEATURED.length) % FEATURED.length);
  const copied = copiedKey === `specimen-${item.id}`;

  return (
    <figure
      className={`relative overflow-hidden rounded-3xl border border-rule bg-surface p-4 sm:p-5 shadow-2xl transition-all duration-300 hover:border-purple/40 hover:shadow-[0_20px_60px_-15px_var(--accent-purple-glow)] ${className}`}
      aria-label="Featured interactive component"
    >
      {/* Window Title Bar with macOS dots */}
      <div className="mb-3.5 flex items-center justify-between border-b border-rule/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-500/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-[11px] text-muted">live-stage:/{item.id}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="mr-1 text-[11px] text-dimmed font-mono">
            {i + 1}/{FEATURED.length}
          </span>
          <button
            type="button"
            onClick={() => step(-1)}
            className="grid h-7 w-7 place-items-center rounded-lg border border-rule bg-tray text-ink hover:border-purple/40 hover:text-purple transition-colors"
            aria-label="Previous featured component"
          >
            <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className="grid h-7 w-7 place-items-center rounded-lg border border-rule bg-tray text-ink hover:border-purple/40 hover:text-purple transition-colors"
            aria-label="Next featured component"
          >
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Live Preview Display Stage */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-rule/60 bg-stage shadow-inner">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <LivePreview componentId={item.id} designWidth={860} lazy={false} />
          </motion.div>
        </AnimatePresence>
      </div>

      <figcaption className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
              <p className="truncate text-[17px] font-bold text-ink tracking-tight">{item.name}</p>
            </div>
            <p className="mt-0.5 truncate text-[13px] text-muted">
              {CATEGORY_LABEL[item.category]} · {item.site.title}
            </p>
          </div>

          <Link
            to={paths.component(item.id)}
            className="inline-flex items-center gap-1 rounded-xl border border-rule bg-tray px-3 py-1.5 text-[12px] font-medium text-ink hover:border-purple/40 hover:text-purple transition-colors"
          >
            <span>Inspect</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Forensic Motion Specs */}
        <div className="mt-3.5 grid grid-cols-2 gap-2 rounded-xl border border-rule/60 bg-tray/60 p-2.5 text-[12px]">
          <div className="flex items-center gap-2 min-w-0">
            <CurveTile curve={curve} color={accent} size={20} />
            <span className="truncate font-mono text-[11px] text-muted">{item.motionSpecs.easingCurve}</span>
          </div>
          <div className="flex items-center justify-end gap-1.5">
            {colours.map((c) => (
              <span
                key={c}
                title={c}
                className="h-3.5 w-3.5 rounded-full border border-rule shadow-xs"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>

        <div className="mt-3.5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => copy(item.aiPrompt, `AI prompt for ${item.name}`, `specimen-${item.id}`)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-all ${
              copied
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-ink text-page shadow-sm hover:opacity-90 active:scale-[0.98]"
            }`}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? "Prompt Copied!" : "Copy 1-Click AI Prompt"}</span>
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
