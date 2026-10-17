import { useEffect, useRef } from "react";

/**
 * Blur Reveal Words — inspired by Recursive's thesis section.
 * Scroll-scrubbed: each word goes from dim + 6px blur + 4px down to sharp and in place.
 * Reproduces the GSAP timeline math (0.5s tween per word, 0.035s stagger, power1.out)
 * and the `scrub: 0.7` lag with a time-based smoother, without GSAP.
 */
type Props = {
  paragraphs?: string[];
  /** Starting opacity of unrevealed words (the original uses 0.72). */
  dim?: number;
  /** Seconds the reveal lags behind the scrollbar, like GSAP's scrub value. */
  scrub?: number;
  loop?: boolean;
};

const DEFAULT = [
  "Half the world has no credit score. Not because they are risky, but because nobody looked.",
  "Recursive reads the signals people already leave behind: rent, utilities, mobile top-ups, and turns them into a score a lender can trust in five minutes.",
];
const TWEEN = 0.5;
const STAGGER = 0.035;

export default function BlurRevealWords({ paragraphs = DEFAULT, dim = 0.72, scrub = 0.7, loop = false }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const words = wordsRef.current.filter(Boolean);
    const total = TWEEN + STAGGER * (words.length - 1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = (p: number) => {
      const t = p * total;
      words.forEach((w, i) => {
        const local = Math.min(1, Math.max(0, (t - i * STAGGER) / TWEEN));
        const e = 1 - (1 - local) * (1 - local); // power1.out
        w.style.opacity = String(dim + (1 - dim) * e);
        w.style.filter = `blur(${(6 * (1 - e)).toFixed(2)}px)`;
        w.style.transform = `translate3d(0,${(4 * (1 - e)).toFixed(2)}px,0)`;
      });
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };

    if (reduce) {
      paint(1);
      return;
    }

    let shown = 0;
    let last = performance.now();
    let raf = 0;
    let dir = 1;
    let touched = !loop;
    const stop = () => (touched = true);
    el.addEventListener("wheel", stop, { passive: true });
    el.addEventListener("touchstart", stop, { passive: true });
    el.addEventListener("pointerdown", stop);

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      const max = el.scrollHeight - el.clientHeight || 1;
      if (!touched) {
        el.scrollTop += dir * Math.max(1, max / 480);
        if (el.scrollTop >= max - 1) dir = -1;
        if (el.scrollTop <= 0) dir = 1;
      }
      const target = el.scrollTop / max;
      const tau = (scrub * 1000) / 3;
      shown += (target - shown) * (1 - Math.exp(-dt / tau));
      paint(shown);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("wheel", stop);
      el.removeEventListener("touchstart", stop);
      el.removeEventListener("pointerdown", stop);
    };
  }, [dim, scrub, loop, paragraphs]);

  let n = 0;
  return (
    <div
      ref={scrollerRef}
      tabIndex={0}
      aria-label="Thesis, scroll to reveal"
      className="relative h-full min-h-[300px] w-full overflow-y-auto overscroll-contain bg-[#EEF3EB] text-[#142617] [container-type:size] [scrollbar-width:none]"
      style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="h-[300cqh]">
        <div className="sticky top-0 flex h-[100cqh] flex-col justify-center px-[7%]">
          <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#5C8C3A]/25 bg-white/60 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-[#2D6325] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5C8C3A]" /> The thesis
          </span>
          {paragraphs.map((p, pi) => (
            <p key={pi} className="mb-4 text-[clamp(18px,3.6cqw,40px)] leading-[1.18] font-semibold tracking-[-0.02em] last:mb-0">
              {p.split(" ").map((w) => {
                const idx = n++;
                return (
                  <span
                    key={idx}
                    ref={(node) => {
                      if (node) wordsRef.current[idx] = node;
                    }}
                    className="inline-block will-change-[transform,filter,opacity]"
                    style={{ opacity: dim, filter: "blur(6px)", transform: "translate3d(0,4px,0)" }}
                  >
                    {w}&nbsp;
                  </span>
                );
              })}
            </p>
          ))}
          <div className="mt-6 h-[3px] w-full overflow-hidden rounded-full bg-[#5C8C3A]/15">
            <div ref={barRef} className="h-full origin-left rounded-full bg-[#5C8C3A]" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
