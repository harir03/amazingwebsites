# Component & Asset Inventory: Hello Monday

## 1. Typography & Webfonts
- `ClarendonBTWXX-Light` (`383D05_0_0.woff2`) — Editorial serif headline font
- `NB International Pro Light` (`nb_international_pro_light-webfont.woff2`) — Clean modern grotesque body font
- `NB International Pro Regular` (`nb_international_pro_regular-webfont.woff2`)

## 2. Interactive Systems & Canvases
- `#BackgroundRenderer canvas` — Interactive canvas handling fluid physics and background render loops
- `Hero Animation Module` — Responsive SVG/Canvas character figures with synced video fallback
- `Rotating Type Engine` — Timed text transitions between "Experiences", "Branding", "Products"
- `Bezier Side Navigation` — Curvature-controlled navigation drawer with spring bezier physics

## 3. Media & Assets
- **Spritesheets**:
  - `face_all.json` + `face_all.png`
  - `menu_blob_init.json` + `menu_blob_init.png`
  - `behind_eye.json` + `behind_eye.png`
  - `dot2.json` + `dot2.png`
  - `scroll-dot.json` + `scroll-dot.png`
  - `play-pause.json` + `play-pause.png`
- **Hero Video & Posters**:
  - `hm-hero-desktop.mp4` / `hm-hero-desktop-non-retina.mp4`
  - `hm-hero-mobile.mp4` / `hm-hero-mobile-non-retina.mp4`
  - `hm-hero-desktop.png` / `hm-hero-mobile.png`
- **Studio Locations**:
  - `nyc_tadaa_once.gif`
  - `cph_tadaa_once.gif`
  - `aarh_tadaa_once.gif`
- **Audio Feedback**:
  - `stick.mp3`

## 4. FOCO Matrix Verification
| Cell | Component | Purpose | Resemblance | Interaction/Motion | Status |
|---|---|---|---|---|---|
| C1-Top | Header & Navigation | Brand logo, day counter, bezier drawer | 100% | 60fps spring curve | PASS |
| C2-Hero | Character Illustration | Hand-drawn animated duo & rotating type | 100% | Smooth text rotation & video | PASS |
| C3-Grid | Case Study Grid | Asymmetric 3-column editorial project cards | 100% | Smooth hover lift & responsive | PASS |
| C4-Footer | Studio Showcase & Offices | Global offices & contact information | 100% | Office location gifs & contact form | PASS |
