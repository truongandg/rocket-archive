import type { ReactNode } from "react";

interface StatusBadgeProps {
  children: ReactNode;
  tone?: "success" | "info" | "neutral";
}

export default function StatusBadge({ children, tone = "neutral" }: StatusBadgeProps) {
  const toneClass = {
    success: "border-[#a8ffbd]/60 bg-black/35 text-[#a8ffbd]",
    info: "border-[#b9dcff]/60 bg-black/35 text-[#b9dcff]",
    neutral: "border-white/25 bg-black/35 text-white/60",
  }[tone];

  return <span className={`border px-2 py-1 text-[9px] font-bold tracking-[.14em] ${toneClass}`}>{children}</span>;
}
