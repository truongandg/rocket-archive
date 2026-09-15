import MissionExplorer from "../components/launch/MissionExplorer";

export default function ExplorePage() {
  return (
    <div>
      <section className="relative flex min-h-[calc(100vh-6rem)] items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=2400&q=80"
            alt="Rocket launch"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-8 pb-20 lg:px-12 lg:pb-28">
          <p className="mb-5 text-xs font-medium tracking-[0.3em] text-white/60">
            SPACEX MISSION ARCHIVE
          </p>

          <h1 className="max-w-4xl text-6xl font-semibold leading-[0.95] tracking-[-0.05em] text-white md:text-8xl">
            EXPLORE
            <br />
            THE LAUNCHES.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/60">
            Discover SpaceX missions, save your favourites, and build your
            personal collection.
          </p>
        </div>
      </section>
      <MissionExplorer />
    </div>
  );
}
