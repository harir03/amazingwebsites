import { useRef } from "react";
import { Footer } from "../components/Footer";
import { POINTS, TEMPLATE } from "../components/PromptStandard";
import { CodeBlock } from "../components/CodeBlock";
import { useDocumentTitle, useFocusOnNavigate } from "../lib/router";

export function PromptPage() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useDocumentTitle("Prompt standard");
  useFocusOnNavigate(headingRef, "prompt");

  return (
    <div className="px-4 pt-10 sm:px-8 lg:px-12">
      <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] xl:items-start">
        <div>
          <h1 ref={headingRef} tabIndex={-1} className="type-display text-[clamp(44px,5vw,72px)] leading-[0.93] focus:outline-none">
            The prompt standard
          </h1>
          <p className="mt-4 max-w-[56ch] text-[17px] leading-relaxed text-ink-2">
            Every component ships with a prompt your agent can run as is. Paste it into Claude Code, Cursor, Antigravity or Windsurf and you get the component adapted to your
            codebase, with the original&apos;s motion intact.
          </p>
          <dl className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {POINTS.map(([title, body]) => (
              <div key={title}>
                <dt className="text-[16px] font-semibold">{title}</dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-ink-2">{body}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="xl:sticky xl:top-20">
          <CodeBlock code={TEMPLATE} language="markup" filename="ai-agent-prompt.template.md" copyLabel="prompt template" maxHeight="none" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
