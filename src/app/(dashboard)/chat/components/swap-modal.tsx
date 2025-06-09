import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import ShieldStar from "@/app/assets/images/svgs/shield_star.svg";
import CircleStar from "@/app/assets/images/svgs/star_circle.svg";
import { Button } from "@/components/ui/button";

interface iProps {
  swapType: string;
  setSwapType: React.Dispatch<React.SetStateAction<string>>;
  handleClose: () => void;
}

const SwapModalContent: React.FC<iProps> = ({
  swapType,
  setSwapType,
  handleClose,
}) => {
  return (
    <section>
      <h6 className="text-[#222222] font-medium text-xl mb-3 text-center">
        Select Swap mode
      </h6>
      <p className="text-[#737373] text-sm text-center mb-5">
        Choose your desired swap mode for the trade, you can adjust your options
        later
      </p>
      <div className="flex  flex-col gap-4 mt-6 w-full">
        <RadioGroup
          value={swapType}
          onValueChange={setSwapType}
          className="space-y-4"
        >
          <div className="text-center lg:text-left flex flex-col items-start">
            <label
              htmlFor="basic"
              className={`p-3 rounded-xl border border-[#EEEEEE] ${
                swapType === "basic" ? "shadow-md bg-[#FAFCFF]" : ""
              } flex gap-4 items-center justify-center cursor-pointer w-full`}
            >
              <div className="flex-1">
                <div className="flex gap-3 items-center">
                  <CircleStar />
                  <h4 className="text-[#222222] font-medium text-base mb-1">
                    Basic
                  </h4>
                </div>
                <p className="text-xs text-[#737373]">
                  This swap does not include protection or escrow.You’ll need to
                  trust the other Swapper to follow through.{" "}
                </p>
              </div>
              <div className="w-fit">
                <RadioGroupItem value="basic" id="basic" />
              </div>
            </label>
          </div>
          <div className="text-center lg:text-left flex flex-col items-start">
            <label
              htmlFor="advanced"
              className={`p-3 rounded-xl border border-[#EEEEEE]  ${
                swapType === "advanced" ? "shadow-md bg-[#FAFCFF]" : ""
              } flex gap-4 items-center justify-center cursor-pointer w-full`}
            >
              <div className="flex-1">
                <div className="flex gap-3 items-center">
                  <ShieldStar />
                  <h4 className="text-[#222222] font-medium text-base mb-1">
                    Advanced
                  </h4>
                </div>
                <p className="text-xs text-[#737373]">
                  Advanced swaps include escrow protection and verified
                  shipping. Both parties must confirm receipt before the swap is
                  complete
                </p>
              </div>
              <div className="w-fit">
                <RadioGroupItem value="advanced" id="advanced" />
              </div>
            </label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex gap-4 mt-10">
        <Button className="!h-10 rounded-xl font-medium w-full">
          Request Swap
        </Button>
        <Button
          className="!h-10 rounded-xl font-medium w-full bg-[#B2B2B2] text-white"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </div>
    </section>
  );
};

export default SwapModalContent;
