import { FC } from "react";
import Image from "next/image";

import SwapperImg from "@/app/assets/images/swapper.png";
import VisitorImg from "@/app/assets/images/visitor.png";
import { Button } from "@/components/ui/button";

import CheckIcon from "@/app/assets/images/check_icon.svg";
import Logo from "@/app/assets/images/logo_full.svg";

type ButtonVariant =
  | "default"
  | "outline"
  | "link"
  | "destructive"
  | "secondary"
  | "ghost";

const USER_TYPE = [
  {
    user: "Become a Swapper",
    banner: SwapperImg,
    items: [
      "List your items",
      "Choose what you want in return",
      "Pay a small listing fee",
    ],
    variant: "default",
  },
  {
    user: "Continue as a Visitor",
    banner: VisitorImg,
    items: [
      "Browse & request items",
      "Pay Protection Fee",
      "Trade securely & get rated",
    ],
    variant: "outline",
  },
];

const Onboarding: FC = () => {
  return (
    <div
      className={`bg-[url(../app/assets/images/onboarding_bg.png)] bg-cover bg-no-repeat h-[75vh] absolute bottom-0 left-0 right-0 bg-top`}
    >
      <div className="w-2/4 mx-auto absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="mt-20 mb-8">
          <h2 className="text-center text-[#000000] font-bold text-4xl">
            How do you want to use SwapShop?
          </h2>
          <p className="text-center text-[#737373] text-base w-[55%] mx-auto ">
            Pick a role that fits how you want to use the platform. You can
            always switch later.
          </p>
        </div>
        <div className="flex justify-between w-[80%] mx-auto gap-10">
          {USER_TYPE.map(({ user, banner, items, variant }) => (
            <div className="bg-white w-[fit-content] p-[14px] rounded-xl">
              <p className="text-[#000000] text-xl font-medium">{user}</p>
              <Image
                src={banner}
                alt="An image of a hand holding a device"
                className="my-4"
              />
              {items.map((item, index) => (
                <div className="flex flex-row gap-2 mb-4">
                  <CheckIcon style={{ width: "25px", height: "25px" }} />
                  <p key={index} className="text-[#737373] text-sm font-normal">
                    {item}
                  </p>
                </div>
              ))}
              <Button
                variant={variant as ButtonVariant}
                className="border border-black w-full rounded-full my-4"
              >
                Choose
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
