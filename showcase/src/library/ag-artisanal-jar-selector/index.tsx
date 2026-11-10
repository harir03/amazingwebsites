import { useState } from "react";

const PRODUCTS = [
  {
    id: "pesto",
    badge: "Specialità Salata",
    title: "Pesto Salato di Pistacchio",
    desc: "Enveloping savory pesto made from 65% toasted Sicilian pistachios, cold-pressed sunflower oil, and Trapani sea salt. Rich, crunchy texture.",
    ingredients: ["65% Pistacchi di Sicilia", "Olio di Girasole", "Sale Marino di Trapani"],
    pairing: "Trofie fresche, burrata pugliese, o guanciale croccante.",
    color: "#364B38",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "arancia",
    badge: "Agrumi di Sicilia",
    title: "Marmellata di Arance Rosse",
    desc: "Intensely fragrant marmalade from 85% Sicilian Moro and Tarocco blood oranges with candied zest strips and raw organic cane sugar.",
    ingredients: ["85% Arance Rosse IGP", "Zucchero di Canna", "Succo di Limone"],
    pairing: "Pane di segale tostato, burro di malga o formaggi erborinati.",
    color: "#DF5C32",
    img: "https://images.unsplash.com/photo-1596797882870-8c33deeac224?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "mandorle",
    badge: "Crema Dolce",
    title: "Crema Dolce di Mandorle di Noto",
    desc: "Silky velvety sweet spread crafted from 55% toasted Noto Roman almonds, rich cocoa butter, and natural Bourbon vanilla pods.",
    ingredients: ["55% Mandorle di Noto", "Burro di Cacao Puro", "Vaniglia Bourbon"],
    pairing: "Brioche col tuppo calda, croissant o gelato al fior di latte.",
    color: "#E8A020",
    img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
  },
];

/**
 * Artisanal Pantry Jar Selector — Agrumea Farm
 * Interactive product switcher with ingredients breakdown, Sicilian provenance tags,
 * and gastronomic pairing suggestions.
 */
export default function ArtisanalJarSelector() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = PRODUCTS[activeIdx];

  return (
    <div className="w-full bg-[#FFFDF9] text-[#1C1917] p-8 sm:p-12 rounded-3xl border border-[#1C1917]/10 flex flex-col justify-between select-none">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#DF5C32]">
            Collezione Artigianale
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl mt-1 tracking-tight">
            Artisanal Pantry Jars
          </h2>
        </div>

        {/* Tab Pills */}
        <div className="flex gap-2 flex-wrap">
          {PRODUCTS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActiveIdx(idx)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeIdx === idx
                  ? "bg-[#DF5C32] text-white shadow-sm"
                  : "bg-transparent text-[#57534E] border border-black/10 hover:border-black/30"
              }`}
            >
              {p.title.split(" ")[0]} {p.title.split(" ")[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Product Display Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#F8F5EE] p-6 sm:p-10 rounded-2xl border border-black/5">
        {/* Media Frame */}
        <div className="relative h-72 sm:h-80 rounded-xl overflow-hidden shadow-md">
          <img src={active.img} alt={active.title} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3 bg-[#364B38] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
            {active.badge}
          </div>
        </div>

        {/* Details Column */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#1C1917] mb-3">
              {active.title}
            </h3>
            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed mb-6">
              {active.desc}
            </p>

            <div className="border-t border-black/10 pt-4 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#364B38] block mb-2">
                Ingredienti Principali:
              </span>
              <div className="flex gap-2 flex-wrap">
                {active.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="bg-white/80 border border-black/5 px-2.5 py-1 rounded-md text-xs font-medium text-[#1C1917]"
                  >
                    ✦ {ing}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#DF5C32]/10 border-l-2 border-[#DF5C32] p-3 rounded-r-lg text-xs leading-relaxed text-[#1C1917]">
            <strong>Abbinamento Consigliato:</strong> {active.pairing}
          </div>
        </div>
      </div>
    </div>
  );
}

