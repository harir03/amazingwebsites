/**
 * Mediterranean Citrus Flavor Hero — Agrumea Farm
 * Sunlit parchment hero with luxury editorial serif, authentic provenance badges,
 * and warm Sicilian citrus color tokens.
 */
export default function CitrusFlavorHero() {
  return (
    <div className="w-full bg-[#F8F5EE] text-[#1C1917] p-8 sm:p-14 rounded-3xl border border-[#1C1917]/10 flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="flex justify-between items-center pb-6 border-b border-[#1C1917]/10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#DF5C32]" />
          <span className="font-serif text-2xl uppercase tracking-wider font-medium">Agrumea Farm</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#364B38] bg-[#364B38]/10 px-3 py-1 rounded-full">
            Sicilia · 100% Artigianale
          </span>
        </div>
      </div>

      {/* Main Hero Body */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center my-10">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-[#364B38] mb-4 flex items-center gap-2">
            <span className="text-[#DF5C32]">✦</span> Autentici Sapori di Sicilia
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
            Artisanal marmalades &amp;{" "}
            <em className="italic text-[#DF5C32] font-normal">pestos from Sicily</em>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#57534E] max-w-md leading-relaxed">
            Slow cooked in small batches with hand-harvested blood oranges from the Val di Noto and volcanic soil pistachios from Mount Etna.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <button className="bg-[#DF5C32] hover:bg-[#c74b24] text-white px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all shadow-md">
              Esplora i Prodotti →
            </button>
            <div className="text-xs font-semibold text-[#57534E]">
              Zero conservanti artificiali
            </div>
          </div>
        </div>

        {/* Visual Card */}
        <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-xl border border-[#1C1917]/10">
          <img
            src="https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?auto=format&fit=crop&w=1000&q=80"
            alt="Sicilian Citrus Grove"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-black/5 shadow">
            <h4 className="font-serif text-lg font-bold text-[#1C1917]">Val di Noto Orchards</h4>
            <p className="text-xs text-[#57534E] mt-0.5">
              Hand-harvested under the Mediterranean sun at peak sugar-acid balance.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Provenance Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#1C1917]/10 text-center">
        <div>
          <div className="font-serif text-2xl sm:text-3xl text-[#364B38]">85%</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#57534E] mt-1">Fruit Content</div>
        </div>
        <div>
          <div className="font-serif text-2xl sm:text-3xl text-[#364B38]">0%</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#57534E] mt-1">Additives</div>
        </div>
        <div>
          <div className="font-serif text-2xl sm:text-3xl text-[#364B38]">100%</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#57534E] mt-1">Sicilian Raw</div>
        </div>
        <div>
          <div className="font-serif text-2xl sm:text-3xl text-[#364B38]">Etna</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#57534E] mt-1">Volcanic Minerals</div>
        </div>
      </div>
    </div>
  );
}

