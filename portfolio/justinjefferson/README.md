# Justin Jefferson #18 — Athlete Editorial & Signature Moments Archive

Faithful 1:1 recreation of **Justin Jefferson's official website** ([jjettas.com](https://jjettas.com/)), recognized as Awwwards Site of the Day on November 7, 2026. Designed by **LayerTwo** and commissioned by **Assemble**.

## 🌟 Visual Archetype: Athletic High-Fashion Editorial

A convergence of NFL gridiron power, haute couture streetwear, and sports trading card memorabilia:
- **Palette**: Midnight violet (`#0b0713`, `#140d21`), Minnesota Vikings purple (`#4F2683`), and electric champion gold (`#FDE047`, `#EAB308`).
- **Typography**: Ultra-condensed athletic display (`Barlow Condensed`) paired with precision monospace (`JetBrains Mono`) and modern body sans (`Inter`).
- **Signature Physics**: 3D gyroscopic card tilt, dual holographic foil sheen (specular white beam + color-dodge iridescent rainbow), click-to-flip stat cards, and an interactive yardline scrubber.

## 🚀 Running the Project

```bash
# Navigate to directory
cd portfolio/justinjefferson

# Install dependencies
npm install

# Start development server on port 3011
npm run dev
```

Visit [http://localhost:3011](http://localhost:3011) in your browser.

## 📦 Key Systems Implemented

1. **Interactive 3D Holographic Trading Cards**:
   - Gyroscopic mouse-tracking tilt (`rotateX` / `rotateY`) with realistic depth perception.
   - Dual-layer holographic foil shaders (`holo-sheen` for specular glare and `holo-rainbow` for chromatic color-dodge flare).
   - Smooth card flip interaction revealing verified game telemetry, historical context, and Pro Football Hall of Fame artifact notes.
2. **Yardline Scrubber & Turf Geometry**:
   - Football field yardline rail (`G -> 10 -> 20 -> 30 -> 40 -> 50 -> 40...`) synced to vertical scroll progress.
   - Angled split geometry polygon clips (`polygon(0 4vw, 100% 0, 100% 100%, 0 100%)`).
3. **Infinite Partner Marquee**:
   - Hardware-accelerated continuous ticker featuring Under Armour, Oakley, Beats by Dre, Pepsi, Gatorade, General Mills, and Tiffany & Co.
4. **Interactive Soundscape**:
   - Web Audio API synthesizer providing subtle chime feedback on card flips and interactive state changes.
