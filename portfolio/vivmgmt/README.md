# ViV MGMT — Photographer Agency & Commercial Photo Production

Faithful 1:1 recreation of **ViV Management** ([vivmgmt.com](https://vivmgmt.com/)), recognized as Awwwards Site of the Day and Developer Award winner on November 6, 2026. Designed and developed by renowned creative director **Sam Dallyn**.

## 🌟 Visual Archetype: Minimalist Editorial Monolith

A masterclass in editorial discipline, high-fashion typography, and monochrome photography:
- **Palette**: Pure white (`#ffffff`), pitch black (`#000000`), architectural zinc (`#71717a`, `#e4e4e7`).
- **Typography**: Refined high-fashion serif (`Cormorant Garamond` / `Garamond Narrow`) paired with Swiss structural sans (`Inter` / `Helvetica Now Display`) and monospace metadata (`JetBrains Mono`).
- **Signature Physics**: B&W-to-color smooth saturation blooming on hover with `cubic-bezier(0.23, 1, 0.32, 1)`, staggered multi-aspect ratio gallery grid, live timezone clocks for NYC / LDN / LA, and magnetic cursor-follow artist nametags.

## 🚀 Running the Project

```bash
# Navigate to directory
cd portfolio/vivmgmt

# Install dependencies
npm install

# Start development server on port 3012
npm run dev
```

Visit [http://localhost:3012](http://localhost:3012) in your browser.

## 📦 Key Systems Implemented

1. **Staggered Multi-Aspect Ratio Artist Roster**:
   - Alternating vertical offsets and photo proportions (3:4, 4:5).
   - Smooth grayscale-to-chromatic saturation transition using Quentin easing (`cubic-bezier(0.23, 1, 0.32, 1)`).
2. **Interactive Live Agency Clocks**:
   - Real-time Intl.DateTimeFormat clocks syncing hours for New York, London, and Los Angeles studios.
3. **Cursor-Follow Artist Pill**:
   - Context-aware pointer badge displaying artist name and prompt on hover over gallery tiles.
4. **Editorial News & Production Monolith**:
   - Clean horizontal rule campaigns list and high-contrast black capabilities statement block.
