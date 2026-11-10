import { useEffect, useRef, useState } from "react";

/**
 * Signature Draw Splash — inspired by Alan Menken's entrance.
 * A dark splash asks you to turn sound on while a handwritten signature draws itself.
 * A ring draws around the Enter button; clicking it unlocks audio (a soft chord made
 * with Web Audio, no files) and fades the splash away to reveal the linen page.
 */
type Props = {
  muted?: boolean;
  /** Demo mode: auto-enter (silently) and replay. */
  loop?: boolean;
  onEnter?: () => void;
};

const EASE = "cubic-bezier(0.6, 0, 0.1, 1)"; // CustomEase "M0,0 C0.6,0 0.1,1 1,1"
const SERIF = "'Playfair Display', 'Clearface ITC', Georgia, serif";

const SIGNATURE =
  "M18 86 C30 40 52 18 60 30 C68 44 50 92 40 96 C30 100 36 70 58 66 C70 64 74 80 82 72 C90 62 96 34 100 28 C98 52 92 86 104 84 C116 82 118 60 128 60 C138 60 130 84 142 82 C152 80 156 62 164 62 C172 62 166 82 176 82 C186 82 192 66 200 66 C210 66 204 86 214 84 C226 80 230 44 240 30 C246 50 236 82 250 80 C260 78 262 60 272 62 C282 64 272 84 284 82 C294 80 296 64 306 64 C314 64 310 84 320 82 C330 80 334 66 342 66 C350 66 346 82 356 80";
const FLOURISH = "M40 104 C120 92 240 90 372 98 C380 99 384 102 376 104";

function playChord() {
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  const ctx = new AC();
  const master = ctx.createGain();
  master.gain.value = 0.0001;
  master.connect(ctx.destination);
  const now = ctx.currentTime;
  master.gain.exponentialRampToValueAtTime(0.18, now + 0.08);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);
  // Cmaj9, lightly rolled like a pianist would play it.
  [261.63, 329.63, 392.0, 493.88, 587.33].forEach((f, i) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "triangle";
    o.frequency.value = f;
    g.gain.value = 0;
    g.gain.setValueAtTime(0, now + i * 0.06);
    g.gain.linearRampToValueAtTime(0.5 / (i + 1.5), now + i * 0.06 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 3);
    o.connect(g).connect(master);
    o.start(now + i * 0.06);
    o.stop(now + 3.3);
  });
  window.setTimeout(() => ctx.close(), 3600);
}

export default function SignatureSplash({ muted = false, loop = false, onEnter }: Props) {
  const [run, setRun] = useState(0);
  const [stage, setStage] = useState<"idle" | "draw" | "ready" | "entered">("idle");
  const loopRef = useRef(loop);
  loopRef.current = loop;

  useEffect(() => {
    const timers: number[] = [];
    setStage("idle");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage("ready");
      return;
    }
    timers.push(window.setTimeout(() => setStage("draw"), 60));
    timers.push(window.setTimeout(() => setStage("ready"), 2900));
    if (loopRef.current) {
      timers.push(window.setTimeout(() => setStage("entered"), 4600));
      timers.push(window.setTimeout(() => setRun((r) => r + 1), 7600));
    }
    return () => timers.forEach(clearTimeout);
  }, [run]);

  const enter = () => {
    if (!muted) playChord();
    setStage("entered");
    onEnter?.();
  };

  const drawing = stage !== "idle";
  const ready = stage === "ready" || stage === "entered";
  const entered = stage === "entered";

  return (
    <div className="@container relative h-full min-h-[320px] w-full overflow-hidden bg-[#e7e5df] text-[#1a1917]" style={{ fontFamily: SERIF }}>
      {/* The page underneath */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase opacity-60" style={{ fontFamily: "'Inter', sans-serif" }}>
          Composer · Lyricist
        </p>
        <h1 className="text-[clamp(40px,10cqw,110px)] leading-none italic">Alan Menken</h1>
        <p className="text-[15px] opacity-70">Eight Oscars. Eleven Grammys. One Tony. One Emmy.</p>
      </div>

      {/* Splash */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[#0d0c0b] px-6 text-[#e7e5df]"
        style={{
          opacity: entered ? 0 : 1,
          visibility: entered ? "hidden" : "visible",
          transition: `opacity 0.9s ${EASE}, visibility 0s linear ${entered ? "0.9s" : "0s"}`,
        }}
      >
        <p
          className="text-center text-[13px] tracking-[0.12em] italic"
          style={{ opacity: drawing ? 0.75 : 0, transition: "opacity 0.8s ease 0.2s" }}
        >
          For the full experience, turn your sound on
        </p>
        <svg viewBox="0 0 400 120" className="w-[min(80%,520px)]" fill="none" stroke="#e7e5df" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Alan Menken signature">
          <path
            d={SIGNATURE}
            strokeWidth="2.6"
            pathLength={1}
            strokeDasharray="1"
            style={{ strokeDashoffset: drawing ? 0 : 1, transition: `stroke-dashoffset 2.2s ${EASE} 0.3s` }}
          />
          <path
            d={FLOURISH}
            strokeWidth="1.6"
            pathLength={1}
            strokeDasharray="1"
            style={{ strokeDashoffset: drawing ? 0 : 1, transition: `stroke-dashoffset 0.9s ${EASE} 2.1s` }}
          />
        </svg>
        <button
          type="button"
          onClick={enter}
          disabled={!ready}
          aria-label={muted ? "Enter site" : "Enter site with sound"}
          className="group relative grid h-16 w-16 place-items-center disabled:cursor-default"
        >
          <svg viewBox="0 0 64 64" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <circle
              cx="32"
              cy="32"
              r="30"
              fill="none"
              stroke="#e7e5df"
              strokeWidth="1.2"
              pathLength={1}
              strokeDasharray="1"
              style={{ strokeDashoffset: ready ? 0 : 1, transition: `stroke-dashoffset 0.4s ${EASE}` }}
            />
          </svg>
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 translate-x-[1px] transition-transform duration-500 group-hover:scale-110"
            fill="#e7e5df"
            aria-hidden="true"
            style={{ opacity: ready ? 1 : 0, transition: "opacity .4s ease .2s" }}
          >
            <path d="M7 4.5v15l12-7.5z" />
          </svg>
        </button>
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ opacity: ready ? 0.55 : 0, transition: "opacity .4s ease .3s", fontFamily: "'Inter', sans-serif" }}>
          Enter
        </span>
      </div>
    </div>
  );
}
