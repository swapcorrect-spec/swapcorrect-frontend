import Image from "next/image";
import PreviewImage from "@/app/assets/images/pngs/preview.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NewItemListing = () => {
  return (
    <div className="">
      <div className="border border-[#E9E9E9] px-8 py-4">
        <p className="text-[#007AFF] font-medium text-sm">Item listing</p>
        <p className="text-[#222222] font-medium text-xl">
          List a New Item for Swap
        </p>
      </div>
      <div className="grid grid-cols-[25%_40%_30%] justify-between gap-2 w-[95%] mx-auto my-8">
        <div>
          <Image src={PreviewImage} alt="preview" width={300} />
        </div>
        <div className="flex flex-col gap-4">
          <Input
            label="Item Name"
            placeholder="e.g Samsung Galaxy"
            type="text"
          />
          <Input
            label="Brief Description"
            placeholder="Condition, age, extras"
            type="text"
          />
          <Input
            label="Estimated Monitary Value (Naira)"
            placeholder="0.00"
            type="number"
          />
          <Input label="Item Condition" placeholder="Fairly used" type="text" />
          <Input label="Category" placeholder="Electronics" type="text" />
          <Input
            label="Requested Items for Swap (up to 3)"
            placeholder="e.g Samsung Galaxy A52"
            type="text"
          />
        </div>
        <div>
          <div className="border border-[#EEEEEE] rounded-xl p-4">
            <p className="text-[#222222] font-medium text-xl">
              Listing Fee Summary
            </p>
            <div className="flex items-center justify-between my-8">
              <p>Listing Fee:</p>
              <p>----</p>
            </div>
            <Button className={"rounded-full w-full"} size={"lg"}>
              List Item for Swap
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewItemListing;
