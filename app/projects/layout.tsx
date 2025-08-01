import Header from "@/components/dashboard/header";
import FooterProjects from "@/components/projects/project-footer";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#FAFDF6] text-gray-900 overflow-x-hidden min-h-screen">
      <Header />
      <main className="min-h-screen">{children}</main>
      <FooterProjects />
    </div>
  );
}
