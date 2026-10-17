import { useId, useState } from "react";

/**
 * Numbered FAQ Accordion — inspired by Recursive.
 * Bebas numerals, bold questions, a round chevron button, and height animated with
 * the grid-template-rows 0fr -> 1fr trick (no measuring). One item open at a time.
 */
type Item = { q: string; a: string };
type Props = { items?: Item[]; defaultOpen?: number };

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DEFAULT_ITEMS: Item[] = [
  { q: "Who can apply for a Recursive score?", a: "Anyone with six months of rent, utility or mobile payment history. No bureau file needed." },
  { q: "How long does scoring take?", a: "About five minutes. You connect your data, consent to each source, and the score is ready before the kettle boils." },
  { q: "What data do you read, exactly?", a: "Only what you approve: payment timestamps and amounts. We never read message contents or contacts." },
  { q: "Can lenders see why I got my score?", a: "Yes. Every score ships with its top factors and what would move it, in plain language." },
];

export default function FaqAccordion({ items = DEFAULT_ITEMS, defaultOpen = 0 }: Props) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const uid = useId();

  return (
    <section
      className="@container h-full min-h-[340px] w-full overflow-auto bg-[#EEF3EB] px-[5%] py-8 text-[#121A12]"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      <h2 className="mb-4 text-[clamp(26px,5cqw,48px)] leading-none font-bold tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
        Questions, answered
      </h2>
      <div className="border-t border-[#2F5527]/20">
        {items.map((it, i) => {
          const isOpen = open === i;
          const panelId = `${uid}-panel-${i}`;
          const btnId = `${uid}-btn-${i}`;
          return (
            <div key={it.q} className="border-b border-[#2F5527]/20">
              <h3>
                <button
                  id={btnId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl px-3 py-5 text-left transition-colors hover:bg-white/50 @xl:px-6"
                >
                  <span className="flex flex-1 items-center gap-4 @xl:gap-6">
                    <span className="min-w-[28px] shrink-0 text-[clamp(24px,3.4cqw,36px)] text-[#2F5527]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[clamp(15px,2cqw,20px)] leading-snug font-bold transition-colors group-hover:text-[#2F5527]">{it.q}</span>
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2F5527]/15 bg-white/80 shadow-xs transition-colors group-hover:border-[#2F5527]/40">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ transition: `transform 0.3s ${EASE}`, transform: isOpen ? "rotate(180deg)" : "none", color: isOpen ? "#2F5527" : "#57534e" }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                className="grid"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", transition: `grid-template-rows 0.45s ${EASE}` }}
              >
                <div className="min-h-0 overflow-hidden">
                  <p
                    className="pr-12 pb-6 pl-[calc(28px+1rem+0.75rem)] text-[15px] leading-relaxed text-[#3d4a3b] @xl:pl-[calc(28px+1.5rem+1.5rem)]"
                    style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? "none" : "translateY(-6px)", transition: `opacity 0.35s ease ${isOpen ? "0.1s" : "0s"}, transform 0.45s ${EASE}` }}
                  >
                    {it.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
