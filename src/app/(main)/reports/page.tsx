import Footer from "@/components/shared/footer";
import ReportsPage from "./_components";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen mt-20 md:mt-0">
      <div className="flex flex-1">
        <ReportsPage />
      </div>
      <Footer />
    </div>
  );
}
