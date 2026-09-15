import RocketLaunchIcon from "./RocketLaunchIcon";

interface RocketLoaderProps {
  label?: string;
  className?: string;
}

export default function RocketLoader({
  label = "Loading rockets...",
  className = "",
}: RocketLoaderProps) {
  return (
    <div
      role="status"
      className={`flex flex-col items-center justify-center gap-3 py-8 ${className}`}
    >
      <RocketLaunchIcon />
      <span className="text-center text-[10px] font-semibold uppercase tracking-[.18em] text-white/60">
        {label}
      </span>
    </div>
  );
}
