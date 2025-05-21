import { Card, CardContent } from "@/components/ui/card";
import Rating from "@/app/assets/images/star_rating.svg";
import HotPick from "@/app/assets/images/hot_pick.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Heart } from "lucide-react";
interface iWantList {
  name: string;
}
interface iProps {
  wantList?: iWantList[];
  imgUrl: string;
  productName?: string;
  title?: string;
  rating?: number;
  vendorName?: string;
  price?: string | number;
}

const ProductDetails: React.FC<iProps> = ({
  imgUrl,
  rating,
  vendorName,
  wantList,
  productName,
  price,
}) => {
  return (
    <Card className="bg-white w-full flex p-2 cursor-pointer">
      <CardContent className="h-full flex flex-col flex-grow p-0">
        <div className="mb-4 w-full h-[355px] relative">
          <Image
            alt="Testimony person image"
            fill
            src={imgUrl}
            className="rounded-xl object-cover"
          />
          <div className=" px-4 w-full absolute top-[16px] flex justify-between">
            <div className="bg-[#FFF6F6] gap-2 flex items-center rounded-xl p-[5px]">
              <HotPick />
              <p className="text-[#FF3B30] text-xs"> Hot Picks</p>
            </div>
            <div className="bg-[#FFF6F6] w-7 h-7 rounded-full flex items-center justify-center">
              <Heart fill="#E42222" color="#E42222" size={16} />
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h6 className="text-xl font-medium">
              {productName || "Gently used Nike shoe"}
            </h6>
            <p className="font-medium text-[#007AFF]">
              $ {price || "75,000"} Est.
            </p>
          </div>
          <div className="flex items-start gap-2 mb-3">
            <h6 className="text-[#222222] text-sm font-medium">Wants:</h6>
            {wantList && wantList?.length > 0 && (
              <ul className="flex justify-center items-center flex-wrap gap-1 text-[#737373] text-sm">
                {wantList?.map((item, index: number) => (
                  <li key={index} className="flex items-center">
                    {item.name}
                    {index !== wantList.length - 1 && (
                      <span className="mx-2 w-1 h-1 rounded-full bg-[#000000]"></span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="rounded-xl mb-6 text-[#222222] gap-2 px-2 p-2 bg-[#FAFAFA] flex items-center justify-between border border-[#E9E9E9]">
            <p className="font-medium me-auto">
              {vendorName || "Jenny Franklin"}
            </p>
            <p className="flex items-center gap-1">
              {rating || 3.5} <Rating />
            </p>
          </div>
          <Button
            variant={"default"}
            className="rounded-full font-medium text-sm py-3 w-full"
            size={"lg"}
          >
            Swap Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
