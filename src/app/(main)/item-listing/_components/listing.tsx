import { Button } from "@/components/ui/button";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { FC } from "react";

type Props = {
  image: string | StaticImport;
  name: string;
  status: string;
  description: string;
  price: string;
  type: string;
  date: string;
  wants: string[];
};
const Listing: FC<Props> = ({
  image,
  date,
  description,
  name,
  price,
  status,
  type,
  wants,
}) => {
  return (
    <div className="rounded-xl  hover:border hover:border-[#e3e0e0] cursor-pointer p-2">
      <Image
        src={image}
        width={350}
        alt="Product Preview"
        objectFit="cover"
        className="rounded-xl h-[350px]"
      />
      <div className="flex flex-col gap-1 mt-2 mb-3">
        <div className="flex justify-between items-center">
          <p className="font-medium text-lg">{name}</p>
          <p className="text-[#222222] rounded-full font-medium text-xs px-2 py-1 border border-[#E9E9E9]">
            {status}
          </p>
        </div>
        <p className="text-[#737373] text-sm font-normal">{description}</p>
        <div className="flex justify-between items-center my-2">
          <p className="font-normal text-sm text-[#007AFF]">
            {price}
            <span className="text-[#222222] bg-[#FAFAFA] rounded-full text-xs mx-2 px-2 py-1 border border-[#E9E9E9]">
              {type}
            </span>
          </p>
          <p className="font-medium text-[#737373] text-sm">{date}</p>
        </div>
        <p className="text-[#737373] font-normal text-[13px]">
          <span className="text-[#222222] font-medium text-[13px]">Wants:</span>{" "}
          {wants}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <Button className="" variant={"outline"}>
          Edit
        </Button>
        <Button variant={"outline"}>Delete</Button>
        <Button variant={"outline"}>View</Button>
        <Button variant={"outline"}>Feature</Button>
      </div>
    </div>
  );
};

export default Listing;
