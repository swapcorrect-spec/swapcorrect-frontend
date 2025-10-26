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
} from "./_hooks/queries/listing/listing";
import { Auth } from "./_config/auth";
import { PATHS } from "./_constants/paths";
import { redirect } from "next/navigation";
import Footer from "@/components/shared/footer";

export default function Home() {
  const { isLoading: isLoadingHotPicks, data } = useGetItemByRaterHotPick({
    enabler: true,
  });
  const { isLoading: isLoadingRecommendedItems, data: recommendedItems } = useGetRecommendedItems({ enabler: true });
  const { isLoading: isLoadingElectronicsItems, data: electronicsItems } = useGetElectronicsItems({ enabler: true });
  const isAuthenticated = Auth.isAuthenticated();
  if (isAuthenticated) {
    redirect(`${PATHS.DASHBOARD}`);
  }
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Herosection />
        <div className="flex-1 flex justify-end">
          <div className="my-8 w-[90%] ml-auto mr-10 gap-12">
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
              title="OUR RECOMMENDATIONs"
              subtitle="Advanced Tech Gadgets"
              description="Our spotlight trades are secure, high-value, and worth every click."
              products={electronicsItems || HOT_PICKS}
              showSliderArrows
              isLoading={isLoadingElectronicsItems}
              isAuthenticated={isAuthenticated}
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
