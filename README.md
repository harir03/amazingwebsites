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

| Category | Site | Tech Stack | Status |
|----------|------|------------|--------|
| Fintech | [Recursive](fintech/recursive/) | React + Vite + TailwindCSS + TanStack Router | ✅ Complete |

## ⚖️ License

MIT — see [LICENSE](LICENSE) for details.

## ⚠️ Disclaimer

This project is for **educational purposes only**. All recreations are original code written from scratch, inspired by the visual design of public websites. No proprietary code, assets, or trademarks are used. Original brand names are referenced solely for attribution.
