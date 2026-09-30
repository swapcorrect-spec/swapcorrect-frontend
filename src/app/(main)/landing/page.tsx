import { Button } from "@/components/ui/button";
import {
  Zap,
  Store,
  Search,
  ShieldCheck,
  ArrowRightLeft,
  CheckCircle2,
  RefreshCw,
  Plus,
  Sparkles,
  Lock,
  Repeat,
  ArrowRight,
  Compass,
} from "lucide-react";

const Landing = () => {
  return (
    <>
      <div className="relative min-h-[calc(100vh-82px)] w-full bg-slate-950 text-white flex flex-col justify-center px-4 py-10 overflow-hidden">
        {/* Background Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto w-full space-y-12">
          {/* Header Badge */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-blue-400">
              <Zap className="w-3.5 h-3.5" /> Direct Peer-to-Peer Barter Network
            </span>
            <h1 className="mt-4 text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              One Marketplace. <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Two Ways to Join the Trade.
              </span>
            </h1>
          </div>

          {/* Dual Role Split Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Swapper Card */}
            <div className="relative group p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Store className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400">
                  For Item Owners
                </p>
                <h2 className="text-2xl font-bold text-white">Become a Swapper</h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  List unused clothing, electronics, or gear. Offer items directly for trades and
                  receive swap requests from verified local buyers.
                </p>
              </div>
              <Button
                size="lg"
                className="w-full rounded-2xl font-bold py-6 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
                // onClick={onListItems}
              >
                List an Item to Swap
              </Button>
            </div>

            {/* Visitor Card */}
            <div className="relative group p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Search className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  For Buyers & Collectors
                </p>
                <h2 className="text-2xl font-bold text-white">Browse as Visitor</h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Explore thousands of pre-loved items near you. Propose a cash offer or pitch an
                  item swap whenever you find something you love.
                </p>
              </div>
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-2xl font-bold py-6 border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-200"
                // onClick={onBrowse}
              >
                Explore Listings
              </Button>
            </div>
          </div>

          {/* Footer Trust Bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400 font-medium pt-4">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Escrow Protected Transactions
            </span>
            <span className="flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-blue-400" /> Automated Value-Match Assistant
            </span>
          </div>
        </div>
      </div>
      {/*  */}
      <br />
      <br />
      <div className="relative min-h-[calc(100vh-82px)] w-full bg-slate-950 text-white flex flex-col justify-center px-4 py-12 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto space-y-10 text-center">
          {/* Hero Title */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              Turn Your Idle Goods Into{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Things You Love.
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg">
              Visitors request. Swappers approve. Exchange goods seamlessly with zero middleman
              overhead.
            </p>
          </div>

          {/* Visual 3-Step Swap Node */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800/90 backdrop-blur-xl shadow-2xl max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-6 items-center">
              {/* Step 1 */}
              <div className="flex flex-col items-center space-y-2 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-3xl">📱</span>
                <p className="text-xs font-bold text-blue-400">1. Swapper Posts</p>
                <p className="text-xs text-slate-300 font-medium">iPhone 13 Pro</p>
              </div>

              {/* Step 2 (Exchange Icon) */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-500 p-[1px] flex items-center justify-center animate-spin-slow">
                  <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                    <ArrowRightLeft className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Fair Value Match
                </span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center space-y-2 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-3xl">💻</span>
                <p className="text-xs font-bold text-emerald-400">2. Visitor Offers</p>
                <p className="text-xs text-slate-300 font-medium">MacBook Air M1</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-2xl font-bold px-8 py-6 bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/25"
              // onClick={onGetStarted}
            >
              Start Swapping Now
            </Button>
          </div>

          {/* Micro Features */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4 text-xs font-medium text-slate-400">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" /> Instant Role Upgrades
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> In-App Dispute Handling
            </div>
            <div className="flex items-center justify-center gap-2 col-span-2 md:col-span-1">
              <RefreshCw className="w-4 h-4 text-cyan-400" /> Automated Balance Sweeps
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="relative min-h-[calc(100vh-82px)] w-full bg-[#0B0F17] text-white flex flex-col justify-center px-4 py-12 overflow-hidden">
        {/* High-Intensity Backlight Glows */}
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-[#5850EC]/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#10B981]/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto w-full space-y-10">
          {/* Crisp Header Badge */}
          <div className="text-center space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1F2937] border border-[#374151] text-xs font-bold text-[#F59E0B] uppercase tracking-wider shadow-md">
              <Zap className="w-4 h-4 fill-[#F59E0B]" /> Cashless Barter Marketplace
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
              Trade Your Items. <br />
              <span className="bg-gradient-to-r from-[#6366F1] via-[#38BDF8] to-[#10B981] bg-clip-text text-transparent">
                Zero Cash Required.
              </span>
            </h1>
          </div>

          {/* Dual Role Split Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Swapper Card (Sharp Indigo & Electric Blue) */}
            <div className="relative group p-8 rounded-3xl bg-[#111827] border-2 border-[#1F2937] hover:border-[#6366F1] transition-all duration-300 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#6366F1]/15 border border-[#6366F1]/40 flex items-center justify-center text-[#818CF8]">
                  <Store className="w-7 h-7" />
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-[#818CF8]">
                  Item Owners
                </p>
                <h2 className="text-2xl font-black text-white">Join as Swapper</h2>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  Post your pre-loved sneakers, electronics, or fashion items. Receive direct swap
                  offers and manage trades seamlessly.
                </p>
              </div>
              <Button
                size="lg"
                className="w-full rounded-2xl font-bold py-6 bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-lg shadow-[#4F46E5]/35 hover:scale-[1.01] transition-all"
                // onClick={onListItems}
              >
                List an Item to Swap
              </Button>
            </div>

            {/* Visitor Card (Sharp Emerald & Teal) */}
            <div className="relative group p-8 rounded-3xl bg-[#111827] border-2 border-[#1F2937] hover:border-[#10B981] transition-all duration-300 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center text-[#34D399]">
                  <Search className="w-7 h-7" />
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-[#34D399]">
                  Shoppers & Buyers
                </p>
                <h2 className="text-2xl font-black text-white">Browse as Visitor</h2>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  Discover active listings near you. Offer your own items for a swap or pitch cash
                  offers to verified sellers.
                </p>
              </div>
              <Button
                size="lg"
                className="w-full rounded-2xl font-bold py-6 bg-[#059669] hover:bg-[#047857] text-white shadow-lg shadow-[#059669]/35 hover:scale-[1.01] transition-all"
                // onClick={onBrowse}
              >
                Explore Marketplace
              </Button>
            </div>
          </div>

          {/* High-Contrast Trust Bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-bold text-slate-300 pt-2">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" /> Escrow Secured Trades
            </span>
            <span className="flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-[#818CF8]" /> Fair-Value Trade Assistant
            </span>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="relative min-h-[calc(100vh-82px)] w-full bg-[#0B0F17] text-white flex flex-col justify-center px-4 py-12 overflow-hidden">
        {/* Dynamic Background Glows */}
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-[#10B981]/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#F59E0B]/20 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto w-full space-y-10">
          {/* Header Badge */}
          <div className="text-center space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1F2937] border border-[#374151] text-xs font-bold text-[#F59E0B] uppercase tracking-wider shadow-md">
              <Zap className="w-4 h-4 fill-[#F59E0B]" /> Cashless Barter Marketplace
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
              Trade What You Have. <br />
              <span className="bg-gradient-to-r from-[#10B981] via-[#14B8A6] to-[#F59E0B] bg-clip-text text-transparent">
                Zero Cash Required.
              </span>
            </h1>
          </div>

          {/* Dual Role Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Swapper Card (Emerald Theme) */}
            <div className="relative group p-8 rounded-3xl bg-[#111827] border-2 border-[#1F2937] hover:border-[#10B981] transition-all duration-300 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center text-[#34D399]">
                  <Store className="w-7 h-7" />
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-[#34D399]">
                  Item Owners
                </p>
                <h2 className="text-2xl font-black text-white">Join as Swapper</h2>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  Post your pre-loved sneakers, tech, or fashion items. Receive direct trade offers
                  and exchange seamlessly.
                </p>
              </div>
              <Button
                size="lg"
                className="w-full rounded-2xl font-bold py-6 bg-[#059669] hover:bg-[#047857] text-white shadow-lg shadow-[#059669]/35 hover:scale-[1.01] transition-all"
                // onClick={onListItems}
              >
                List an Item to Swap
              </Button>
            </div>

            {/* Visitor Card (Amber Gold Theme) */}
            <div className="relative group p-8 rounded-3xl bg-[#111827] border-2 border-[#1F2937] hover:border-[#F59E0B] transition-all duration-300 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/40 flex items-center justify-center text-[#FBBF24]">
                  <Search className="w-7 h-7" />
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-[#FBBF24]">
                  Shoppers & Buyers
                </p>
                <h2 className="text-2xl font-black text-white">Browse as Visitor</h2>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  Explore active listings near you. Offer your own items for a swap or propose cash
                  offers to verified sellers.
                </p>
              </div>
              <Button
                size="lg"
                className="w-full rounded-2xl font-bold py-6 bg-[#D97706] hover:bg-[#B45309] text-white shadow-lg shadow-[#D97706]/35 hover:scale-[1.01] transition-all"
                // onClick={onBrowse}
              >
                Explore Marketplace
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-bold text-slate-300 pt-2">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" /> Escrow Secured Trades
            </span>
            <span className="flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-[#F59E0B]" /> Fair-Value Trade Assistant
            </span>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="relative min-h-[calc(100vh-82px)] w-full bg-white text-slate-900 flex flex-col justify-center px-4 py-12 overflow-hidden">
        {/* Soft Ambient Light Glows */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-100/50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-amber-100/60 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto w-full space-y-10">
          {/* Crisp Header Badge */}
          <div className="text-center space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-amber-700 uppercase tracking-wider shadow-sm">
              <Zap className="w-4 h-4 fill-amber-500 text-amber-500" /> Cashless Barter Marketplace
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-slate-900">
              Trade What You Have. <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 bg-clip-text text-transparent">
                Zero Cash Required.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
              The direct peer-to-peer barter platform. Swap pre-loved gear, fashion, and electronics
              safely with people near you.
            </p>
          </div>

          {/* Dual Role Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Swapper Card (Emerald Accent) */}
            <div className="relative group p-8 rounded-3xl bg-slate-50/80 border-2 border-slate-200/80 hover:border-emerald-500 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                  <Store className="w-7 h-7" />
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-emerald-700">
                  Item Owners
                </p>
                <h2 className="text-2xl font-black text-slate-900">Join as Swapper</h2>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Post your pre-loved items, manage incoming trade offers, and swap directly with
                  verified local buyers.
                </p>
              </div>
              <Button
                size="lg"
                className="w-full rounded-2xl font-bold py-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 hover:scale-[1.01] transition-all"
                // onClick={onListItems}
              >
                List an Item to Swap
              </Button>
            </div>

            {/* Visitor Card (Amber Accent) */}
            <div className="relative group p-8 rounded-3xl bg-slate-50/80 border-2 border-slate-200/80 hover:border-amber-500 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600">
                  <Search className="w-7 h-7" />
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-amber-700">
                  Shoppers & Buyers
                </p>
                <h2 className="text-2xl font-black text-slate-900">Browse as Visitor</h2>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Explore thousands of active listings. Pitch item swaps or make direct cash offers
                  to item owners.
                </p>
              </div>
              <Button
                size="lg"
                className="w-full rounded-2xl font-bold py-6 bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-600/20 hover:scale-[1.01] transition-all"
                // onClick={onBrowse}
              >
                Explore Marketplace
              </Button>
            </div>
          </div>

          {/* High-Trust Value Bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-bold text-slate-500 pt-2 border-t border-slate-100">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Escrow Protected Swaps
            </span>
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-600" /> Verified Fair Exchange
            </span>
            <span className="flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-teal-600" /> Automated Value Match
            </span>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="relative min-h-[calc(100vh-82px)] w-full bg-white text-slate-900 overflow-hidden flex flex-col justify-center items-center py-10 px-4">
        {/* Background Subdued Mesh Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />

        {/* Floating Interactive Cards (Desktop) */}
        <div className="hidden lg:flex absolute left-8 xl:left-16 top-1/3 -rotate-3 items-center gap-3.5 bg-white border border-slate-200 p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-2xl">
            👟
          </div>
          <div>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
              Trading Off
            </span>
            <p className="text-sm font-bold text-slate-900">Adidas Sneakers</p>
            <p className="text-xs text-slate-500 font-medium">Est. Value: ₦20,000</p>
          </div>
        </div>

        <div className="hidden lg:flex absolute right-8 xl:right-16 top-1/4 rotate-3 items-center gap-3.5 bg-white border border-slate-200 p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl">
            💼
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
              Looking For
            </span>
            <p className="text-sm font-bold text-slate-900">Vantage Bag</p>
            <p className="text-xs text-slate-500 font-medium">Mint Condition</p>
          </div>
        </div>

        {/* Main Container */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Live Activity Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 shadow-sm text-xs font-semibold text-slate-700">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span>1,420+ Swaps completed this week</span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 text-emerald-600">
              <Zap className="w-3.5 h-3.5 fill-emerald-600" /> Zero Cash Required
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] text-slate-900">
            Trade What You{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Have
            </span>{" "}
            <br className="hidden sm:inline" />
            For What You{" "}
            <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 bg-clip-text text-transparent">
              Want
            </span>
            .
          </h1>

          {/* Pitch Copy */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            The cashless thrift marketplace. Swap unused clothes, gear, and collectibles directly
            with people near you—no high fees, no cash needed.
          </p>

          {/* Center Trade Preview */}
          <div className="pt-2 pb-2">
            <div className="inline-flex items-center justify-between gap-4 bg-slate-50 border border-slate-200 p-3 sm:p-4 rounded-2xl shadow-md max-w-sm sm:max-w-md w-full">
              <div className="flex items-center gap-3 text-left">
                <span className="text-3xl">🧥</span>
                <div>
                  <p className="text-[10px] uppercase text-slate-500 font-bold">Your Closet</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">Denim Jacket</p>
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-amber-500 p-[1.5px] flex items-center justify-center shrink-0 shadow-sm">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <ArrowRightLeft className="w-4 h-4 text-slate-800" />
                </div>
              </div>

              <div className="flex items-center gap-3 text-right justify-end">
                <div>
                  <p className="text-[10px] uppercase text-slate-500 font-bold">Their Shelf</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">Vinyl Player</p>
                </div>
                <span className="text-3xl">📻</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div>
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full font-bold text-base py-6 px-9 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/20 hover:scale-[1.02] transition-all"
              // onClick={onBrowse}
            >
              <Repeat className="w-5 h-5 mr-2 text-white" />
              <span>Browse Marketplace</span>
            </Button>
          </div>

          {/* Trust Footer */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-semibold text-slate-500 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Escrow Protected Swaps</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-600" />
              <span>Verified Fair Exchange</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-teal-600" />
              <span>Instant Local Deals</span>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="relative min-h-[calc(100vh-82px)] w-full bg-white text-zinc-900 flex flex-col justify-center items-center px-4 py-16 overflow-hidden">
        {/* Crisp Micro-Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-xs font-semibold text-violet-800 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            <span>Next-Gen Barter & Trade Protocol</span>
          </div>

          {/* High-Impact Headline */}
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-zinc-950 leading-[1.05]">
            Trade Your Gear. <br />
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Keep Your Cash.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-600 max-w-2xl mx-auto font-medium leading-relaxed">
            The peer-to-peer exchange for pre-loved fashion, gadgets, and gear. Match values
            instantly and trade with confidence.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full font-bold text-base py-6 px-8 bg-violet-600 hover:bg-violet-700 text-white shadow-xl shadow-violet-600/25 hover:scale-[1.02] transition-all"
              // onClick={onBrowse}
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto rounded-full font-bold text-base py-6 px-8 border-2 border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800"
            >
              How Barter Works
            </Button>
          </div>

          {/* Minimal Metrics */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-zinc-100 max-w-2xl mx-auto text-center">
            <div>
              <p className="text-2xl font-black text-zinc-900">100%</p>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">
                Cashless Option
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-violet-600">Verified</p>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">
                Peer Escrow
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-2xl font-black text-zinc-900">Direct</p>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">
                Local Exchange
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="relative min-h-[calc(100vh-82px)] w-full bg-white text-slate-900 flex flex-col justify-center px-4 py-12 overflow-hidden">
        {/* Background Radial Glows */}
        <div className="absolute top-12 left-10 w-72 h-72 bg-emerald-100/70 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 right-10 w-72 h-72 bg-orange-100/70 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto w-full space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 tracking-wide uppercase">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Peer-to-Peer Barter Network</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Turn What You Have Into <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-orange-500 bg-clip-text text-transparent">
                What You Want.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              The modern platform for trading gadgets, fashion, and gear locally without cash.
            </p>
          </div>

          {/* Dual Role Path Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Path 1: Swapper */}
            <div className="group relative p-8 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black tracking-widest text-emerald-600 uppercase">
                    Have Items to Swap?
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">List as Swapper</h2>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Publish your pre-loved items in minutes. Manage incoming trade requests and accept
                  fair offers.
                </p>
              </div>

              <Button
                size="lg"
                className="w-full rounded-2xl font-bold py-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 group-hover:translate-y-[-2px] transition-all"
                // onClick={onListItems}
              >
                <span>List Your Item</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Path 2: Explorer */}
            <div className="group relative p-8 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black tracking-widest text-orange-600 uppercase">
                    Looking for Deals?
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">Browse Marketplace</h2>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Discover active listings around you. Pitch direct trade offers or submit cash
                  offers to owners.
                </p>
              </div>

              <Button
                size="lg"
                className="w-full rounded-2xl font-bold py-6 bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 group-hover:translate-y-[-2px] transition-all"
                // onClick={onBrowse}
              >
                <span>Explore All Listings</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Value Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-8 text-xs font-semibold text-slate-500 border-t border-slate-100">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Safe Escrow Delivery
            </span>
            <span className="flex items-center gap-2">
              <Repeat className="w-4 h-4 text-orange-500" /> Direct Peer Swapping
            </span>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="relative min-h-[calc(100vh-82px)] w-full bg-[#F8FAFC] text-slate-900 flex flex-col justify-center px-4 py-16 overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

        <div className="relative z-10 max-w-4xl mx-auto w-full space-y-8 text-center">
          {/* Secondary Navigation Pill */}
          <div className="inline-flex items-center gap-3 p-1.5 pl-4 pr-2 rounded-full bg-white border border-slate-200/90 shadow-sm text-xs font-medium">
            <span className="text-slate-600">Got pre-loved gear to trade?</span>
            <button
              // onClick={onBecomeSwapper}
              className="px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-lime-400 font-bold flex items-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Start Swapping
            </button>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-950 tracking-tight leading-[1.08]">
            Find Great Items. <br />
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-lime-600 bg-clip-text text-transparent">
              Swap or Pitch Offers.
            </span>
          </h1>

          {/* Trust Badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" /> Verified Accounts
            </span>
            <span>•</span>
            <span>Zero Platform Fees</span>
            <span>•</span>
            <span>Direct Local Pickup</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
