import { useState } from "react";

const STACK_CASES = [
  {
    id: "pvanderniet",
    title: "P. van der Niet",
    category: "01 · Animatie & Campagne",
    desc: "Een speelse, ritmische animatiereeks waarin complexe installatietechniek wordt vertaald naar herkenbare, heldere verhalen voor de nieuwe generatie vakmensen.",
    tags: ["2D Motion", "Karakteranimatie", "Campagne"],
    bg: "#FEE897",
    color: "#101010",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "odido",
    title: "Odido",
    category: "02 · Brand Film & Social",
    desc: "Snelle, dynamische content formats voor landelijke introductiecampagnes. Geoptimaliseerd voor TikTok, Instagram Reels en digital out-of-home schermen.",
    tags: ["Social Video", "Brand Story", "Sound Design"],
    bg: "#0038FF",
    color: "#FFFFFF",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "willemii",
    title: "Willem II",
    category: "03 · Stadium Visuals & Film",
    desc: "Clubtrots in pure cinematografie. Stadionscherm animaties, matchday teasers en opzwepende seizoenkaart video's met kippenvelgarantie.",
    tags: ["Cinematografie", "Motion Graphics", "Stadion Visuals"],
    bg: "#D82234",
    color: "#FFFFFF",
    img: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80",
  },
];

/**
 * 3D Layered Card Stack Deck — Extrafazant
 * Pinned perspective card deck with rotating badge, depth layering,
 * and interactive peeling transition between client portfolio cases.
 */
export default function PinnedStackDeck() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextCard = () => setActiveIndex((prev) => (prev + 1) % STACK_CASES.length);
  const prevCard = () => setActiveIndex((prev) => (prev - 1 + STACK_CASES.length) % STACK_CASES.length);

  return (
    <div className="w-full bg-[#101010] text-[#F4F4F4] p-8 sm:p-12 rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between select-none">
      {/* Top Header with Rotating Badge */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF77CD]">
            Recent Portfolio
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-1">
            Recent <span className="font-serif italic font-normal text-[#FEE897]">Werk</span>
          </h2>
        </div>

        {/* SVG Rotating Badge */}
        <div className="relative w-20 h-20 animate-spin [animation-duration:14s]">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path id="spin-deck-badge" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
            <text fontSize="10" fontWeight="800" fill="#FEE897" letterSpacing="2">
              <textPath href="#spin-deck-badge">✦ RECENT WERK ✦ EXTRAFAZANT</textPath>
            </text>
          </svg>
        </div>
      </div>

      {/* 3D Stack Viewport */}
      <div className="relative h-[420px] sm:h-[460px] perspective-[1000px] w-full">
        {STACK_CASES.map((item, idx) => {
          const diff = (idx - activeIndex + STACK_CASES.length) % STACK_CASES.length;
          
          let zIndex = 3 - diff;
          let zOffset = -diff * 60;
          let yOffset = diff * 28;
          let opacity = diff === 0 ? 1 : diff === 1 ? 0.88 : 0.72;

          return (
            <div
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className="absolute inset-0 rounded-2xl p-6 sm:p-10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer shadow-2xl flex flex-col sm:flex-row justify-between gap-6 overflow-hidden"
              style={{
                backgroundColor: item.bg,
                color: item.color,
                zIndex,
                transform: `translate3d(0, ${yOffset}px, ${zOffset}px)`,
                opacity,
              }}
            >
              {/* Left Content */}
              <div className="flex flex-col justify-between max-w-md z-10">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider opacity-75">
                    {item.category}
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base opacity-85 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap mt-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: item.color === "#FFFFFF" ? "rgba(255,255,255,0.2)" : "rgba(16,16,16,0.12)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Media Thumbnail */}
              <div className="w-full sm:w-1/2 h-44 sm:h-full rounded-xl overflow-hidden shadow-inner">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/10">
        <div className="text-xs font-mono uppercase text-white/60">
          Showing Case {activeIndex + 1} of {STACK_CASES.length}
        </div>
        <div className="flex gap-3">
          <button
            onClick={prevCard}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all flex items-center justify-center font-bold"
            aria-label="Previous Case"
          >
            ←
          </button>
          <button
            onClick={nextCard}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all flex items-center justify-center font-bold"
            aria-label="Next Case"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

