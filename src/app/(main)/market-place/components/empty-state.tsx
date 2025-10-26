import SavedEmpty from "@/app/assets/images/svgs/saved-empty.svg";
interface MarketPlaceItemsEmptyStateProps {
  title?: string;
  description?: string;
}
const MarketPlaceItemsEmptyState: React.FC<MarketPlaceItemsEmptyStateProps> = ({ title, description }) => {
  return (
    <section className="flex flex-col items-center justify-center text-center mt-20">
      <SavedEmpty />
      <p className="text-xl font-medium text-[#222222] mt-8 mb-2">
      {title || "Looks like no market item(s) yet"}
      </p>
      <p className="text-[#737373] text-sm mb-8">
        {description || "Browse items and tap the heart to save what you love!"}
      </p>
    
    </section>
  );
};

export default MarketPlaceItemsEmptyState;
