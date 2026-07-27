"use client";
import "react-multi-carousel/lib/styles.css";
import Herosection from "@/components/shared/herosection";
import Navbar from "@/components/shared/navbar";
// import { HOT_PICKS } from "./mocks/hot-picks";
import Marketplace from "@/components/shared/marketplace";
import {
  useGetItemByRaterHotPick,
  useGetRecommendedItems,
  useGetElectronicsItems,
} from "./_hooks/queries/listing/listing";
import { PATHS } from "./_constants/paths";
import { useRouter } from "next/navigation";
import Footer from "@/components/shared/footer";
import useIsMobile from "./_hooks/useIsMobile";
import MobileNavbar from "@/components/shared/mobile-navbar";
import { IProduct } from "@/interface/IProduct";
import { useAuth } from "@/app/_context/auth-context";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated, isHydrated } = useAuth();
  const router = useRouter();
  const { isLoading: isLoadingHotPicks, data } = useGetItemByRaterHotPick({
    enabler: true,
  });
  const { isLoading: isLoadingRecommendedItems, data: recommendedItems } = useGetRecommendedItems({
    enabler: true,
  });
  const { isLoading: isLoadingElectronicsItems, data: electronicsItems } = useGetElectronicsItems({
    enabler: true,
  });
  const isMobile = useIsMobile();
  const loggedIn = isHydrated && isAuthenticated;

  useEffect(() => {
    if (loggedIn) {
      router.replace(`${PATHS.DASHBOARD}`);
    }
  }, [loggedIn, router]);

  if (loggedIn) {
    return null;
  }
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {isMobile ? <MobileNavbar /> : <Navbar isOpen={true} />}
        {!isMobile && <Herosection />}
        <div className="w-[90%] mx-auto">
          <div className="my-8">
            <Marketplace
              title="FEATURED"
              subtitle="Hot Picks, Fast Swaps."
              description="Discover trending items that everyone wants — swap quick"
              products={data as IProduct[]}
              isLoading={isLoadingHotPicks}
              isAuthenticated={loggedIn}
            />
            <Marketplace
              title="FEATURED"
              subtitle="Swaps Just for You."
              description="Our spotlight trades are secure, high-value, and worth every click."
              products={recommendedItems as IProduct[]}
              isLoading={isLoadingRecommendedItems}
              isAuthenticated={loggedIn}
            />
            <Marketplace
              title="OUR RECOMMENDATIONs"
              subtitle="Advanced Tech Gadgets"
              description="Our spotlight trades are secure, high-value, and worth every click."
              products={electronicsItems as IProduct[]}
              showSliderArrows
              isLoading={isLoadingElectronicsItems}
              isAuthenticated={loggedIn}
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
