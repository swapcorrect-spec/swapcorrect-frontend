"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";
import FilterMenu from "@/components/shared/filters/menu-dropdown";
import { useSearchItems } from "@/app/_hooks/queries/listing/listing";
import ProductDetails from "@/components/widget/product-details";
import EmptyItemsState from "@/components/shared/empty-items-state";
import { useGetUserInfo } from "@/app/_hooks/queries/auth/auth";

const Categories = () => {
  const search = useSearchParams();
  const router = useRouter();
  const tab = search.get("tab");
  const q = search.get("q");
  const pageNumber = Number(search.get("page") || 1);

  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [lowestRange, setLowestRange] = useState<number | undefined>(undefined);
  const [highestRange, setHighestRange] = useState<number | undefined>(undefined);
  const [searchParam, setSearchParam] = useState<string>("");
  const { data: userData } = useGetUserInfo({ enabler: true });

  const userId = userData?.result?.id;

  useEffect(() => {
    if (!tab) {
      router.push("?tab=categories");
    }
  }, [tab, router]);

  const categoryId = tab && tab !== "categories" && !category ? q : category;
  // const categoryId = tab && tab !== "categories" && tab.length > 10 ? tab : category;

  const { data, isLoading, totalPage } = useSearchItems({
    enabler: true,
    searhParam: searchParam,
    categoryld: categoryId ?? "",
    location: location ?? "",
    lowestRange: lowestRange,
    highestRange: highestRange,
    pageNumber,
    perpageSize: 10,
    userId: userId ?? "",
  });

  const handleApplyFilters = (filters: {
    category: string;
    location: string;
    lowestRange?: number;
    highestRange?: number;
  }) => {
    setCategory(category);
    setLocation(filters.location);
    setLowestRange(filters.lowestRange);
    setHighestRange(filters.highestRange);

    const params = new URLSearchParams(search.toString());
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  const handlePageClick = (selectedItem: { selected: number }) => {
    const page = selectedItem.selected + 1;
    const params = new URLSearchParams(search.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  // const categoryList = [
  //   {
  //     text: "Electronics",
  //     value: "electronics",
  //   },
  //   {
  //     text: "Textiles",
  //     value: "textiles",
  //   },
  // ];

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
    <div className="w-full md:w-[80%] h-full overflow-y-auto hide-scrollbar">
      <div className="p-6">
        <p className="text-[#007AFF] font-medium text-[15px] pb-1">Category</p>
        <p className="text-[#222222] font-medium text-xl capitalize mb-8">
          Browse {tab?.replace(/-/g, " ") || "categories"}
        </p>
        <div className="mb-6">
          <FilterMenu
            // categoryList={categoryList}
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
          <>
            <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4">
              {data.map((item: any) => (
                <ProductDetails key={item.listingId} {...item} />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next ›"
                previousLabel="‹ Previous"
                pageRangeDisplayed={5}
                pageCount={totalPage as number}
                renderOnZeroPageCount={null}
                onPageChange={handlePageClick}
                forcePage={pageNumber - 1}
                pageClassName="w-10 h-10"
                previousLinkClassName="px-4 py-2 rounded-lg border hover:bg-gray-100"
                nextLinkClassName="px-4 py-2 rounded-lg border hover:bg-gray-100"
                containerClassName="flex items-center gap-2"
                pageLinkClassName="w-full h-full flex items-center justify-center rounded-lg border hover:bg-gray-100"
                activeLinkClassName="bg-blue-500 text-white border-blue-500 hover:bg-blue-500"
                previousClassName={pageNumber === 1 ? "pointer-events-none opacity-40" : ""}
                nextClassName={
                  pageNumber === totalPage || totalPage === 0
                    ? "pointer-events-none opacity-40"
                    : ""
                }
              />
            </div>
          </>
        ) : (
          <EmptyItemsState />
        )}
      </div>
    </div>
  );
};

export default Categories;
