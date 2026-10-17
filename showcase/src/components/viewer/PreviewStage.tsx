import { motion } from "framer-motion";
import { ExternalLink, Monitor, Moon, Pause, Play, RotateCcw, Smartphone, Sun, Tablet, Volume2, VolumeX } from "lucide-react";
import { useEffect, useMemo, useState, type MouseEvent, type ReactNode } from "react";
import type { CatalogComponent } from "../../data/catalog";
import { getLibraryComponent } from "../../library/registry";
import { morphProps } from "../../lib/router";
import { ScaledFrame } from "../LivePreview";

const VIEWPORTS = [
  { id: "desktop", label: "Desktop", width: 1280, Icon: Monitor },
  { id: "tablet", label: "Tablet", width: 768, Icon: Tablet },
  { id: "mobile", label: "Mobile", width: 375, Icon: Smartphone },
] as const;
type ViewportId = (typeof VIEWPORTS)[number]["id"];

function ToolButton({ label, onClick, pressed, children }: { label: string; onClick: () => void; pressed?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={pressed}
      title={label}
      className={`grid h-8 w-8 place-items-center rounded-lg transition-colors ${pressed ? "bg-white text-ink shadow-[0_0_0_1px_rgb(27_39_66_/_0.12)]" : "text-ink-2 hover:bg-tray-2 hover:text-ink"}`}
    >
      {children}
    </button>
  );
}

/** Segmented control whose white pill slides to the chosen option. */
function Segmented<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { id: T; label: string; title?: string; icon?: ReactNode }[]; onChange: (v: T) => void }) {
  return (
    <div className="flex rounded-lg bg-tray-2 p-0.5" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={value === o.id}
          onClick={() => onChange(o.id)}
          title={o.title}
          className={`relative flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[13px] transition-colors ${value === o.id ? "text-ink" : "text-ink-2 hover:text-ink"}`}
        >
          {value === o.id && <motion.span layoutId={`seg-${label}`} className="absolute inset-0 rounded-md bg-white shadow-[0_1px_2px_rgb(27_39_66_/_0.14)]" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
          <span className="relative flex items-center gap-1.5">
            {o.icon}
            <span className={o.icon ? "hidden sm:inline" : ""}>{o.label}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

export function PreviewStage({ item }: { item: CatalogComponent }) {
  const [viewport, setViewport] = useState<ViewportId>(() => (window.matchMedia("(max-width: 640px)").matches ? "mobile" : "desktop"));
  const [mode, setMode] = useState<"react" | "html">("react");
  const [runKey, setRunKey] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [dark, setDark] = useState(false);
  const [muted, setMuted] = useState(false);
  const Component = getLibraryComponent(item.id);
  const vp = VIEWPORTS.find((v) => v.id === viewport)!;

  // Blob URL so the vanilla file can open in its own tab.
  const htmlUrl = useMemo(() => URL.createObjectURL(new Blob([item.codeSnippets.vanillaHtmlCss], { type: "text/html" })), [item]);
  useEffect(() => () => URL.revokeObjectURL(htmlUrl), [htmlUrl]);

  // Links inside demos point at "#"; don't let them jump the page.
  const stopHashLinks = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest('a[href^="#"]')) e.preventDefault();
  };

  return (
    <div className="rounded-2xl bg-tray p-2 sm:p-2.5">
      <div className="flex flex-wrap items-center gap-1.5 px-0.5 pb-2">
        <Segmented
          label="Viewport"
          value={viewport}
          onChange={setViewport}
          options={VIEWPORTS.map(({ id, label, width, Icon }) => ({ id, label, title: `${label}, ${width}px`, icon: <Icon className="h-3.5 w-3.5" aria-hidden="true" /> }))}
        />
        <Segmented
          label="Preview source"
          value={mode}
          onChange={setMode}
          options={[
            { id: "react", label: "React", title: "index.tsx, rendered live" },
            { id: "html", label: "HTML", title: "vanilla.html, in a sandboxed iframe" },
          ]}
        />
        <span className="ml-1 hidden text-[13px] text-muted tabular-nums lg:inline">{vp.width}px</span>
        <div className="ml-auto flex items-center gap-0.5">
          <ToolButton label="Restart animation" onClick={() => setRunKey((k) => k + 1)}>
            <RotateCcw className="h-4 w-4" />
          </ToolButton>
          {mode === "react" && (
            <ToolButton label={autoplay ? "Stop demo autoplay" : "Start demo autoplay"} onClick={() => setAutoplay((a) => !a)} pressed={autoplay}>
              {autoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </ToolButton>
          )}
          <ToolButton label={dark ? "Light stage" : "Dark stage"} onClick={() => setDark((d) => !d)}>
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </ToolButton>
          {item.hasAudio && mode === "react" && (
            <ToolButton label={muted ? "Unmute" : "Mute"} onClick={() => setMuted((m) => !m)} pressed={muted}>
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </ToolButton>
          )}
          <a href={htmlUrl} target="_blank" rel="noreferrer" title="Open the HTML version in a new tab" aria-label="Open the HTML version in a new tab" className="grid h-8 w-8 place-items-center rounded-lg text-ink-2 hover:bg-tray-2 hover:text-ink">
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div
        {...morphProps(`c:${item.id}`)}
        className="relative h-[clamp(320px,60vh,660px)] overflow-hidden rounded-xl p-3 transition-colors duration-500 sm:p-4"
        style={{
          ...morphProps(`c:${item.id}`).style,
          background: dark ? "#1b2742" : "#e9ebe6",
          backgroundImage: `radial-gradient(${dark ? "rgba(255,255,255,0.12)" : "rgba(27,39,66,0.12)"} 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
        onClickCapture={stopHashLinks}
      >
        <ScaledFrame designWidth={vp.width} key={viewport}>
          {({ width, height }) => (
            <div className={`h-full w-full overflow-hidden bg-white ${viewport === "desktop" ? "rounded-lg shadow-[0_0_0_1px_rgb(27_39_66_/_0.1),0_12px_30px_-18px_rgb(27_39_66_/_0.5)]" : "rounded-[22px] border-[6px] border-ink"}`} style={{ width, height }}>
              {mode === "react" ? (
                Component ? (
                  <Component key={runKey} loop={autoplay} muted={muted} />
                ) : null
              ) : (
                <iframe key={runKey} title={`${item.name}, HTML version`} srcDoc={item.codeSnippets.vanillaHtmlCss} sandbox="allow-scripts" className="h-full w-full border-0" />
              )}
            </div>
          )}
        </ScaledFrame>
      </div>
    </div>
  );
}
