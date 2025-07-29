import FooterFeatured from "@/components/featured-projects/featured-footer";
import HeaderFeatured from "@/components/featured-projects/featured-header";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[url('/featured-projects/background.png')] bg-cover bg-center text-gray-900">
      <HeaderFeatured />
      <main className="min-h-screen">{children}</main>
      <FooterFeatured />
    </div>
  );
}
