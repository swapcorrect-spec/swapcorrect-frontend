"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Listing from "@/app/(main)/item-listing/_components/listing";
import FilterMenu from "@/components/shared/filters/menu-dropdown";
import { useState } from "react";
import { useGetUserInfo } from "@/app/_hooks/queries/auth/auth";
import { useSearchItems } from "@/app/_hooks/queries/listing/listing";
import EmptyItemsState from "@/components/shared/empty-items-state";
import Title from "@/components/shared/tltle";
import ReactPaginate from "react-paginate";

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
  const search = useSearchParams();
  const pageNumber = Number(search.get("page") || 1);

  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [searchParam, setSearchParam] = useState<string>("");

  const { data: userData } = useGetUserInfo({ enabler: true });
  const userId = userData?.result?.id;

  const { data: itemsData, isLoading, totalPage } = useSearchItems({
    enabler: !!userId,
    listingUserId: userId,
    searhParam: searchParam || undefined,
    categoryld: category || undefined,
    location: location || undefined,
    pageNumber,
    perpageSize: 20,
  });

  const totalPages = totalPage || 1;

  const handleNewListing = () => {
    router.push("/item-listing/add");
  };

  const resetToFirstPage = () => {
    const params = new URLSearchParams(search.toString());
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handleApplyFilters = (filters: {
    category: string;
    location: string;
    lowestRange?: number;
    highestRange?: number;
  }) => {
    setCategory(filters.category);
    setLocation(filters.location);
    resetToFirstPage();
  };

  const handlePageClick = (selectedItem: { selected: number }) => {
    const page = selectedItem.selected + 1;
    const params = new URLSearchParams(search.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
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
    <div className="w-full min-w-0 max-w-full px-4 md:px-0 md:w-[90%] mx-auto my-6 md:my-10">
      <div className="flex items-start md:items-end justify-between gap-3 my-2 min-w-0">
        <Title
          title="MY LISTING"
          description="Track, edit, or swap your listed items in one place."
        />
        <Button className="rounded-full shrink-0" onClick={handleNewListing}>
          Create New Listing
        </Button>
      </div>
      <div className="my-8">
        <FilterMenu
          categoryList={categoryList}
          locationList={locationList}
          setCategory={(value) => {
            setCategory(value);
            resetToFirstPage();
          }}
          setLocation={(value) => {
            setLocation(value);
            resetToFirstPage();
          }}
          setSearchParam={(value) => {
            setSearchParam(value);
            resetToFirstPage();
          }}
          onApplyFilters={handleApplyFilters}
        />
      </div>
      {isLoading ? (
        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-gray-200 h-[280px] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : !itemsData || itemsData.length === 0 ? (
        <EmptyItemsState />
      ) : (
        <>
          <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
            {itemsData.map((item) => {
              return (
                <Listing
                  key={item.listingId}
                  listingId={item.listingId}
                  name={item.itemName}
                  date={""}
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
                  rating={0}
                />
              );
            })}
          </div>
          <div className="flex justify-center mt-8 w-full min-w-0">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next ›"
              previousLabel="‹ Previous"
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              pageCount={totalPages}
              renderOnZeroPageCount={null}
              onPageChange={handlePageClick}
              forcePage={Math.max(pageNumber - 1, 0)}
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
      )}
    </div>
  );
}
