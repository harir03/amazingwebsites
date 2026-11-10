import { Highlight, type PrismTheme } from "prism-react-renderer";
import { Check, Copy } from "lucide-react";
import { useCopy } from "../hooks/toast";
import { useTheme } from "../hooks/useTheme";

const darkPrismTheme: PrismTheme = {
  plain: { color: "#f6f4f9", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#6b7280", fontStyle: "italic" } },
    { types: ["punctuation"], style: { color: "#94a3b8" } },
    { types: ["tag", "keyword", "selector", "important", "atrule"], style: { color: "#c084fc" } },
    { types: ["attr-name", "property", "function", "class-name"], style: { color: "#38bdf8" } },
    { types: ["string", "attr-value", "char", "inserted", "url"], style: { color: "#4ade80" } },
    { types: ["number", "boolean", "constant", "symbol"], style: { color: "#fb923c" } },
    { types: ["operator", "entity"], style: { color: "#cbd5e1" } },
    { types: ["variable", "parameter"], style: { color: "#f3f4f6" } },
  ],
};

const lightPrismTheme: PrismTheme = {
  plain: { color: "#17151c", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#858d9d", fontStyle: "italic" } },
    { types: ["punctuation"], style: { color: "#64748b" } },
    { types: ["tag", "keyword", "selector", "important", "atrule"], style: { color: "#7c3aed" } },
    { types: ["attr-name", "property", "function", "class-name"], style: { color: "#0284c7" } },
    { types: ["string", "attr-value", "char", "inserted", "url"], style: { color: "#15803d" } },
    { types: ["number", "boolean", "constant", "symbol"], style: { color: "#d97706" } },
    { types: ["operator", "entity"], style: { color: "#64748b" } },
    { types: ["variable", "parameter"], style: { color: "#1e293b" } },
  ],
};

type Language = "tsx" | "markup" | "css" | "bash" | "javascript";

export function CodeLines({
  code,
  language,
  className = "",
  maxHeight,
}: {
  code: string;
  language: Language;
  className?: string;
  maxHeight?: string;
}) {
  const { isDark } = useTheme();
  const theme = isDark ? darkPrismTheme : lightPrismTheme;

  return (
    <Highlight code={code.replace(/\n$/, "")} language={language} theme={theme}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className={`overflow-auto py-3 font-mono text-[12.5px] leading-[1.7] ${className}`} style={{ maxHeight }} tabIndex={0}>
          <code>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="table-row">
                <span className="table-cell w-10 pr-4 pl-3 text-right text-muted/50 select-none font-mono text-[11px]">{i + 1}</span>
                <span className="table-cell pr-4 whitespace-pre font-mono">
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
    <div className="overflow-hidden rounded-xl border border-rule bg-surface shadow-xs">
      <div className="flex items-center justify-between border-b border-rule bg-tray/60 px-4 py-2">
        <span className="font-mono text-[12px] text-muted">{filename ?? language}</span>
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-mono text-dimmed tabular-nums">{lines} lines</span>
          <button
            type="button"
            onClick={() => copy(code, copyLabel, key)}
            className="flex items-center gap-1.5 rounded-lg border border-rule bg-surface px-2.5 py-1 text-[12px] font-medium text-ink hover:border-purple/40 hover:text-purple transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>
      <div className="bg-page">
        <CodeLines code={code} language={language} maxHeight={maxHeight} />
      </div>
    </div>
  );
}
