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
        <>
          {/* Mobile View: Navbar render */}
          {isMobile && (
            <div className="block md:hidden w-full sticky top-0 z-50">
              <MobileNavbar />
            </div>
          )}

          {/* Desktop View: Full Hero Section + Dark Navbar Wrapper */}
          {!isMobile && (
            <div className="hidden md:flex relative min-h-screen w-full bg-slate-950 text-white overflow-hidden flex-col justify-between items-center pt-0 pb-16">
              {/* Dynamic Background Gradients & Mesh Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:24px_24px]" />
              <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/20 rounded-full blur-[128px] pointer-events-none" />
              <div className="absolute bottom-10 -right-20 w-[30rem] h-[30rem] bg-emerald-500/15 rounded-full blur-[128px] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[20rem] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

              {/* Desktop Navbar */}
              <div className="w-full z-50 sticky top-0">
                <Navbar isOpen={true} />
              </div>

              {/* Hero Content */}
              <Herosection />
            </div>
          )}
        </>
        <div className="w-[90%] max-w-full mx-auto min-w-0">
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
