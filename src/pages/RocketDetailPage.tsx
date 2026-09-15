import RocketLoader from "../components/ui/RocketLoader";
import { ArrowLeft, Heart } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import CollectionPicker from "../components/collection/CollectionPicker";
import RocketLaunchHistory from "../components/rocket/RocketLaunchHistory";
import RocketImage from "../components/rocket/RocketImage";
import Button from "../components/ui/Button";
import useRocket from "../hooks/useRocket";
import useRocketLaunches from "../hooks/useRocketLaunches";
import { useLibraryStore } from "../store/favorites";

function displayValue(value: number | string | null | undefined) {
  return value ?? "—";
}

function successRate(successful: number | null, total: number | null) {
  if (!total || successful === null) return "—";
  return `${Math.round((successful / total) * 100)}%`;
}

export default function RocketDetailPage() {
  const { id } = useParams();
  const rocketId = Number(id);
  const favouriteRocketIds = useLibraryStore(
    (state) => state.favouriteRocketIds,
  );
  const toggleFavouriteRocket = useLibraryStore(
    (state) => state.toggleFavouriteRocket,
  );
  const rocketQuery = useRocket(rocketId);
  const launchesQuery = useRocketLaunches(rocketId);

  if (!Number.isInteger(rocketId) || rocketId < 1)
    return <Navigate to="/" replace />;

  if (rocketQuery.isLoading)
    return (
      <div className="mx-auto max-w-[1600px] px-8 py-24 lg:px-12">
        <RocketLoader label="Loading rocket..." />
      </div>
    );

  if (rocketQuery.isError || !rocketQuery.data)
    return (
      <div className="mx-auto max-w-[1600px] px-8 py-24 lg:px-12">
        <p className="text-xl font-semibold">UNABLE TO LOAD ROCKET</p>
        <Link
          to="/"
          className="mt-6 inline-block border border-white px-5 py-3 text-[10px] font-bold tracking-[.16em] hover:bg-white hover:text-black"
        >
          RETURN TO EXPLORER
        </Link>
      </div>
    );

  const rocket = rocketQuery.data;
  const favourite = favouriteRocketIds.includes(rocket.id);
  const stats = [
    ["TOTAL LAUNCHES", displayValue(rocket.total_launch_count)],
    ["SUCCESSFUL", displayValue(rocket.successful_launches)],
    ["FAILED", displayValue(rocket.failed_launches)],
    ["PENDING", displayValue(rocket.pending_launches)],
    [
      "SUCCESS RATE",
      successRate(rocket.successful_launches, rocket.total_launch_count),
    ],
    ["CURRENT STREAK", displayValue(rocket.consecutive_successful_launches)],
  ];

  return (
    <div>
      <section className="relative min-h-[420px] overflow-hidden border-b border-white/15 md:min-h-[500px]">
        <div className="absolute inset-0 bg-[#111]">
            <RocketImage
              src={rocket.image?.image_url}
              className="h-full w-full object-cover opacity-70"
            />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/15" />
        </div>
        <div className="relative mx-auto max-w-[1600px] px-8 py-16 lg:px-12 lg:py-24">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[.16em] text-white/60 hover:text-white"
          >
            <ArrowLeft size={15} /> BACK TO EXPLORER
          </Link>
          <div className="mt-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-semibold tracking-[.26em] text-white/50">
                {rocket.manufacturer?.name?.toUpperCase() || "LAUNCH VEHICLE"}
              </p>
              <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-[-.05em] md:text-7xl">
                {rocket.full_name || rocket.name}
              </h1>
              <p className="mt-5 text-sm font-medium tracking-[.12em] text-white/60">
                {rocket.families[0]?.name?.toUpperCase() ||
                  "ROCKET CONFIGURATION"}
                {rocket.variant ? ` · ${rocket.variant.toUpperCase()}` : ""} ·{" "}
                {rocket.active ? "ACTIVE" : "INACTIVE"} ·{" "}
                {rocket.reusable ? "REUSABLE" : "EXPENDABLE"}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <CollectionPicker
                rocketId={rocket.id}
                rocketName={rocket.name}
                label
                className="h-12"
              />
              <Button
                onClick={() => toggleFavouriteRocket(rocket.id)}
                className="h-12 gap-3 px-5 text-[10px] font-bold tracking-[.16em]"
              >
                <Heart size={16} fill={favourite ? "currentColor" : "none"} />
                {favourite ? "FAVOURITED" : "ADD TO FAVOURITES"}
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-[1600px] px-8 py-16 lg:px-12 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <p className="text-[10px] font-semibold tracking-[.25em] text-white/45">
              OVERVIEW
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              {rocket.description ||
                "No technical overview is available for this launcher configuration."}
            </p>
            <div className="mt-12 grid grid-cols-2 gap-px border border-white/15 bg-white/15 sm:grid-cols-3">
              {stats.map(([label, value]) => (
                <div key={label} className="bg-black p-5">
                  <p className="text-[10px] font-semibold tracking-[.12em] text-white/40">
                    {label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-.03em]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <aside>
            <p className="text-[10px] font-semibold tracking-[.25em] text-white/45">
              SPECIFICATIONS
            </p>
            <dl className="mt-5 border-t border-white/15 text-sm">
              {[
                ["MAIDEN FLIGHT", rocket.maiden_flight],
                [
                  "LEO CAPACITY",
                  rocket.leo_capacity
                    ? `${rocket.leo_capacity.toLocaleString()} KG`
                    : null,
                ],
                [
                  "GTO CAPACITY",
                  rocket.gto_capacity
                    ? `${rocket.gto_capacity.toLocaleString()} KG`
                    : null,
                ],
                [
                  "LAUNCH MASS",
                  rocket.launch_mass
                    ? `${rocket.launch_mass.toLocaleString()} KG`
                    : null,
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 border-b border-white/15 py-4"
                >
                  <dt className="text-[10px] font-semibold tracking-[.12em] text-white/40">
                    {label}
                  </dt>
                  <dd className="text-right text-white/80">
                    {displayValue(value as string | number | null)}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 text-[10px] font-semibold tracking-[.25em] text-white/45">
              LANDING RECORD
            </p>
            <dl className="mt-5 border-t border-white/15 text-sm">
              {[
                ["ATTEMPTED", rocket.attempted_landings],
                ["SUCCESSFUL", rocket.successful_landings],
                ["FAILED", rocket.failed_landings],
                ["CURRENT STREAK", rocket.consecutive_successful_landings],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 border-b border-white/15 py-4"
                >
                  <dt className="text-[10px] font-semibold tracking-[.12em] text-white/40">
                    {label}
                  </dt>
                  <dd className="text-right text-white/80">
                    {displayValue(value as string | number | null)}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
        <section className="mt-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-semibold tracking-[.25em] text-white/45">
                RELATED MISSIONS
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">
                LAUNCH HISTORY
              </h2>
            </div>
            {launchesQuery.isFetching && !launchesQuery.isLoading && (
              <p className="text-[10px] font-semibold tracking-[.14em] text-white/40">
                LOADING HISTORY...
              </p>
            )}
          </div>
          {launchesQuery.isLoading ? (
            <RocketLoader label="Loading launch history..." />
          ) : launchesQuery.isError ? (
            <p className="border-t border-white/15 py-10 text-xs font-semibold tracking-[.15em] text-white/40">
              UNABLE TO LOAD LAUNCH HISTORY
            </p>
          ) : (
            <RocketLaunchHistory launches={launchesQuery.data || []} />
          )}
        </section>
      </div>
    </div>
  );
}
