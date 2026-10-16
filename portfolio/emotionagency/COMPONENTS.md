# Component & Asset Inventory: Emotion Agency

## 1. Typography & Webfonts
- `EmotionSerif-Light.woff2` & `EmotionSerif-LightItalic.woff2` — Custom high-fashion editorial serif display typography
- `PPNeueMontreal-Medium.woff2` — Clean modern Swiss grotesque for primary navigation, CTAs, and headlines
- `IBMPlexMono-Medium-Latin1.woff2` — Monospaced technical labels, coordinates, dates, and specifications

## 2. Interactive Systems & Architecture
- `AppLoader` — Fullscreen entrance gate with animated progress bar, percentage readout, and audio preference prompt
- `ThreeMasterRenderer` — Unified WebGL pipeline orchestrating `HeroScene`, `HomeScene`, `AboutScene`, and `ProjectsScene`
- `ComputeParticles` — Off-thread worker simulation (`particleWorker-ys4WGYTu.js`) driving 100k+ morphing particles
- `StorytellingSection` — Lenis-driven multi-stage scroll choreography pinning hero screens (`hero-1`, `hero-2`, `hero-3`, `hero-4`)
- `FloatingDock` — Glassmorphic bottom navigation capsule with fluid morphing settings menu and AI assistant bubble
- `AudioEngine` — Howler-powered dual-format audio pipeline with volume curves, spatial fading, and interactive sound cues

## 3. 3D Binary & Texture Assets
- **GLTF/GLB Models**:
  - `office.glb` (3.17 MB)
  - `chair.glb` (286 KB)
  - `mountain.glb` (137 KB)
  - `duck.glb` (36 KB)
  - `e.glb` (9.7 KB)
  - Industry awards: `codrops.glb`, `be.glb`, `cssda.glb`, `ca.glb`, `awwwards.glb`
- **Compressed KTX2 Textures & Maps**:
  - Grass LODs: `grassbushcc008.ktx2`, `grassbushcc005.ktx2`, `grassbushcc006.ktx2`
  - Oak bark PBR maps: `oak_color_1k.ktx2`, `oak_normal_1k.ktx2`, `oak_roughness_1k.ktx2`, `oak_ao_1k.ktx2`
  - Water normal maps: `Water_1_M_Normal.jpg`, `Water_2_M_Normal.jpg`

## 4. FOCO Matrix Verification
| Cell | Component | Purpose | Resemblance | Interaction/Motion | Status |
|---|---|---|---|---|---|
| C1-Loader | AppLoader & Gate | Preload progress & audio entrance prompt | 100% | Smooth progress bar & fade | PASS |
| C2-Hero | Particle "e" & Water | Morphing particles & low-poly mountain reflection | 100% | Real-time 60fps physics | PASS |
| C3-Story | Storytelling Screens | Scroll-driven narrative transitions (Hero 1-4) | 100% | Lenis smooth scroll scrub | PASS |
| C4-Dock | Glass Navigation Dock | Settings pill, AI assistant trigger, and route links | 100% | Responsive hover & popups | PASS |
| C5-Audio | Multi-Channel Audio | Ambient soundtrack & interaction sound fx | 100% | Synced sound cues | PASS |
