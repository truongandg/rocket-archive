import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "outline" | "ghost";
}

export default function Button({
  children,
  className = "",
  variant = "outline",
  type = "button",
  ...props
}: ButtonProps) {
  const variantClass = variant === "outline"
    ? "border border-white text-white hover:bg-white hover:text-black"
    : "text-white/60 hover:text-white";

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center transition disabled:cursor-wait disabled:opacity-50 ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
