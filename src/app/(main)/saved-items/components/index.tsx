"use client";

import SavedItemsEmptyState from "./empty-state";
import ProductDetails from "@/components/widget/product-details";
import FilterMenu from "@/components/shared/filters/menu-dropdown";
import { useEffect, useState } from "react";
import { useGetUserFavourite } from "@/app/_hooks/queries/favourite/favourite";
import Title from "@/components/shared/tltle";
import { useAuth } from "@/app/_context/auth-context";
import { useRouter } from "next/navigation";
import { PATHS } from "@/app/_constants/paths";

const SavedItems: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, isHydrated } = useAuth();
  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [lowestRange, setLowestRange] = useState<number | undefined>(undefined);
  const [highestRange, setHighestRange] = useState<number | undefined>(undefined);
  const [searchParam, setSearchParam] = useState<string>("");

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace(`/${PATHS.LOGIN}`);
    }
  }, [isHydrated, isAuthenticated, router]);

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

  return (
    <section className="p-6">
      <Title title="SAVED SWAPS" description="All the items you've marked to trade later" />

      {/* <div>
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
      </div> */}

      {isLoading ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-gray-200 h-[400px] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {data.map((item: any) => (
            <ProductDetails key={item.listingId || item.id} {...item} isFavItem={true} />
          ))}
        </div>
      ) : (
        <SavedItemsEmptyState />
      )}
    </section>
  );
};

export default SavedItems;
