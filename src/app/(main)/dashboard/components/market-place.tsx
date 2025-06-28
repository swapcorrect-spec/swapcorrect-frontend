"use client";

import Marketplace from "@/components/shared/marketplace";
import { HOT_PICKS } from "@/app/mocks/hot-picks";

const MarketPlace: React.FC = () => {
  return (
    <>
      <div className="my-8 flex flex-col gap-12">
        <Marketplace
          title="FEATURED"
          subtitle="Hot Picks, Fast Swaps."
          description="Discover trending items that everyone wants — swap quick"
          products={HOT_PICKS}
        />
        <Marketplace
          title="FEATURED"
          subtitle="Swaps Just for You."
          description="Our spotlight trades are secure, high-value, and worth every click."
          products={HOT_PICKS}
        />
        <Marketplace
          title="OUR RECOMMENDATION"
          subtitle="Advanced Tech Gadgets"
          description="Our spotlight trades are secure, high-value, and worth every click."
          products={HOT_PICKS}
          showSliderArrows
        />
      </div>
    </>
  );
};

export default MarketPlace;
