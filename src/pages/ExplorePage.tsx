import RocketExplorer from "../components/rocket/RocketExplorer";

export default function ExplorePage() {
  return (
    <div>
      <section className="relative flex min-h-[220px] items-end overflow-hidden md:min-h-[260px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=2400&q=80"
            alt="Rocket launch"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-8 pb-7 lg:px-12 lg:pb-9">
          <p className="mb-3 text-[10px] font-medium tracking-[0.3em] text-white/60">
            LAUNCH VEHICLE DATABASE
          </p>

          <h1 className="max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-white md:text-6xl">
            EXPLORE ROCKETS
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
            A technical archive of the machines that carry missions beyond
            Earth.
          </p>
        </div>
      </section>
      <RocketExplorer />
    </div>
  );
}
