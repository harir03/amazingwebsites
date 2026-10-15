# Don't Look Up — Interactive WebGL Game Recreation

A 1:1 forensic recreation of [Don't Look Up](https://www.dontlookup.app/) — a satirical interactive 3D WebGL game about crowd control, attention management, and wealth accumulation.

## 🚀 Live Demo & Development

- **Live URL Reference**: https://www.dontlookup.app/
- **Local Dev Server**: http://localhost:3003/

### Running Locally

```bash
cd media/dontlookup
npm install
npm run dev
```

## 🎮 Game Concept & Architecture

> *"You are very rich, very tall, and standing on quite a lot of people. Keep them distracted and they keep paying. Let them look up, and they push you over."*

1. **Three.js 3D Engine & GLTF Asset Pipeline**:
   - Custom 3D stage featuring the central Giant (`giant.glb`, ~10.7MB) and physics-driven distraction props:
     - `prop_tv.glb` — Television screens hypnotizing crowds
     - `prop_ball.glb` — Playable bouncing balls
     - `prop_cat.glb` — Distracting cats
   - Real-time shadow mapping, camera occlusion calculations, and raycast projectile targeting.

2. **Procedural Crowd Simulation & Flocking**:
   - Simulated swarm intelligence with multi-state crowd agents (wandering, chatting, watching, accusing, organizing, rallying, uprising).
   - Dynamic awareness meters, gaze tracking, and speech bubble projection with frustum culling.

3. **Web Audio Synthesis**:
   - 100% code-synthesized sound effects via the Web Audio API (`AudioContext`) — no external MP3/WAV dependencies.
   - Frequency modulation for clicks, coin clinks, alarm sirens, crowd murmurs, and victory fanfares.

4. **Self-Hosted Design System & Typography**:
   - **Display Typography**: `Marsipan` (custom title face) + `Luckiest Guy`.
   - **Body Typography**: `Nunito` variable font (400–800) optimized for crisp UI readability.
   - Warm paper palette (`#f4f3ef`), deep ink (`#14140f`), and warning red accents.
