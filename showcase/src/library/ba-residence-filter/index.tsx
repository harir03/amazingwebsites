import { useState } from "react";

/**
 * Residence Floorplan Inspector — Belgrade Arbor
 * Multi-unit CAD floorplan switcher with square meter telemetry, room counts,
 * sunlight exposure readings, and responsive SVG blueprint view.
 */
interface UnitData {
  tag: string;
  name: string;
  desc: string;
  area: string;
  terrace: string;
  rooms: string;
  exposure: string;
  color: string;
}

const UNITS: Record<string, UnitData> = {
  penthouse: {
    tag: "Level 8 · Sky Residence",
    name: "Canopy Penthouse",
    desc: "Double-height ceilings with direct private elevator entry and an expansive 360-degree wrap terrace overlooking the Sava river.",
    area: "184 m²",
    terrace: "46 m²",
    rooms: "4 Bed · 3.5 Bath",
    exposure: "South / West",
    color: "#C5A880",
  },
  duplex: {
    tag: "Level 1-2 · Garden Estate",
    name: "Botanical Garden Duplex",
    desc: "Two-story private residence seamlessly connected to a private courtyard with floor-to-ceiling double-glazed sun curtains.",
    area: "128 m²",
    terrace: "28 m²",
    rooms: "3 Bed · 2.5 Bath",
    exposure: "East / South",
    color: "#3E562E",
  },
  classic: {
    tag: "Levels 3-6 · Premier Living",
    name: "Canopy 2-Bedroom Suite",
    desc: "Optimized ergonomic floorplan featuring acoustic wall insulation, dedicated walk-in wardrobe, and a deep balcony shaded by tree facade.",
    area: "84 m²",
    terrace: "14 m²",
    rooms: "2 Bed · 2 Bath",
    exposure: "South",
    color: "#1F261E",
  },
};

export default function ResidenceFloorplanInspector() {
  const [active, setActive] = useState<"penthouse" | "duplex" | "classic">("penthouse");
  const unit = UNITS[active];

  return (
    <div className="w-full bg-[#FAF8F5] p-6 sm:p-10 font-sans text-[#1F261E] rounded-3xl border border-[#1F261E]/10 shadow-lg">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-[#3E562E]">Unit Blueprint Catalog</span>
        <h3 className="font-serif text-3xl sm:text-4xl mt-1 text-[#1F261E]">Architectural Floorplan Inspector</h3>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {(["penthouse", "duplex", "classic"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setActive(k)}
            className={`rounded-full px-5 py-2 text-xs uppercase tracking-wider font-semibold transition-all ${
              active === k
                ? "bg-[#1F261E] text-[#FAF8F5] shadow-md"
                : "border border-[#1F261E]/20 text-[#1F261E] hover:bg-[#F5F2EB]"
            }`}
          >
            {UNITS[k].name} ({UNITS[k].area})
          </button>
        ))}
      </div>

      {/* Stage */}
      <div className="bg-white rounded-2xl border border-[#1F261E]/10 p-6 sm:p-8 grid md:grid-cols-12 gap-8 items-center">
        {/* Blueprint SVG */}
        <div className="md:col-span-7 bg-[#F5F2EB] rounded-xl p-6 border border-[#1F261E]/10 flex flex-col items-center justify-center min-h-[260px] relative">
          <div className="absolute top-3 left-3 text-[10px] font-mono text-[#1F261E]/60 uppercase tracking-widest">
            CAD Floorplan · {unit.area}
          </div>
          <svg viewBox="0 0 380 240" className="w-full max-w-sm h-auto text-[#1F261E]" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="20" y="20" width="340" height="200" rx="4" strokeWidth="2" />
            <line x1="160" y1="20" x2="160" y2="220" strokeDasharray="3 3" />
            <line x1="20" y1="120" x2="160" y2="120" />
            <rect x="30" y="30" width="120" height="80" strokeWidth="1" className="fill-[#1F261E]/5" />
            <text x="45" y="75" fontSize="11" fill="currentColor" stroke="none" fontFamily="sans-serif">Master Suite</text>
            <rect x="170" y="30" width="180" height="110" strokeWidth="1" className="fill-[#C5A880]/15" />
            <text x="210" y="90" fontSize="12" fill="currentColor" stroke="none" fontWeight="bold" fontFamily="sans-serif">Living & Balcony</text>
            <rect x="30" y="130" width="120" height="80" strokeWidth="1" className="fill-[#3E562E]/10" />
            <text x="50" y="175" fontSize="11" fill="currentColor" stroke="none" fontFamily="sans-serif">Guest Bedroom</text>
            <rect x="170" y="150" width="180" height="60" strokeWidth="1" className="fill-[#1F261E]/5" />
            <text x="220" y="185" fontSize="11" fill="currentColor" stroke="none" fontFamily="sans-serif">Designer Kitchen</text>
          </svg>
        </div>

        {/* Telemetry Readout */}
        <div className="md:col-span-5 space-y-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#3E562E]">{unit.tag}</span>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#1F261E] mt-0.5">{unit.name}</h4>
            <p className="text-xs text-[#1F261E]/75 mt-2 leading-relaxed">{unit.desc}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-[#1F261E]/10 pt-3 text-xs">
            <div>
              <span className="text-[#1F261E]/60 block font-mono">LIVING AREA</span>
              <span className="font-serif text-xl text-[#1F261E] font-medium">{unit.area}</span>
            </div>
            <div>
              <span className="text-[#1F261E]/60 block font-mono">TERRACE</span>
              <span className="font-serif text-xl text-[#1F261E] font-medium">{unit.terrace}</span>
            </div>
            <div>
              <span className="text-[#1F261E]/60 block font-mono">BED / BATH</span>
              <span className="font-serif text-xl text-[#1F261E] font-medium">{unit.rooms}</span>
            </div>
            <div>
              <span className="text-[#1F261E]/60 block font-mono">EXPOSURE</span>
              <span className="font-serif text-xl text-[#1F261E] font-medium">{unit.exposure}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
