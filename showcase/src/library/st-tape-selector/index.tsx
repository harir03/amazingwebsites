import { useState } from "react";

/**
 * Interactive Tape Selector Carousel — SweetTape
 * Switch between 5 specialized adhesive tape rolls to inspect adhesion force,
 * tensile strength, backing thickness, and roll color styling.
 */
interface TapeInfo {
  sku: string;
  name: string;
  desc: string;
  adhesion: string;
  tensile: string;
  thickness: string;
  color: string;
  tagline: string;
}

const TAPES: Record<string, TapeInfo> = {
  cloth: {
    sku: "ST-CLOTH-50",
    name: "Heavy-Duty Cloth Duct",
    desc: "Polyethylene-coated cloth mesh with natural rubber solvent adhesive. Tearable by hand both ways.",
    adhesion: "9.8 N/cm",
    tensile: "75 N/cm",
    thickness: "0.26 mm",
    color: "#FF7B5F",
    tagline: "EXTRA STRONG",
  },
  masking: {
    sku: "ST-MASK-24",
    name: "Precision Crepe Masking",
    desc: "Natural crepe paper backing with synthetic rubber resin. Leaves zero gummy residues on removal.",
    adhesion: "6.2 N/cm",
    tensile: "40 N/cm",
    thickness: "0.14 mm",
    color: "#F7D000",
    tagline: "CLEAN REMOVAL",
  },
  opp: {
    sku: "ST-OPP-48",
    name: "BOPP Packaging Film",
    desc: "High-tensile polypropylene film coated with water-based acrylic. Weather-resistant seal.",
    adhesion: "7.5 N/cm",
    tensile: "92 N/cm",
    thickness: "0.05 mm",
    color: "#50CBFF",
    tagline: "CARTON LOCK",
  },
  double: {
    sku: "ST-DBL-12",
    name: "Double-Sided Tissue",
    desc: "Non-woven tissue carrier with aggressive solvent acrylic adhesive on both sides for seamless mounting.",
    adhesion: "8.4 N/cm",
    tensile: "45 N/cm",
    thickness: "0.10 mm",
    color: "#2E3EAC",
    tagline: "DUAL MOUNT",
  },
};

export default function InteractiveTapeSelector() {
  const [active, setActive] = useState<"cloth" | "masking" | "opp" | "double">("cloth");
  const tape = TAPES[active];

  return (
    <div className="w-full bg-[#FAF8F2] text-[#111111] p-6 sm:p-10 font-sans rounded-3xl border-2 border-[#111111] shadow-[6px_6px_0px_#111111]">
      <div className="text-center max-w-md mx-auto mb-6">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#2E3EAC]">Interactive Catalog</span>
        <h3 className="font-extrabold text-2xl sm:text-3xl uppercase tracking-tight mt-1">Roll & Spec Selector</h3>
      </div>

      {/* Selector Pills */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {(["cloth", "masking", "opp", "double"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setActive(k)}
            className={`rounded-full px-4 py-2 text-xs font-bold uppercase border-2 border-[#111111] transition-all shadow-[2px_2px_0px_#111111] ${
              active === k ? "bg-[#111111] text-white" : "bg-white text-[#111111] hover:bg-[#F7D000]"
            }`}
          >
            {TAPES[k].name}
          </button>
        ))}
      </div>

      {/* Stage */}
      <div className="bg-white rounded-2xl border-2 border-[#111111] p-6 sm:p-8 grid md:grid-cols-12 gap-8 items-center shadow-[4px_4px_0px_#111111]">
        {/* Roll Visual */}
        <div className="md:col-span-5 bg-[#FAF8F2] border-2 border-[#111111] rounded-xl p-8 flex flex-col items-center justify-center min-h-[220px] relative">
          <div
            className="w-36 h-36 rounded-full border-4 border-[#111111] flex items-center justify-center relative shadow-inner transition-colors duration-300"
            style={{ backgroundColor: tape.color }}
          >
            <div className="w-16 h-16 rounded-full bg-[#FAF8F2] border-2 border-[#111111] flex items-center justify-center text-[10px] font-mono font-black">
              CORE
            </div>
            <div className="absolute -bottom-3 -right-6 bg-[#111111] text-white text-[10px] font-mono font-bold px-3 py-1 rounded shadow-md rotate-[-6deg]">
              {tape.tagline}
            </div>
          </div>
        </div>

        {/* Specs Readout */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase text-[#2E3EAC]">{tape.sku}</span>
            <h4 className="font-extrabold text-2xl uppercase mt-0.5">{tape.name}</h4>
            <p className="text-xs text-[#111111]/75 mt-1.5 leading-relaxed">{tape.desc}</p>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t-2 border-[#111111] pt-3 text-xs">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase opacity-60 block">Adhesion</span>
              <span className="font-extrabold text-lg">{tape.adhesion}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase opacity-60 block">Tensile</span>
              <span className="font-extrabold text-lg">{tape.tensile}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase opacity-60 block">Thickness</span>
              <span className="font-extrabold text-lg">{tape.thickness}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
