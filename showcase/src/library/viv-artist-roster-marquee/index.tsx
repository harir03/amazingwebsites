import { useState } from "react";

/**
 * Staggered Chromatic Artist Gallery — ViV MGMT
 * High-fashion photographic roster with staggered column offsets,
 * smooth B&W to full-color bloom on hover, and active category filtering.
 */
interface ArtistItem {
  id: string;
  name: string;
  discipline: string;
  clients: string;
  image: string;
  aspect: string;
  staggerClass?: string;
  category: "photographer" | "director";
}

const ARTISTS: ArtistItem[] = [
  {
    id: "mannion",
    name: "Jonathan Mannion",
    discipline: "DIRECTOR · NYC",
    clients: "NIKE · APPLE · BEATS",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    aspect: "aspect-[3/4]",
    category: "photographer",
  },
  {
    id: "torres",
    name: "Arturo Torres",
    discipline: "PHOTOGRAPHER · LA",
    clients: "MARINE LAYER · QUAY",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    aspect: "aspect-[4/5]",
    staggerClass: "sm:translate-y-10",
    category: "photographer",
  },
  {
    id: "moore",
    name: "Danielle Moore",
    discipline: "DIRECTOR · NYC",
    clients: "OLD NAVY · GAP",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    aspect: "aspect-[3/4]",
    category: "director",
  },
  {
    id: "kent",
    name: "Jason Kent",
    discipline: "LIGHTING & STILL LIFE",
    clients: "MORPHE · SEPHORA",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop",
    aspect: "aspect-[4/5]",
    staggerClass: "sm:translate-y-6",
    category: "photographer",
  },
];

export default function ArtistRosterMarquee() {
  const [filter, setFilter] = useState<"all" | "photographer" | "director">("all");
  const [hoveredArtist, setHoveredArtist] = useState<string | null>(null);

  const filtered = ARTISTS.filter((a) => filter === "all" || a.category === filter);

  return (
    <div className="w-full bg-white text-black p-6 sm:p-12 rounded-3xl border border-zinc-200 select-none overflow-hidden relative">
      {/* Top Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-200 font-mono text-xs">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setFilter("all")}
            className={`pb-1 uppercase tracking-wider transition-all ${
              filter === "all" ? "text-black font-bold border-b-2 border-black" : "text-zinc-400 hover:text-black"
            }`}
          >
            ALL ({ARTISTS.length})
          </button>
          <button
            onClick={() => setFilter("photographer")}
            className={`pb-1 uppercase tracking-wider transition-all ${
              filter === "photographer" ? "text-black font-bold border-b-2 border-black" : "text-zinc-400 hover:text-black"
            }`}
          >
            PHOTOGRAPHERS
          </button>
          <button
            onClick={() => setFilter("director")}
            className={`pb-1 uppercase tracking-wider transition-all ${
              filter === "director" ? "text-black font-bold border-b-2 border-black" : "text-zinc-400 hover:text-black"
            }`}
          >
            DIRECTORS
          </button>
        </div>

        <div className="text-zinc-400 text-[11px]">
          HOVER TILES TO ENGAGE CHROMATIC BLOOM
        </div>
      </div>

      {/* Roster Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 my-10 items-start">
        {filtered.map((artist) => {
          const isHovered = hoveredArtist === artist.id;
          return (
            <div
              key={artist.id}
              className={`group cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                artist.staggerClass ?? ""
              }`}
              onMouseEnter={() => setHoveredArtist(artist.id)}
              onMouseLeave={() => setHoveredArtist(null)}
            >
              <div
                className={`relative w-full ${artist.aspect} overflow-hidden rounded-sm bg-zinc-100 border border-zinc-100 shadow-sm`}
              >
                <img
                  src={artist.image}
                  alt={artist.name}
                  className={`w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isHovered ? "grayscale-0 scale-105" : "grayscale"
                  }`}
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase rounded-sm">
                  {artist.discipline}
                </div>
              </div>

              <div className="mt-3.5 flex items-baseline justify-between">
                <h4
                  className={`font-serif text-xl sm:text-2xl transition-all duration-300 ${
                    isHovered ? "italic font-normal" : "font-normal"
                  }`}
                >
                  {artist.name}
                </h4>
                <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
                  {artist.clients}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Readout */}
      <div className="pt-4 border-t border-zinc-200 flex items-center justify-between font-mono text-xs text-zinc-400">
        <span>ViV MGMT // ROSTER SPECIMEN</span>
        <span className="text-black font-semibold">SAM DALLYN SOTD</span>
      </div>
    </div>
  );
}
