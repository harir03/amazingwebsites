# 🏗️ Heron AI — Frontend Recreation

A faithful 1:1 recreation of the official **[Heron AI](https://heronaiapp.com/)** website ("Works inside your design tools"), featuring architectural brutalist layouts, technical drafting crosshair cursors, interactive isometric SVG drawings, Lenis smooth scrolling, and pinned GSAP ScrollTrigger timelines.

## 🔗 Attribution
- **Original Live Site**: [https://heronaiapp.com/](https://heronaiapp.com/)
- **Category**: AI / ML & Architecture / CAD Automation
- **Design Agency**: Bearplus Agency (Awwwards Site of the Day)

---

## 🛠️ Tech Stack & Motion Engine
- **Core**: HTML5, Vanilla JavaScript (ES Modules)
- **Styling**: Webflow Shared CSS + Bespoke Drafting Grid Typography (`BT Grotesk`, `Geist Mono`)
- **Animation Engine**: GreenSock GSAP 3.12.5 (ScrollTrigger, SplitText, TextPlugin)
- **Smooth Scrolling**: Lenis Smooth Scroll 1.1.5
- **Carousels**: Swiper 11 (Partner logo marquee, workflow cards)
- **Tooling**: Vite 5

---

## 📐 Sections & Interactive Features
1. **Header & Navigation**: Fixed technical drafting bar with isometric 3D logo mark, hover pills, and "Contact Us" CTA.
2. **Hero Section**: Architectural elevation drawing with corner crosshairs (`+`), millimeter ruler ticks, and custom crosshair cursor lines.
3. **Intro Section**: Brutalist tower sketch with orange solar disc, client logo marquee carousel, and CAD integrations banner.
4. **Problem Section (`4-Grid`)**:
   - `[01] MANUAL`: Cylinder through isometric plane
   - `[02] DISJOINTED`: Sphere on cube
   - `[03] BLIND`: Circle around cube
   - `[04] SLOW`: Offset isometric planes with animated stroke-dash draw
5. **Workflow Map Section**: Numbered CAD inspection steps (`01` to `04`).
6. **Platform Section**: Pinned horizontal card scrub (*"RIGHT THERE WITH YOU"*).
7. **Why Heron Section**: Pinned card sequence (*"BUILT TO WORK THE WAY YOU DO"*).
8. **Use Cases Section**: Interactive architectural discipline selector (Architects, Interior Designers, Landscape Architects, Engineers, BIM Managers).
9. **CTA Section**: High-contrast brutalist call to action (*"SEE WHAT HERON CAN DO IN YOUR MODEL"*).
10. **Technical Footer**: Detailed site directory and drafting metadata.

---

## 🚀 Running Locally

```bash
cd ai-ml/heronai
npm install
npm run dev
```

Server runs by default on `http://localhost:3000/`.
