import { Heart } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "EXPLORE", to: "/" },
  { label: "COLLECTIONS", to: "/collections" },
];
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-black/30 backdrop-blur-2xl supports-[backdrop-filter]:bg-black/20">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-3 px-4 sm:h-24 sm:px-8 lg:px-12">
        <NavLink
          to="/"
          className="shrink-0 whitespace-nowrap text-sm font-extrabold tracking-[-0.04em] text-white sm:text-xl"
        >
          ROCKET ARCHIVE
        </NavLink>
        <nav aria-label="Main navigation" className="flex items-center gap-4 sm:gap-10">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `inline-flex min-h-11 items-center text-[10px] font-semibold tracking-[0.08em] transition-colors sm:text-[11px] sm:tracking-[0.18em] ${isActive ? "text-white" : "text-white/60 hover:text-white"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/collections"
            aria-label="Favourite rockets"
            className="hidden text-white/70 transition-colors hover:text-white sm:inline-flex"
          >
            <Heart size={18} strokeWidth={1.5} />
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
