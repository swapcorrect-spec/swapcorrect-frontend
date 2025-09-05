"use client";

import { Button } from "@/components/ui/button";
import { FC } from "react";
import MarketPlace from "./components/market-place";

const Dashboard: FC = () => {
  return (
    <section>
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
      <div className="ms-24 mt-[70px]">
        <MarketPlace />
      </div>
    </section>
  );
};

export default Dashboard;
