import { useMemo } from "react";

/**
 * CSS Coin Pile Loader — inspired by Don't Look Up.
 * Coins fall in one after another and stack into three wobbly columns, then the
 * pile fades and the loop restarts. Pure CSS: every coin gets its own generated
 * keyframes on one shared 5s cycle (no animation-delay), so the pile is always
 * complete before it is wiped.
 */
type Props = { label?: string; progress?: number };

const CYCLE = 5; // seconds
const STAGGER = 0.13; // seconds between coins
const DROP_EASE = "cubic-bezier(0.4, 0, 0.9, 0.42)";

// Drop order: [column, height in coins]
const LAYOUT: [number, number][] = [
  [0, 0], [1, 0], [-1, 0], [0, 1], [1, 1], [0, 2], [-1, 1], [1, 2], [0, 3],
  [-1, 2], [1, 3], [0, 4], [-1, 3], [0, 5], [1, 4], [0, 6], [-1, 4], [0, 7],
];

// Deterministic "random" so server and client renders match.
const rand = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function buildCss() {
  const pct = (s: number) => `${((s / CYCLE) * 100).toFixed(2)}%`;
  return LAYOUT.map(([col, h], i) => {
    const x = col * 40 + (rand(i, 1) - 0.5) * 6;
    const tilt = (rand(i, 2) - 0.5) * 8;
    const spin = 90 + rand(i, 3) * 140;
    const lift = -h * 12;
    const start = i * STAGGER;
    const land = `translate3d(${x}px, ${lift}px, ${h}px) rotate(${tilt}deg)`;
    return `
@keyframes dlu-drop-${i} {
  0%, ${pct(start)} { transform: translate3d(${x}px, ${lift - 200}px, 90px) rotate(${spin}deg); opacity: 0; animation-timing-function: ${DROP_EASE}; }
  ${pct(start + 0.08)} { opacity: 1; }
  ${pct(start + 1.05)} { transform: ${land}; animation-timing-function: ease-out; }
  ${pct(start + 1.15)} { transform: translate3d(${x}px, ${lift - 8}px, ${h}px) rotate(${tilt}deg); }
  ${pct(start + 1.25)}, 100% { transform: ${land}; opacity: 1; }
}
.dlu-coin:nth-child(${i + 1}) { animation-name: dlu-drop-${i}; z-index: ${h * 3 + 1}; }
@media (prefers-reduced-motion: reduce) { .dlu-coin:nth-child(${i + 1}) { transform: ${land}; } }`;
  }).join("\n");
}

const BASE_CSS = `
.dlu-pile { position: relative; width: 180px; height: 150px; animation: dlu-wipe ${CYCLE}s linear infinite; }
@keyframes dlu-wipe { 0%, 85% { opacity: 1; } 93%, 100% { opacity: 0; } }
.dlu-coin { position: absolute; left: 50%; bottom: 10px; width: 46px; height: 20px; margin-left: -23px; opacity: 0;
  animation-duration: ${CYCLE}s; animation-iteration-count: infinite; animation-fill-mode: both; }
.dlu-coin::before { content: ""; position: absolute; inset: 6px 0 -6px; border-radius: 50%; background: #c98f06; border: 2px solid #14140f; }
.dlu-coin::after { content: ""; position: absolute; inset: 0; border-radius: 50%; border: 2px solid #14140f;
  background: radial-gradient(ellipse at 35% 35%, #f8e08a 0 22%, #f2c31a 23% 62%, #c98f06 63%); }
@keyframes dlu-dots { 0% { content: ""; } 25% { content: "."; } 50% { content: ".."; } 75% { content: "..."; } }
.dlu-dots::after { content: ""; animation: dlu-dots 1.4s steps(4, end) infinite; }
@media (prefers-reduced-motion: reduce) { .dlu-pile, .dlu-coin { animation: none; opacity: 1; } .dlu-dots::after { content: "..."; animation: none; } }
`;

export default function CoinPileLoader({ label = "Counting your money", progress }: Props) {
  const css = useMemo(() => BASE_CSS + buildCss(), []);
  return (
    <div
      role="status"
      aria-live="polite"
      className="@container flex h-full min-h-[300px] w-full flex-col items-center justify-center gap-5 bg-[#f4f3ef] text-[#14140f]"
      style={{ fontFamily: "'Nunito', system-ui, sans-serif" }}
    >
      <style>{css}</style>
      <p
        className="text-[clamp(34px,8cqw,72px)] leading-none tracking-wide"
        style={{ fontFamily: "'Luckiest Guy', 'Marsipan', cursive", WebkitTextStroke: "2px #14140f", color: "#f2c31a", textShadow: "3px 4px 0 #14140f" }}
      >
        DON&apos;T LOOK UP
      </p>
      <div className="dlu-pile" aria-hidden="true">
        {LAYOUT.map((_, i) => (
          <span key={i} className="dlu-coin" />
        ))}
      </div>
      <p className="rounded-full border-2 border-[#14140f] bg-white px-4 py-1.5 text-[13px] font-extrabold tracking-[0.08em] uppercase shadow-[2px_3px_0_#14140f]">
        {label}
        <span className="dlu-dots" />
        {progress !== undefined && <span className="ml-2 tabular-nums">{Math.round(progress)}%</span>}
      </p>
    </div>
  );
}
