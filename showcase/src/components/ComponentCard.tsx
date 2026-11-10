import { motion } from "framer-motion";
import { forwardRef } from "react";
import { Check, Copy, Volume2 } from "lucide-react";
import type { CatalogComponent } from "../data/catalog";
import { CATEGORY_LABEL, THEME_BY_ID } from "../data/themes";
import { useCopy } from "../hooks/toast";
import { parseBezier } from "../lib/easing";
import { morphProps, paths } from "../lib/router";
import { Link } from "./Link";
import { CurveTile } from "./CurveTile";
import { LivePreview } from "./LivePreview";

interface Props {
  item: CatalogComponent;
  /** Hide the site name when every card in the grid comes from the same site. */
  showSite?: boolean;
}

export const ComponentCard = forwardRef<HTMLElement, Props>(function ComponentCard({ item, showSite = true }, ref) {
  const { copy, copiedKey } = useCopy();
  const accent = THEME_BY_ID[item.site.theme].accent;
  const curve = parseBezier(item.motionSpecs.easingCurve);
  const copied = copiedKey === `prompt-${item.id}`;
  const key = `c:${item.id}`;

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-2xl border border-rule bg-surface p-3 sm:p-4 transition-all duration-300 hover:border-purple/40 hover:shadow-[0_12px_32px_-8px_var(--accent-purple-glow)]"
    >
      {/* Top badges: Category + Theme Archetype indicator */}
      <div className="mb-2.5 flex items-center justify-between text-[12px]">
        <span className="flex items-center gap-1.5 font-medium text-muted">
          <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
          {THEME_BY_ID[item.site.theme].short}
        </span>
        <span className="rounded-md border border-rule/60 bg-tray px-2 py-0.5 text-[11px] font-semibold text-muted">
          {CATEGORY_LABEL[item.category]}
        </span>
      </div>

      {/* Live Preview Container: Component running interactively */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-rule/60 bg-stage transition-transform duration-500 ease-out-expo group-hover:scale-[1.01]">
        <div {...morphProps(key)} className="h-full w-full">
          <LivePreview componentId={item.id} designWidth={760} />
        </div>

        {item.hasAudio && (
          <span
            className="absolute top-2.5 right-2.5 grid h-6 w-6 place-items-center rounded-full bg-surface/90 text-ink shadow-xs backdrop-blur-xs"
            title="Plays procedural or synchronized audio"
          >
            <Volume2 className="h-3.5 w-3.5 text-purple" aria-label="Plays sound" />
          </span>
        )}
      </div>

      {/* Card Info & Quick Actions */}
      <div className="mt-3.5 flex items-start gap-3">
        <CurveTile curve={curve} color={accent} trace />
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] leading-snug font-semibold text-ink group-hover:text-purple transition-colors">
            <Link
              to={paths.component(item.id)}
              morph={key}
              className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-purple"
            >
              {item.name}
            </Link>
          </h3>
          <p className="truncate text-[13px] text-muted">
            {showSite ? `from ${item.site.title}` : CATEGORY_LABEL[item.category]}
          </p>
        </div>

        <button
          type="button"
          onClick={() => copy(item.aiPrompt, `AI prompt for ${item.name}`, `prompt-${item.id}`)}
          className={`relative z-10 flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[12px] font-medium transition-colors ${
            copied
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-500 font-semibold"
              : "border-rule bg-tray text-ink hover:border-purple/40 hover:bg-tray-2 hover:text-purple"
          }`}
          aria-label={`Copy AI prompt for ${item.name}`}
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          <span>{copied ? "Copied" : "Prompt"}</span>
        </button>
      </div>
    </motion.article>
  );
});
