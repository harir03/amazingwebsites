import { motion } from "framer-motion";
import { forwardRef } from "react";
import { THEME_BY_ID } from "../data/themes";
import type { WebsiteEntry } from "../data/types";
import { morphProps, paths } from "../lib/router";
import { posterOf } from "../lib/source";
import { Link } from "./Link";
import { SiteTile } from "./CurveTile";
import { LivePreview } from "./LivePreview";

export const SiteCard = forwardRef<HTMLElement, { site: WebsiteEntry }>(function SiteCard({ site }, ref) {
  const theme = THEME_BY_ID[site.theme];
  const key = `s:${site.id}`;

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
      <div className="rounded-2xl bg-tray p-4 transition-colors duration-300 group-hover:bg-tray-2 sm:p-5">
        <div
          {...morphProps(key)}
          className="relative aspect-[16/10] overflow-hidden rounded-lg bg-stage shadow-[0_0_0_1px_rgb(27_39_66_/_0.08),0_1px_2px_rgb(27_39_66_/_0.06)] transition-[transform,box-shadow] duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:shadow-[0_0_0_1px_rgb(27_39_66_/_0.1),0_18px_30px_-18px_rgb(27_39_66_/_0.45)]"
        >
          <LivePreview componentId={posterOf(site)} designWidth={820} />
        </div>
      </div>
      <div className="mt-3 flex items-start gap-3 px-0.5">
        <SiteTile title={site.title} color={theme.accent} />
        <div className="min-w-0 flex-1">
          <h3 className="text-[16px] leading-snug font-semibold">
            <Link
              to={paths.site(site.id)}
              morph={key}
              className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ink"
            >
              {site.title}
            </Link>
          </h3>
          <p className="truncate text-[14px] text-muted">{site.tagline}</p>
        </div>
        <span className="shrink-0 pt-0.5 text-[13px] text-muted tabular-nums">{site.components.length} components</span>
      </div>
    </motion.article>
  );
});
