import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Download } from "lucide-react";
import { useState } from "react";
import type { CatalogComponent } from "../../data/catalog";
import { useCopy } from "../../hooks/toast";
import { cssVariables, downloadText, pascal, promptWithCode } from "../../lib/source";
import { CodeLines } from "../CodeBlock";

const TABS = [
  { id: "prompt", label: "AI prompt" },
  { id: "react", label: "React" },
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS variables" },
] as const;
type TabId = (typeof TABS)[number]["id"];
type Attach = "none" | "react" | "html";

/**
 * Everything you take away from a component, in one place: the prompt, both code flavours
 * and the tokens. Sticky beside the preview on wide screens.
 */
export function SourcePanel({ item, className = "" }: { item: CatalogComponent; className?: string }) {
  const [tab, setTab] = useState<TabId>("prompt");
  const [attach, setAttach] = useState<Attach>("none");
  const { copy, copiedKey } = useCopy();

  const src = {
    prompt: { text: promptWithCode(item, attach), file: `${item.id}-prompt.md`, type: "text/markdown", copyLabel: "Copy prompt", toast: "AI agent prompt" },
    react: { text: item.codeSnippets.reactTailwind, file: `${pascal(item.name)}.tsx`, type: "text/plain", copyLabel: "Copy code", toast: "React component" },
    html: { text: item.codeSnippets.vanillaHtmlCss, file: `${item.id}.html`, type: "text/html", copyLabel: "Copy code", toast: "HTML file" },
    css: { text: cssVariables(item), file: `${item.id}-tokens.css`, type: "text/css", copyLabel: "Copy CSS", toast: "CSS variables" },
  }[tab];
  const key = `panel-${item.id}-${tab}-${attach}`;
  const copied = copiedKey === key;
  const lines = src.text.split("\n").length;

  return (
    <aside aria-label="Prompt and code" className={`flex min-h-0 flex-col bg-white ${className}`}>
      <div className="scrollbar-none flex shrink-0 gap-1 overflow-x-auto border-b border-rule px-3" role="tablist" aria-label="Take away">
        {TABS.map((t) => (
          <button
            key={t.id}
            id={`src-tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            aria-controls="src-panel"
            onClick={() => setTab(t.id)}
            className={`relative shrink-0 px-2.5 pt-3.5 pb-3 text-[14px] transition-colors ${tab === t.id ? "font-medium text-ink" : "text-ink-2 hover:text-ink"}`}
          >
            {t.label}
            {tab === t.id && <motion.span layoutId="src-tab" className="absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-ink" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
          </button>
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-3 border-b border-rule px-4 py-2.5">
        <div className="flex min-w-0 flex-1 items-center gap-2">
        {tab === "prompt" ? (
          <fieldset className="flex items-center gap-1 text-[13px]">
            <legend className="sr-only">Attach reference code to the prompt</legend>
            <span className="mr-1 whitespace-nowrap text-ink-2">Attach code</span>
            {(
              [
                ["none", "None"],
                ["react", "React"],
                ["html", "HTML"],
              ] as const
            ).map(([id, label]) => (
              <label
                key={id}
                className={`cursor-pointer rounded-full px-2.5 py-1 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-1 has-[:focus-visible]:outline-ink ${attach === id ? "bg-ink text-white" : "bg-tray text-ink-2 hover:text-ink"}`}
              >
                <input type="radio" name={`attach-${item.id}`} value={id} checked={attach === id} onChange={() => setAttach(id)} className="sr-only" />
                {label}
              </label>
            ))}
          </fieldset>
        ) : (
          <span className="truncate font-mono text-[13px] text-ink-2">{src.file}</span>
        )}
          {tab !== "prompt" && <span className="shrink-0 text-[13px] text-muted tabular-nums">{lines} lines</span>}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => downloadText(src.text, src.file, src.type)}
            className="grid h-8 w-8 place-items-center rounded-lg text-ink-2 transition-colors hover:bg-tray hover:text-ink"
            aria-label={`Download ${src.file}`}
            title={`Download ${src.file}`}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => copy(src.text, src.toast, key)}
            className="flex h-8 items-center gap-1.5 rounded-lg bg-ink px-3 text-[13px] font-medium text-white transition-colors hover:bg-ink-2"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={copied ? "y" : "n"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }} className="flex items-center gap-1.5">
                {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                {copied ? "Copied" : src.copyLabel}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <div id="src-panel" role="tabpanel" aria-labelledby={`src-tab-${tab}`} className="min-h-0 flex-1 overflow-auto bg-tray/60">
        {tab === "prompt" ? (
          <pre className="p-4 font-mono text-[12.5px] leading-[1.75] whitespace-pre-wrap text-ink" tabIndex={0}>
            {src.text}
          </pre>
        ) : (
          <CodeLines code={src.text} language={tab === "react" ? "tsx" : tab === "html" ? "markup" : "css"} className="!overflow-visible" />
        )}
      </div>

      <p className="shrink-0 border-t border-rule px-4 py-3 text-[13px] leading-relaxed text-muted">
        {tab === "prompt"
          ? `${src.text.split(/\s+/).length.toLocaleString()} words. Paste it into Claude Code, Cursor, Antigravity or Windsurf and say which file the component should live in. Attaching code gives the agent the exact timings.`
          : tab === "react"
            ? "One self-contained file for React 18+ and Tailwind v4. Add the font link from Typography and render it inside a sized container."
            : tab === "html"
              ? "A complete page with no dependencies. Save it as .html and open it, or lift the <style> and <script> into your project."
              : "The component's colours and font stacks as custom properties, ready for a :root block or a Tailwind @theme."}
      </p>
    </aside>
  );
}
