"use client";

import ItemsListingEmptyState from "./empty-items-listing";
import FilterMenu from "@/components/shared/filters/menu-dropdown";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CartDetails from "@/components/widget/cart-details";

const ItemsListing: React.FC = () => {
  const [, setCategory] = useState<string>("");
  const [, setLocation] = useState<string>("");
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
      <div className="flex justify-between items-center">
        <div>
          <h6 className="text-[#007AFF] font-medium mb-3 text-xl">
            MY LISTING
          </h6>
          <p className="text-xl font-medium text-[#222222] mb-8">
            Track, edit, or swap your listed items in one place.
          </p>
        </div>
        <Button
          variant={"default"}
          className="rounded-full font-medium text-sm py-3 px-10 w-fit"
          size={"lg"}
        >
          Create New Listing +
        </Button>
      </div>
      <div>
        <FilterMenu
          categoryList={categoryList}
          locationList={locationList}
          setCategory={setCategory}
          setLocation={setLocation}
        />
      </div>
      <ItemsListingEmptyState />
      <div className="grid grid-cols-3 gap-4 mt-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <CartDetails
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

export default ItemsListing;
