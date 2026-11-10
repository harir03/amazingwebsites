import { useState, useEffect } from "react";

/**
 * Yardline Scrubber Rail & Field Telemetry — Justin Jefferson (#18)
 * Athletic field position scrubber converting yardline position (G to 50 to G)
 * into interactive play-by-play drive analysis and route telemetry.
 */
export default function YardlineScrubber() {
  const [yard, setYard] = useState(68); // 0 = Own Goal, 50 = Midfield, 100 = Opponent Goal
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setYard((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 70);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Derive football field notation
  const fieldMarker =
    yard === 0
      ? "OWN GOAL (0)"
      : yard === 50
      ? "MIDFIELD (50)"
      : yard === 100
      ? "TOUCHDOWN (100)"
      : yard < 50
      ? `OWN ${yard}`
      : `OPP ${100 - yard}`;

  const yardsToGoal = 100 - yard;

  return (
    <div className="w-full bg-[#0B0713] text-white p-6 sm:p-10 rounded-3xl border border-white/10 select-none overflow-hidden relative">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FDE047] animate-pulse" />
          <span className="font-bold tracking-widest text-white">
            FIELD POSITION TELEMETRY // JJETS #18
          </span>
        </div>
        <div className="flex items-center gap-4 text-zinc-400">
          <span>DRIVE: 4TH QUARTER</span>
          <span className="text-[#FDE047] font-bold">4TH &amp; 18</span>
        </div>
      </div>

      {/* Main Metric Display */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8 items-end">
        <div>
          <div className="font-mono text-[10px] tracking-wider text-zinc-400 uppercase">
            BALL ON
          </div>
          <div className="text-4xl sm:text-5xl font-extrabold text-[#FDE047] tracking-tight mt-1">
            {fieldMarker}
          </div>
        </div>

        <div>
          <div className="font-mono text-[10px] tracking-wider text-zinc-400 uppercase">
            TO END ZONE
          </div>
          <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
            {yardsToGoal} <span className="text-lg font-normal text-zinc-400">YDS</span>
          </div>
        </div>

        <div className="flex sm:justify-end">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-5 py-2.5 rounded-xl bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#FDE047] transition-colors"
          >
            {isPlaying ? "PAUSE SIMULATION" : "SIMULATE DRIVE ▶"}
          </button>
        </div>
      </div>

      {/* Turf Field Track */}
      <div className="relative pt-6 pb-2">
        {/* Yard Numbers */}
        <div className="flex justify-between font-mono text-[11px] text-zinc-400 px-1 mb-2">
          <span>G</span>
          <span>10</span>
          <span>20</span>
          <span>30</span>
          <span>40</span>
          <span className="text-[#FDE047] font-bold">50</span>
          <span>40</span>
          <span>30</span>
          <span>20</span>
          <span>10</span>
          <span>G</span>
        </div>

        {/* Yardline Dashes Bar */}
        <div className="relative w-full h-8 rounded-xl bg-[#140D21] border border-white/15 p-1 overflow-hidden flex items-center">
          {/* Football Field Hashlines */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, #FFFFFF 0px, #FFFFFF 1px, transparent 1px, transparent 20px)",
            }}
          />

          {/* Scrubber Ball Line Indicator */}
          <div
            className="absolute top-1 bottom-1 w-3 rounded-full bg-gradient-to-r from-amber-400 to-[#FDE047] shadow-[0_0_15px_rgba(253,224,71,0.9)] transition-all duration-75"
            style={{
              left: `calc(${yard}% - 6px)`,
            }}
          />
        </div>

        {/* Interactive Slider Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={yard}
          onChange={(e) => {
            setIsPlaying(false);
            setYard(Number(e.target.value));
          }}
          className="w-full mt-4 accent-[#FDE047] cursor-pointer"
        />
      </div>

      {/* Play-by-play Context Footer */}
      <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-zinc-400">
        <div>
          TARGET PROFILE:{" "}
          <span className="text-white">DEEP OVER ROUTE · SEPARATION: 2.8 YDS</span>
        </div>
        <div className="text-[#FDE047]">
          CATCH PROBABILITY: {Math.min(99, Math.max(12, Math.round(100 - yardsToGoal * 0.8)))}%
        </div>
      </div>
    </div>
  );
}
