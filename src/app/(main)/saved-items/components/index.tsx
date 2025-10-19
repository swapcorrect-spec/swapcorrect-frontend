"use client";

import SavedItemsEmptyState from "./empty-state";
import ProductDetails from "@/components/widget/product-details";
import FilterMenu from "@/components/shared/filters/menu-dropdown";
import { useState } from "react";
import { useGetUserFavourite } from "@/app/_hooks/queries/favourite";

const SavedItems: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [lowestRange, setLowestRange] = useState<number | undefined>(undefined);
  const [highestRange, setHighestRange] = useState<number | undefined>(undefined);
  const [searchParam, setSearchParam] = useState<string>("");
  const { data, isLoading, isError, error } = useGetUserFavourite({
    enabler: true,
 
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
console.log(data, "data");

  return (
    <section className="p-6">
      <h6 className="text-[#007AFF] font-medium mb-3 text-xl">SAVED SWAPS</h6>
      <p className="text-xl font-medium text-[#222222] mb-8">
        All the items you&apos;ve marked to trade later
      </p>
      <div>
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
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-gray-200 h-[400px] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {data.map((item: any) => (
            <ProductDetails
              key={item.listingId || item.id}
              {...item}
            />
          ))}
        </div>
      ) : (
        <SavedItemsEmptyState />
      )}
    </section>
  );
};

export default SavedItems;