import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Download } from "lucide-react";
import { useState } from "react";
import type { CatalogComponent } from "../../data/catalog";
import { useCopy } from "../../hooks/toast";
import { cssVariables, downloadText, pascal, promptWithCode } from "../../lib/source";
import { CodeLines } from "../CodeBlock";

const TABS = [
  { id: "prompt", label: "AI Prompt" },
  { id: "react", label: "React" },
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS Tokens" },
] as const;
type TabId = (typeof TABS)[number]["id"];
type Attach = "none" | "react" | "html";

export function SourcePanel({ item, className = "" }: { item: CatalogComponent; className?: string }) {
  const [tab, setTab] = useState<TabId>("prompt");
  const [attach, setAttach] = useState<Attach>("none");
  const { copy, copiedKey } = useCopy();

  const src = {
    prompt: {
      text: promptWithCode(item, attach),
      file: `${item.id}-prompt.md`,
      type: "text/markdown",
      copyLabel: "Copy prompt",
      toast: "AI agent prompt",
    },
    react: {
      text: item.codeSnippets.reactTailwind,
      file: `${pascal(item.name)}.tsx`,
      type: "text/plain",
      copyLabel: "Copy code",
      toast: "React component",
    },
    html: {
      text: item.codeSnippets.vanillaHtmlCss,
      file: `${item.id}.html`,
      type: "text/html",
      copyLabel: "Copy code",
      toast: "HTML file",
    },
    css: {
      text: cssVariables(item),
      file: `${item.id}-tokens.css`,
      type: "text/css",
      copyLabel: "Copy CSS",
      toast: "CSS variables",
    },
  }[tab];

  const key = `panel-${item.id}-${tab}-${attach}`;
  const copied = copiedKey === key;
  const lines = src.text.split("\n").length;

  return (
    <aside aria-label="Prompt and code" className={`flex min-h-0 flex-col bg-surface border-rule ${className}`}>
      {/* Tabs */}
      <div className="scrollbar-none flex shrink-0 gap-1 overflow-x-auto border-b border-rule px-3 bg-tray/40" role="tablist" aria-label="Take away">
        {TABS.map((t) => (
          <button
            key={t.id}
            id={`src-tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            aria-controls="src-panel"
            onClick={() => setTab(t.id)}
            className={`relative shrink-0 px-3 pt-3.5 pb-3 text-[13px] font-medium transition-colors ${
              tab === t.id ? "font-semibold text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {t.label}
            {tab === t.id && (
              <motion.span
                layoutId="src-tab"
                className="absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-purple shadow-[0_0_8px_var(--color-purple)]"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Action Toolbar */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-rule px-4 py-2.5 bg-surface">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {tab === "prompt" ? (
            <fieldset className="flex items-center gap-1.5 text-[12px]">
              <legend className="sr-only">Attach reference code to the prompt</legend>
              <span className="whitespace-nowrap text-muted font-medium">Attach:</span>
              {(
                [
                  ["none", "None"],
                  ["react", "React"],
                  ["html", "HTML"],
                ] as const
              ).map(([id, label]) => (
                <label
                  key={id}
                  className={`cursor-pointer rounded-full px-2.5 py-0.5 text-[12px] font-medium transition-colors ${
                    attach === id ? "bg-purple text-white shadow-xs" : "bg-tray text-muted hover:text-ink hover:bg-tray-2"
                  }`}
                >
                  <input
                    type="radio"
                    name={`attach-${item.id}`}
                    value={id}
                    checked={attach === id}
                    onChange={() => setAttach(id)}
                    className="sr-only"
                  />
                  {label}
                </label>
              ))}
            </fieldset>
          ) : (
            <span className="truncate font-mono text-[12px] text-muted">{src.file}</span>
          )}
          {tab !== "prompt" && <span className="shrink-0 text-[12px] text-dimmed tabular-nums font-mono">({lines} lines)</span>}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => downloadText(src.text, src.file, src.type)}
            className="grid h-8 w-8 place-items-center rounded-lg border border-rule bg-tray text-muted transition-colors hover:border-purple/40 hover:text-ink"
            aria-label={`Download ${src.file}`}
            title={`Download ${src.file}`}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => copy(src.text, src.toast, key)}
            className={`flex h-8 items-center gap-1.5 rounded-lg px-3 text-[12.5px] font-semibold transition-all ${
              copied
                ? "bg-emerald-500 text-white"
                : "bg-purple text-white shadow-xs shadow-purple/20 hover:brightness-110 active:scale-[0.98]"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "y" : "n"}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1.5"
              >
                {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                {copied ? "Copied!" : src.copyLabel}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Content Display */}
      <div id="src-panel" role="tabpanel" aria-labelledby={`src-tab-${tab}`} className="min-h-0 flex-1 overflow-auto bg-page">
        {tab === "prompt" ? (
          <pre className="p-4 font-mono text-[12px] leading-[1.75] whitespace-pre-wrap text-ink" tabIndex={0}>
            {src.text}
          </pre>
        ) : (
          <CodeLines code={src.text} language={tab === "react" ? "tsx" : tab === "html" ? "markup" : "css"} className="!overflow-visible text-[12.5px]" />
        )}
      </div>

      <p className="shrink-0 border-t border-rule px-4 py-2.5 text-[12px] leading-relaxed text-muted bg-surface">
        {tab === "prompt"
          ? `${src.text.split(/\s+/).length.toLocaleString()} words. Ready to paste directly into Cursor, Claude, Antigravity, or ChatGPT.`
          : tab === "react"
            ? "One self-contained file for React 18+ and Tailwind. Zero external component dependencies."
            : tab === "html"
              ? "Complete standalone file with inline styles and scripts. Ready for static hosting or iframes."
              : "Design tokens formatted as CSS custom properties, ready for :root or Tailwind."}
      </p>
    </aside>
  );
}
