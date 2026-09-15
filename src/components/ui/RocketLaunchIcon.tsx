import { useId } from "react";

interface RocketLaunchIconProps {
  className?: string;
}

export default function RocketLaunchIcon({
  className = "h-20 w-16 overflow-hidden",
}: RocketLaunchIconProps) {
  const flameId = useId();

  return (
      <svg
        viewBox="0 0 120 140"
        aria-hidden="true"
        className={className}
        fill="none"
      >
        <g className="rocket-loader-stars" stroke="currentColor" strokeOpacity=".25" strokeLinecap="round">
          <path d="M22 20v12 M96 45v18 M31 85v8 M88 105v12" />
        </g>
        <g className="rocket-loader-ship">
          <path
            className="rocket-loader-exhaust"
            d="M53 84Q49 105 60 124Q71 105 67 84Z"
            fill={`url(#${flameId})`}
          />
          <path d="M46 60 35 77v12l13-7 M74 60l11 17v12l-13-7" fill="#171717" stroke="white" strokeWidth="2" strokeLinejoin="round" />
          <path d="M60 18Q40 37 47 79h26Q80 37 60 18Z" fill="#0a0a0a" stroke="white" strokeWidth="2" />
          <path d="M49 38h22 M49 79v6h22v-6" stroke="white" strokeWidth="2" />
          <circle cx="60" cy="53" r="6" stroke="white" strokeWidth="2" />
        </g>
        <defs>
          <linearGradient id={flameId} x1="60" y1="84" x2="60" y2="124" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset=".4" stopColor="#fb923c" />
            <stop offset="1" stopColor="#fb923c" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
  );
}
