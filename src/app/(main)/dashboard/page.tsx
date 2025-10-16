"use client";

import { Button } from "@/components/ui/button";
import { FC } from "react";
import { HOT_PICKS } from "@/app/mocks/hot-picks";
import {
  useGetItemByRaterHotPick,
  useGetRecommendedItems,
  useGetElectronicsItems,
} from "@/app/_hooks/queries/swap";
import Marketplace from "@/components/shared/marketplace";

const Dashboard: FC = () => {
  const { isLoading: isLoadingHotPicks, data } = useGetItemByRaterHotPick({
    enabler: true,
  });
  const { isLoading: isLoadingRecommendedItems, data: recommendedItems } =
    useGetRecommendedItems({ enabler: true });
  const { isLoading: isLoadingElectronicsItems, data: electronicsItems } =
    useGetElectronicsItems({ enabler: true });

  return (
    <section>
      <div
        className={`bg-[url(../app/assets/images/pngs/onboarding_bg.png)] bg-cover bg-no-repeat h-[calc(100vh-82px)] bg-top flex flex-col items-center justify-center`}
      >
        <div className="max-w-[839px] w-full mx-auto">
          <h1 className="text-[#2A2A2A] mb-8 text-[80px] font-medium text-center">
            E-commerce Without Cash
          </h1>
          <p className="text-2xl text-[#737373] text-center">
            The dormant item in your hand could get you a useful item in
            someone’s home
          </p>
          <Button
            variant={"default"}
            className="mx-auto mt-8 rounded-full font-medium text-sm py-2 !px-[11px] flex items-center gap-2 !h-auto w-fit"
            size={"lg"}
          >
            Swap Now
            <span className="bg-white w-7 h-7 rounded-full"></span>
          </Button>
        </div>
      </div>
      <div className="ms-24 mt-[70px]">
        <div className="my-8 flex flex-col gap-12">
          <Marketplace
            title="FEATURED"
            subtitle="Hot Picks, Fast Swaps."
            description="Discover trending items that everyone wants — swap quick"
            products={data || HOT_PICKS}
            isLoading={isLoadingHotPicks}
          />
          <Marketplace
            title="FEATURED"
            subtitle="Swaps Just for You."
            description="Our spotlight trades are secure, high-value, and worth every click."
            products={recommendedItems || HOT_PICKS}
            isLoading={isLoadingRecommendedItems}
          />
          <Marketplace
            title="OUR RECOMMENDATION"
            subtitle="Advanced Tech Gadgets"
            description="Our spotlight trades are secure, high-value, and worth every click."
            products={electronicsItems || HOT_PICKS}
            isLoading={isLoadingElectronicsItems}
            showSliderArrows
          />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
