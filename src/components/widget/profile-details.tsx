import { Card, CardContent } from "../ui/card";
import Listed from "@/app/assets/images/listed.svg";
import Swaps from "@/app/assets/images/swaps.svg";
import Ratings from "@/app/assets/images/ratings.svg";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const ProfileDetailsHeader: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex items-center gap-3 w-full mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#F4CE9B] rounded-full">
            <Image
              src="https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80"
              height={56}
              width={56}
              alt="User profile"
              className="w-14 h-14 rounded-full"
            />
          </div>
          <div className="me-auto">
            <h5 className={`text-[#222222] text-lg font-medium`}>
              Mutiu Ganiyu
            </h5>
          </div>
        </div>
        <div className="flex gap-3 mb-6">
          <Button>Swapper</Button>
          <Button
            className="items-center flex border-[#E9E9E9] text-[#222222]"
            variant="outline"
          >
            Open Chat{" "}
            <div className="bg-[#303030] rounded-full w-[14px] h-[14px]">
              <ArrowRight size={12} color="#fff" />
            </div>
          </Button>
        </div>
        <div className="flex gap-2">
          <div className="border-[#E9E9E9] border p-2 rounded-md w-full">
            <div className="flex gap-1 items-center mb-2 text-sm text-[#737373]">
              <Listed />
              <p>Listed</p>
            </div>
            <h6 className="font-medium text-lg">12</h6>
          </div>
          <div className="border-[#E9E9E9] border p-2 rounded-md w-full">
            <div className="flex gap-1 items-center mb-2 text-sm text-[#737373]">
              <Swaps />
              <p>Swaps</p>
            </div>
            <h6 className="font-medium text-lg">12</h6>
          </div>
          <div className="border-[#E9E9E9] p-2 border rounded-md w-full">
            <div className="flex gap-1 items-center mb-2 text-sm text-[#737373]">
              <Ratings />
              <p>Ratings</p>
            </div>
            <h6 className="font-medium text-lg">12</h6>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileDetailsHeader;
