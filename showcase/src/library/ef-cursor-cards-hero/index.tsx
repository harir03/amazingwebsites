import { useState, useRef } from "react";

const HERO_CASES = [
  { client: "Odido", tag: "Social Content & Reels", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", color: "#0038FF" },
  { client: "Willem II", tag: "Stadium Visuals & Teaser", img: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80", color: "#D82234" },
  { client: "P. van der Niet", tag: "2D Character Animation", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80", color: "#FEE897" },
  { client: "Fontys", tag: "Campus Explainer Series", img: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80", color: "#FF77CD" },
];

/**
 * Velocity Tilt & Case-Swapping Cursor Hero — Extrafazant
 * Floating preview card that follows cursor with velocity tilt physics
 * and dynamically swaps case studies based on cumulative distance.
 */
export default function CursorCardsHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0, rot: 0, visible: false });
  const lastPosRef = useRef({ x: 0, y: 0, distance: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    const speed = Math.hypot(dx, dy);

    lastPosRef.current.x = e.clientX;
    lastPosRef.current.y = e.clientY;
    lastPosRef.current.distance += speed;

    const rot = Math.max(-12, Math.min(12, dx * 0.35));

    if (lastPosRef.current.distance > 220) {
      lastPosRef.current.distance = 0;
      setActiveCaseIdx((prev) => (prev + 1) % HERO_CASES.length);
    }

    setCardPos({ x: relX, y: relY, rot, visible: true });
  };

  const activeCase = HERO_CASES[activeCaseIdx];

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setCardPos((prev) => ({ ...prev, visible: false }))}
      className="relative w-full min-h-[520px] bg-[#F4F4F4] text-[#101010] p-8 sm:p-14 rounded-3xl border border-[#101010]/10 overflow-hidden select-none flex flex-col justify-between"
    >
      {/* Floating Follower Card */}
      {cardPos.visible && (
        <div
          className="pointer-events-none absolute z-20 w-56 h-72 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-75 ease-out"
          style={{
            transform: `translate3d(${cardPos.x}px, ${cardPos.y}px, 0) translate(-50%, -50%) rotate(${cardPos.rot}deg)`,
          }}
        >
          <img src={activeCase.img} alt={activeCase.client} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3 bg-[#101010]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
            {activeCase.client}
          </div>
          <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm text-[#101010] p-2 rounded-xl text-xs font-semibold shadow">
            {activeCase.tag}
          </div>
        </div>
      )}

      {/* Top Header / Eyebrow */}
      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#0038FF] text-white rounded-md font-black text-xs flex items-center justify-center -rotate-3">
            E
          </div>
          <span className="font-extrabold text-lg tracking-tight">Extrafazant</span>
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#0038FF] bg-[#0038FF]/10 px-3 py-1 rounded-full">
          Creative Video &amp; Animation
        </span>
      </div>

      {/* Hero Headline */}
      <div className="my-auto py-8 z-10 max-w-3xl">
        <h1 className="font-extrabold text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.92] tracking-tight">
          Brengt je merk in{" "}
          <span className="font-serif italic font-normal text-[#0038FF]">
            beweging
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#101010]/75 max-w-xl font-medium">
          Animatie, film en social first video formats die blijven hangen. Beweeg je cursor over het canvas om recente cases te ontdekken.
        </p>
      </div>

      {/* Client Logobar / Marquee strip */}
      <div className="z-10 pt-6 border-t border-[#101010]/10 flex flex-wrap items-center justify-between gap-4 text-xs font-bold uppercase tracking-wider opacity-60">
        <div className="flex items-center gap-6 overflow-hidden">
          <span>✦ JUMBO</span>
          <span>✦ ODIDO</span>
          <span>✦ FONTYS</span>
          <span>✦ WILLEM II</span>
          <span>✦ CORDAID</span>
        </div>
        <div className="text-[11px] font-mono text-[#0038FF] font-bold">
          [ Active Preview: {activeCase.client} ]
        </div>
      </div>
    </div>
  );
}

