import SavedEmpty from "@/app/assets/images/svgs/saved-empty.svg";
import { Button } from "@/components/ui/button";

const MarketPlaceItemsEmptyState: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center mt-20">
      <SavedEmpty />
      <p className="text-xl font-medium text-[#222222] mt-8 mb-2">
        Looks like no market item(s) yet
      </p>
      <p className="text-[#737373] text-sm mb-8">
        Browse items and tap the heart to save what you love!
      </p>
    
    </section>
  );
};

export default MarketPlaceItemsEmptyState;
