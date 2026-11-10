# Component & Asset Inventory: Extrafazant

## 1. Typography & Tokens
- **Grotesque Heading & UI**: `Inter`, `-apple-system`, `Helvetica Now`, sans-serif
- **Expressive Cursive / Editorial Accent**: `Instrument Serif` / `Serrif Subset` italic (`heading-alt`)
- **Brand Palette**:
  - Studio Off-White: `#F4F4F4`
  - Obsidian Noir: `#101010`
  - Electric Blue: `#0038FF`
  - Hot Pink: `#FF77CD`
  - Butter Yellow: `#FEE897`
  - Neon Orange: `#FF5F04`
  - Crimson Athletic: `#D82234`

## 2. Interactive Systems & Architecture
- `CursorCardsHero`: Interactive hero with mouse-tracking floating media card that rotates with velocity and cycles case studies.
- `PinnedStackDeck`: 3D perspective stacked card deck with rotating badge and smooth deck peeling transitions.
- `MomentumTeamGrid`: Physics-based team card grid with angular torque on pointer entry and elastic spring decay.
- `InteractiveCollage`: Proximity repulsion collage with layered multi-plane cards.
- `CustomMarqueeCursor`: Capsule follower cursor that expands into an infinite marquee on hoverable targets.

## 3. FOCO Matrix Verification
| Component | Purpose | Resemblance | Interaction / Motion | Status |
|---|---|---|---|---|
| Cursor Cards Hero | Velocity tilt & cycling preview card | 100% | quickTo velocity lerp & case swap | PASS |
| 3D Pinned Stack Deck | Layered case study carousel | 100% | 3D depth z-offsets & deck peel | PASS |
| Momentum Team Grid | Physics card hover with inertia | 100% | Entry velocity torque & elastic return | PASS |
| Client Logo Marquee | Infinite partner credentials | 100% | Smooth linear scroll loop | PASS |
| DrawSVG Underline Links | Animated hover line under text | 100% | Crisp CSS/SVG expansion | PASS |

