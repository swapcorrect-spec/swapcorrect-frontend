import Image from "next/image";
import Profile from "@/app/assets/images/pngs/swapper_profile.png";
import { Button } from "@/components/ui/button";

const Swap = () => {
  return (
    <div className="border border-[#E9E9E9] rounded-xl p-2.5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-gray-300 rounded-md w-[60px] h-[60px]" />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <p className="text-[#222222] font-medium text-base">
              Vintage Camera
            </p>
            <p className="text-[#F6A301] text-[10px] bg-[#FFF9ED] border border-[#FFF1D5] rounded-full px-3">
              Negotating
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Image
                src={Profile}
                alt="profile"
                width={30}
                height={30}
                quality={100}
                objectFit="contain"
              />
              <p className="text-[#737373] font-normal text-sm">Celia Gill</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-black w-1.5 h-1.5 rounded-full" />
              <p className="text-[#737373] font-normal text-sm">Basic</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-black w-1.5 h-1.5 rounded-full" />
              <p className="text-[#737373] font-normal text-sm">2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Button variant={"outline"} size={"sm"} className="rounded-full">
          Open Chat
        </Button>
      </div>
    </div>
  );
};

export default Swap;
