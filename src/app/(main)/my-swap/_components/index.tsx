"use client";

import { useState, useMemo } from "react";
import FilterMenu from "@/components/shared/filters/menu-dropdown";
import SwapCardItem, { SwapCardItemData } from "@/components/shared/swap-card-item";
import Title from "@/components/shared/tltle";
import { useSearchSwaps } from "@/app/_hooks/queries/swap/swap";
import { useGetUserInfo } from "@/app/_hooks/queries/auth/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import EmptyItemsState from "@/components/shared/empty-items-state";
import { getStatusColor } from "@/lib/utils";

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
  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [searchParam, setSearchParam] = useState<string>("");
  const [swapListingStatus, setSwapListingStatus] = useState<
    "Published" | "Negotiation" | "Swapped" | "All"
  >("All");
  const [listingDate, setListingDate] = useState<"All" | "LastWeek" | "LastMonth">("All");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const perpageSize = 10;

  const { data: currentUserData } = useGetUserInfo({
    enabler: true,
  });

  const currentUserId = currentUserData?.result?.id || "";

  const { data: swapsData, isLoading } = useSearchSwaps({
    enabler: !!currentUserId,
    listingUserId: currentUserId,
    searhParam: searchParam || undefined,
    swapListingStatus,
    listingDate,
    pageNumber,
    perpageSize,
  });

  const swapList = useMemo((): SwapCardItemData[] => {
    if (!swapsData?.items || !currentUserId) {
      return [];
    }

    return swapsData.items.map((swap) => {
      const isSwapper = swap.swapperUserId === currentUserId;
      const otherUserName = isSwapper ? swap.visitorName : swap.swapperName;
      const otherUserImage = isSwapper ? swap.visitorImage : swap.swapperImage;

      const displayStatus =
        swap.status === "Negotiation" ? "Negotiating" : swap.status;

      return {
        name: otherUserName,
        item: swap.listedItem,
        time: swap.lastActivity,
        roomName: swap.roomName,
        status: displayStatus,
        type: "Basic",
        image: otherUserImage,
        key: swap.swapProceedId,
      };
    });
  }, [swapsData, currentUserId]);

  const totalPages = swapsData?.totalPages || 1;

  const handleApplyFilters = (filters: {
    category: string;
    location: string;
    lowestRange?: number;
    highestRange?: number;
  }) => {
    setCategory(filters.category);
    setLocation(filters.location);
    setPageNumber(1); 
  };

  return (
    <div className="w-[90%] mx-auto my-10">
      <div className="flex items-end justify-between my-2">
        <Title title="MY SWAP" description="Track all your swap interactions." />
      </div>
      <div className="my-8">
        <FilterMenu
          categoryList={categoryList}
          locationList={locationList}
          setCategory={setCategory}
          setLocation={setLocation}
          setSearchParam={setSearchParam}
          onApplyFilters={handleApplyFilters}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Card key={index} className="shadow-none border border-[#E9E9E9]">
              <CardContent className="p-2.5">
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : swapList.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-5 border border-[#E9E9E9] rounded-lg p-6">
            {swapList.map((item) => (
              <SwapCardItem
                key={item.key}
                item={item}
                getStatusColor={getStatusColor}
              />
            ))}
          </div>
        </>
      ) : (
        <EmptyItemsState 
          title="No swaps found"
          description="You don't have any swap interactions yet. Start swapping to see your activities here!"
        />
      )}
    </div>
  );
}
