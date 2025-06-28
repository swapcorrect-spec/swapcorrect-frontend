import SavedEmpty from "@/app/assets/images/svgs/saved-empty.svg";
import { Button } from "@/components/ui/button";

const SavedItemsEmptyState: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center mt-20">
      <SavedEmpty />
      <p className="text-xl font-medium text-[#222222] mt-8 mb-2">
        Looks like you haven’t saved anything yet
      </p>
      <p className="text-[#737373] text-sm mb-8">
        Browse items and tap the heart to save what you love!
      </p>
      <Button
        variant={"default"}
        className="rounded-full font-medium text-sm py-3 px-10 w-fit"
        size={"lg"}
      >
        Go to Marketplace
      </Button>
    </section>
  );
};

export default SavedItemsEmptyState;
