import FooterMap from "@/components/map/map-footer";
import HeaderMap from "@/components/map/map-header";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[url('/map/background.jpg')] bg-cover bg-center text-gray-900">
      <HeaderMap />
      <main className="min-h-screen">{children}</main>
      <FooterMap />
    </div>
  );
}
