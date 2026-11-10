import { useState, useRef } from "react";

const TEAM = [
  {
    name: "Tom",
    role: "Creative Director & Regie",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    color: "#0038FF",
  },
  {
    name: "Willem",
    role: "Lead Motion Designer",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    color: "#FF77CD",
  },
  {
    name: "Daan",
    role: "Video Producer & DOP",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    color: "#FF5F04",
  },
  {
    name: "Fleur",
    role: "Animation & 3D Artist",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    color: "#FEE897",
  },
];

/**
 * Inertia Momentum Team Cards — Extrafazant
 * Pointer velocity detection calculating entry torque and rotational momentum
 * with an elastic spring-back decay.
 */
export default function MomentumTeamGrid() {
  const [tilts, setTilts] = useState<Record<number, { rx: number; ry: number; rz: number }>>({});
  const entryPosRef = useRef<Record<number, { x: number; y: number }>>({});

  const handlePointerEnter = (idx: number, e: React.PointerEvent<HTMLDivElement>) => {
    entryPosRef.current[idx] = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (idx: number, e: React.PointerEvent<HTMLDivElement>) => {
    const entry = entryPosRef.current[idx];
    if (!entry) return;

    const dx = e.clientX - entry.x;
    const dy = e.clientY - entry.y;
    entryPosRef.current[idx] = { x: e.clientX, y: e.clientY };

    const rx = Math.max(-14, Math.min(14, dy * 0.6));
    const ry = Math.max(-14, Math.min(14, -dx * 0.6));
    const rz = Math.max(-10, Math.min(10, dx * 0.35));

    setTilts((prev) => ({ ...prev, [idx]: { rx, ry, rz } }));
  };

  const handlePointerLeave = (idx: number) => {
    setTilts((prev) => ({ ...prev, [idx]: { rx: 0, ry: 0, rz: 0 } }));
  };

  return (
    <div className="w-full bg-[#EFEFEF] text-[#101010] p-8 sm:p-12 rounded-3xl border border-[#101010]/10 flex flex-col justify-between select-none">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#0038FF]">
            Het Creatieve Team
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-1">
            ABCDEF-<span className="font-serif italic font-normal text-[#0038FF]">Team</span>
          </h2>
        </div>
        <p className="text-sm font-medium text-[#101010]/70 max-w-sm">
          Beweeg je cursor met verschillende snelheden over de teamleden om de fysieke momentum-rotatie te ervaren.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-[1000px]">
        {TEAM.map((member, idx) => {
          const tilt = tilts[idx] || { rx: 0, ry: 0, rz: 0 };
          const isResting = tilt.rx === 0 && tilt.ry === 0 && tilt.rz === 0;

          return (
            <div
              key={member.name}
              onPointerEnter={(e) => handlePointerEnter(idx, e)}
              onPointerMove={(e) => handlePointerMove(idx, e)}
              onPointerLeave={() => handlePointerLeave(idx)}
              className="bg-white rounded-2xl overflow-hidden border border-[#101010]/10 shadow-lg cursor-pointer transform-gpu"
              style={{
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) rotateZ(${tilt.rz}deg)`,
                transition: isResting
                  ? "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s"
                  : "transform 0.1s ease-out, box-shadow 0.2s",
              }}
            >
              <div className="h-60 sm:h-64 bg-gray-200 overflow-hidden relative">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div
                  className="absolute top-3 right-3 w-3 h-3 rounded-full border-2 border-white shadow"
                  style={{ backgroundColor: member.color }}
                />
              </div>

              <div className="p-5">
                <h4 className="text-xl font-extrabold tracking-tight">{member.name}</h4>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#101010]/60 mt-1">
                  {member.role}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

