"use client";

import { useState, useMemo } from "react";
import ReactPaginate from "react-paginate";
import FilterMenu from "@/components/shared/filters/menu-dropdown";
import SwapCardItem, { SwapCardItemData } from "@/components/shared/swap-card-item";
import Title from "@/components/shared/tltle";
import { useSearchSwaps } from "@/app/_hooks/queries/swap/swap";
import { useGetUserInfo } from "@/app/_hooks/queries/auth/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import EmptyItemsState from "@/components/shared/empty-items-state";
import { getStatusColor } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const categoryList = [
  {
    text: "All",
    value: "All",
  },
  {
    text: "Published",
    value: "Published",
  },
  {
    text: "Negotiation",
    value: "Negotiation",
  },
  {
    text: "Swapped",
    value: "Swapped",
  },
];

const listingDateList = [
  {
    text: "All",
    value: "All",
  },
  {
    text: "Last Week",
    value: "LastWeek",
  },
  {
    text: "Last Month",
    value: "LastMonth",
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
  const search = useSearchParams();
  const router = useRouter();

  const pageNumber = Number(search.get("page") || 1);

  const [category, setCategory] = useState<string>("");
  const [listing, setListing] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [searchParam, setSearchParam] = useState<string>("");
  // const [swapListingStatus, setSwapListingStatus] = useState<
  //   "Published" | "Negotiation" | "Swapped" | "All"
  // >("All");
  // const [listingDate, setListingDate] = useState<"All" | "LastWeek" | "LastMonth">("All");
  // const [pageNumber, setPageNumber] = useState<number>(1);
  const perpageSize = 15;
  // const [lowestRange, setLowestRange] = useState<number | undefined>(undefined);
  // const [highestRange, setHighestRange] = useState<number | undefined>(undefined);

  const { data: currentUserData } = useGetUserInfo({
    enabler: true,
  });

  const currentUserId = currentUserData?.result?.id || "";

  // const categoryId = tab && tab !== "categories" && tab.length > 10 ? tab : category;

  const { data: swapsData, isLoading } = useSearchSwaps({
    enabler: !!currentUserId,
    listingUserId: currentUserId,
    searhParam: searchParam || undefined,
    // lowestRange: lowestRange,
    // highestRange: highestRange,
    // categoryld: category,
    swapListingStatus:
      (category as "Published" | "Negotiation" | "Swapped" | "All" | undefined) || "All",
    // swapListingStatus: category as "Published" | "Negotiation" | "Swapped" | "All" | undefined,
    listingDate: (listing as "All" | "LastWeek" | "LastMonth" | undefined) || "All",
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

      return {
        name: otherUserName,
        item: swap.listedItem,
        time: swap.lastActivity,
        roomName: swap.roomName,
        status: swap.status,
        type: "Basic",
        image: otherUserImage,
        key: swap.swapProceedId,
        requestItem: swap.swapperRequestItem,
        roleLabel: isSwapper ? "Visitor" : "Swapper",
      };
    });
  }, [swapsData, currentUserId]);

  const totalPages = swapsData?.totalPages || 1;

  // console.log(totalPages, "total pages", swapsData?.totalPages);

  const handleApplyFilters = (filters: {
    category: string;
    listing: string;
    location: string;
    lowestRange?: number;
    highestRange?: number;
  }) => {
    setCategory(filters.category);
    setListing(filters.listing);
    setLocation(filters.location);
    // setLowestRange(filters.lowestRange);
    // setHighestRange(filters.highestRange);
    // setPageNumber(1);
  };

  const handlePageClick = (selectedItem: { selected: number }) => {
    const page = selectedItem.selected + 1;
    const params = new URLSearchParams(search.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full min-w-0 max-w-full px-4 md:w-[90%] md:mx-auto md:px-0 my-6 md:my-10">
      <div className="flex items-end justify-between my-2">
        <Title title="MY SWAP" description="Track all your swap interactions." />
      </div>
      <div className="my-6 md:my-8">
        <FilterMenu
          categoryList={categoryList}
          locationList={locationList}
          setCategory={setCategory}
          setLocation={setLocation}
          setSearchParam={setSearchParam}
          onApplyFilters={handleApplyFilters}
          // setLowestRange={setLowestRange}
          // setHighestRange={setHighestRange}
          listingDate={listingDateList}
          setListing={setListing}
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
          <div className="grid grid-cols-1 md:border md:border-[#E9E9E9] md:rounded-lg md:p-3">
            {swapList.map((item) => (
              <SwapCardItem key={item.key} item={item} getStatusColor={getStatusColor} />
            ))}
          </div>
          <div className="flex justify-center mt-8 w-full min-w-0">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next ›"
              previousLabel="‹ Previous"
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              pageCount={totalPages as number}
              renderOnZeroPageCount={null}
              onPageChange={handlePageClick}
              forcePage={pageNumber - 1}
              pageClassName="w-8 h-8 sm:w-10 sm:h-10 shrink-0"
              previousLinkClassName="px-2 sm:px-4 py-2 rounded-lg border hover:bg-gray-100 whitespace-nowrap"
              nextLinkClassName="px-2 sm:px-4 py-2 rounded-lg border hover:bg-gray-100 whitespace-nowrap"
              containerClassName="flex items-center justify-center flex-wrap gap-1 sm:gap-2 max-w-full"
              pageLinkClassName="w-full h-full flex items-center justify-center rounded-lg border hover:bg-gray-100"
              activeLinkClassName="bg-blue-500 text-white border-blue-500 hover:bg-blue-500"
              previousClassName={pageNumber === 1 ? "pointer-events-none opacity-40" : ""}
              nextClassName={
                pageNumber === totalPages || totalPages === 0
                  ? "pointer-events-none opacity-40"
                  : ""
              }
            />
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
