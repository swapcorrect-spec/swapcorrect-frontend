"use client";

import { Card, CardContent } from "@/components/ui/card";
import ProductDetails from "@/components/widget/product-details";
import ProfileDetailsHeader from "@/components/widget/profile-details";
import Reviews from "@/components/widget/review";
import { useGetGeneralUserInfo } from "@/app/_hooks/queries/auth/auth";
import { useSearchItems } from "@/app/_hooks/queries/listing/listing";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import FilterMenu from "@/components/shared/filters/menu-dropdown";
import { useState } from "react";
import EmptyItemsState from "@/components/shared/empty-items-state";
import useIsMobile from "@/app/_hooks/useIsMobile";
import { MoveLeft } from "lucide-react";

const UserProfile: React.FC = () => {
  const params = useParams();
  const isMobile = useIsMobile();
  const userId = params.userId as string;

  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [lowestRange, setLowestRange] = useState<number | undefined>(undefined);
  const [highestRange, setHighestRange] = useState<number | undefined>(undefined);
  const [searchParam, setSearchParam] = useState<string>("");
  const [isShowReview, setIsShowReview] = useState(false);

  const { data, isLoading } = useGetGeneralUserInfo({
    userId,
    enabler: !!userId,
  });

  const { data: itemsData, isLoading: itemsLoading } = useSearchItems({
    enabler: !!userId,
    userId,
    searhParam: searchParam,
    categoryld: category,
    location: location,
    lowestRange: lowestRange,
    highestRange: highestRange,
    pageNumber: 1,
    perpageSize: 20,
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

  const handleToggleReview = () => {
    setIsShowReview(!isShowReview);
  };

  if (isLoading) {
    return (
      <section className="flex flex-col md:flex-row gap-5 p-6">
        <div className="max-w-[404px] w-full flex flex-col gap-3 md:h-[calc(100vh-72px)] overflow-y-auto hide-scrollbar">
          {/* Profile Header Skeleton */}
          <div className="flex flex-col gap-3">
            <Skeleton className="h-32 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>

          {/* Reviews Card Skeleton */}
          {!isMobile && (
            <Card>
              <CardContent className="p-3">
                <Skeleton className="h-5 w-16 mb-4" />
                <div className="flex flex-col gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="h-[calc(100vh-72px)] md:overflow-y-auto hide-scrollbar w-full">
          {/* Items Header Skeleton */}
          <div className="flex justify-between mb-5">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Items Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col md:flex-row gap-5 p-6">
      {isShowReview ? (
        <>
          <div className="flex items-center gap-2">
            <MoveLeft onClick={handleToggleReview} />
            Reviews
          </div>
          <Card>
            <CardContent className="p-3">
              <div className="flex flex-col gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Reviews key={index} />
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <div className="max-w-[404px] w-full flex flex-col gap-3 md:h-[calc(100vh-72px)] overflow-y-auto hide-scrollbar">
            <ProfileDetailsHeader userData={data?.result} handleToggleReview={handleToggleReview} />
            {!isMobile && (
              <Card>
                <CardContent className="p-3">
                  <p className="mb-4 font-medium text-base">Reviews</p>
                  <div className="flex flex-col gap-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Reviews key={index} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          <div className="h-[calc(100vh-72px)] md:overflow-y-auto hide-scrollbar w-full">
            <div className="font-medium flex text-[#222222] justify-between mb-5">
              <p>Items Available For Swap</p>
              <p className="text-xs">{itemsData?.length || 0} items</p>
            </div>
            <div className="mb-6">
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
            {itemsLoading ? (
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))}
              </div>
            ) : itemsData && itemsData.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {itemsData.map((item: any) => (
                  <ProductDetails key={item.listingId} {...item} showHotpick={false} />
                ))}
              </div>
            ) : (
              <EmptyItemsState title="Looks like user swap list is empty!" />
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default UserProfile;
