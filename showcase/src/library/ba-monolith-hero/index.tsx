/**
 * Architectural Canopy Hero — Belgrade Arbor
 * Editorial serif typography with living tree canopy visual banner,
 * location coordinates pill, and architectural dimension badges.
 */
export default function ArchitecturalCanopyHero() {
  return (
    <div className="w-full bg-[#FAF8F5] text-[#1F261E] p-8 sm:p-12 font-sans rounded-3xl border border-[#1F261E]/10 shadow-lg text-center flex flex-col items-center">
      {/* Coordinates pill */}
      <div className="inline-flex items-center gap-2 rounded-full border border-[#1F261E]/15 bg-[#F5F2EB] px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-[#1F261E]">
        <span className="h-2 w-2 rounded-full bg-[#3E562E] animate-pulse"></span>
        <span>44°49'08.2"N 20°24'29.1"E · Novi Beograd</span>
      </div>

      {/* Main Title */}
      <h2 className="font-serif text-[clamp(32px,5.5vw,68px)] leading-[0.98] font-normal tracking-tight text-[#1F261E] mt-6 max-w-3xl">
        Harmony of modern living and natural <em className="italic text-[#3E562E]">greenery</em>.
      </h2>

      <p className="mt-4 text-sm sm:text-base text-[#1F261E]/75 max-w-xl leading-relaxed">
        Belgrade Arbor is taking shape on Bulevar heroja sa Košara as a curated urban ecosystem that evolves with the rhythm of the city.
      </p>

      {/* Visual Canopy Banner */}
      <div className="w-full max-w-2xl mt-8 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1F261E] via-[#2F3A26] to-[#3E562E] p-8 text-[#FAF8F5] shadow-xl relative">
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">Living Canopy Architecture</span>
          <h4 className="font-serif text-2xl sm:text-3xl mt-1 font-normal text-white">Inspired by Forest Trees</h4>
          <div className="mt-4 flex gap-6 text-xs font-mono text-[#FAF8F5]/80">
            <span>18,500 m² RESIDENTIAL</span>
            <span>·</span>
            <span>140+ BESPOKE UNITS</span>
            <span>·</span>
            <span>48% GREEN RECOVERY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
