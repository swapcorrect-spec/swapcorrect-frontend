import ItemsEmpty from "@/app/assets/images/svgs/empty_listing.svg";
import { Button } from "@/components/ui/button";

const ItemsListingEmptyState: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center mt-20">
      <ItemsEmpty />
      <p className="text-xl font-medium text-[#222222] mt-8 mb-2">
        You haven't listed any items yet
      </p>
      <p className="text-[#737373] text-sm mb-8">
        Start listing items you want to swap with others
      </p>
      <Button
        variant={"default"}
        className="rounded-full font-medium text-sm py-3 px-10 w-fit"
        size={"lg"}
      >
        Create New Listing +
      </Button>
    </section>
  );
};

export default ItemsListingEmptyState;
