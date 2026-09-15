import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLibraryStore } from "../../store/favorites";
import type { Rocket } from "../../types/rocket";

interface RocketCardProps {
  rocket: Rocket;
}

function successRate(rocket: Rocket) {
  if (!rocket.totalLaunchCount) return "—";
  return `${Math.round((rocket.successfulLaunches / rocket.totalLaunchCount) * 100)}%`;
}

export default function RocketCard({ rocket }: RocketCardProps) {
  const favouriteRocketIds = useLibraryStore((state) => state.favouriteRocketIds);
  const toggleFavouriteRocket = useLibraryStore((state) => state.toggleFavouriteRocket);
  const favourite = favouriteRocketIds.includes(rocket.id);

  return (
    <article className="group relative flex min-h-80 flex-col border border-white/15 bg-[#090909] transition-colors hover:border-white/50">
      <Link to={`/rockets/${rocket.id}`} className="absolute inset-0 z-0" aria-label={`View ${rocket.fullName}`} />
      <div className="relative h-44 overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_50%_0%,#3f3f3f,transparent_65%)]">
        {rocket.imageUrl ? <img src={rocket.imageUrl} alt="" className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" /> : <div className="absolute inset-x-0 bottom-6 px-6 text-[10px] font-semibold tracking-[.24em] text-white/40">LAUNCHER CONFIGURATION</div>}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] to-transparent" />
      </div>
      <button type="button" onClick={() => toggleFavouriteRocket(rocket.id)} aria-label={favourite ? `Remove ${rocket.name} from favourites` : `Add ${rocket.name} to favourites`} className="relative z-10 ml-auto mr-4 mt-4 grid h-9 w-9 place-items-center border border-white/25 text-white transition hover:bg-white hover:text-black">
        <Heart size={16} fill={favourite ? "currentColor" : "none"} />
      </button>
      <div className="relative z-10 px-5 pb-5 pt-3">
        <p className="text-[10px] font-semibold tracking-[.15em] text-white/45">{rocket.manufacturer?.name?.toUpperCase() || "UNKNOWN MANUFACTURER"}</p>
        <h3 className="mt-2 text-xl font-semibold tracking-[-.03em]">{rocket.name.toUpperCase()}</h3>
        <p className="mt-1 min-h-4 text-xs text-white/45">{rocket.family || rocket.fullName}</p>
        <div className="mt-6 grid grid-cols-3 border-t border-white/15 pt-4 text-[10px] font-semibold tracking-[.1em]">
          <div><span className="block text-white/40">STATUS</span><span className="mt-1 block">{rocket.active ? "ACTIVE" : "INACTIVE"}</span></div>
          <div><span className="block text-white/40">LAUNCHES</span><span className="mt-1 block">{rocket.totalLaunchCount}</span></div>
          <div><span className="block text-white/40">SUCCESS</span><span className="mt-1 block">{successRate(rocket)}</span></div>
        </div>
      </div>
    </article>
  );
}
