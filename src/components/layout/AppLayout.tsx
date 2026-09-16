import { Analytics } from "@vercel/analytics/react";
import { useLayoutEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";

interface AppLayoutProps {
  children: ReactNode;
}
export default function AppLayout({ children }: AppLayoutProps) {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>{children}</main>
      <Analytics />
    </div>
  );
}
