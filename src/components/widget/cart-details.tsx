"use client";
import { Card, CardContent } from "@/components/ui/card";
import Rating from "@/app/assets/images/svgs/star_rating.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Eye, SquarePen, Trash2 } from "lucide-react";
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
  showHotpick?: boolean;
  description?: string;
  status?: string;
  level?: string;
}

const CartDetails: React.FC<iProps> = ({
  imgUrl,
  rating,
  vendorName,
  wantList,
  productName,
  price,
  description,
  status,
  level,
}) => {
  const router = useRouter();
  return (
    <Card
      className="bg-white w-full flex p-2 cursor-pointer"
      onClick={() => router.push("/product/1")}
    >
      <CardContent className="h-full flex flex-col flex-grow p-0">
        <div className="mb-4 w-full h-[255px] relative">
          <Image
            alt="Testimony person image"
            fill
            src={imgUrl}
            className="rounded-xl object-cover"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-3">
            <h6 className="text-xl font-medium">
              {productName || "Gently used Nike shoe"}
            </h6>
            <span className="border border-[#E9E9E9] bg-[#FAFAFA] rounded-xl text-xs px-2 py-1">
              {status || "Active"}
            </span>
          </div>
          <p className="text-[#737373] text-sm mb-3">
            {description ||
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidun"}
          </p>
          <div className="flex gap-3 items-center mb-2">
            <p className="font-medium text-[#007AFF]">
              $ {price || "75,000"} Est.
            </p>
            <span className="border border-[#E9E9E9] bg-[#FAFAFA] rounded-xl text-xs px-2 py-1">
              {level || "Basic"}
            </span>
            <p className="ms-auto text-sm text-[#737373]">10/15/2023</p>
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

          <p className="flex items-center gap-1">
            {rating || 3.5} <Rating />
          </p>
          <div className="mt-4 flex gap-3 items-center text-[#737373] text-sm">
            <Button variant="outline" className="flex items-center gap-2">
              <SquarePen size={16} /> Edit
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Trash2 size={16} />
              Delete
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Eye size={16} />
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartDetails;
