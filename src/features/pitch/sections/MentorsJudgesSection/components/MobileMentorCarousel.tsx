export const MobileMentorCarousel = () => {
  const futureScopes = [
    {
      seat: "Lorem 01",
      title: "Lorem Ipsum Dolor",
      category: "Consectetur Adipiscing",
      status: "Active",
      metric: "100% Lorem",
      imageSrc: "/images/roadmap/satellite_crop.jpg",
    },
    {
      seat: "Lorem 02",
      title: "Sed Do Eiusmod",
      category: "Tempor Incididunt",
      status: "Prototyping",
      metric: "0 KB",
      imageSrc: "/images/roadmap/zk_enclave.jpg",
    },
    {
      seat: "Lorem 03",
      title: "Labore Et Dolore",
      category: "Magna Aliqua",
      status: "Planned",
      metric: "< 60s",
      imageSrc: "/images/roadmap/ondc_invoice.jpg",
    },
    {
      seat: "Lorem 04",
      title: "Ut Enim Ad Minim",
      category: "Veniam Quis Nostrud",
      status: "Pipeline",
      metric: "22 Modules",
      imageSrc: "/images/roadmap/dialect_audio.jpg",
    },
    {
      seat: "Lorem 05",
      title: "Exercitation Ullamco",
      category: "Laboris Nisi Ut",
      status: "Planned",
      metric: "10 Daily",
      imageSrc: "/images/roadmap/micro_pension.jpg",
    },
    {
      seat: "Lorem 06",
      title: "Commodo Consequat",
      category: "Duis Aute Irure",
      status: "Review",
      metric: "6 Corridors",
      imageSrc: "/images/roadmap/diaspora_inflow.jpg",
    },
    {
      seat: "Lorem 07",
      title: "Dolor In Reprehenderit",
      category: "Voluptate Velit",
      status: "Active",
      metric: "Parity 1.0",
      imageSrc: "/images/roadmap/fair_lending.jpg",
    },
    {
      seat: "Lorem 08",
      title: "Cillum Dolore Eu",
      category: "Fugiat Nulla Pariatur",
      status: "Verified",
      metric: "< 35ms",
      imageSrc: "/images/roadmap/graviton_edge.jpg",
    },
    {
      seat: "Lorem 09",
      title: "Excepteur Sint Occaecat",
      category: "Cupidatat Non Proident",
      status: "Planned",
      metric: "1,200+ Nodes",
      imageSrc: "/images/roadmap/enwr_warehouse.jpg",
    },
  ];

  return (
    <div className="block md:hidden w-full overflow-hidden py-4">
      <div className="flex gap-4 overflow-x-auto pb-4 pt-2 px-4 no-scrollbar snap-x snap-mandatory">
        {futureScopes.map((m, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-[240px] aspect-[4/5] rounded-2xl bg-gradient-to-b from-stone-900/95 to-stone-950 p-5 flex flex-col justify-between border border-lime-900/40 snap-center shadow-lg relative overflow-hidden text-left"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={m.imageSrc}
                alt={m.title}
                className="w-full h-full object-cover opacity-25 filter grayscale contrast-125"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />
            </div>

            {/* Top Tag & Status */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold tracking-wider text-lime-400 bg-lime-950/60 px-2 py-0.5 rounded-full border border-lime-800/40">
                {m.seat}
              </span>
              <span className="text-[10px] font-mono text-stone-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {m.status}
              </span>
            </div>

            {/* Content Body */}
            <div className="relative z-10 flex flex-col gap-1.5 mt-auto">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                {m.category}
              </span>
              <h3 className="font-headingNow text-lg font-bold text-stone-100 leading-snug">
                {m.title}
              </h3>
              <div className="mt-2 pt-2 border-t border-stone-800/80 flex items-center justify-between">
                <span className="text-[10px] font-mono text-stone-500">Metric</span>
                <span className="text-xs font-mono font-bold text-lime-300">{m.metric}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
