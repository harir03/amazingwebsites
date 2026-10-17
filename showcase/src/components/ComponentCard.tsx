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

// forwardRef: AnimatePresence mode="popLayout" measures exiting cards through a ref.
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.12 } }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      {/* Tray: the component running live, set on a soft grey mount */}
      <div className="rounded-2xl bg-tray p-4 transition-colors duration-300 group-hover:bg-tray-2 sm:p-5">
        <div
          {...morphProps(key)}
          className="relative aspect-[4/3] overflow-hidden rounded-lg bg-stage shadow-[0_0_0_1px_rgb(27_39_66_/_0.08),0_1px_2px_rgb(27_39_66_/_0.06)] transition-[transform,box-shadow] duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:shadow-[0_0_0_1px_rgb(27_39_66_/_0.1),0_18px_30px_-18px_rgb(27_39_66_/_0.45)]"
        >
          <LivePreview componentId={item.id} designWidth={760} />
          {item.hasAudio && (
            <span className="absolute top-2 right-2 grid h-6 w-6 place-items-center rounded-full bg-white/90 text-ink shadow-sm" title="Plays sound">
              <Volume2 className="h-3.5 w-3.5" aria-label="Plays sound" />
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-start gap-3 px-0.5">
        <CurveTile curve={curve} color={accent} trace />
        <div className="min-w-0 flex-1">
          <h3 className="text-[16px] leading-snug font-semibold">
            {/* Stretched link: the whole card opens the component page */}
            <Link to={paths.component(item.id)} morph={key} className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ink">
              {item.name}
            </Link>
          </h3>
          <p className="truncate text-[14px] text-muted">
            {CATEGORY_LABEL[item.category]}
            {showSite && <> from {item.site.title}</>}
          </p>
        </div>
        <button
          type="button"
          onClick={() => copy(item.aiPrompt, `AI prompt for ${item.name}`, `prompt-${item.id}`)}
          className="relative z-10 -mr-1 flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[13px] whitespace-nowrap text-ink-2 transition-colors hover:bg-tray hover:text-ink"
          aria-label={`Copy AI prompt for ${item.name}`}
        >
          {copied ? <Check className="h-3.5 w-3.5 text-ok" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
          {copied ? "Copied" : "Prompt"}
        </button>
      </div>
    </motion.article>
  );
});
