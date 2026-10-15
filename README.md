
# 🧩 Frontend Copied — Open Source UI Component Collection

An open-source collection of faithfully recreated website UIs and components. Browse, learn from, and reuse production-quality frontend patterns from real-world websites.

> **Purpose**: This repo exists so developers can study how modern websites are built by examining clean, organized recreations — organized by category for easy discovery.

---

## 📁 Repository Structure

Each website recreation lives in its own folder, organized by category:

```
frontend-copied/
├── saas/              # SaaS product websites (dashboards, landing pages)
├── ecommerce/         # E-commerce storefronts and product pages
├── portfolio/         # Personal portfolios and agency sites
├── fintech/           # Financial technology and banking UIs
├── ai-ml/             # AI/ML product websites
├── devtools/          # Developer tools and documentation sites
├── social/            # Social platforms and community sites
├── media/             # Media, news, and content platforms
└── misc/              # Everything else
```

Each site folder contains:
- Its own `README.md` with source attribution, tech stack, and screenshots
- A fully self-contained, runnable project
- A `COMPONENTS.md` listing individual reusable components

## 🚀 Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/harir03/frontend_copied.git
   cd frontend_copied
   ```

2. Navigate to any website folder and follow its README:
   ```bash
   cd fintech/recursive
   npm install
   npm run dev
   ```

## 🤝 Contributing

1. Pick a website to recreate
2. Create a folder under the appropriate category
3. Build the recreation with clean, readable code
4. Add a `README.md` with attribution and setup instructions
5. Submit a PR!

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📋 Site Index

| Portfolio | [The Design Society](portfolio/thedesignsociety/) | [https://www.thedesignsociety.fr/](https://www.thedesignsociety.fr/) | HTML5 + CSS3 + GSAP + Lenis | ✅ Complete ([Local Demo](http://localhost:5173/)) |
| AI / ML | [Heron AI](ai-ml/heronai/) | [https://heronaiapp.com/](https://heronaiapp.com/) | HTML5 + Webflow CSS + GSAP + Lenis + Swiper | ✅ Complete ([Local Demo](http://localhost:3000/)) |
| Fintech | [Recursive](fintech/recursive/) | [https://recursive.money/](https://recursive.money/) | React + Vite + TailwindCSS + TanStack Router | ✅ Complete |
| Portfolio | [Hello Monday](portfolio/hellomonday/) | [https://www.hellomonday.com/](https://www.hellomonday.com/) | Pixi.js + WebGL + GSAP + Three.js | ✅ Complete ([Local Demo](http://localhost:3001/)) |
| Portfolio | [Alan Menken](portfolio/alanmenken/) | [https://www.alanmenken.com/](https://www.alanmenken.com/) | HTML5 + CSS3 + GSAP + Audio Sync | ✅ Complete ([Local Demo](http://localhost:3002/)) |
| Media / App | [Don't Look Up](media/dontlookup/) | [https://www.dontlookup.app/](https://www.dontlookup.app/) | Interactive Canvas / WebGL | ⏳ Queued |
| Portfolio | [Emotion Agency](portfolio/emotionagency/) | [https://emotion-agency.com/](https://emotion-agency.com/) | Next.js / React + GSAP | ⏳ Queued |


---

## 🔬 Motion Forensics & Reverse Engineering Toolkit

To guarantee **1:1 fidelity**—where every animation, spring easing, and cursor interaction moves like butter—this repository integrates a forensic reverse-engineering pipeline powered by specialized agent skills in [`.agents/skills`](.agents/skills):

| Tool / Skill | Capability | Motion Parity Function |
|--------------|------------|------------------------|
| **`ui-reverse-engineering`** | Full-pipeline URL reverse engineering | Extracts live DOM structure, computed CSS, web assets, and motion parameters directly from deployed runtimes. |
| **`reverse-engineer-anything` (REA)** | Decompilation & AST bundle analysis | Analyzes compiled JavaScript bundles, Webpack/Vite chunks, and recovers unminified component logic and timing configs. |
| **`ui-capture`** | High-speed multi-state visual capture | Captures multi-breakpoint viewports (desktop, tablet, mobile), scroll trajectories, hover sweeps, and interaction clips. |
| **`visual-debug`** | Automated pixel & transition diffing | Computes Absolute Error (AE) and Structural Similarity (SSIM) across live reference and local implementation frames. |
| **`benchmark`** | Parity scorecard & layout verification | Runs automated gate checks (`GATE_ORDER`) ensuring strict boundary, font, and motion parity before sign-off. |

### Butter-Smooth Animation Standards:
1. **Zero Guesswork Curves**: Exact easing curves extracted via `CustomEase` snapshots or runtime bezier equations (e.g. `cubic-bezier(0.16, 1, 0.3, 1)`).
2. **Scroll-Driven Sync**: Native `Lenis` or `ScrollTrigger` scrub synchronization with clamped scroll progress and pin anchors.
3. **Responsive Cursor Physics**: Fluid lerping (`0.08` to `0.15` factor) with velocity transforms and state mutations.
4. **Hardware Acceleration**: Explicit `transform: translate3d(...)` and `will-change` utilization for stutter-free 60fps renders.


## ⚖️ License

MIT — see [LICENSE](LICENSE) for details.

## ⚠️ Disclaimer

This project is for **educational purposes only**. All recreations are original code written from scratch, inspired by the visual design of public websites. No proprietary code, assets, or trademarks are used. Original brand names are referenced solely for attribution.
