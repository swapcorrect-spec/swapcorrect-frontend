"use client";
import FilterMenu from "@/components/shared/filters/menu-dropdown";
import Product from "@/components/shared/Product";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
};

export default Categories;
