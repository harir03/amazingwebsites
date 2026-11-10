import { useEffect, useRef, useState } from "react";

/**
 * Kinetic Scroll Manifesto — inspired by The Design Society Lyon.
 * A pinned block of pixel type. As you scroll, each word slides in from the right,
 * goes from 12% to full opacity, and marked words get a lime highlighter.
 * Self-contained: it scrolls inside its own container, so it drops into any layout.
 */
type Props = {
  text?: string;
  /** Words (lowercase, no punctuation) that get the lime marker when lit. */
  marked?: string[];
  /** Auto-scroll until the user touches it (for demos). */
  loop?: boolean;
};

const DEFAULT_TEXT =
  "We are a secret society of designers from Lyon. We meet, we talk, we drink, we argue about kerning, and sometimes we make beautiful things together.";
const DEFAULT_MARKED = ["secret", "society", "kerning", "beautiful"];
const SPREAD = 3; // how many words are mid-transition at once

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export default function KineticManifesto({ text = DEFAULT_TEXT, marked = DEFAULT_MARKED, loop = false }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    const onScroll = () => setProgress(clamp01(el.scrollTop / (el.scrollHeight - el.clientHeight || 1)));
    el.addEventListener("scroll", onScroll, { passive: true });

    // Demo autoplay: ping-pong the scroll position until the user interacts.
    let raf = 0;
    let dir = 1;
    let touched = false;
    const stop = () => (touched = true);
    if (loop) {
      el.addEventListener("wheel", stop, { passive: true });
      el.addEventListener("touchstart", stop, { passive: true });
      el.addEventListener("pointerdown", stop);
      const tick = () => {
        if (touched) return;
        const max = el.scrollHeight - el.clientHeight;
        el.scrollTop += dir * Math.max(1.2, max / 420);
        if (el.scrollTop >= max - 1) dir = -1;
        if (el.scrollTop <= 0) dir = 1;
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", stop);
      el.removeEventListener("touchstart", stop);
      el.removeEventListener("pointerdown", stop);
    };
  }, [loop]);

  return (
    <div
      ref={scrollerRef}
      tabIndex={0}
      aria-label="Manifesto, scroll to reveal"
      className="relative h-full min-h-[300px] w-full overflow-y-auto overscroll-contain bg-[#0a0a0a] text-white [container-type:size] [scrollbar-width:none]"
    >
      <div className="h-[320cqh]">
        <div className="sticky top-0 flex h-[100cqh] flex-col justify-center p-[6%]">
          <span
            className="mb-4 text-[11px] tracking-[0.3em] text-[#bcf015] uppercase"
            style={{ fontFamily: "'Geist Mono', monospace" }}
          >
            ✦ Manifeste — 001
          </span>
          <p
            className="flex flex-wrap gap-x-[0.35em] gap-y-[0.1em] text-[clamp(20px,4.4cqw,52px)] leading-[1.02] uppercase"
            style={{ fontFamily: "'Silkscreen', 'VT323', monospace" }}
          >
            {words.map((w, i) => {
              const p = clamp01((progress * (words.length + SPREAD) - i) / SPREAD);
              const isMarked = marked.includes(w.toLowerCase().replace(/[^\p{L}]/gu, ""));
              return (
                <span
                  key={i}
                  className="relative inline-block will-change-transform"
                  style={{ opacity: 0.12 + p * 0.88, transform: `translate3d(${(1 - p) * 0.6}em,0,0)` }}
                >
                  {isMarked && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-[-0.1em] top-[0.15em] bottom-[0.1em] origin-left bg-[#bcf015]"
                      style={{ transform: `scaleX(${p >= 1 ? 1 : 0})`, transition: "transform 0.5s cubic-bezier(0.625, 0.05, 0, 1)" }}
                    />
                  )}
                  <span className={`relative ${isMarked && p >= 1 ? "text-black" : ""}`}>{w}</span>
                </span>
              );
            })}
          </p>
          <div className="mt-6 h-px w-full bg-white/15">
            <div className="h-full origin-left bg-[#350aff]" style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
