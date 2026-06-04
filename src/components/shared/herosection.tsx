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
import { ArrowRight } from "lucide-react";

const Herosection = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(`/${PATHS.LOGIN}`);
  }, [router]);

  const handleNavigate = () => {
    router.push(`/${PATHS.LOGIN}`);
  };

  return (
    <div
      className={`bg-[url(../app/assets/images/pngs/onboarding_bg.png)] bg-contain bg-bottom bg-no-repeat  flex flex-col items-center justify-center relative py-36`}
    >
      <div className="max-w-[839px] w-full mx-auto">
        {/* <h1 className="text-[#2A2A2A] mb-8 text-[80px] font-medium text-center leading-tight">
          E-commerce Without Cash
        </h1> */}
        <h1 className="text-[#2A2A2A] mb-8 text-8xl font-medium text-center leading-tight">
          E-commerce
          <br />
          <span className="relative inline-block">
            <span className="relative z-0 pr-3">Without</span>

            <Image
              src={Circle}
              alt=""
              className="absolute inset-0 z-0 w-[75%] h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            />
          </span>
          Cash
        </h1>
        <p className="text-2xl text-[#737373] text-center w-[85%] mx-auto">
          The dormant item in your hand could get you a useful item in someone’s home
        </p>
        <Button
          variant={"default"}
          className="mx-auto mt-8 rounded-full font-medium text-sm py-2 !px-[11px] flex items-center gap-2 !h-auto w-fit"
          size={"lg"}
          onClick={handleNavigate}
        >
          Swap Now
          <span className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
            <ArrowRight className="text-black" size={20} />
          </span>
        </Button>
      </div>
      <Image
        src={Hero_RightOne}
        alt="product item"
        width={250}
        className="absolute -right-1 top-0"
      />
      <Image
        src={Hero_RightTwo}
        alt="product item"
        width={250}
        className="absolute -right-1 bottom-0"
      />
      <Image src={Hero_LeftOne} alt="product item" width={250} className="absolute -left-1 top-0" />
      <Image
        src={Hero_LeftTwo}
        alt="product item"
        width={250}
        className="absolute -left-1 bottom-0"
      />
    </div>
  );
};

export default Herosection;
