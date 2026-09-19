"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  ArrowRightLeft,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Repeat,
  ArrowRight,
  Zap,
  Tag,
  Lock,
} from "lucide-react";
import { HOT_PICKS } from "@/app/mocks/hot-picks";
import {
  useGetItemByRaterHotPick,
  useGetRecommendedItems,
  useGetElectronicsItems,
} from "@/app/_hooks/queries/listing/listing";
import Marketplace from "@/components/shared/marketplace";
import useIsMobile from "@/app/_hooks/useIsMobile";
import Banner from "@/app/assets/images/pngs/mobile_ad.png";
import { useAuth } from "@/app/_context/auth-context";
import { useGetUserInfo } from "@/app/_hooks/queries/auth/auth";
import { IProduct } from "@/interface/IProduct";
import { PATHS } from "@/app/_constants/paths";

const HomePage: FC = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { isAuthenticated, isHydrated } = useAuth();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace(`/${PATHS.LOGIN}`);
    }
  }, [isHydrated, isAuthenticated, router]);

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useGetUserInfo({
    enabler: isHydrated && isAuthenticated,
  });
  const userId = userData?.result?.id;
  const { isLoading: isLoadingHotPicks, data } = useGetItemByRaterHotPick({
    enabler: true,
    userId: userId || undefined,
  });
  const { isLoading: isLoadingRecommendedItems, data: recommendedItems } = useGetRecommendedItems({
    enabler: true,
    userId: userId || undefined,
  });
  const { isLoading: isLoadingElectronicsItems, data: electronicsItems } = useGetElectronicsItems({
    enabler: true,
    userId: userId || undefined,
  });

  const handleBrowse = () => {
    router.push(PATHS.CATEGORY);
  };

  return (
    <section>
      {!isMobile ? (
        // <div
        //   className={`bg-[url(../app/assets/images/pngs/onboarding_bg.png)] bg-cover bg-no-repeat h-[calc(100vh-82px)] bg-top flex flex-col items-center justify-center`}
        // >
        //   <div className="max-w-[839px] w-full mx-auto">
        //     <h1 className="text-[#2A2A2A] mb-8 text-[80px] font-medium text-center">
        //       E-commerce Without Cash
        //     </h1>
        //     <p className="text-2xl text-[#737373] text-center">
        //       The dormant item in your hand could get you a useful item in someone’s home
        //     </p>
        //     <Button
        //       variant={"default"}
        //       className="mx-auto mt-8 rounded-full font-medium text-sm py-2 !px-[11px] flex items-center gap-2 !h-auto w-fit"
        //       size={"lg"}
        //     >
        //       Swap Now
        //       <span className="bg-white w-7 h-7 rounded-full"></span>
        //     </Button>
        //   </div>
        // </div>
        <>
          <div className="relative min-h-[calc(100vh-82px)] w-full bg-slate-950 text-white overflow-hidden flex flex-col justify-center items-center py-5 px-4">
            {/* Dynamic Background Gradients & Mesh Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#007AFF]/20 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-10 -right-20 w-[30rem] h-[30rem] bg-emerald-500/15 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[20rem] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

            {/* Floating Interactive Trade Mockups (Desktop Only) */}
            {/* Left Item Card */}
            <div className="hidden lg:flex absolute left-8 xl:left-16 top-1/3 -rotate-6 items-center gap-3 bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl shadow-2xl backdrop-blur-xl animate-pulse">
              <div className="w-12 h-12 rounded-xl bg-[#007AFF]/10 border border-[#007AFF]/20 flex items-center justify-center text-2xl">
                👟
              </div>
              <div>
                <div className="flex items-center gap-1 text-[10px] font-medium text-[#007AFF] uppercase tracking-wider">
                  <span>Trading Off</span>
                </div>
                <p className="text-sm font-bold text-slate-100">Adidas</p>
                <p className="text-xs text-slate-400">Est. Value: ₦20,000</p>
              </div>
            </div>

            {/* Right Item Card */}
            <div className="hidden lg:flex absolute right-8 xl:right-16 top-1/4 rotate-6 items-center gap-3 bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl shadow-2xl backdrop-blur-xl animate-pulse [animation-delay:1000ms]">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-2xl">
                💼
              </div>
              <div>
                <div className="flex items-center gap-1 text-[10px] font-medium text-emerald-400 uppercase tracking-wider">
                  <span>Looking For</span>
                </div>
                <p className="text-sm font-bold text-slate-100">Vantage Bag</p>
                <p className="text-xs text-slate-400">Mint Condition</p>
              </div>
            </div>

            {/* Main Hero Container */}
            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
              {/* Social Proof / Live Activity Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-inner text-xs font-medium text-slate-300">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-slate-200 font-semibold">1,420+ Swaps</span> completed this
                week
                <span className="text-slate-600">|</span>
                <span className="flex items-center gap-1 text-[#007AFF]">
                  <Zap className="w-3 h-3 fill-[#007AFF]" /> Zero Cash Required
                </span>
              </div>

              {/* Title */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05]">
                Trade What You{" "}
                <span className="bg-gradient-to-r from-[#007AFF] via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Have
                </span>{" "}
                <br className="hidden sm:inline" />
                For What You{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
                  Want
                </span>
                .
              </h1>

              {/* Pitch Copy */}
              <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
                The cashless thrift marketplace. Swap unused clothes, gear, and collectibles
                directly with people near you—no high fees, no cash needed.
              </p>

              {/* Central Trade Visual Component */}
              <div className="pt-2 pb-4">
                <div className="inline-flex items-center justify-between gap-3 sm:gap-6 bg-slate-900/90 border border-slate-800/80 p-2.5 sm:p-3.5 rounded-2xl shadow-2xl backdrop-blur-md max-w-sm sm:max-w-md w-full">
                  <div className="flex items-center gap-2.5 text-left">
                    <span className="text-2xl">🧥</span>
                    <div>
                      <p className="text-[10px] uppercase text-slate-400 font-semibold">
                        Your Closet
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-slate-200">Denim Jacket</p>
                    </div>
                  </div>

                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#007AFF] to-emerald-500 p-[1px] flex items-center justify-center shrink-0">
                    <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                      <ArrowRightLeft className="w-4 h-4 text-slate-200" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-right justify-end">
                    <div>
                      <p className="text-[10px] uppercase text-slate-400 font-semibold">
                        Their Shelf
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-slate-200">Vinyl Player</p>
                    </div>
                    <span className="text-2xl">📻</span>
                  </div>
                </div>
              </div>

              {/* Call To Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* Updated Primary CTA Button */}
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-full font-bold text-base py-4 px-8 h-auto bg-[#007AFF] hover:bg-[#0062cc] text-white shadow-lg shadow-blue-500/25 hover:scale-[1.02] transition-all duration-200"
                  onClick={handleBrowse}
                >
                  <Repeat className="w-4 h-4 mr-2 text-white" />
                  <span>Browse Marketplace</span>
                </Button>

                {/* <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto rounded-full font-bold text-base py-4 px-8 h-auto bg-[#007AFF] hover:bg-[#0062cc] text-white shadow-lg shadow-blue-500/25 hover:scale-[1.02] transition-all duration-200"
                  onClick={handleBrowse}
                >
                  <Repeat className="w-4 h-4 mr-2 text-slate-400" />
                  <span>Browse Marketplace</span>
                </Button> */}
              </div>

              {/* Value Proposition Footer */}
              <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-slate-400 font-medium border-t border-slate-900/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Escrow Protected Swaps</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#007AFF]" />
                  <span>Verified Fair Exchange</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Instant Local Deals</span>
                </div>
              </div>
            </div>
          </div>
        </>
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
          <Image src={Banner} className="w-full h-auto max-w-full px-4 py-4" alt="banner" />
        </>
      )}
      <div className="w-[90%] max-w-full mx-auto min-w-0">
        <div className="my-8 flex flex-col gap-12">
          <Marketplace
            title="FEATURED"
            subtitle="Hot Picks, Fast Swaps."
            description="Discover trending items that everyone wants — swap quick"
            products={data as IProduct[]}
            isLoading={isLoadingHotPicks}
          />
          <Marketplace
            title="FEATURED"
            subtitle="Swaps Just for You."
            description="Our spotlight trades are secure, high-value, and worth every click."
            products={recommendedItems as IProduct[]}
            isLoading={isLoadingRecommendedItems}
          />
          <Marketplace
            title="OUR RECOMMENDATION"
            subtitle="Advanced Tech Gadgets"
            description="Our spotlight trades are secure, high-value, and worth every click."
            products={electronicsItems as IProduct[]}
            isLoading={isLoadingElectronicsItems}
            showSliderArrows
          />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
