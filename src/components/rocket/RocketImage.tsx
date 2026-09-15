import { Rocket } from "lucide-react";
import { useState } from "react";

interface RocketImageProps {
  src?: string | null;
  className?: string;
}

export default function RocketImage({ src, className }: RocketImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || src === failedSrc) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_0%,#3f3f3f,transparent_65%)]" aria-hidden="true">
        <Rocket size={40} strokeWidth={1} className="text-white/30" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      className={className}
      onError={() => setFailedSrc(src)}
    />
  );
}
