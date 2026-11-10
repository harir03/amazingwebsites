import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "How do I drop these components into my Next.js or Vite project?",
    a: "Every bit comes with a standalone React + Tailwind TypeScript file. Simply copy the snippet into your project's component folder. No external component packages or npm installs are required — just standard Tailwind CSS.",
  },
  {
    q: "Are the components completely isolated without external dependencies?",
    a: "Yes! 100% self-contained. The React versions only use standard React hooks and optional Framer Motion where complex spring physics are needed. The Vanilla versions require zero build tools and run directly in any browser.",
  },
  {
    q: "How do I use the AI Prompts with Cursor, Claude, or Antigravity?",
    a: "Each component includes an engineered 5-point prompt covering Component Role, Token Palette, Measured Bezier Physics, Interaction Micro-States, and Accessibility. Paste it directly into your AI chat or prompt file to recreate or adapt the bit instantly.",
  },
  {
    q: "What makes these forensic recreations different from generic UI libraries?",
    a: "Generic libraries use uniform transitions and stock styling. Our components are forensically measured from iconic, award-winning live web experiences — preserving their exact cubic bezier curves, spring frequencies, and micro-interaction states.",
  },
  {
    q: "Can I use both the React and Vanilla HTML versions interchangeably?",
    a: "Absolutely. The dual source panel on every component page lets you switch between React TSX and Vanilla HTML with one click. Use Vanilla for rapid prototyping or landing pages, and React for full applications.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="my-20 sm:my-28">
      {/* V7 Labs Editorial Headline */}
      <div className="mb-10 sm:mb-12 max-w-2xl">
        <span className="text-xs font-mono uppercase tracking-wider text-muted">Frequently Asked Questions</span>
        <h2 className="type-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink mt-1">
          Questions? We've got answers.
        </h2>
        <p className="mt-3 text-[15px] sm:text-[16px] text-muted leading-relaxed">
          Everything you need to know about forensic extraction, dual source code, and AI prompt engineering standards.
        </p>
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`overflow-hidden rounded-xl border transition-all ${
                isOpen
                  ? "border-rule-strong bg-surface shadow-xs"
                  : "border-rule bg-surface/70 hover:border-rule-strong"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="flex w-full items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="text-[15px] sm:text-[16px] font-medium text-ink pr-4">
                  {faq.q}
                </span>
                <div className={`shrink-0 flex h-7 w-7 items-center justify-center rounded-lg border transition-colors ${
                  isOpen ? "border-rule-strong bg-tray text-ink" : "border-rule bg-tray/60 text-muted"
                }`}>
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-[14px] leading-relaxed text-muted border-t border-rule/50 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
