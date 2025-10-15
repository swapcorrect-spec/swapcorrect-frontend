"use client";
import "react-multi-carousel/lib/styles.css";
import Herosection from "@/components/shared/herosection";
import Navbar from "@/components/shared/navbar";
import { HOT_PICKS } from "./mocks/hot-picks";
import Marketplace from "@/components/shared/marketplace";
import {
  useGetItemByRaterHotPick,
  useGetRecommendedItems,
  useGetElectronicsItems,
} from "./_hooks/queries/dashboard-features";
import { Auth } from "./_config/auth";

export default function Home() {
  const { isLoading: isLoadingHotPicks, data } = useGetItemByRaterHotPick({
    enabler: true,
  });
  const { isLoading: isLoadingRecommendedItems, data: recommendedItems } =
    useGetRecommendedItems({ enabler: true });
  const { isLoading: isLoadingElectronicsItems, data: electronicsItems } =
    useGetElectronicsItems({ enabler: true });
  const isAuthenticated = Auth.isAuthenticated();

  return (
    <div>
      <Navbar />
      <Herosection />
      <div className="my-8">
        <div className="w-[90%] right-0 absolute gap-12 flex flex-col">
          <Marketplace
            title="FEATURED"
            subtitle="Hot Picks, Fast Swaps."
            description="Discover trending items that everyone wants — swap quick"
            products={data || HOT_PICKS}
            isLoading={isLoadingHotPicks}
            isAuthenticated={isAuthenticated}
          />
          <Marketplace
            title="FEATURED"
            subtitle="Swaps Just for You."
            description="Our spotlight trades are secure, high-value, and worth every click."
            products={recommendedItems || HOT_PICKS}
            isLoading={isLoadingRecommendedItems}
            isAuthenticated={isAuthenticated}
          />
          <Marketplace
            title="OUR RECOMMENDATION"
            subtitle="Advanced Tech Gadgets"
            description="Our spotlight trades are secure, high-value, and worth every click."
            products={electronicsItems || HOT_PICKS}
            showSliderArrows
            isLoading={isLoadingElectronicsItems}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </div>
    </div>
  );
}
