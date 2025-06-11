import RatingsEmpty from "@/app/assets/images/svgs/ratings_empty.svg";
import { Button } from "@/components/ui/button";

const RatingsEmptyState: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center mt-20">
      <RatingsEmpty />
      <p className="text-xl font-medium text-[#222222] mt-8 mb-2">
        You Haven’t Rated or Been Rated Yet
      </p>
      <p className="text-[#737373] text-sm mb-8">
        Complete a swap to unlock your first rating!
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

export default RatingsEmptyState;
