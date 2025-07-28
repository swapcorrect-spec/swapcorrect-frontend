"use client";

import { useState } from "react";
import FilterMenu from "@/components/shared/filters/menu-dropdown";
import Swap from "@/app/(main)/my-swap/_components/swap";

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

export default function MySwaps() {
  const [, setCategory] = useState<string>("");
  const [, setLocation] = useState<string>("");

  return (
    <div className="w-[90%] mx-auto my-10">
      <div className="flex items-end justify-between my-2">
        <div className="flex flex-col gap-2">
          <p className="text-[#007AFF] font-medium text-sm">MY SWAP</p>
          <p className="text-[#222222] font-medium text-xl">
            Track all your swap interactions.
          </p>
        </div>
      </div>
      <div className="my-8">
        <FilterMenu
          categoryList={categoryList}
          locationList={locationList}
          setCategory={setCategory}
          setLocation={setLocation}
        />
      </div>
      <div className="grid grid-cols-1 gap-5">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <Swap key={item} />
        ))}
      </div>
    </div>
  );
}
