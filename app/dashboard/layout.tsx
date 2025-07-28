import Footer from "@/components/dashboard/footer";
import Header from "@/components/dashboard/header";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#FAFDF6] text-gray-900 overflow-x-hidden min-h-screen">
      <Header />
      <main className="min-h-screen px-6 py-8">{children}</main>
      <Footer />
    </div>
  );
}
