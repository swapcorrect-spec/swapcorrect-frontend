import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductImage from "@/app/assets/images/pngs/shoess.png";
import Rating from "@/app/assets/images/svgs/star_rating.svg";

const Product = () => {
  const router = useRouter();

  const handleSwap = () => {
    router.push("/product/1");
  };

  return (
    <div className="rounded-xl hover:border hover:border-[#e3e0e0] cursor-pointer p-2">
      <div className="relative">
        <Image
          src={ProductImage}
          alt="Product Preview"
          objectFit="contain"
          className="rounded-xl"
        />
        <div className="bg-white absolute top-3 right-3 rounded-full p-1">
          <Heart size={20} />
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-2 mb-3">
        <div className="flex justify-between items-center">
          <p className="font-medium text-lg">Gently used Nike Shoe</p>
          <p className="text-[#007AFF] font-medium text-sm">$75,000 Est.</p>
        </div>
        <p className="text-[#737373] font-normal text-[13px]">
          <span className="text-[#222222] font-medium text-[13px]">Wants:</span>{" "}
          Power Bank &bull; Smart Watch &bull; Airpods
        </p>
      </div>

      <div className="flex items-center justify-between border border-[#e3e0e0] px-2 py-2 rounded-xl">
        <div className="flex items-center gap-1">
          <Image
            src="https://randomuser.me/api/portraits/thumb/women/9.jpg"
            alt="user photo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="text-[#222222] font-medium text-[14px]">
            Wallace Harrison
          </p>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-[#222222] font-normal text-[15px]">3.5</p>
          <Rating />
        </div>
      </div>
      <Button className="w-full rounded-full mt-4 mb-2" onClick={handleSwap}>
        Swap Now
      </Button>
    </div>
  );
};

export default Product;
