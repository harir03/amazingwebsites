/**
 * Tactile Adhesive Tape Strip Banner — SweetTape
 * Pop-colored tilted adhesive strips with drop shadows, jagged edges,
 * and realistic hover peel / tilt physics.
 */
export default function TactileTapeStripBanner() {
  return (
    <div className="w-full bg-[#FAF8F2] text-[#111111] p-8 sm:p-12 font-sans rounded-3xl border-2 border-[#111111] shadow-[6px_6px_0px_#111111] flex flex-col items-center">
      <style>{`
        .tape-banner:hover {
          transform: translateY(-5px) rotate(0deg) scale(1.02);
          box-shadow: 0 16px 32px rgba(0,0,0,0.18);
        }
      `}</style>

      {/* Top Tape Label */}
      <div className="bg-[#F7D000] border-2 border-[#111111] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest -rotate-2 shadow-[2px_2px_0px_#111111] mb-6">
        ✦ Made in Malaysia Since 1978 ✦
      </div>

      <h2 className="font-extrabold text-[clamp(32px,6vw,72px)] leading-none tracking-tight uppercase text-center">
        STICK <span className="bg-[#FF7B5F] text-white px-3 py-1 rounded-xl inline-block rotate-2 shadow-[3px_3px_0px_#111111]">BY YOU</span>
      </h2>

      <p className="mt-4 text-sm sm:text-base text-center max-w-md font-medium text-[#111111]/80">
        Three generations of pressure-sensitive adhesive tapes crafted for real life chaos.
      </p>

      {/* Tilted Adhesive Strips */}
      <div className="w-full max-w-xl mt-8 space-y-4">
        <div className="tape-banner bg-[#F7D000] border-2 border-[#111111] p-4 rounded-lg rotate-[-1.5deg] shadow-[4px_4px_0px_#111111] transition-all cursor-pointer flex justify-between items-center">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase opacity-75">TAPE 01 · GENERAL PURPOSE</span>
            <h4 className="font-extrabold text-lg uppercase">Precision Masking Roll</h4>
          </div>
          <span className="text-xs font-mono font-bold bg-[#111111] text-white px-2 py-1 rounded">0.14mm</span>
        </div>

        <div className="tape-banner bg-[#FF7B5F] text-white border-2 border-[#111111] p-4 rounded-lg rotate-[1.2deg] shadow-[4px_4px_0px_#111111] transition-all cursor-pointer flex justify-between items-center">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-white/80">TAPE 02 · HEAVY DUTY</span>
            <h4 className="font-extrabold text-lg uppercase">Polyethylene Cloth Duct</h4>
          </div>
          <span className="text-xs font-mono font-bold bg-white text-[#111111] px-2 py-1 rounded">75 N/cm</span>
        </div>

        <div className="tape-banner bg-[#50CBFF] border-2 border-[#111111] p-4 rounded-lg rotate-[-0.8deg] shadow-[4px_4px_0px_#111111] transition-all cursor-pointer flex justify-between items-center">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase opacity-75">TAPE 03 · PACKAGING</span>
            <h4 className="font-extrabold text-lg uppercase">BOPP High-Tack Carton Seal</h4>
          </div>
          <span className="text-xs font-mono font-bold bg-[#111111] text-white px-2 py-1 rounded">92 N/cm</span>
        </div>
      </div>
    </div>
  );
}
