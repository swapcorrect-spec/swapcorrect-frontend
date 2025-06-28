"use client";
import "react-multi-carousel/lib/styles.css";
import Herosection from "@/components/shared/herosection";
import Navbar from "@/components/shared/navbar";
import { HOT_PICKS } from "./mocks/hot-picks";
import Marketplace from "@/components/shared/marketplace";

export default function Home() {
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
      </div>
    </div>
  );
}
