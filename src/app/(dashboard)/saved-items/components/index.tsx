"use client";

import SavedItemsEmptyState from "./empty-state";
import ProductDetails from "@/components/widget/product-details";
import FilterMenu from "@/components/shared/filters/menu-dropdown";
import { useState } from "react";

const SavedItems: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
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
      <h6 className="text-[#007AFF] font-medium mb-3 text-xl">SAVED SWAPS</h6>
      <p className="text-xl font-medium text-[#222222] mb-8">
        All the items you've marked to trade later
      </p>
      <div>
        <FilterMenu
          categoryList={categoryList}
          locationList={locationList}
          setCategory={setCategory}
          setLocation={setLocation}
        />
      </div>
      <SavedItemsEmptyState />
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <ProductDetails
            imgUrl={
              "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80"
            }
            key={index}
          />
        ))}
      </div>
    </section>
  );
};

export default SavedItems;
