"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { Search, Filter } from "lucide-react";
import { HOT_PICKS } from "@/app/mocks/hot-picks";
import {
  useGetItemByRaterHotPick,
  useGetRecommendedItems,
  useGetElectronicsItems,
} from "@/app/_hooks/queries/listing/listing";
import Marketplace from "@/components/shared/marketplace";
import useIsMobile from "@/app/_hooks/useIsMobile";
import Banner from "@/app/assets/images/pngs/mobile_ad.png";
import { Auth } from "@/app/_config/auth";
import { useGetUserInfo } from "@/app/_hooks/queries/auth/auth";

const Dashboard: FC = () => {
  const isMobile = useIsMobile();
  const isAuthenticated = Auth.isAuthenticated();
  const { data: userData, isLoading, isError, error } = useGetUserInfo({
    enabler: isAuthenticated,
  });
  const userId = userData?.result?.id;
  const { isLoading: isLoadingHotPicks, data } = useGetItemByRaterHotPick({
    enabler: true,
    userId: userId || undefined,
  });
  const { isLoading: isLoadingRecommendedItems, data: recommendedItems } = useGetRecommendedItems({ enabler: true, userId: userId || undefined  });
  const { isLoading: isLoadingElectronicsItems, data: electronicsItems } = useGetElectronicsItems({ enabler: true, userId: userId || undefined  });

  return (
    <section>
      {!isMobile ? (
        <div
          className={`bg-[url(../app/assets/images/pngs/onboarding_bg.png)] bg-cover bg-no-repeat h-[calc(100vh-82px)] bg-top flex flex-col items-center justify-center`}
        >
          <div className="max-w-[839px] w-full mx-auto">
            <h1 className="text-[#2A2A2A] mb-8 text-[80px] font-medium text-center">E-commerce Without Cash</h1>
            <p className="text-2xl text-[#737373] text-center">
              The dormant item in your hand could get you a useful item in someone’s home
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
      ) : (
        <>
          <div className="px-4 mt-3">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 border border-gray-200">
              <Search className="h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="What are you looking for?"
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 px-3 text-sm"
              />
              <Filter className="h-5 w-5 text-gray-500" />
            </div>
          </div>

          {/* Hero Banner */}
          <Image src={Banner} className="px-4 py-4" alt="banner" />
        </>
      )}
      <div className="w-[90%] mx-auto">
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
