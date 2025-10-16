"use client";

import MarketPlaceItemsEmptyState from "./empty-state";
import FilterMenu from "@/components/shared/filters/menu-dropdown";
import { useState, useEffect } from "react";
import { useSearchItems } from "@/app/_hooks/queries/swap";
import ProductDetails from "@/components/widget/product-details";
const MarketPlaceItems: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [lowestRange, setLowestRange] = useState<number | undefined>(undefined);
  const [highestRange, setHighestRange] = useState<number | undefined>(undefined);
  const [searchParam, setSearchParam] = useState<string>("");
  
  const { data, isLoading, isError, error } = useSearchItems({
    enabler: true,
    searhParam: searchParam,
    categoryld: category,
    location: location,
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
    <section className="p-6">
      <h6 className="text-[#007AFF] font-medium mb-3 text-xl">MARKETPLACE</h6>
      <p className="text-xl font-medium text-[#222222] mb-8">
        All available items for swap
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
              key={item.listingId}
              {...item}
            />
          ))}
        </div>
      ) : (
        <MarketPlaceItemsEmptyState />
      )}
    </section>
  );
};

export default MarketPlaceItems;
