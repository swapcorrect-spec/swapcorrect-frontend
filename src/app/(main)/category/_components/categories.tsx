"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import FilterMenu from "@/components/shared/filters/menu-dropdown";
import Product from "@/components/shared/Product";

import ProductThree from "@/app/assets/images/pngs/product_3.jpg";

const Categories = () => {
  const search = useSearchParams();
  const router = useRouter();
  const tab = search.get("tab");
  const [, setCategory] = useState<string>("");
  const [, setLocation] = useState<string>("");

  useEffect(() => {
    if (!tab) {
      router.push("?tab=categories");
    }
  }, [tab]);

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
  return (
    <div className="w-[80%] p-3">
      <p className="text-[#007AFF] font-medium text-[15px] pb-1">Category</p>
      <p className="text-[#222222] font-medium text-xl capitalize">
        Browse {tab}
      </p>
      <div className="my-5">
        <FilterMenu
          categoryList={categoryList}
          locationList={locationList}
          setCategory={setCategory}
          setLocation={setLocation}
        />
      </div>
      <div className="grid grid-cols-3 gap-5">
        {[0, 1, 2, 3, 4, 5].map((item: number) => (
          <Product
            key={item}
            author="Jenny Franklin"
            image={ProductThree}
            name="Gently used Nike shoe"
            photo="https://randomuser.me/api/portraits/thumb/women/1.jpg"
            price="$75,000 Est."
            rating={3.4}
            wants={["Airpod, Powerbank"]}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
