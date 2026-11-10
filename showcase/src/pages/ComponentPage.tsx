import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { ComponentCard } from "../components/ComponentCard";
import { CurveTile } from "../components/CurveTile";
import { Footer } from "../components/Footer";
import { ThemeBadge } from "../components/ThemeBadge";
import { MotionSection, SectionHeading } from "../components/viewer/MotionSection";
import { PreviewStage } from "../components/viewer/PreviewStage";
import { SourcePanel } from "../components/viewer/SourcePanel";
import { TokensSection } from "../components/viewer/TokensSection";
import { ALL_COMPONENTS, COMPONENT_BY_ID } from "../data/catalog";
import { CATEGORY_LABEL, THEME_BY_ID } from "../data/themes";
import { parseBezier } from "../lib/easing";
import { paths, useClaimMorph, useDocumentTitle, useFocusOnNavigate } from "../lib/router";
import { Link } from "../components/Link";
import { NotFoundPage } from "./NotFoundPage";

export function ComponentPage({ id }: { id: string }) {
  const item = COMPONENT_BY_ID.get(id);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useDocumentTitle(item?.name ?? "Not found");
  useFocusOnNavigate(headingRef, id);
  useClaimMorph(`c:${id}`);

  if (!item) return <NotFoundPage what="component" />;

  const i = ALL_COMPONENTS.indexOf(item);
  const prev = ALL_COMPONENTS[(i - 1 + ALL_COMPONENTS.length) % ALL_COMPONENTS.length];
  const next = ALL_COMPONENTS[(i + 1) % ALL_COMPONENTS.length];
  const siblings = item.site.components.filter((c) => c.id !== item.id).map((c) => COMPONENT_BY_ID.get(c.id)!);
  const accent = THEME_BY_ID[item.site.theme].accent;

  return (
    <div className="grid xl:grid-cols-[minmax(0,1fr)_minmax(400px,460px)]">
      {/* Preview and what it is */}
      <div className="min-w-0 px-4 pt-5 sm:px-8 lg:px-10 xl:col-start-1">
        <PreviewStage item={item} key={item.id} />

        <header className="mt-8 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h1 ref={headingRef} tabIndex={-1} className="type-display text-[clamp(40px,4.6vw,64px)] leading-[0.95] focus:outline-none">
              {item.name}
            </h1>
            <p className="mt-3 max-w-[62ch] text-[17px] leading-relaxed text-ink-2">{item.summary}</p>
          </div>
          <CurveTile curve={parseBezier(item.motionSpecs.easingCurve)} color={accent} size={60} className="hidden sm:inline-grid" />
        </header>

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-rule py-4 text-[14px] md:grid-cols-4">
          <div>
            <dt className="text-[13px] text-muted">Recreated from</dt>
            <dd className="mt-0.5">
              <Link to={paths.site(item.site.id)} className="font-medium text-ink underline-offset-4 hover:underline">
                {item.site.title}
              </Link>
              <a href={item.site.originalUrl} target="_blank" rel="noreferrer" className="ml-1.5 inline-flex items-center text-muted hover:text-ink" aria-label={`${item.site.title} original site`}>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-[13px] text-muted">Theme</dt>
            <dd className="mt-1">
              <ThemeBadge theme={item.site.theme} />
            </dd>
          </div>
          <div>
            <dt className="text-[13px] text-muted">Category</dt>
            <dd className="mt-0.5">
              <Link to={`${paths.home}?cat=${item.category}`} className="text-ink underline-offset-4 hover:underline">
                {CATEGORY_LABEL[item.category]}
              </Link>
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="text-[13px] text-muted">Full recreation</dt>
            <dd className="mt-0.5 truncate font-mono text-[13px] text-ink" title={item.site.repoPath}>
              {item.site.repoPath}
            </dd>
          </div>
        </dl>
      </div>

      {/* Prompt and code: sticky on the right on wide screens, after the header otherwise */}
      <SourcePanel
        item={item}
        key={`panel-${item.id}`}
        className="mx-4 mt-8 h-[min(72vh,640px)] overflow-hidden rounded-2xl border border-rule sm:mx-8 lg:mx-10 xl:sticky xl:top-14 xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:mx-0 xl:mt-0 xl:h-[calc(100dvh-3.5rem)] xl:self-start xl:rounded-none xl:border-0 xl:border-l"
      />

      {/* The measurements */}
      <div className="min-w-0 space-y-16 px-4 pt-14 sm:px-8 lg:px-10 xl:col-start-1">
        <MotionSection item={item} key={`motion-${item.id}`} />
        <TokensSection item={item} />

        {siblings.length > 0 && (
          <section aria-labelledby="more">
            <SectionHeading id="more">{`More from ${item.site.title}`}</SectionHeading>
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
              {siblings.map((c) => (
                <ComponentCard key={c.id} item={c} showSite={false} />
              ))}
            </div>
          </section>
        )}

        <nav aria-label="Browse components" className="grid gap-3 sm:grid-cols-2">
          <Link to={paths.component(prev.id)} className="group flex items-center gap-3 rounded-xl border border-rule p-4 transition-colors hover:border-rule-strong hover:bg-tray">
            <ArrowLeft className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            <span className="min-w-0">
              <span className="block text-[13px] text-muted">Previous</span>
              <span className="block truncate text-[16px] font-medium">{prev.name}</span>
            </span>
          </Link>
          <Link to={paths.component(next.id)} className="group flex items-center justify-end gap-3 rounded-xl border border-rule p-4 text-right transition-colors hover:border-rule-strong hover:bg-tray">
            <span className="min-w-0">
              <span className="block text-[13px] text-muted">Next</span>
              <span className="block truncate text-[16px] font-medium">{next.name}</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </nav>

        <Footer />
      </div>
    </div>
  );
}
