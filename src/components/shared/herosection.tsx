"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Hero_RightOne from "@/app/assets/images/pngs/right_1.png";
import Hero_RightTwo from "@/app/assets/images/pngs/right_2.png";
import Hero_LeftOne from "@/app/assets/images/pngs/left_1.png";
import Hero_LeftTwo from "@/app/assets/images/pngs/left_2.png";
import Circle from "@/app/assets/images/pngs/circle.png";
import { PATHS } from "@/app/_constants/paths";
import { useEffect } from "react";
import {
  ArrowRight,
  ArrowRightLeft,
  Lock,
  Repeat,
  Search,
  ShieldCheck,
  Sparkles,
  Tag,
  TrendingUp,
  Zap,
} from "lucide-react";

const Herosection = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(`/${PATHS.LOGIN}`);
  }, [router]);

  const handleNavigate = () => {
    router.push(`/${PATHS.LOGIN}`);
  };

  const handleGetStarted = () => {
    router.push(PATHS.SIGNUP);
  };

  const handleBrowse = () => {
    router.push(PATHS.CATEGORY);
  };

  return (
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
            <p className="text-sm font-bold text-slate-100">Vintage Dunks</p>
            <p className="text-xs text-slate-400">Est. Value: $120</p>
          </div>
        </div>

        {/* Right Item Card */}
        <div className="hidden lg:flex absolute right-8 xl:right-16 top-1/4 rotate-6 items-center gap-3 bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl shadow-2xl backdrop-blur-xl animate-pulse [animation-delay:1000ms]">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-2xl">
            🎸
          </div>
          <div>
            <div className="flex items-center gap-1 text-[10px] font-medium text-emerald-400 uppercase tracking-wider">
              <span>Looking For</span>
            </div>
            <p className="text-sm font-bold text-slate-100">Acoustic Guitar</p>
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
            <span className="text-slate-200 font-semibold">1,420+ Swaps</span> completed this week
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
            The cashless thrift marketplace. Swap unused clothes, gear, and collectibles directly
            with people near you—no high fees, no cash needed.
          </p>

          {/* Central Trade Visual Component */}
          <div className="pt-2 pb-4">
            <div className="inline-flex items-center justify-between gap-3 sm:gap-6 bg-slate-900/90 border border-slate-800/80 p-2.5 sm:p-3.5 rounded-2xl shadow-2xl backdrop-blur-md max-w-sm sm:max-w-md w-full">
              <div className="flex items-center gap-2.5 text-left">
                <span className="text-2xl">🧥</span>
                <div>
                  <p className="text-[10px] uppercase text-slate-400 font-semibold">Your Closet</p>
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
                  <p className="text-[10px] uppercase text-slate-400 font-semibold">Their Shelf</p>
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
  );
};

export default Herosection;
