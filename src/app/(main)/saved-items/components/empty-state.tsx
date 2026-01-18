import { PATHS } from "@/app/_constants/paths";
import SavedEmpty from "@/app/assets/images/svgs/saved-empty.svg";
import Link from "next/link";

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
      <Link
        href={`${PATHS.CATEGORY}`}
        className="rounded-full font-medium text-sm py-3 px-10 w-fit bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        Go to Marketplace
      </Link>
    </section>
  );
};

export default SavedItemsEmptyState;
