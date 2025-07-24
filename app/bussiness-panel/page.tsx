import { BussinessPanel } from "@/components/bussiness-panel/BussinessPanel";
import { FooterSection } from "@/components/home/footer-section";

export default function BussinessPanelPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <BussinessPanel />
      <FooterSection />
    </div>
  );
}
