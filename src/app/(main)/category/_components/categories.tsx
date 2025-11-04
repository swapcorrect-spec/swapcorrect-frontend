"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FilterMenu from "@/components/shared/filters/menu-dropdown";
import { useSearchItems } from "@/app/_hooks/queries/listing/listing";
import ProductDetails from "@/components/widget/product-details";
import EmptyItemsState from "@/components/shared/empty-items-state";

const Categories = () => {
  const search = useSearchParams();
  const router = useRouter();
  const tab = search.get("tab");
  
  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [lowestRange, setLowestRange] = useState<number | undefined>(undefined);
  const [highestRange, setHighestRange] = useState<number | undefined>(undefined);
  const [searchParam, setSearchParam] = useState<string>("");

  useEffect(() => {
    if (!tab) {
      router.push("?tab=categories");
    }
  }, [tab, router]);

  const categoryId = tab && tab !== "categories" && tab.length > 10 ? tab : category;

  const { data, isLoading, isError, error } = useSearchItems({
    enabler: true,
    searhParam: searchParam,
    categoryld: categoryId || undefined,
    location: location || undefined,
    lowestRange: lowestRange,
    highestRange: highestRange,
    pageNumber: 1,
    perpageSize: 20
  });

  const handleApplyFilters = (filters: {
    category: string;
    location: string;
    lowestRange?: number;
    highestRange?: number;
  }) => {
    setCategory(filters.category);
    setLocation(filters.location);
    setLowestRange(filters.lowestRange);
    setHighestRange(filters.highestRange);
  };

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
    <div className="w-[80%] h-full overflow-y-auto hide-scrollbar">
      <div className="p-6">
        <p className="text-[#007AFF] font-medium text-[15px] pb-1">Category</p>
        <p className="text-[#222222] font-medium text-xl capitalize mb-8">
          Browse {tab || "categories"}
        </p>
        <div className="mb-6">
          <FilterMenu
            categoryList={categoryList}
            locationList={locationList}
            setCategory={setCategory}
            setLocation={setLocation}
            setLowestRange={setLowestRange}
            setHighestRange={setHighestRange}
            setSearchParam={setSearchParam}
            onApplyFilters={handleApplyFilters}
          />
        </div>
        {isLoading ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-gray-200 h-[400px] rounded-xl animate-pulse" />
            ))}
          </div>
        ) : data && data.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4">
            {data.map((item: any) => (
              <ProductDetails
                key={item.listingId}
                {...item}
              />
            ))}
          </div>
        ) : (
          <EmptyItemsState />
        )}
      </div>
    </div>
  );
};

export default Categories;
