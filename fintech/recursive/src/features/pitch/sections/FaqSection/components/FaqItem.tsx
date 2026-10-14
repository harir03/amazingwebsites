import { useState } from "react";

export type FaqItemProps = {
  number: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export const FaqItem = (props: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(props.defaultOpen ?? false);

  return (
    <div className="border-b border-[#2F5527]/20 box-border caret-transparent text-zinc-900 min-h-[auto] w-full transition-colors">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="items-center bg-transparent caret-transparent flex justify-between gap-4 text-left w-full px-3 py-6 md:px-6 md:py-7 group cursor-pointer hover:bg-white/50 rounded-xl transition-all"
      >
        <div className="flex items-center gap-4 md:gap-6 flex-1">
          <span className="text-[#2F5527] font-bold shrink-0 text-2xl md:text-4xl font-bebasNeue min-w-[28px]">
            {props.number.padStart(2, "0")}
          </span>

          <span className="text-base md:text-xl font-bold font-headingNow text-[#121A12] group-hover:text-[#2F5527] transition-colors leading-snug">
            {props.question}
          </span>
        </div>

        <div className="flex shrink-0 h-9 w-9 items-center justify-center rounded-full bg-white/80 border border-[#2F5527]/15 group-hover:border-[#2F5527]/40 shadow-xs transition-all">
          <svg
            viewBox="0 0 24 24"
            className={`w-4 h-4 transition-transform duration-300 ${
              isOpen ? "rotate-180 text-[#2F5527]" : "text-stone-600"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="px-3 pb-6 md:px-6 md:pl-16 text-sm md:text-base leading-relaxed text-[#18261A] font-dm_sans animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="whitespace-pre-line bg-white/85 p-5 md:p-7 rounded-2xl border border-[#2F5527]/15 shadow-sm text-[#18261A] font-medium leading-relaxed">
            {props.answer}
          </div>
        </div>
      )}
    </div>
  );
};