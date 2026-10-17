import Footer from "@/components/shared/footer";
import SavedItems from "./components";

export default function SavedItemsPage() {
  return (
    <div className="flex flex-col min-h-screen mt-20 md:mt-0">
      <div className="flex flex-1">
        <SavedItems />
      </div>
      <Footer />
    </div>
  );
}
