import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLibraryStore } from "../../store/favorites";
import type { Rocket } from "../../types/rocket";
import CollectionPicker from "../collection/CollectionPicker";
import Button from "../ui/Button";
import StatusBadge from "../ui/StatusBadge";
import RocketImage from "./RocketImage";

interface RocketCardProps {
  rocket: Rocket;
}

function successRate(rocket: Rocket) {
  if (!rocket.total_launch_count || rocket.successful_launches === null)
    return "—";
  return `${Math.round((rocket.successful_launches / rocket.total_launch_count) * 100)}%`;
}

export default function RocketCard({ rocket }: RocketCardProps) {
  const favouriteRocketIds = useLibraryStore(
    (state) => state.favouriteRocketIds,
  );
  const toggleFavouriteRocket = useLibraryStore(
    (state) => state.toggleFavouriteRocket,
  );
  const favourite = favouriteRocketIds.includes(rocket.id);
  const manufacturer =
    rocket.manufacturer?.abbreviation ||
    rocket.manufacturer?.name ||
    "UNKNOWN MANUFACTURER";
  const family = rocket.families[0]?.name;

  return (
    <article className="group relative overflow-hidden border border-white/15 bg-[#090909] transition-colors hover:border-white/50">
      <Link
        to={`/rockets/${rocket.id}`}
        className="block"
        aria-label={`View ${rocket.full_name || rocket.name}`}
      >
        <div className="relative h-44 overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_50%_0%,#3f3f3f,transparent_65%)]">
            <RocketImage
              src={rocket.image?.image_url}
              className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
            />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] to-transparent" />
          <div className="absolute bottom-4 left-5 flex gap-2">
            <StatusBadge tone={rocket.active ? "success" : "neutral"}>
              {rocket.active ? "ACTIVE" : "INACTIVE"}
            </StatusBadge>
            <StatusBadge tone={rocket.reusable ? "info" : "neutral"}>
              {rocket.reusable ? "REUSABLE" : "EXPENDABLE"}
            </StatusBadge>
          </div>
        </div>
        <div className="px-5 pb-5 pt-5">
          <p className="text-[10px] font-semibold tracking-[.15em] text-white/45">
            {manufacturer.toUpperCase()}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-.03em]">
            {rocket.name.toUpperCase()}
          </h3>
          <p className="mt-1 min-h-4 text-xs text-white/45">
            {family ? `${family.toUpperCase()} FAMILY` : rocket.full_name}
          </p>
          <div className="mt-6 grid grid-cols-3 border-t border-white/15 pt-4 text-[10px] font-semibold tracking-[.1em]">
            <div>
              <span className="block text-white/40">LAUNCHES</span>
              <span className="mt-1 block">
                {rocket.total_launch_count ?? "—"}
              </span>
            </div>
            <div>
              <span className="block text-white/40">SUCCESS</span>
              <span className="mt-1 block">
                {rocket.successful_launches ?? "—"}
              </span>
            </div>
            <div>
              <span className="block text-white/40">RATE</span>
              <span className="mt-1 block">{successRate(rocket)}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute right-4 top-4 flex gap-2">
        <CollectionPicker rocketId={rocket.id} rocketName={rocket.name} />
        <Button
          onClick={() => toggleFavouriteRocket(rocket.id)}
          aria-label={
            favourite
              ? `Remove ${rocket.name} from favourites`
              : `Add ${rocket.name} to favourites`
          }
          className="h-9 w-9 border-white/30 bg-black/40 p-0"
        >
          <Heart size={16} fill={favourite ? "currentColor" : "none"} />
        </Button>
      </div>
    </article>
  );
}
