import { useState, useRef } from "react";

/**
 * Holographic 3D Trading Card — Justin Jefferson (#18)
 * Collectible sports card with gyroscopic 3D perspective tilt, dual-layer
 * holographic foil sheen (specular beam + iridescent rainbow dispersion),
 * and click-to-flip career statistics inspect.
 */
export default function HolographicTradingCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isFlipped, setIsFlipped] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isFlipped) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotY = ((x - centerX) / centerX) * 18;
    const rotX = -((y - centerY) / centerY) * 18;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setRotate({ x: rotX, y: rotY });
    setGlare({ x: glareX, y: glareY, opacity: 1 });
  };

  const handlePointerLeave = () => {
    if (!isFlipped) {
      setRotate({ x: 0, y: 0 });
      setGlare((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setRotate({ x: 0, y: 180 });
      setGlare((prev) => ({ ...prev, opacity: 0 }));
    } else {
      setRotate({ x: 0, y: 0 });
    }
  };

  return (
    <div className="w-full bg-[#0B0713] text-white p-8 sm:p-12 rounded-3xl border border-white/10 flex flex-col items-center justify-center select-none overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#FDE047_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-900/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header telemetry */}
      <div className="relative z-10 w-full max-w-sm flex items-center justify-between font-mono text-xs text-zinc-400 mb-6">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FDE047] animate-pulse" />
          CARD SPECIMEN #03
        </span>
        <span className="text-[#FDE047]">CLICK TO FLIP</span>
      </div>

      {/* 3D Card Stage */}
      <div
        className="w-full max-w-xs aspect-[1036/1519] cursor-pointer"
        style={{ perspective: "1400px" }}
        onClick={handleFlip}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        ref={cardRef}
      >
        <div
          className="relative w-full h-full rounded-2xl shadow-2xl transition-transform duration-200 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped
              ? "rotateY(180deg) scale(1.03)"
              : `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${glare.opacity ? 1.04 : 1})`,
          }}
        >
          {/* FRONT FACE */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden bg-[#160E26] border-2 border-[#FDE047]/40 p-4 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {/* Card Graphic Background */}
            <img
              src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=800&auto=format&fit=crop"
              alt="The Catch"
              className="absolute inset-0 w-full h-full object-cover opacity-80 filter contrast-125 saturate-110"
            />

            {/* Specular White Beam Foil */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-200"
              style={{
                opacity: glare.opacity,
                background: `linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.05) 65%, transparent 80%)`,
                backgroundPosition: `${glare.x}% ${glare.y}%`,
                backgroundSize: "250% 100%",
              }}
            />

            {/* Rainbow Iridescent Color-Dodge */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-200 mix-blend-color-dodge"
              style={{
                opacity: glare.opacity * 0.8,
                background: `linear-gradient(115deg, rgba(253,224,71,0.4) 0%, rgba(168,85,247,0.45) 28%, rgba(56,189,248,0.4) 50%, rgba(236,72,153,0.4) 75%, rgba(253,224,71,0.4) 100%)`,
                backgroundPosition: `${glare.x * 1.5}% ${glare.y * 1.5}%`,
                backgroundSize: "200% 200%",
              }}
            />

            {/* Card Top Pill */}
            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono font-bold tracking-widest text-[#FDE047]">
              <span className="bg-black/70 backdrop-blur px-2.5 py-1 rounded">
                MIN #18
              </span>
              <span className="bg-black/70 backdrop-blur px-2.5 py-1 rounded">
                CROWN JEWEL
              </span>
            </div>

            {/* Card Bottom Readout */}
            <div className="relative z-10 bg-black/85 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
              <div className="text-[10px] font-mono text-[#FDE047] font-bold uppercase tracking-wider">
                MOMENT OF THE YEAR
              </div>
              <div className="font-extrabold text-xl text-white leading-tight uppercase tracking-tight mt-0.5">
                "THE CATCH" VS BUFFALO
              </div>
              <div className="mt-2.5 text-[11px] font-mono text-zinc-300 flex justify-between border-t border-white/10 pt-2">
                <span>4TH &amp; 18</span>
                <span>32 YDS</span>
                <span className="text-[#FDE047] font-bold">1-HANDED</span>
              </div>
            </div>
          </div>

          {/* BACK FACE */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden bg-[#10091B] border-2 border-[#FDE047] p-5 flex flex-col justify-between [transform:rotateY(180deg)] shadow-2xl"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-black text-[#FDE047] tracking-wider text-sm">
                  RECORD ARTIFACT
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  NOV 13, 2022
                </span>
              </div>

              <h4 className="text-xl font-bold uppercase mt-4 text-white">
                4TH &amp; 18 WRESTLE GRAB
              </h4>
              <p className="text-xs text-zinc-300 mt-2 font-sans leading-relaxed">
                Trailing late in Buffalo, Justin ripped the ball from defender Cam
                Lewis with one right hand while horizontal in midair. Selected as
                the NFL Moment of the Year and immortalized in the Pro Football
                Hall of Fame.
              </p>
            </div>

            <div className="font-mono text-[10px] space-y-2 border-t border-white/10 pt-3 text-zinc-400">
              <div className="flex justify-between">
                <span>GAME:</span>
                <span className="text-white">MIN 33, BUF 30 (OT)</span>
              </div>
              <div className="flex justify-between">
                <span>TARGETS:</span>
                <span className="text-white">10 REC · 193 YDS · 1 TD</span>
              </div>
              <div className="flex justify-between">
                <span>HALL OF FAME:</span>
                <span className="text-[#FDE047] font-bold">CANTON, OH</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center font-mono text-xs text-zinc-500 mt-6">
        <span>TILT: X: {rotate.x.toFixed(1)}° · Y: {rotate.y.toFixed(1)}°</span>
      </div>
    </div>
  );
}
