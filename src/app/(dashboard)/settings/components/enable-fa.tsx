import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import ShieldStar from "@/app/assets/images/shield_star.svg";
import CircleStar from "@/app/assets/images/star_circle.svg";
import { Button } from "@/components/ui/button";

interface iProps {
  handleClose: () => void;
}

const EnableFAContent: React.FC<iProps> = ({ handleClose }) => {
  return (
    <section>
      <h6 className="text-[#222222] font-medium text-xl mb-3 text-center">
        Enable two-factor authentication
      </h6>
      <p className="text-[#737373] text-sm text-center mb-5">
        You are about to enable two-factor authentication (2FA) for your
        account. This will add an extra layer of security by requiring an
        additional code each time you log in. Do you want to continue with
        enabling 2FA?
      </p>

      <div className="flex gap-4 mt-10 flex justify-end">
        <Button
          className="!h-10 rounded-xl font-medium w-fit bg-[#B2B2B2] text-white"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button className="!h-10 rounded-xl font-medium w-fit">Continue</Button>
      </div>
    </section>
  );
};

export default EnableFAContent;
