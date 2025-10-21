"use client";

import { Card, CardContent } from "@/components/ui/card";
import Rating from "@/app/assets/images/svgs/star_rating.svg";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactPlayer from "react-player";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetListingDetails, useStartSwap } from "@/app/_hooks/queries/listing/listing";
import { formatCurrency, createImageErrorHandler, getImageSrcWithFallback, formatDateTime } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductOverviewProps {
  listingId: string;
}

const ListingOverview: React.FC<ProductOverviewProps> = ({ listingId }) => {
  const router = useRouter();
  const { data, isLoading, isError, error } = useGetListingDetails({
    enabler: true,
    listingId,
  });

  const { startSwap, isPending: isStartingSwap } = useStartSwap({
    listingId,
    onSuccess: () => {
      router.push("/chat");
    },
  });

  const [imageError, setImageError] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);

  const handleImageError = createImageErrorHandler(setImageError);
  const handleProfileImageError = createImageErrorHandler(setProfileImageError);

  // Extract data from API response
  const listingData = data?.result;
  const firstMedia = listingData?.media?.[0];
  const isVideo = firstMedia?.mediaType === "Video";
  const mediaUrl = firstMedia?.url || "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80";
  
  const handleNegotiate = () => {
    startSwap();
  };
  
  console.log("Listing Details Data:", data);
  
  const productTabList = [
    {
      title: "Item Description",
      value: "item-description",
    },
    {
      title: "Details",
      value: "details",
    },
    {
      title: "Swap Guideline",
      value: "swap-guideline",
    },
  ];
  
  // Use API data for exchange list
  const exchangeList = listingData?.swapListRequest?.map(item => ({
    description: item
  })) || [];

  // Loading skeleton component
  if (isLoading) {
    return (
      <section className="p-6">
        <Skeleton className="h-6 w-48 mb-6" />
        <div className="flex gap-6">
          {/* Left side skeleton */}
          <Card className="w-[60%] overflow-hidden">
            <CardContent className="p-0">
              <Skeleton className="w-full h-[418px]" />
              <div className="p-4">
                <div className="grid w-full grid-cols-3 gap-2 mb-4">
                  <Skeleton className="h-10 rounded-[26px]" />
                  <Skeleton className="h-10 rounded-[26px]" />
                  <Skeleton className="h-10 rounded-[26px]" />
                </div>
                <Skeleton className="h-20 w-full" />
              </div>
            </CardContent>
          </Card>
          
          {/* Right side skeleton */}
          <div className="w-[40%]">
            <Card className="mb-4 2xl:mb-6">
              <CardContent className="p-4 2xl:p-6">
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-6 w-1/2 mb-6" />
                <div className="bg-[#F7F7F7] py-3 px-4">
                  <Skeleton className="h-6 w-48 mb-4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Skeleton className="h-6 w-32 mb-3" />
            <Card className="mb-4 2xl:mb-6">
              <CardContent className="p-4 2xl:p-6 flex gap-3 items-center">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="me-auto">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-8 w-24 rounded-[6px]" />
              </CardContent>
            </Card>
            
            <Card className="bg-[#F0FFF6]">
              <CardContent className="py-3 px-4 2xl:p-6">
                <Skeleton className="h-6 w-40 mb-3" />
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-12 w-full rounded-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="p-6">
      <h6 className="text-[#007AFF] font-medium mb-6 2xl:mb-8 text-xl">
        PRODUCT OVERVIEW
      </h6>
      <div className="flex gap-6">
        <Card className="w-[60%] overflow-hidden">
          <CardContent className="p-0">
            <div className="w-full h-[418px] relative">
              {isVideo ? (
                <ReactPlayer
                  src={mediaUrl}
                  width="100%"
                  height="100%"
                  controls={true}
                  className="rounded-xl overflow-hidden"
                  style={{ borderRadius: '12px' }}
                />
              ) : (
                <Image
                  alt="Product Preview"
                  fill
                  src={getImageSrcWithFallback(mediaUrl, imageError)}
                  className="object-cover"
                  onError={handleImageError}
                />
              )}
            </div>
            <div className="p-4">
              <Tabs
                defaultValue="item-description"
                className="w-full !rounded-[26px]"
              >
                <TabsList className="grid w-full grid-cols-3">
                  {productTabList.map((_, index) => (
                    <TabsTrigger
                      value={_.value}
                      className={`rounded-[26px]`}
                      key={index}
                    >
                      {_.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value="item-description">
                  <p className="text-sm text-[#737373]">
                    {listingData?.itemDescription || "No description available"}
                  </p>
                </TabsContent>
                <TabsContent value="details" className="grid grid-cols-3 gap-2">
                  <p className="text-sm text-[#737373]">Condition</p>
                  <p className="text-sm text-[#737373]">Category</p>
                  <p className="text-sm text-[#737373]">Date Listed</p>

                  <p className="rounded-2xl text-xs text-center text-[#1A9E1C] px-2 py-1 w-fit font-medium text-[#222222] border border-[#E2FFE3] bg-[#F0FFF6]">
                    {listingData?.itemCondition || "Unknown"}
                  </p>
                  <p className="rounded-2xl text-center text-xs text-[#222222] w-fit px-2 py-1 font-medium text-[#222222] border border-[#E9E9E9] bg-white">
                    {listingData?.categoryName || "Unknown"}
                  </p>
                  <p className="text-xs font-medium text-[#222222]">
                    {formatDateTime(new Date())}
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
        <div className="w-[40%]">
          <Card className="mb-4 2xl:mb-6">
            <CardContent className="p-4 2xl:p-6">
              <h5 className="text-[#000000] font-medium mb-2 text-2xl">
                {listingData?.itemName || "Item Name"}
              </h5>
              <h6 className="text-[#007AFF] font-medium mb-6 2xl:mb-8 text-xl">
                {listingData?.estimatedAmount 
                  ? formatCurrency(listingData.estimatedAmount, listingData.estimatedCurrency || "NGN")
                  : "Price not available"
                }
              </h6>
              <div className="bg-[#F7F7F7] py-3 px-4">
                <h6 className="text-xl mb-4 2xl:mb-6">Requested in Exchange</h6>
                <ul className="flex flex-col gap-2">
                  {exchangeList.map((des, index) => (
                    <li
                      className="flex gap-2 items-center text-[#737373] text-sm"
                      key={index}
                    >
                      <span className="w-5 h-5 border-[1.5px] text-black border-[#000000] rounded-full font-bold flex items-center justify-center">
                        ?
                      </span>
                      {des.description}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          <h6 className="text-xl mb-3 font-medium">About the Swapper</h6>
          <Card className="mb-4 2xl:mb-6">
            <CardContent className="p-4 2xl:p-6 flex gap-3 items-center">
              <Image
                className="h-10 w-10 rounded-full"
                src={getImageSrcWithFallback(
                  listingData?.profilePicture || "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
                  profileImageError
                )}
                height={40}
                width={40}
                alt="Profile picture"
                onError={handleProfileImageError}
              />
              <div className="me-auto">
                <p className="text-[#222222] font-medium text-base">
                  {listingData?.fullName || listingData?.username || "Unknown User"}
                </p>
                <div className="flex gap-2 text-[#737373] text-sm items-center">
                  <p className="flex items-center gap-1">
                    {listingData?.rating || 0} <Rating />
                  </p>
                  <span className="w-1 h-1 rounded-full bg-[#737373]"></span>
                  <p>{listingData?.swapCount || 0} swaps</p>
                </div>
              </div>
              <Link href={`/profile/${listingData?.userId || 'unknown'}`}>
                <div className="border border-[#E9E9E9] rounded-[6px] gap-1 p-[6px] flex items-center">
                  <p className="font-medium text-xs text-[#222222]">
                    View profile
                  </p>
                  <span className="w-4 h-4 rounded-full flex items-center justify-center bg-[#222222]">
                    <ArrowRight size={12} color="#fff" />
                  </span>
                </div>
              </Link>
            </CardContent>
          </Card>
          <Card className="bg-[#F0FFF6]">
            <CardContent className="py-3 xp-4 2xl:p-6">
              <h6 className="text-[#1A9E1C] font-medium text-xl mb-3">
                Ready to negotiate?
              </h6>
              <p className="text-[#737373] text-sm mb-3">
                Start a conversation with {listingData?.fullName || listingData?.username || "the swapper"} to discuss swap details.
              </p>
              <Button
                onClick={handleNegotiate}
                disabled={isStartingSwap}
                variant={"default"}
                className="rounded-full font-medium text-sm py-3 w-full"
                size={"lg"}
              >
                {isStartingSwap ? "Starting..." : "Negotiate"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ListingOverview;
