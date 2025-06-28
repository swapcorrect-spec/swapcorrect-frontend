import Image from "next/image";
import { Button } from "@/components/ui/button";
import Hero_RightOne from "@/app/assets/images/pngs/right_1.png";
import Hero_RightTwo from "@/app/assets/images/pngs/right_2.png";
import Hero_LeftOne from "@/app/assets/images/pngs/left_1.png";
import Hero_LeftTwo from "@/app/assets/images/pngs/left_2.png";

const Herosection = () => {
  return (
    <div
      className={`bg-[url(../app/assets/images/pngs/onboarding_bg.png)] bg-contain bg-bottom bg-no-repeat  flex flex-col items-center justify-center relative py-36`}
    >
      <div className="max-w-[839px] w-full mx-auto">
        <h1 className="text-[#2A2A2A] mb-8 text-[80px] font-medium text-center leading-tight">
          E-commerce Without Cash
        </h1>
        <p className="text-2xl text-[#737373] text-center">
          The dormant item in your hand could get you a useful item in someone’s
          home
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
      <Image
        src={Hero_LeftOne}
        alt="product item"
        width={250}
        className="absolute -left-1 top-0"
      />
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
