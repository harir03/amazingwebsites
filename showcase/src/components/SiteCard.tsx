import { motion } from "framer-motion";
import { forwardRef } from "react";
import type { WebsiteEntry } from "../data/types";
import { THEME_BY_ID } from "../data/themes";
import { morphProps, paths } from "../lib/router";
import { posterOf } from "../lib/source";
import { useServerStatus } from "../hooks/useServerStatus";
import { Link } from "./Link";
import { SiteTile } from "./CurveTile";
import { LivePreview } from "./LivePreview";

export const SiteCard = forwardRef<HTMLElement, { site: WebsiteEntry }>(function SiteCard({ site }, ref) {
  const key = `s:${site.id}`;
  const theme = THEME_BY_ID[site.theme];
  const status = useServerStatus(site.localDevUrl);
  let port = "";
  try {
    port = new URL(site.localDevUrl).port;
  } catch {}

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-2xl border border-rule bg-surface p-3.5 sm:p-5 transition-all duration-300 hover:border-purple/40 hover:shadow-[0_12px_32px_-8px_var(--accent-purple-glow)]"
    >
      {/* Top Header: Archetype Tag + Status Indicator */}
      <div className="mb-2.5 flex items-center justify-between text-[12px]">
        <span className="flex items-center gap-1.5 font-medium text-muted">
          <span className="h-2 w-2 rounded-full" style={{ background: theme.accent }} />
          {theme.name}
        </span>
        {port && (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${
              status === "online"
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                : "bg-tray text-dimmed border border-rule"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                status === "online" ? "bg-emerald-400 animate-pulse" : "bg-muted"
              }`}
            />
            {status === "online" ? `:${port} Live` : `:${port}`}
          </span>
        )}
      </div>

      {/* Poster Preview */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-rule/60 bg-stage transition-transform duration-500 ease-out-expo group-hover:scale-[1.01]">
        <div {...morphProps(key)} className="h-full w-full">
          <LivePreview componentId={posterOf(site)} designWidth={820} />
        </div>
      </div>

      {/* Info & Tech Stack */}
      <div className="mt-3.5 flex items-start gap-3">
        <SiteTile palette={site.palette} />
        <div className="min-w-0 flex-1">
          <h3 className="text-[16px] leading-snug font-semibold text-ink group-hover:text-purple transition-colors">
            <Link
              to={paths.site(site.id)}
              morph={key}
              className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-purple"
            >
              {site.title}
            </Link>
          </h3>
          <p className="truncate text-[13px] text-muted">{site.tagline}</p>
        </div>
        <span className="shrink-0 rounded-md border border-rule bg-tray px-2 py-0.5 text-[12px] font-medium text-muted tabular-nums">
          {site.components.length} bits
        </span>
      </div>
    </motion.article>
  );
});
