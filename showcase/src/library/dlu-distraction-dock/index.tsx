import { useEffect, useRef, useState } from "react";

/**
 * Distraction Launcher Dock — inspired by Don't Look Up.
 * A tilted row of sticker cards with springy overshoot on hover. Buying one presses
 * the card into its shadow, drops the prop on stage, and plays a sound made on the
 * fly with the Web Audio API (no audio files): a thud and a coin clink, or a buzzer
 * when you can't afford it.
 */
type Prop = { id: string; emoji: string; name: string; cost: number; pull: number };
type Props = { muted?: boolean; wallet?: number };

const POP = "cubic-bezier(0.2, 1.5, 0.32, 1)";
const DISPLAY = "'Luckiest Guy', 'Marsipan', cursive";
const PROPS: Prop[] = [
  { id: "tv", emoji: "📺", name: "TV", cost: 40, pull: 22 },
  { id: "ball", emoji: "⚽", name: "Ball", cost: 15, pull: 9 },
  { id: "cat", emoji: "🐈", name: "Cat", cost: 25, pull: 14 },
  { id: "dance", emoji: "💃", name: "Dance", cost: 60, pull: 30 },
  { id: "news", emoji: "📰", name: "News", cost: 80, pull: 38 },
  { id: "priest", emoji: "⛪", name: "Priest", cost: 120, pull: 55 },
  { id: "coach", emoji: "🏋️", name: "Coach", cost: 35, pull: 18 },
];

/** Tiny procedural SFX bank. One AudioContext, created on first user gesture. */
function useSfx(muted: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  useEffect(() => () => void ctxRef.current?.close(), []);

  const ctx = () => {
    if (!ctxRef.current) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC();
    }
    return ctxRef.current;
  };

  const tone = (type: OscillatorType, from: number, to: number, start: number, dur: number, vol: number) => {
    const c = ctx();
    if (!c) return;
    const t = c.currentTime + start;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(from, t);
    o.frequency.exponentialRampToValueAtTime(to, t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  };

  return {
    place() {
      if (muted) return;
      tone("sine", 180, 48, 0, 0.28, 0.5); // thud
      tone("square", 1568, 1568, 0.05, 0.07, 0.06); // clink
      tone("square", 2093, 2093, 0.11, 0.12, 0.05);
    },
    deny() {
      if (muted) return;
      tone("sawtooth", 140, 90, 0, 0.3, 0.08);
    },
  };
}

export default function DistractionDock({ muted = false, wallet: startWallet = 250 }: Props) {
  const [wallet, setWallet] = useState(startWallet);
  const [crowd, setCrowd] = useState(12);
  const [placed, setPlaced] = useState<{ emoji: string; k: number } | null>(null);
  const [denied, setDenied] = useState<string | null>(null);
  const [pressed, setPressed] = useState<string | null>(null);
  const sfx = useSfx(muted);

  // Income trickles in so you can keep buying.
  useEffect(() => {
    const id = window.setInterval(() => {
      setWallet((w) => Math.min(999, w + 5));
      setCrowd((c) => Math.max(0, c - 2));
    }, 600);
    return () => clearInterval(id);
  }, []);

  const buy = (p: Prop) => {
    setPressed(p.id);
    window.setTimeout(() => setPressed(null), 140);
    if (wallet < p.cost) {
      sfx.deny();
      setDenied(p.id);
      window.setTimeout(() => setDenied(null), 420);
      return;
    }
    sfx.place();
    setWallet((w) => w - p.cost);
    setCrowd((c) => Math.min(100, c + p.pull));
    setPlaced((pl) => ({ emoji: p.emoji, k: (pl?.k ?? 0) + 1 }));
  };

  return (
    <div className="@container relative flex h-full min-h-[320px] w-full flex-col overflow-hidden bg-[#f4f3ef] text-[#14140f]" style={{ fontFamily: "'Nunito', system-ui, sans-serif" }}>
      <style>{`
        @keyframes dlu-land { 0% { transform: translateY(-120%) scale(.6); opacity: 0; } 60% { opacity: 1; } 100% { transform: none; opacity: 1; } }
        @keyframes dlu-shake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-6px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } }
        .dlu-card { transition: transform .35s ${POP}, box-shadow .15s; }
        .dlu-card:hover, .dlu-card:focus-visible { transform: translateY(-10px) rotate(0deg) scale(1.06) !important; }
        .dlu-card.is-pressed { transform: translate(2px, 3px) !important; box-shadow: 0 0 0 #14140f !important; transition-duration: .08s; }
        @media (prefers-reduced-motion: reduce) { .dlu-card, .dlu-card:hover { transition: none; transform: none !important; } .dlu-fx { animation: none !important; } }
      `}</style>

      <div className="flex items-center justify-between p-3">
        <span className="rounded-xl border-2 border-[#14140f] bg-white px-3 py-1.5 text-[12px] font-extrabold tracking-[0.1em] uppercase shadow-[2px_3px_0_#14140f]">
          Distracted: <span className="tabular-nums">{crowd}%</span>
        </span>
        <span className="flex items-center gap-2 rounded-xl border-2 border-[#14140f] bg-white px-3 py-1.5 shadow-[2px_3px_0_#14140f]" aria-live="polite">
          <span aria-hidden="true" className="h-4 w-4 rounded-full border-2 border-[#14140f] bg-[#f2c31a]" />
          <span className="text-[16px] tabular-nums" style={{ fontFamily: DISPLAY }}>
            {wallet}k
          </span>
        </span>
      </div>

      {/* Stage */}
      <div className="relative mx-3 flex flex-1 items-end justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#14140f]/30">
        {placed ? (
          <span key={placed.k} className="dlu-fx mb-2 text-[clamp(48px,11cqw,96px)] leading-none" style={{ animation: `dlu-land .6s cubic-bezier(0.2, 1.4, 0.35, 1) both` }}>
            {placed.emoji}
          </span>
        ) : (
          <span className="mb-6 text-[13px] font-bold opacity-50">Pick a distraction ↓</span>
        )}
      </div>

      {/* Dock */}
      <ul className="flex gap-2 overflow-x-auto px-3 pt-5 pb-4 [scrollbar-width:none] @2xl:justify-center" aria-label="Distractions">
        {PROPS.map((p, i) => {
          const broke = wallet < p.cost;
          return (
            <li key={p.id} className="shrink-0">
              <button
                type="button"
                onClick={() => buy(p)}
                aria-label={`${p.name}, costs ${p.cost}k${broke ? ", can't afford" : ""}`}
                className={`dlu-card dlu-fx flex w-[72px] flex-col items-center rounded-xl border-2 border-[#14140f] bg-white pt-2 pb-1.5 shadow-[2px_3px_0_#14140f] focus-visible:outline-none ${pressed === p.id ? "is-pressed" : ""}`}
                style={{
                  transform: `rotate(${i % 2 ? 2.5 : -2.5}deg)`,
                  animation: denied === p.id ? "dlu-shake .4s ease" : undefined,
                  opacity: broke ? 0.55 : 1,
                }}
              >
                <span className="text-[30px] leading-none" aria-hidden="true">
                  {p.emoji}
                </span>
                <span className="mt-1 text-[12px] leading-none" style={{ fontFamily: DISPLAY }}>
                  {p.name}
                </span>
                <span className="mt-1 rounded-full bg-[#f2c31a] px-1.5 text-[10px] font-black">{p.cost}k</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
