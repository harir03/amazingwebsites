import { motion } from "framer-motion";
import { ArrowUpRight, Check, ClipboardCopy, ExternalLink } from "lucide-react";
import { useRef, useState } from "react";
import { ComponentCard } from "../components/ComponentCard";
import { SiteTile } from "../components/CurveTile";
import { Footer } from "../components/Footer";
import { LivePreview, ScaledFrame } from "../components/LivePreview";
import { ThemeBadge } from "../components/ThemeBadge";
import { SectionHeading } from "../components/viewer/MotionSection";
import { CATALOG, COMPONENT_BY_ID } from "../data/catalog";
import { buildSitePrompt } from "../data/prompt";
import type { WebsiteEntry } from "../data/types";
import { useCopy } from "../hooks/toast";
import { useServerStatus } from "../hooks/useServerStatus";
import { morphProps, useClaimMorph, useDocumentTitle, useFocusOnNavigate } from "../lib/router";
import { posterOf } from "../lib/source";
import { NotFoundPage } from "./NotFoundPage";

function Poster({ site }: { site: WebsiteEntry }) {
  const status = useServerStatus(site.localDevUrl);
  const [mode, setMode] = useState<"preview" | "live">("preview");
  const showLive = mode === "live" && status === "online";

  return (
    <div className="self-start rounded-2xl bg-tray p-2 sm:p-2.5">
      <div className="flex items-center gap-2 px-0.5 pb-2">
        <div className="flex rounded-lg bg-tray-2 p-0.5" role="radiogroup" aria-label="Poster source">
          {(
            [
              ["preview", "Signature component", true],
              ["live", "Live site", status === "online"],
            ] as const
          ).map(([id, label, enabled]) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={mode === id}
              disabled={!enabled}
              onClick={() => setMode(id)}
              title={enabled ? undefined : `Start it first: cd ${site.repoPath} && npm run dev`}
              className={`relative rounded-md px-2.5 py-1 text-[13px] transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${mode === id ? "text-ink" : "text-ink-2 hover:text-ink"}`}
            >
              {mode === id && <motion.span layoutId="poster-seg" className="absolute inset-0 rounded-md bg-white shadow-[0_1px_2px_rgb(27_39_66_/_0.14)]" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
              <span className="relative">{label}</span>
            </button>
          ))}
        </div>
      </div>
      <div {...morphProps(`s:${site.id}`)} className="relative aspect-[16/10] overflow-hidden rounded-xl bg-stage shadow-[0_0_0_1px_rgb(27_39_66_/_0.08)]">
        {showLive ? (
          <ScaledFrame designWidth={1280}>
            {({ width, height }) => <iframe src={site.localDevUrl} title={`${site.title} local recreation`} width={width} height={height} className="border-0" loading="lazy" />}
          </ScaledFrame>
        ) : (
          <LivePreview componentId={posterOf(site)} designWidth={960} inert={false} lazy={false} />
        )}
      </div>
    </div>
  );
}

export function SitePage({ id }: { id: string }) {
  const site = CATALOG.find((s) => s.id === id);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useDocumentTitle(site?.title ?? "Not found");
  useFocusOnNavigate(headingRef, id);
  useClaimMorph(`s:${id}`);
  const { copy, copiedKey } = useCopy();
  const status = useServerStatus(site?.localDevUrl ?? "http://localhost:1/");

  if (!site) return <NotFoundPage what="site" />;

  const port = new URL(site.localDevUrl).port;
  const components = site.components.map((c) => COMPONENT_BY_ID.get(c.id)!);
  const stackKey = `stack-${site.id}`;

  const copyStack = () =>
    copy(
      buildSitePrompt({
        title: site.title,
        originalUrl: site.originalUrl,
        themeName: site.themeDisplayName,
        techStack: site.techStack,
        palette: site.palette,
        components: site.components.map((c) => ({ name: c.name, summary: c.summary, easing: c.motionSpecs.easingCurve, duration: c.motionSpecs.duration })),
      }),
      `${site.title} site stack prompt`,
      stackKey,
    );

  return (
    <div className="px-4 pt-5 sm:px-8 lg:px-10">
      <div className="grid gap-x-10 gap-y-8 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Poster site={site} key={site.id} />

        <div className="min-w-0 xl:pt-2">
          <SiteTile palette={site.palette} size={52} />
          <h1 ref={headingRef} tabIndex={-1} className="type-display mt-5 text-[clamp(44px,5vw,72px)] leading-[0.93] focus:outline-none">
            {site.title}
          </h1>
          <p className="mt-3 text-[19px] leading-snug text-ink">{site.tagline}</p>
          <p className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-ink-2">{site.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <a
              href={site.localDevUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-purple px-4 py-2.5 text-[14px] font-semibold text-white shadow-md shadow-purple/20 hover:brightness-110 transition-all"
              title={status === "online" ? undefined : `Not running. Start it with: cd ${site.repoPath} && npm run dev`}
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" /> View live demo
            </a>
            <button
              type="button"
              onClick={copyStack}
              className="inline-flex items-center gap-2 rounded-xl border border-rule bg-surface px-4 py-2.5 text-[14px] font-medium text-ink hover:border-purple/40 hover:text-purple transition-all"
            >
              {copiedKey === stackKey ? <Check className="h-4 w-4 text-emerald-500" aria-hidden="true" /> : <ClipboardCopy className="h-4 w-4" aria-hidden="true" />}
              {copiedKey === stackKey ? "Copied Prompt!" : "Copy Full Site Stack Prompt"}
            </button>
            <a href={site.originalUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-2 py-2 text-[14px] text-muted underline-offset-4 hover:text-ink hover:underline">
              Original site <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-3 flex items-center gap-2 text-[13px] text-muted">
            <span aria-hidden="true" className={`h-2 w-2 rounded-full ${status === "online" ? "bg-ok" : status === "checking" ? "bg-rule-strong" : "border border-rule-strong"}`} />
            {status === "online" ? (
              `Running locally on :${port}`
            ) : status === "checking" ? (
              "Checking the local server…"
            ) : (
              <span>
                Not running. Start it with <code className="font-mono text-[12.5px] text-ink-2">cd {site.repoPath} && npm run dev</code>
              </span>
            )}
          </p>

          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-rule pt-5 text-[14px]">
            <div>
              <dt className="text-[13px] text-muted">Theme</dt>
              <dd className="mt-1">
                <ThemeBadge theme={site.theme} />
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="text-[13px] text-muted">Recreated in</dt>
              <dd className="mt-0.5 truncate font-mono text-[13px] text-ink">{site.repoPath}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-[13px] text-muted">Stack</dt>
              <dd className="mt-0.5 text-ink">{site.techStack.join(", ")}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-[13px] text-muted">Palette</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {site.palette.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => copy(c, c, `pal-${site.id}-${c}`)}
                    className="group flex items-center gap-2 rounded-full bg-tray py-1 pr-2.5 pl-1 text-[12.5px] text-ink-2 hover:text-ink"
                    aria-label={`Copy ${c}`}
                  >
                    <span className="h-5 w-5 rounded-full shadow-[inset_0_0_0_1px_rgb(27_39_66_/_0.12)]" style={{ background: c }} />
                    <span className="font-mono">{copiedKey === `pal-${site.id}-${c}` ? "Copied" : c}</span>
                  </button>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <section aria-labelledby="site-components" className="mt-16">
        <SectionHeading id="site-components">{`${components.length} components`}</SectionHeading>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 2xl:grid-cols-3">
          {components.map((c) => (
            <ComponentCard key={c.id} item={c} showSite={false} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
