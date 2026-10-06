import Footer from "@/components/shared/footer";
import SavedItems from "./components";

export default function SavedItemsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <SavedItems />
      </div>
      <Footer />
    </div>
  );
}
