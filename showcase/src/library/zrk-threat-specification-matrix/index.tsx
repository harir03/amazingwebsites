/**
 * Threat Dynamics & Interceptor Matrix — ZIRKA (ZRK Technology)
 * Military defense specification comparison contrasting threat drone dynamics
 * with counter-UAS interceptor capabilities.
 */
export default function ThreatSpecificationMatrix() {
  return (
    <div className="w-full bg-[#0A0C0E] text-white p-8 sm:p-12 rounded-3xl border border-[#1C242C] select-none">
      <div className="mb-8">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00F0FF]">
          Comparative Defense Dynamics
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mt-1">
          Written by the threat itself
        </h2>
        <p className="text-sm sm:text-base text-[#7B8B9B] max-w-lg mt-2">
          Exacting physical flight parameters Zirka was engineered to counter during nightly mass saturation attacks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Threat Card */}
        <div className="bg-[#11151A] border border-[#1C242C] border-t-4 border-t-[#E53E3E] rounded-2xl p-6 sm:p-8">
          <div className="inline-block bg-[#E53E3E]/15 text-[#FC8181] font-mono text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            Threat Profile // UAS Shahed-136
          </div>
          <h3 className="text-2xl font-black mb-6">Geran-2 Platform</h3>

          <div className="space-y-3 font-mono text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-[#1C242C]/80">
              <span className="text-[#7B8B9B]">Cruise Velocity</span>
              <span className="font-bold">180 – 195 km/h</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#1C242C]/80">
              <span className="text-[#7B8B9B]">Payload Warhead</span>
              <span className="font-bold">50 kg high explosive</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#1C242C]/80">
              <span className="text-[#7B8B9B]">Operating Ceiling</span>
              <span className="font-bold">50m to 3,500m</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#1C242C]/80">
              <span className="text-[#7B8B9B]">Navigation System</span>
              <span className="font-bold">Inertial + multi-GNSS</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#7B8B9B]">Tactical Threat</span>
              <span className="text-[#FC8181] font-bold">Infrastructure attrition</span>
            </div>
          </div>
        </div>

        {/* Countermeasure Interceptor Card */}
        <div className="bg-[#11151A] border border-[#1C242C] border-t-4 border-t-[#FF5500] rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(255,85,0,0.08)]">
          <div className="inline-block bg-[#FF5500]/15 text-[#FF5500] font-mono text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            Countermeasure // Zirka System
          </div>
          <h3 className="text-2xl font-black mb-6">Zirka Interceptor</h3>

          <div className="space-y-3 font-mono text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-[#1C242C]/80">
              <span className="text-[#7B8B9B]">Kinetic Overmatch</span>
              <span className="text-[#FF5500] font-bold">240+ km/h (superiority margin)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#1C242C]/80">
              <span className="text-[#7B8B9B]">Terminal Guidance</span>
              <span className="text-[#00F0FF] font-bold">AI Optical + Thermal Seeker</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#1C242C]/80">
              <span className="text-[#7B8B9B]">Engagement Launch</span>
              <span className="font-bold">&lt; 45s from alert</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#1C242C]/80">
              <span className="text-[#7B8B9B]">Swarm Mesh</span>
              <span className="font-bold">Autonomous multi-target</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#7B8B9B]">Cost Efficiency</span>
              <span className="text-[#00FF66] font-bold">100% Sustainable Defense</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

