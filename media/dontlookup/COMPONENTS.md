# Component & Asset Inventory: Don't Look Up

## 1. Typography & Webfonts
- `Marsipan-Regular.woff2` — Handcrafted display title face, loaded as block display
- `luckiest-guy-latin.woff2` & `luckiest-guy-latin-ext.woff2` — Supporting punchy cartoon headline face
- `nunito-latin.woff2` & `nunito-latin-ext.woff2` — Variable-weight body face (400–800) for high legibility at micro-sizes

## 2. Interactive Systems & Architecture
- `GameStage (Three.js)` — High-performance 3D canvas with ambient lighting, directional shadows, and depth testing
- `CrowdEngine` — Dynamic agent loop managing citizen awareness, looking-up vectors, and speech bubbles
- `DistractionLauncher` — Radial & toolbar launchers for dropping props (`tv`, `ball`, `cat`, `dance`, `news`, `priest`, `coach`)
- `CoinLedger` — Top hud tracking accumulated wealth, money per second, and countdown timer
- `AlarmBanner` — Emergency alert system triggering when crowd organization reaches critical thresholds
- `WebAudioSynthesizer` — In-browser audio oscillator array producing procedural procedural sound effects

## 3. 3D Binary & Vector Assets
- **GLTF/GLB Models**:
  - `giant.glb` (10.7 MB)
  - `prop_tv.glb` (2.1 MB)
  - `prop_cat.glb` (1.4 MB)
  - `prop_ball.glb` (314 KB)
- **UI & Brand Assets**:
  - `wordmark.png`, `coin.png`, `coin3d.png`, `cursor_lens.png`
  - Action card covers: `tv.jpg`, `ball.jpg`, `cat.jpg`, `dance.jpg`, `news.jpg`, `coach.jpg`, `priest.jpg`, `trainer.jpg`
  - Step illustrations: `new_yellow.png`, `new_blue.png`, `new_red.png`, `up.jpg`, `pay.jpg`, `distract.jpg`, `believers.jpg`, `colours.jpg`

## 4. FOCO Matrix Verification
| Cell | Component | Purpose | Resemblance | Interaction/Motion | Status |
|---|---|---|---|---|---|
| C1-Title | Marsipan Wordmark & Pile | Introductory branding & falling coin loader | 100% | CSS 3D coin drop physics | PASS |
| C2-Stage | Three.js World & Crowd | 3D field, the Giant, and wandering citizens | 100% | 60fps real-time camera & flocking | PASS |
| C3-HUD | Wealth & Looking-Up Meter | Live score, coin rate, and danger status | 100% | Reactive numerical updates | PASS |
| C4-Props | Distraction Inventory | Cards and placing mechanics | 100% | Raycast placement & physics bounce | PASS |
| C5-Audio | Web Audio Synth | SFX for coins, placings, and crowd alerts | 100% | Real-time oscillator tone generation | PASS |
