import { useState } from "react";

/**
 * Botanical Floating Navbar — Belgrade Arbor
 * Translucent forest green pill navbar with backdrop blur, tree monogram SVG,
 * animated hamburger-to-X menu icon, and dual-layer rolling "Inquire" button.
 */
export default function BotanicalFloatingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full min-h-[320px] bg-[#FAF8F5] p-6 flex flex-col justify-start items-center overflow-hidden font-sans">
      <style>{`
        .inquire-btn:hover .label-wrap {
          transform: translateY(-50%);
        }
      `}</style>

      {/* Floating Header */}
      <header className="w-full max-w-3xl z-30">
        <nav className="bg-[#1F261E]/90 backdrop-blur-md text-[#FAF8F5] rounded-full px-5 py-3 shadow-xl border border-white/10 flex items-center justify-between">
          {/* Menu Trigger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 text-xs uppercase tracking-wider font-medium hover:text-[#C5A880] transition-colors"
            aria-expanded={open}
          >
            <div className="w-6 flex flex-col gap-1.5 justify-center">
              <span className={`block h-[1.5px] w-full bg-[#FAF8F5] transition-transform duration-300 ${open ? "translate-y-[4.5px] rotate-45" : ""}`}></span>
              <span className={`block h-[1.5px] w-full bg-[#FAF8F5] transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}></span>
            </div>
            <span className="hidden sm:inline font-mono">{open ? "Close" : "Menu"}</span>
          </button>

          {/* Monogram Brand */}
          <div className="flex items-center gap-2.5">
            <svg width="24" height="24" viewBox="0 0 35 35" fill="none" className="text-[#C5A880]">
              <path d="M0 6.7V12.2C0 14.9 2.2 17.1 4.8 17.1H9.2C10.7 14 13.9 11.8 17.5 11.8H19.3C21.7 11.8 23.7 10 24 7.7C20.2 7.2 17.2 4 17.1 0H15V3C15 6.6 12.5 9.7 9.1 10.6C10 11.4 11.1 11.8 12.3 11.8H13C12.4 12.1 11.8 12.6 11.3 13.1C10.6 13.8 10 14.7 9.6 15.6C6 14.6 3.3 11.4 3.1 7.4C2 7.4 1 7.1 0 6.7Z" fill="currentColor"/>
              <path d="M35 4.6C33.9 7.9 31.1 10.3 27.6 10.8C26.2 14 23 16.2 19.3 16.2H17.5C14.9 16.2 12.7 18.3 12.7 21V35H22.3V21C22.3 19.4 21.6 18 20.4 17.1C21.1 17 21.8 16.9 22.5 16.6C23.3 16.3 24 15.8 24.7 15.2C25.9 16.7 26.6 18.5 26.7 20.6H30.2C32.7 20.6 34.7 18.7 35 16.3V4.6Z" fill="currentColor"/>
            </svg>
            <span className="font-serif italic text-lg tracking-wide text-[#FAF8F5]">Belgrade Arbor</span>
          </div>

          {/* Dual-Layer Rolling Button */}
          <button
            type="button"
            className="inquire-btn relative overflow-hidden rounded-full border border-[#C5A880]/50 px-5 py-2 text-xs uppercase tracking-wider font-mono font-medium text-[#FAF8F5] hover:border-[#C5A880] transition-all"
          >
            <div className="label-wrap flex flex-col transition-transform duration-300">
              <span className="h-4 flex items-center gap-1.5">Inquire <span className="text-[#C5A880] font-bold">→</span></span>
              <span className="h-4 flex items-center gap-1.5 text-[#C5A880]">Connect <span>✦</span></span>
            </div>
          </button>
        </nav>
      </header>

      {/* Expanded Menu Drawer */}
      {open && (
        <div className="w-full max-w-3xl mt-4 bg-[#1F261E] rounded-3xl p-8 border border-white/10 text-[#FAF8F5] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] block mb-2">01 · ARCHITECTURE</span>
              <ul className="space-y-1.5 text-[#FAF8F5]/80">
                <li className="hover:text-white cursor-pointer">Canopy Facade</li>
                <li className="hover:text-white cursor-pointer">Living Gardens</li>
                <li className="hover:text-white cursor-pointer">Breezeway Solar</li>
              </ul>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] block mb-2">02 · RESIDENCES</span>
              <ul className="space-y-1.5 text-[#FAF8F5]/80">
                <li className="hover:text-white cursor-pointer">Penthouse Suites</li>
                <li className="hover:text-white cursor-pointer">Duplex Villas</li>
                <li className="hover:text-white cursor-pointer">2-Bedroom Lofts</li>
              </ul>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] block mb-2">03 · DISTRICT</span>
              <ul className="space-y-1.5 text-[#FAF8F5]/80">
                <li className="hover:text-white cursor-pointer">Airport City</li>
                <li className="hover:text-white cursor-pointer">West 65 Node</li>
                <li className="hover:text-white cursor-pointer">Tošin Bunar</li>
              </ul>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] block mb-2">04 · SALES</span>
              <ul className="space-y-1.5 text-[#FAF8F5]/80">
                <li className="hover:text-white cursor-pointer">Schedule Tour</li>
                <li className="hover:text-white cursor-pointer">Brochure PDF</li>
                <li className="hover:text-white cursor-pointer">+381 11 000 0000</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Canvas Preview Context */}
      <div className="mt-12 text-center text-[#1F261E]/60 text-xs font-mono">
        CANOPY LEVEL 04 · INTERACTION STAGE
      </div>
    </div>
  );
}
