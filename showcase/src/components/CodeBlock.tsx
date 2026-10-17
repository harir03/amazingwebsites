import { Highlight, type PrismTheme } from "prism-react-renderer";
import { Check, Copy } from "lucide-react";
import { useCopy } from "../hooks/toast";

/** Light theme in the hub's pen inks. */
const hubTheme: PrismTheme = {
  plain: { color: "#1b2742", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#626b7c", fontStyle: "italic" } },
    { types: ["punctuation"], style: { color: "#586174" } },
    { types: ["tag", "keyword", "selector", "important", "atrule"], style: { color: "#2b44a8" } },
    { types: ["attr-name", "property", "function", "class-name"], style: { color: "#a2380c" } },
    { types: ["string", "attr-value", "char", "inserted", "url"], style: { color: "#1f6e58" } },
    { types: ["number", "boolean", "constant", "symbol"], style: { color: "#9b2f69" } },
    { types: ["operator", "entity"], style: { color: "#586174" } },
    { types: ["variable", "parameter"], style: { color: "#1b2742" } },
  ],
};

type Language = "tsx" | "markup" | "css" | "bash" | "javascript";

/** Highlighted lines with numbers, no chrome. */
export function CodeLines({ code, language, className = "", maxHeight }: { code: string; language: Language; className?: string; maxHeight?: string }) {
  return (
    <Highlight code={code.replace(/\n$/, "")} language={language} theme={hubTheme}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className={`overflow-auto py-3 font-mono text-[12.5px] leading-[1.7] ${className}`} style={{ maxHeight }} tabIndex={0}>
          <code>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="table-row">
                <span className="table-cell w-10 pr-4 pl-3 text-right text-rule-strong select-none">{i + 1}</span>
                <span className="table-cell pr-4 whitespace-pre">
                  {line.map((token, k) => (
                    <span key={k} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
}

interface Props {
  code: string;
  language: Language;
  filename?: string;
  copyLabel?: string;
  maxHeight?: string;
}

export function CodeBlock({ code, language, filename, copyLabel = "code", maxHeight = "28rem" }: Props) {
  const { copy, copiedKey } = useCopy();
  const key = `${filename ?? language}-${code.length}`;
  const copied = copiedKey === key;
  const lines = code.replace(/\n$/, "").split("\n").length;

  return (
    <div className="overflow-hidden rounded-xl border border-rule bg-tray">
      <div className="flex items-center justify-between gap-3 border-b border-rule px-3 py-2">
        <div className="flex min-w-0 items-baseline gap-2">
          <span className="truncate font-mono text-[13px] text-ink">{filename ?? language}</span>
          <span className="hidden shrink-0 text-[12px] text-muted sm:inline">{lines} lines</span>
        </div>
        <button
          type="button"
          onClick={() => copy(code, copyLabel, key)}
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-2 py-1 text-[13px] text-ink shadow-[0_0_0_1px_rgb(27_39_66_/_0.1)] hover:shadow-[0_0_0_1px_rgb(27_39_66_/_0.3)]"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-ok" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <CodeLines code={code} language={language} maxHeight={maxHeight} />
    </div>
  );
}
