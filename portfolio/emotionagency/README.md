# Emotion Agency Official Website Clone

A 1:1 forensic recreation of [Emotion Agency](https://emotion-agency.com/) — an award-winning creative digital agency website featuring cutting-edge WebGL 3D storytelling, real-time particle simulations, dynamic camera transitions, and synchronized spatial audio.

## 🚀 Live Demo & Development

- **Live URL Reference**: https://emotion-agency.com/
- **Local Dev Server**: http://localhost:3004/

### Running Locally

```bash
cd portfolio/emotionagency
npm install
npm run dev
```

## 🎨 Architectural Highlights

1. **GPGPU Compute Particle Simulation**:
   - Web Worker powered particle generation (`particleWorker-ys4WGYTu.js`) running off-main-thread compute calculations for 100,000+ morphing particles.
   - Dynamic shape transitions synchronized with scroll progress (morphing smoothly between the lowercase "e" brand mark, cubes, rings, spheres, and abstract geometries).
   - Real-time physics with spring stiffness, damping, viscosity, and interactive cursor magnetic repulsion.

2. **Three.js WebGL 3D Landscape & Lighting**:
   - Low-poly mountain ranges (`mountain.glb`), modernist office building (`office.glb`), sakura tree with falling petal particle system, and floating lucky duck (`duck.glb`).
   - Real-time water surface with dual normal map distortion (`Water_1_M_Normal.jpg`, `Water_2_M_Normal.jpg`) and dynamic planar reflection camera (`cN`).
   - Procedural instanced grass field with KTX2 texture LOD streaming (`grassbushcc008.ktx2`, `grassbushcc005.ktx2`, `grassbushcc006.ktx2`) and Draco 3D geometry decompression.

3. **Multi-Track Spatial Audio System**:
   - Atmospheric background soundscapes (`main.webm`, `lofi_loop.webm`, `projects.webm`).
   - Micro-interaction audio feedback (`transition.webm`, `click.webm`, `boom.webm`, `typing.webm`, `dial.webm`, `knob_tick.webm`).
   - Dual entrance experience: interactive "Enter with audio" / "Enter without audio" gate.

4. **Editorial Typography & Design System**:
   - **Display Typography**: `Emotion Serif Light` & `Emotion Serif Light Italic` with variable font axes.
   - **UI & Technical Typography**: `PP Neue Montreal Medium` and `IBM Plex Mono Medium`.
   - Floating glassmorphic dock menu with morphing Apple-style settings blob, AI assistant quick-action drawer, and dark/light theme tokens.
