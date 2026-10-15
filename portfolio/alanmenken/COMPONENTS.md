# Component & Asset Inventory: Alan Menken

## 1. Typography & Webfonts
- `Clearface ITC W01` — Elegant storybook editorial serif font, embedded as Base64 WOFF in `bundle-07fa906a73.css`

## 2. Interactive Systems & Architecture
- `LoadingBlocker` & `SoundUpMessage` — Entrance splash with animated stroke logo drawing
- `LandingVideoContainer` — Synchronized video/audio introduction with mute/unmute control and skip functionality
- `SelectedWorksModule` — 10-column interactive musical strips with GSAP hover expansions and cross-fading video previews
- `ViewModeSwitch` — Bottom pill switcher toggling between accordion strip view and gallery grid view
- `NewsSidebar` — Bell icon sliding news drawer with latest updates and awards

## 3. Media Assets
- **Video Previews**:
  - `_FINAL_CUT_LANDSCAPE_withTEXT_2_VBR.mp4` & `_FINAL_CUT_PORTRAIT_withTEXT_1.mp4`
  - High-definition single and multi strips for all 10 featured works
- **SVG Controls**:
  - `playIcon.svg`
  - `video-sound.svg`
  - `video-no-sound.svg`
  - `video-play.svg`
  - `video-pause.svg`

## 4. FOCO Matrix Verification
| Cell | Component | Purpose | Resemblance | Interaction/Motion | Status |
|---|---|---|---|---|---|
| C1-Splash | Audio Prompt & Signature | Turn on sound notice & handwritten signature | 100% | Smooth fade and stroke draw | PASS |
| C2-Intro | Cinematic Story Opener | Aladdin carpet flight & score | 100% | Synced audio & skip action | PASS |
| C3-Accordion | 10-Strip Musical Accordion | Featured works expansion & video previews | 100% | 60fps accordion hover physics | PASS |
| C4-Controls | Audio & Mode Switcher | Volume toggle, strip/grid toggle, 42 works | 100% | Responsive click & state sync | PASS |
