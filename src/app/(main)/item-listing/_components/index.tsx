"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Listing from "@/app/(main)/item-listing/_components/listing";
import ProductOne from "@/app/assets/images/pngs/product_1.jpg";
import FilterMenu from "@/components/shared/filters/menu-dropdown";
import { useState } from "react";

const categoryList = [
  {
    text: "Electronics",
    value: "electronics",
  },
  {
    text: "Textiles",
    value: "textiles",
  },
];
const locationList = [
  {
    text: "Lagos",
    value: "lagos",
  },
  {
    text: "Abuja",
    value: "abuja",
  },
];

export default function ItemListing() {
  const router = useRouter();

  const [, setCategory] = useState<string>("");
  const [, setLocation] = useState<string>("");

  const handleNewListing = () => {
    router.push("/item-listing/add");
  };
  return (
    <div className="w-[90%] mx-auto my-10">
      <div className="flex items-end justify-between my-2">
        <div className="flex flex-col gap-2">
          <p className="text-[#007AFF] font-medium text-sm">MY LISTING</p>
          <p className="text-[#222222] font-medium text-xl">
            Track, edit, or swap your listed items in one place.
          </p>
        </div>
        <Button className="rounded-full" onClick={handleNewListing}>
          Create New Listing
        </Button>
      </div>
      <div className="my-8">
        <FilterMenu
          categoryList={categoryList}
          locationList={locationList}
          setCategory={setCategory}
          setLocation={setLocation}
        />
      </div>
      <div className="grid grid-cols-3 gap-5">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <Listing
            key={item}
            image={ProductOne}
            date={"10/15/2023"}
            description={
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidun"
            }
            name={"Gently used Nike shoe"}
            price={"$75,000 Est."}
            status={"Active"}
            type={"Basic"}
            wants={["Smart Watch", "Airpods"]}
          />
        ))}
      </div>
    </div>
  );
}
