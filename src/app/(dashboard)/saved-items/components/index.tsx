import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import SavedItemsEmptyState from "./empty-state";
import ProductDetails from "@/components/widget/product-details";

const SavedItems: React.FC = () => {
  return (
    <section className="p-6">
      <h6 className="text-[#007AFF] font-medium mb-3 2xl:mb-4 text-xl">
        SAVED SWAPS
      </h6>
      <p className="text-xl font-medium text-[#222222] mb-8">
        All the items you've marked to trade later
      </p>
      <div>
        <div className="max-w-[749px] w-full">
          <Input
            startIcon={<Search />}
            className="w-full !h-9 rounded-lg"
            placeholder="Search items..."
          />
        </div>
      </div>
      <SavedItemsEmptyState />
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <ProductDetails
            imgUrl={
              "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80"
            }
            key={index}
          />
        ))}
      </div>
    </section>
  );
};

export default SavedItems;
