import ItemListing from "@/app/(main)/item-listing/_components/index";
import Footer from "@/components/shared/footer";

export default function ItemListingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <ItemListing />
      </div>
      <Footer />
    </div>
  );
}
