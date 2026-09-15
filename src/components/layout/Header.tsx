import { Heart } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "EXPLORE", to: "/" },
  { label: "COLLECTIONS", to: "/collections" },
];
export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-sm">
      {" "}
      <div className="mx-auto flex h-24 max-w-[1600px] items-center justify-between px-8 lg:px-12">
        {" "}
        <NavLink
          to="/"
          className="text-xl font-extrabold tracking-[-0.04em] text-white"
        >
          {" "}
          LAUNCHVAULT{" "}
        </NavLink>{" "}
        <nav className="flex items-center gap-10">
          {" "}
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-[11px] font-semibold tracking-[0.18em] transition-colors ${isActive ? "text-white" : "text-white/60 hover:text-white"}`
              }
            >
              {" "}
              {item.label}{" "}
            </NavLink>
          ))}{" "}
          <NavLink
            to="/collections"
            aria-label="Favourite launches"
            className="text-white/70 transition-colors hover:text-white"
          >
            {" "}
            <Heart size={18} strokeWidth={1.5} />{" "}
          </NavLink>{" "}
        </nav>{" "}
      </div>{" "}
    </header>
  );
}
