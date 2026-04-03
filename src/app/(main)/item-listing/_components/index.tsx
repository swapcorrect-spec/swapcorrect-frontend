"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Listing from "@/app/(main)/item-listing/_components/listing";
import FilterMenu from "@/components/shared/filters/menu-dropdown";
import { useState } from "react";
import { useGetUserInfo } from "@/app/_hooks/queries/auth/auth";
import { useSearchItems } from "@/app/_hooks/queries/listing/listing";
import EmptyItemsState from "@/components/shared/empty-items-state";
import Title from "@/components/shared/tltle";

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

  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const { data: userData } = useGetUserInfo({ enabler: true });
  const userId = userData?.result?.id;

  // Fetch user's listings
  const { data: itemsData } = useSearchItems({
    enabler: !!userId,
    listingUserId: userId,
    categoryld: category || undefined,
    location: location || undefined,
    pageNumber: 1,
    perpageSize: 20,
  });

  const handleNewListing = () => {
    router.push("/item-listing/add");
  };

  // Format price with currency
  const formatPrice = (currency: string, amount: number) => {
    const currencySymbols: Record<string, string> = {
      NGN: "₦",
      USD: "$",
      GBP: "£",
      EUR: "€",
      GHS: "GH₵",
      KES: "KSh",
      ZAR: "R",
    };
    const symbol = currencySymbols[currency] || currency;
    return `${symbol}${amount.toLocaleString()} Est.`;
  };

  // Format status
  const formatStatus = (reviewStage: string) => {
    return reviewStage || "Active";
  };

  return (
    <div className="mx-auto my-10">
      <div className="flex items-end justify-between my-2">
        <Title title="MY LISTING" description="Track, edit, or swap your listed items in one place." />
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
      {!itemsData || itemsData.length === 0 ? (
        <EmptyItemsState />
      ) : (
        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {itemsData.map((item) => {
            return (
              <Listing
                key={item.listingId}
                listingId={item.listingId}
                name={item.itemName}
                date={""} // Date not available in response
                description={item.itemDescription || ""}
                price={formatPrice(item.estimatedCurrency, item.estimatedAmount)}
                status={formatStatus(item.reviewStage)}
                type={item.listType}
                wants={item.swapListRequest || []}
                categoryName={item.categoryName}
                media={item.media}
                profilePicture={item.profilePicture}
                fullName={item.fullName}
                username={item.username}
                rating={0} // Rating not available in search response
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
