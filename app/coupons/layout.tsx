import Footer from "@/components/dashboard/footer";
import Header from "@/components/dashboard/header";
import { ReactNode } from "react";

export default function CouponsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAFDF6] text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
