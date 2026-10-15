# Hello Monday / DEPT Clone

A 1:1 high-fidelity recreation of the award-winning creative studio website [Hello Monday](https://www.hellomonday.com/).

## 🚀 Live Demo & Development

- **Live URL Reference**: https://www.hellomonday.com/
- **Local Dev Server**: http://localhost:3001/

### Running Locally

```bash
cd portfolio/hellomonday
npm install
npm run dev
```

## 🎨 Architectural Highlights

1. **Character Animation & WebGL/Canvas System**:
   - Pixi.js / Three.js driven character hero illustration and dynamic responsive resizing.
   - Rotational typography system transitioning seamlessly between *Experiences*, *Branding*, and *Products*.
   - Spritesheets (`face_all`, `menu_blob_init`, `behind_eye`, `dot2`, `scroll-dot`) rendered with canvas blend modes.

2. **Elastic Canvas Menu**:
   - Bezier curve canvas side menu with fluid morphing SVG path interactions (`#curve d="M0,0 C0,250 0,250 0,500 Z"`).
   - Dynamic hover tracking and cursor-following physics.

3. **Curated Showcase Grid**:
   - Asymmetric multi-column editorial grid showcasing flagship case studies (Gemini API Developer Competition, Bang & Olufsen, Strava, Google Kids Space, Cloud Castles, YouTube).
   - High-DPI responsive image sets and native video previews.

4. **Studio Presence & Office Interactions**:
   - Contact module featuring interactive office gifs (`nyc_tadaa_once.gif`, `cph_tadaa_once.gif`, `aarh_tadaa_once.gif`) representing New York, Copenhagen, and Aarhus locations.
