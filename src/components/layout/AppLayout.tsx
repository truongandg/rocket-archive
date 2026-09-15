import type { ReactNode } from "react";
import Header from "./Header";

interface AppLayoutProps {
  children: ReactNode;
}
export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>{children}</main>
    </div>
  );
}
