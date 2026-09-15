import type { Launch } from "../../types/launch";

interface RocketLaunchHistoryProps {
  launches: Launch[];
}

function formatDate(net: string | null) {
  if (!net) return "DATE TBD";
  return new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short", year: "numeric" })
    .format(new Date(net))
    .toUpperCase();
}

export default function RocketLaunchHistory({ launches }: RocketLaunchHistoryProps) {
  if (!launches.length) {
    return <p className="border-t border-white/15 py-10 text-xs font-semibold tracking-[.15em] text-white/40">NO RELATED LAUNCHES AVAILABLE</p>;
  }

  return (
    <div className="border-t border-white/15">
      {launches.map((launch) => (
        <article key={launch.id} className="grid gap-3 border-b border-white/10 py-5 md:grid-cols-[1.5fr_.7fr_.9fr_1fr] md:items-center">
          <div><h3 className="text-sm font-semibold">{launch.name}</h3><p className="mt-1 text-[10px] font-semibold tracking-[.13em] text-white/40">{launch.mission?.type || "MISSION"}</p></div>
          <p className="text-xs text-white/60">{formatDate(launch.net)}</p>
          <p className="text-xs text-white/60">{launch.status?.name || "STATUS TBD"}</p>
          <p className="text-xs leading-relaxed text-white/45">{launch.pad?.name || launch.launch_service_provider?.name || "LOCATION TBD"}</p>
        </article>
      ))}
    </div>
  );
}
