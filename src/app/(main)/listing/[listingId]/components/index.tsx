// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import Rating from "@/app/assets/images/svgs/star_rating.svg";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ArrowRight, MoveLeft } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import ReactPlayer from "react-player";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useGetListingDetails, useStartSwap } from "@/app/_hooks/queries/listing/listing";
// import {
//   formatCurrency,
//   createImageErrorHandler,
//   getImageSrcWithFallback,
//   formatDateTime,
// } from "@/lib/utils";
// import { Skeleton } from "@/components/ui/skeleton";
// import useIsMobile from "@/app/_hooks/useIsMobile";
// import { useGetUserInfo } from "@/app/_hooks/queries/auth/auth";

// interface ProductOverviewProps {
//   listingId: string;
// }

// const ListingOverview: React.FC<ProductOverviewProps> = ({ listingId }) => {
//   const router = useRouter();
//   const isMobile = useIsMobile();

//   const { data, isLoading, isError, error } = useGetListingDetails({
//     enabler: true,
//     listingId,
//   });

//   const { startSwap, isPending: isStartingSwap } = useStartSwap({
//     listingId,
//     onSuccess: () => {
//       router.push("/chat");
//     },
//   });
//   const { isFetching, data: userData } = useGetUserInfo({ enabler: true });

//   const [imageError, setImageError] = useState(false);
//   const [profileImageError, setProfileImageError] = useState(false);

//   const handleImageError = createImageErrorHandler(setImageError);
//   const handleProfileImageError = createImageErrorHandler(setProfileImageError);
//   const [activeMediaIndex, setActiveMediaIndex] = useState(0);

//   // Extract data from API response
//   // const listingData = data?.result;
//   // const firstMedia = listingData?.media?.[0];
//   // const isVideo = firstMedia?.mediaType === "Video";
//   // const mediaUrl =
//   //   firstMedia?.url ||
//   //   "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80";
//   const listingData = data?.result;
//   const mediaList = listingData?.media || [];
//   const currentMedia = mediaList[activeMediaIndex];
//   const isVideo = currentMedia?.mediaType === "Video";
//   const mediaUrl =
//     currentMedia?.url ||
//     "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80";

//   const handleNegotiate = () => {
//     startSwap();
//   };

//   const productTabList = [
//     {
//       title: "Item Description",
//       value: "item-description",
//     },
//     {
//       title: "Details",
//       value: "details",
//     },
//     {
//       title: "Swap Guideline",
//       value: "swap-guideline",
//     },
//   ];

//   // Use API data for exchange list
//   const exchangeList =
//     listingData?.swapListRequest?.map((item) => ({
//       description: item,
//     })) || [];

//   // Loading skeleton component
//   if (isLoading) {
//     return (
//       <section className="p-6">
//         <Skeleton className="h-6 w-48 mb-6" />
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Left side skeleton */}
//           <Card className="w-full md:w-[60%] overflow-hidden shadow-none">
//             <CardContent className="p-0">
//               <Skeleton className="w-full h-[418px]" />
//               <div className="p-4">
//                 <div className="grid w-full grid-cols-3 gap-2 mb-4">
//                   <Skeleton className="h-10 rounded-[26px]" />
//                   <Skeleton className="h-10 rounded-[26px]" />
//                   <Skeleton className="h-10 rounded-[26px]" />
//                 </div>
//                 <Skeleton className="h-20 w-full" />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Right side skeleton */}
//           <div className="w-full md:w-[40%]">
//             <Card className="mb-4 2xl:mb-6 shadow-none">
//               <CardContent className="p-4 2xl:p-6">
//                 <Skeleton className="h-8 w-3/4 mb-2" />
//                 <Skeleton className="h-6 w-1/2 mb-6" />
//                 <div className="bg-[#F7F7F7] py-3 px-4">
//                   <Skeleton className="h-6 w-48 mb-4" />
//                   <div className="space-y-2">
//                     <Skeleton className="h-4 w-full" />
//                     <Skeleton className="h-4 w-3/4" />
//                     <Skeleton className="h-4 w-1/2" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Skeleton className="h-6 w-32 mb-3" />
//             <Card className="mb-4 2xl:mb-6 shadow-none">
//               <CardContent className="p-4 2xl:p-6 flex gap-3 items-center">
//                 <Skeleton className="h-10 w-10 rounded-full" />
//                 <div className="me-auto">
//                   <Skeleton className="h-4 w-24 mb-2" />
//                   <Skeleton className="h-3 w-16" />
//                 </div>
//                 <Skeleton className="h-8 w-24 rounded-[6px]" />
//               </CardContent>
//             </Card>

//             <Card className="bg-[#F0FFF6] shadow-none">
//               <CardContent className="py-3 px-4 2xl:p-6">
//                 <Skeleton className="h-6 w-40 mb-3" />
//                 <Skeleton className="h-4 w-full mb-3" />
//                 <Skeleton className="h-12 w-full rounded-full" />
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   const handleBack = () => {
//     router.back();
//   };

//   return (
//     <section className="p-6">
//       {isMobile ? (
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-2" onClick={handleBack}>
//             <MoveLeft />
//             <h5 className="text-[#000000] font-medium text-[15px]">
//               {listingData?.itemName || "Item Name"}
//             </h5>
//           </div>
//           <h6 className="text-[#007AFF] font-medium text-xs">
//             {listingData?.estimatedAmount
//               ? formatCurrency(listingData.estimatedAmount, listingData.estimatedCurrency || "NGN")
//               : "Price not available"}
//           </h6>
//         </div>
//       ) : (
//         <h6 className="text-[#007AFF] font-medium mb-6 2xl:mb-8 text-xl">PRODUCT OVERVIEW</h6>
//       )}
//       <div className="flex flex-col md:flex-row gap-6">
//         <Card className="w-full md:w-[60%] overflow-hidden shadow-none">
//           <CardContent className="p-0">
//             <div className="w-full h-[418px] relative">
//               {isVideo ? (
//                 <ReactPlayer
//                   src={mediaUrl}
//                   width="100%"
//                   height="100%"
//                   controls={true}
//                   className="rounded-xl overflow-hidden"
//                   style={{ borderRadius: "12px" }}
//                 />
//               ) : (
//                 <Image
//                   alt="Product Preview"
//                   fill
//                   src={getImageSrcWithFallback(mediaUrl, imageError)}
//                   className="object-cover"
//                   onError={handleImageError}
//                 />
//               )}
//             </div>
//             <div className="p-4">
//               <Tabs defaultValue="item-description" className="w-full !rounded-[26px]">
//                 <TabsList className="grid w-full grid-cols-3">
//                   {productTabList.map((_, index) => (
//                     <TabsTrigger
//                       value={_.value}
//                       className={`rounded-[26px] text-[#222222] text-[10px] md:text-sm`}
//                       key={index}
//                     >
//                       {_.title}
//                     </TabsTrigger>
//                   ))}
//                 </TabsList>
//                 <TabsContent value="item-description">
//                   <p className="text-sm text-[#737373]">
//                     {listingData?.itemDescription || "No description available"}
//                   </p>
//                 </TabsContent>
//                 <TabsContent
//                   value="details"
//                   className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-2"
//                 >
//                   <div className="flex flex-col gap-2">
//                     <p className="text-sm text-[#737373] font-normal">Condition</p>
//                     <p className="rounded-2xl text-[10.46px] text-center text-[#1A9E1C] px-2 py-1 w-fit font-medium border border-[#E2FFE3] bg-[#F0FFF6]">
//                       {listingData?.itemCondition || "Unknown"}
//                     </p>
//                   </div>
//                   <div className="flex flex-col gap-2">
//                     <p className="text-sm text-[#737373] font-normal">Category</p>
//                     <p className="rounded-2xl text-center text-xs text-[#222222] w-fit px-2 py-1 font-medium border border-[#737373] bg-white">
//                       {listingData?.categoryName || "Unknown"}
//                     </p>
//                   </div>
//                   <div className="flex flex-col gap-2">
//                     <p className="text-sm text-[#737373] font-normal">Date Listed</p>
//                     <p className="text-xs font-medium text-[#222222]">
//                       {formatDateTime(new Date())}
//                     </p>
//                   </div>
//                 </TabsContent>
//               </Tabs>
//             </div>
//           </CardContent>
//         </Card>
//         <div className="w-full md:w-[40%]">
//           <Card className="mb-4 2xl:mb-6 shadow-none border-none">
//             <CardContent className="p-0 md:p-4 2xl:p-6">
//               {!isMobile && (
//                 <>
//                   <h5 className="text-[#000000] font-medium mb-2 text-2xl">
//                     {listingData?.itemName || "Item Name"}
//                   </h5>
//                   <h6 className="text-[#007AFF] font-medium mb-6 2xl:mb-8 text-xl">
//                     {listingData?.estimatedAmount
//                       ? formatCurrency(
//                           listingData.estimatedAmount,
//                           listingData.estimatedCurrency || "NGN"
//                         )
//                       : "Price not available"}
//                   </h6>
//                 </>
//               )}
//               <div className="bg-[#F7F7F7] py-3 px-4 rounded-[9.94px]">
//                 <h6 className="text-[#000000] text-[13px] font-medium md:text-xl mb-4 2xl:mb-6">
//                   Requested in Exchange
//                 </h6>
//                 <ul className="flex flex-col gap-5">
//                   {exchangeList.map((des, index) => (
//                     <li className="flex gap-2 items-center text-[#737373] text-sm" key={index}>
//                       <span className="w-2 h-2 text-xs p-1.5 border-[1.5px] text-black border-[#000000] rounded-full font-bold flex items-center justify-center">
//                         ?
//                       </span>
//                       {des.description}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </CardContent>
//           </Card>
//           {isFetching ? (
//             <>
//               <div className="flex flex-col gap-3 px-4">
//                 <Skeleton className="h-32 w-full rounded-lg" />
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-3/4" />
//                   <Skeleton className="h-4 w-1/2" />
//                   <Skeleton className="h-4 w-2/3" />
//                 </div>
//               </div>
//             </>
//           ) : userData?.result.userRole[0] === "Visitor" ? (
//             <>
//               <h6 className="text-[14.87px] md:text-xl mb-3 font-medium">About the Swapper</h6>
//               <Card className="mb-4 2xl:mb-6 shadow-none">
//                 <CardContent className="px-2 py-4 2xl:p-6 flex gap-3 items-center">
//                   <Image
//                     className="h-10 w-10 rounded-full"
//                     src={getImageSrcWithFallback(
//                       listingData?.profilePicture ||
//                         "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
//                       profileImageError
//                     )}
//                     height={40}
//                     width={40}
//                     alt="Profile picture"
//                     onError={handleProfileImageError}
//                   />
//                   <div className="me-auto">
//                     <p className="text-[#222222] font-medium text-base">
//                       {listingData?.fullName || listingData?.username || "Unknown User"}
//                     </p>
//                     <div className="flex gap-2 text-[#737373] text-sm items-center">
//                       <p className="flex items-center gap-1">
//                         {listingData?.rating || 0} <Rating />
//                       </p>
//                       <span className="w-1 h-1 rounded-full bg-[#737373]"></span>
//                       <p>{listingData?.swapCount || 0} swaps</p>
//                     </div>
//                   </div>
//                   <Link href={`/profile/${listingData?.userId || "unknown"}`}>
//                     <div className="border border-[#E9E9E9] rounded-2xl gap-1 p-[6px] flex items-center">
//                       <p className="font-medium text-xs text-[#222222]">View profile</p>
//                       <span className="w-4 h-4 rounded-full flex items-center justify-center bg-[#222222]">
//                         <ArrowRight size={12} color="#fff" />
//                       </span>
//                     </div>
//                   </Link>
//                 </CardContent>
//               </Card>
//               <Card className="bg-[#F0FFF6] shadow-none">
//                 <CardContent className="py-3 xp-4 2xl:p-6">
//                   <h6 className="text-[#1A9E1C] font-medium text-xl mb-3">Ready to negotiate?</h6>
//                   <p className="text-[#737373] text-sm mb-3">
//                     Start a conversation with{" "}
//                     {listingData?.fullName || listingData?.username || "the swapper"} to discuss
//                     swap details.
//                   </p>
//                   <Button
//                     onClick={handleNegotiate}
//                     disabled={isStartingSwap}
//                     variant={"default"}
//                     className="rounded-full font-medium text-sm py-3 w-full"
//                     size={"lg"}
//                   >
//                     {isStartingSwap ? "Starting..." : "Negotiate"}
//                   </Button>
//                 </CardContent>
//               </Card>
//             </>
//           ) : (
//             <></>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ListingOverview;

// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import Rating from "@/app/assets/images/svgs/star_rating.svg";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ArrowRight, MoveLeft } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import ReactPlayer from "react-player";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useGetListingDetails, useStartSwap } from "@/app/_hooks/queries/listing/listing";
// import {
//   formatCurrency,
//   createImageErrorHandler,
//   getImageSrcWithFallback,
//   formatDateTime,
// } from "@/lib/utils";
// import { Skeleton } from "@/components/ui/skeleton";
// import useIsMobile from "@/app/_hooks/useIsMobile";
// import { useGetUserInfo } from "@/app/_hooks/queries/auth/auth";

// interface ProductOverviewProps {
//   listingId: string;
// }

// const ListingOverview: React.FC<ProductOverviewProps> = ({ listingId }) => {
//   const router = useRouter();
//   const isMobile = useIsMobile();

//   const { data, isLoading, isError, error } = useGetListingDetails({
//     enabler: true,
//     listingId,
//   });

//   const { startSwap, isPending: isStartingSwap } = useStartSwap({
//     listingId,
//     onSuccess: () => {
//       router.push("/chat");
//     },
//   });
//   const { isFetching, data: userData } = useGetUserInfo({ enabler: true });

//   const [activeMediaIndex, setActiveMediaIndex] = useState(0);
//   const [imageError, setImageError] = useState(false);
//   const [profileImageError, setProfileImageError] = useState(false);

//   const handleImageError = createImageErrorHandler(setImageError);
//   const handleProfileImageError = createImageErrorHandler(setProfileImageError);

//   // Extract data from API response safely
//   const listingData = data?.result;
//   const mediaList = listingData?.media || [];
//   const currentMedia = mediaList[activeMediaIndex];
//   const isVideo = currentMedia?.mediaType === "Video";

//   const mediaUrl =
//     currentMedia?.url ||
//     "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80";

//   const handleNegotiate = () => {
//     startSwap();
//   };

//   const productTabList = [
//     {
//       title: "Item Description",
//       value: "item-description",
//     },
//     {
//       title: "Details",
//       value: "details",
//     },
//     {
//       title: "Swap Guideline",
//       value: "swap-guideline",
//     },
//   ];

//   // Use API data for exchange list
//   const exchangeList =
//     listingData?.swapListRequest?.map((item) => ({
//       description: item,
//     })) || [];

//   // Loading skeleton component
//   if (isLoading) {
//     return (
//       <section className="p-6">
//         <Skeleton className="h-6 w-48 mb-6" />
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Left side skeleton */}
//           <Card className="w-full md:w-[60%] overflow-hidden shadow-none">
//             <CardContent className="p-0">
//               <Skeleton className="w-full h-[418px]" />
//               <div className="p-4">
//                 <div className="grid w-full grid-cols-3 gap-2 mb-4">
//                   <Skeleton className="h-10 rounded-[26px]" />
//                   <Skeleton className="h-10 rounded-[26px]" />
//                   <Skeleton className="h-10 rounded-[26px]" />
//                 </div>
//                 <Skeleton className="h-20 w-full" />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Right side skeleton */}
//           <div className="w-full md:w-[40%]">
//             <Card className="mb-4 2xl:mb-6 shadow-none">
//               <CardContent className="p-4 2xl:p-6">
//                 <Skeleton className="h-8 w-3/4 mb-2" />
//                 <Skeleton className="h-6 w-1/2 mb-6" />
//                 <div className="bg-[#F7F7F7] py-3 px-4">
//                   <Skeleton className="h-6 w-48 mb-4" />
//                   <div className="space-y-2">
//                     <Skeleton className="h-4 w-full" />
//                     <Skeleton className="h-4 w-3/4" />
//                     <Skeleton className="h-4 w-1/2" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Skeleton className="h-6 w-32 mb-3" />
//             <Card className="mb-4 2xl:mb-6 shadow-none">
//               <CardContent className="p-4 2xl:p-6 flex gap-3 items-center">
//                 <Skeleton className="h-10 w-10 rounded-full" />
//                 <div className="me-auto">
//                   <Skeleton className="h-4 w-24 mb-2" />
//                   <Skeleton className="h-3 w-16" />
//                 </div>
//                 <Skeleton className="h-8 w-24 rounded-[6px]" />
//               </CardContent>
//             </Card>

//             <Card className="bg-[#F0FFF6] shadow-none">
//               <CardContent className="py-3 px-4 2xl:p-6">
//                 <Skeleton className="h-6 w-40 mb-3" />
//                 <Skeleton className="h-4 w-full mb-3" />
//                 <Skeleton className="h-12 w-full rounded-full" />
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   const handleBack = () => {
//     router.back();
//   };

//   return (
//     <section className="p-6">
//       {isMobile ? (
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-2" onClick={handleBack}>
//             <MoveLeft />
//             <h5 className="text-[#000000] font-medium text-[15px]">
//               {listingData?.itemName || "Item Name"}
//             </h5>
//           </div>
//           <h6 className="text-[#007AFF] font-medium text-xs">
//             {listingData?.estimatedAmount
//               ? formatCurrency(listingData.estimatedAmount, listingData.estimatedCurrency || "NGN")
//               : "Price not available"}
//           </h6>
//         </div>
//       ) : (
//         <h6 className="text-[#007AFF] font-medium mb-6 2xl:mb-8 text-xl">PRODUCT OVERVIEW</h6>
//       )}
//       <div className="flex flex-col md:flex-row gap-6">
//         <Card className="w-full md:w-[60%] overflow-hidden shadow-none">
//           <CardContent className="p-0">
//             {/* Main Media Display */}
//             <div className="w-full h-[418px] relative bg-black rounded-t-xl overflow-hidden">
//               {isVideo ? (
//                 <ReactPlayer
//                   src={mediaUrl}
//                   width="100%"
//                   height="100%"
//                   controls={true}
//                   className="rounded-xl overflow-hidden"
//                   style={{ borderRadius: "12px" }}
//                 />
//               ) : (
//                 <Image
//                   alt="Product Preview"
//                   fill
//                   src={getImageSrcWithFallback(mediaUrl, imageError)}
//                   className="object-cover"
//                   onError={handleImageError}
//                 />
//               )}
//             </div>

//             {/* Thumbnail Preview Horizontal List */}
//             {mediaList.length > 1 && (
//               <div className="flex gap-2 p-4 pb-0 overflow-x-auto scrollbar-none">
//                 {mediaList.map((mediaItem: any, index: number) => {
//                   const isItemVideo = mediaItem.mediaType === "Video";
//                   const isActive = index === activeMediaIndex;

//                   return (
//                     <div
//                       key={index}
//                       onClick={() => {
//                         setActiveMediaIndex(index);
//                         setImageError(false); // Clean slate for fallback handling
//                       }}
//                       className={`relative w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all flex-shrink-0 bg-gray-100
//                         ${isActive ? "border-[#007AFF] scale-95 shadow-sm" : "border-transparent hover:border-gray-300"}`}
//                     >
//                       {isItemVideo ? (
//                         <div className="w-full h-full relative flex items-center justify-center bg-gray-900 text-white">
//                           <span className="bg-black/70 px-1 py-0.5 rounded text-[8px] tracking-wide absolute bottom-1 right-1 z-10 text-white">
//                             Video
//                           </span>
//                           <video
//                             src={mediaItem.url}
//                             className="w-full h-full object-cover opacity-80"
//                             muted
//                           />
//                         </div>
//                       ) : (
//                         <Image
//                           alt={`Thumbnail Preview ${index + 1}`}
//                           fill
//                           src={mediaItem.url}
//                           className="object-cover"
//                         />
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {/* Tabs and Metadata Info */}
//             <div className="p-4">
//               <Tabs defaultValue="item-description" className="w-full !rounded-[26px]">
//                 <TabsList className="grid w-full grid-cols-3">
//                   {productTabList.map((_, index) => (
//                     <TabsTrigger
//                       value={_.value}
//                       className={`rounded-[26px] text-[#222222] text-[10px] md:text-sm`}
//                       key={index}
//                     >
//                       {_.title}
//                     </TabsTrigger>
//                   ))}
//                 </TabsList>
//                 <TabsContent value="item-description">
//                   <p className="text-sm text-[#737373]">
//                     {listingData?.itemDescription || "No description available"}
//                   </p>
//                 </TabsContent>
//                 <TabsContent
//                   value="details"
//                   className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-2"
//                 >
//                   <div className="flex flex-col gap-2">
//                     <p className="text-sm text-[#737373] font-normal">Condition</p>
//                     <p className="rounded-2xl text-[10.46px] text-center text-[#1A9E1C] px-2 py-1 w-fit font-medium border border-[#E2FFE3] bg-[#F0FFF6]">
//                       {listingData?.itemCondition || "Unknown"}
//                     </p>
//                   </div>
//                   <div className="flex flex-col gap-2">
//                     <p className="text-sm text-[#737373] font-normal">Category</p>
//                     <p className="rounded-2xl text-center text-xs text-[#222222] w-fit px-2 py-1 font-medium border border-[#737373] bg-white">
//                       {listingData?.categoryName || "Unknown"}
//                     </p>
//                   </div>
//                   <div className="flex flex-col gap-2">
//                     <p className="text-sm text-[#737373] font-normal">Date Listed</p>
//                     <p className="text-xs font-medium text-[#222222]">
//                       {formatDateTime(new Date())}
//                     </p>
//                   </div>
//                 </TabsContent>
//               </Tabs>
//             </div>
//           </CardContent>
//         </Card>
//         <div className="w-full md:w-[40%]">
//           <Card className="mb-4 2xl:mb-6 shadow-none border-none">
//             <CardContent className="p-0 md:p-4 2xl:p-6">
//               {!isMobile && (
//                 <>
//                   <h5 className="text-[#000000] font-medium mb-2 text-2xl">
//                     {listingData?.itemName || "Item Name"}
//                   </h5>
//                   <h6 className="text-[#007AFF] font-medium mb-6 2xl:mb-8 text-xl">
//                     {listingData?.estimatedAmount
//                       ? formatCurrency(
//                           listingData.estimatedAmount,
//                           listingData.estimatedCurrency || "NGN"
//                         )
//                       : "Price not available"}
//                   </h6>
//                 </>
//               )}
//               <div className="bg-[#F7F7F7] py-3 px-4 rounded-[9.94px]">
//                 <h6 className="text-[#000000] text-[13px] font-medium md:text-xl mb-4 2xl:mb-6">
//                   Requested in Exchange
//                 </h6>
//                 <ul className="flex flex-col gap-5">
//                   {exchangeList.map((des, index) => (
//                     <li className="flex gap-2 items-center text-[#737373] text-sm" key={index}>
//                       <span className="w-2 h-2 text-xs p-1.5 border-[1.5px] text-black border-[#000000] rounded-full font-bold flex items-center justify-center">
//                         ?
//                       </span>
//                       {des.description}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </CardContent>
//           </Card>
//           {isFetching ? (
//             <>
//               <div className="flex flex-col gap-3 px-4">
//                 <Skeleton className="h-32 w-full rounded-lg" />
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-3/4" />
//                   <Skeleton className="h-4 w-1/2" />
//                   <Skeleton className="h-4 w-2/3" />
//                 </div>
//               </div>
//             </>
//           ) : userData?.result.userRole[0] === "Visitor" ? (
//             <>
//               <h6 className="text-[14.87px] md:text-xl mb-3 font-medium">About the Swapper</h6>
//               <Card className="mb-4 2xl:mb-6 shadow-none">
//                 <CardContent className="px-2 py-4 2xl:p-6 flex gap-3 items-center">
//                   <Image
//                     className="h-10 w-10 rounded-full"
//                     src={getImageSrcWithFallback(
//                       listingData?.profilePicture ||
//                         "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
//                       profileImageError
//                     )}
//                     height={40}
//                     width={40}
//                     alt="Profile picture"
//                     onError={handleProfileImageError}
//                   />
//                   <div className="me-auto">
//                     <p className="text-[#222222] font-medium text-base">
//                       {listingData?.fullName || listingData?.username || "Unknown User"}
//                     </p>
//                     <div className="flex gap-2 text-[#737373] text-sm items-center">
//                       <p className="flex items-center gap-1">
//                         {listingData?.rating || 0} <Rating />
//                       </p>
//                       <span className="w-1 h-1 rounded-full bg-[#737373]"></span>
//                       <p>{listingData?.swapCount || 0} swaps</p>
//                     </div>
//                   </div>
//                   <Link href={`/profile/${listingData?.userId || "unknown"}`}>
//                     <div className="border border-[#E9E9E9] rounded-2xl gap-1 p-[6px] flex items-center">
//                       <p className="font-medium text-xs text-[#222222]">View profile</p>
//                       <span className="w-4 h-4 rounded-full flex items-center justify-center bg-[#222222]">
//                         <ArrowRight size={12} color="#fff" />
//                       </span>
//                     </div>
//                   </Link>
//                 </CardContent>
//               </Card>
//               <Card className="bg-[#F0FFF6] shadow-none">
//                 <CardContent className="py-3 xp-4 2xl:p-6">
//                   <h6 className="text-[#1A9E1C] font-medium text-xl mb-3">Ready to negotiate?</h6>
//                   <p className="text-[#737373] text-sm mb-3">
//                     Start a conversation with{" "}
//                     {listingData?.fullName || listingData?.username || "the swapper"} to discuss
//                     swap details.
//                   </p>
//                   <Button
//                     onClick={handleNegotiate}
//                     disabled={isStartingSwap}
//                     variant={"default"}
//                     className="rounded-full font-medium text-sm py-3 w-full"
//                     size={"lg"}
//                   >
//                     {isStartingSwap ? "Starting..." : "Negotiate"}
//                   </Button>
//                 </CardContent>
//               </Card>
//             </>
//           ) : (
//             <></>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ListingOverview;

// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import Rating from "@/app/assets/images/svgs/star_rating.svg";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ArrowRight, MoveLeft, X } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import ReactPlayer from "react-player";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useGetListingDetails, useStartSwap } from "@/app/_hooks/queries/listing/listing";
// import {
//   formatCurrency,
//   createImageErrorHandler,
//   getImageSrcWithFallback,
//   formatDateTime,
// } from "@/lib/utils";
// import { Skeleton } from "@/components/ui/skeleton";
// import useIsMobile from "@/app/_hooks/useIsMobile";
// import { useGetUserInfo } from "@/app/_hooks/queries/auth/auth";

// interface ProductOverviewProps {
//   listingId: string;
// }

// const ListingOverview: React.FC<ProductOverviewProps> = ({ listingId }) => {
//   const router = useRouter();
//   const isMobile = useIsMobile();

//   const { data, isLoading, isError, error } = useGetListingDetails({
//     enabler: true,
//     listingId,
//   });

//   const { startSwap, isPending: isStartingSwap } = useStartSwap({
//     listingId,
//     onSuccess: () => {
//       router.push("/chat");
//     },
//   });
//   const { isFetching, data: userData } = useGetUserInfo({ enabler: true });

//   const [activeMediaIndex, setActiveMediaIndex] = useState(0);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [imageError, setImageError] = useState(false);
//   const [profileImageError, setProfileImageError] = useState(false);

//   const handleImageError = createImageErrorHandler(setImageError);
//   const handleProfileImageError = createImageErrorHandler(setProfileImageError);

//   // Extract data from API response safely
//   const listingData = data?.result;
//   const mediaList = listingData?.media || [];
//   const currentMedia = mediaList[activeMediaIndex];
//   const isVideo = currentMedia?.mediaType === "Video";

//   const mediaUrl =
//     currentMedia?.url ||
//     "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80";

//   const handleNegotiate = () => {
//     startSwap();
//   };

//   const productTabList = [
//     {
//       title: "Item Description",
//       value: "item-description",
//     },
//     {
//       title: "Details",
//       value: "details",
//     },
//     {
//       title: "Swap Guideline",
//       value: "swap-guideline",
//     },
//   ];

//   // Use API data for exchange list
//   const exchangeList =
//     listingData?.swapListRequest?.map((item) => ({
//       description: item,
//     })) || [];

//   // Loading skeleton component
//   if (isLoading) {
//     return (
//       <section className="p-6">
//         <Skeleton className="h-6 w-48 mb-6" />
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Left side skeleton */}
//           <Card className="w-full md:w-[60%] overflow-hidden shadow-none">
//             <CardContent className="p-0">
//               <Skeleton className="w-full h-[418px]" />
//               <div className="p-4">
//                 <div className="grid w-full grid-cols-3 gap-2 mb-4">
//                   <Skeleton className="h-10 rounded-[26px]" />
//                   <Skeleton className="h-10 rounded-[26px]" />
//                   <Skeleton className="h-10 rounded-[26px]" />
//                 </div>
//                 <Skeleton className="h-20 w-full" />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Right side skeleton */}
//           <div className="w-full md:w-[40%]">
//             <Card className="mb-4 2xl:mb-6 shadow-none">
//               <CardContent className="p-4 2xl:p-6">
//                 <Skeleton className="h-8 w-3/4 mb-2" />
//                 <Skeleton className="h-6 w-1/2 mb-6" />
//                 <div className="bg-[#F7F7F7] py-3 px-4">
//                   <Skeleton className="h-6 w-48 mb-4" />
//                   <div className="space-y-2">
//                     <Skeleton className="h-4 w-full" />
//                     <Skeleton className="h-4 w-3/4" />
//                     <Skeleton className="h-4 w-1/2" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Skeleton className="h-6 w-32 mb-3" />
//             <Card className="mb-4 2xl:mb-6 shadow-none">
//               <CardContent className="p-4 2xl:p-6 flex gap-3 items-center">
//                 <Skeleton className="h-10 w-10 rounded-full" />
//                 <div className="me-auto">
//                   <Skeleton className="h-4 w-24 mb-2" />
//                   <Skeleton className="h-3 w-16" />
//                 </div>
//                 <Skeleton className="h-8 w-24 rounded-[6px]" />
//               </CardContent>
//             </Card>

//             <Card className="bg-[#F0FFF6] shadow-none">
//               <CardContent className="py-3 px-4 2xl:p-6">
//                 <Skeleton className="h-6 w-40 mb-3" />
//                 <Skeleton className="h-4 w-full mb-3" />
//                 <Skeleton className="h-12 w-full rounded-full" />
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   const handleBack = () => {
//     router.back();
//   };

//   return (
//     <section className="p-6">
//       {isMobile ? (
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-2" onClick={handleBack}>
//             <MoveLeft />
//             <h5 className="text-[#000000] font-medium text-[15px]">
//               {listingData?.itemName || "Item Name"}
//             </h5>
//           </div>
//           <h6 className="text-[#007AFF] font-medium text-xs">
//             {listingData?.estimatedAmount
//               ? formatCurrency(listingData.estimatedAmount, listingData.estimatedCurrency || "NGN")
//               : "Price not available"}
//           </h6>
//         </div>
//       ) : (
//         <h6 className="text-[#007AFF] font-medium mb-6 2xl:mb-8 text-xl">PRODUCT OVERVIEW</h6>
//       )}
//       <div className="flex flex-col md:flex-row gap-6">
//         <Card className="w-full md:w-[60%] overflow-hidden shadow-none">
//           <CardContent className="p-0">
//             {/* Main Media Display (Clickable for Zoom) */}
//             <div
//               onClick={() => setIsZoomed(true)}
//               className="w-full h-[418px] relative bg-black rounded-t-xl overflow-hidden cursor-zoom-in group"
//             >
//               {/* Subtle hover overlay hint */}
//               <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center text-white font-medium text-sm">
//                 Click to view full screen
//               </div>

//               {isVideo ? (
//                 <ReactPlayer
//                   src={mediaUrl}
//                   width="100%"
//                   height="100%"
//                   controls={true}
//                   className="rounded-xl overflow-hidden"
//                   style={{ borderRadius: "12px" }}
//                 />
//               ) : (
//                 <Image
//                   alt="Product Preview"
//                   fill
//                   src={getImageSrcWithFallback(mediaUrl, imageError)}
//                   className="object-cover"
//                   onError={handleImageError}
//                 />
//               )}
//             </div>

//             {/* Thumbnail Preview Horizontal List */}
//             {mediaList.length > 1 && (
//               <div className="flex gap-2 p-4 pb-0 overflow-x-auto scrollbar-none">
//                 {mediaList.map((mediaItem: any, index: number) => {
//                   const isItemVideo = mediaItem.mediaType === "Video";
//                   const isActive = index === activeMediaIndex;

//                   return (
//                     <div
//                       key={index}
//                       onClick={() => {
//                         setActiveMediaIndex(index);
//                         setImageError(false);
//                       }}
//                       className={`relative w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all flex-shrink-0 bg-gray-100
//                         ${isActive ? "border-[#007AFF] scale-95 shadow-sm" : "border-transparent hover:border-gray-300"}`}
//                     >
//                       {isItemVideo ? (
//                         <div className="w-full h-full relative flex items-center justify-center bg-gray-900 text-white">
//                           <span className="bg-black/70 px-1 py-0.5 rounded text-[8px] tracking-wide absolute bottom-1 right-1 z-10 text-white">
//                             Video
//                           </span>
//                           <video
//                             src={mediaItem.url}
//                             className="w-full h-full object-cover opacity-80"
//                             muted
//                           />
//                         </div>
//                       ) : (
//                         <Image
//                           alt={`Thumbnail Preview ${index + 1}`}
//                           fill
//                           src={mediaItem.url}
//                           className="object-cover"
//                         />
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {/* Tabs and Metadata Info */}
//             <div className="p-4">
//               <Tabs defaultValue="item-description" className="w-full !rounded-[26px]">
//                 <TabsList className="grid w-full grid-cols-3">
//                   {productTabList.map((_, index) => (
//                     <TabsTrigger
//                       value={_.value}
//                       className={`rounded-[26px] text-[#222222] text-[10px] md:text-sm`}
//                       key={index}
//                     >
//                       {_.title}
//                     </TabsTrigger>
//                   ))}
//                 </TabsList>
//                 <TabsContent value="item-description">
//                   <p className="text-sm text-[#737373]">
//                     {listingData?.itemDescription || "No description available"}
//                   </p>
//                 </TabsContent>
//                 <TabsContent
//                   value="details"
//                   className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-2"
//                 >
//                   <div className="flex flex-col gap-2">
//                     <p className="text-sm text-[#737373] font-normal">Condition</p>
//                     <p className="rounded-2xl text-[10.46px] text-center text-[#1A9E1C] px-2 py-1 w-fit font-medium border border-[#E2FFE3] bg-[#F0FFF6]">
//                       {listingData?.itemCondition || "Unknown"}
//                     </p>
//                   </div>
//                   <div className="flex flex-col gap-2">
//                     <p className="text-sm text-[#737373] font-normal">Category</p>
//                     <p className="rounded-2xl text-center text-xs text-[#222222] w-fit px-2 py-1 font-medium border border-[#737373] bg-white">
//                       {listingData?.categoryName || "Unknown"}
//                     </p>
//                   </div>
//                   <div className="flex flex-col gap-2">
//                     <p className="text-sm text-[#737373] font-normal">Date Listed</p>
//                     <p className="text-xs font-medium text-[#222222]">
//                       {formatDateTime(new Date())}
//                     </p>
//                   </div>
//                 </TabsContent>
//               </Tabs>
//             </div>
//           </CardContent>
//         </Card>
//         <div className="w-full md:w-[40%]">
//           <Card className="mb-4 2xl:mb-6 shadow-none border-none">
//             <CardContent className="p-0 md:p-4 2xl:p-6">
//               {!isMobile && (
//                 <>
//                   <h5 className="text-[#000000] font-medium mb-2 text-2xl">
//                     {listingData?.itemName || "Item Name"}
//                   </h5>
//                   <h6 className="text-[#007AFF] font-medium mb-6 2xl:mb-8 text-xl">
//                     {listingData?.estimatedAmount
//                       ? formatCurrency(
//                           listingData.estimatedAmount,
//                           listingData.estimatedCurrency || "NGN"
//                         )
//                       : "Price not available"}
//                   </h6>
//                 </>
//               )}
//               <div className="bg-[#F7F7F7] py-3 px-4 rounded-[9.94px]">
//                 <h6 className="text-[#000000] text-[13px] font-medium md:text-xl mb-4 2xl:mb-6">
//                   Requested in Exchange
//                 </h6>
//                 <ul className="flex flex-col gap-5">
//                   {exchangeList.map((des, index) => (
//                     <li className="flex gap-2 items-center text-[#737373] text-sm" key={index}>
//                       <span className="w-2 h-2 text-xs p-1.5 border-[1.5px] text-black border-[#000000] rounded-full font-bold flex items-center justify-center">
//                         ?
//                       </span>
//                       {des.description}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </CardContent>
//           </Card>
//           {isFetching ? (
//             <>
//               <div className="flex flex-col gap-3 px-4">
//                 <Skeleton className="h-32 w-full rounded-lg" />
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-3/4" />
//                   <Skeleton className="h-4 w-1/2" />
//                   <Skeleton className="h-4 w-2/3" />
//                 </div>
//               </div>
//             </>
//           ) : userData?.result.userRole[0] === "Visitor" ? (
//             <>
//               <h6 className="text-[14.87px] md:text-xl mb-3 font-medium">About the Swapper</h6>
//               <Card className="mb-4 2xl:mb-6 shadow-none">
//                 <CardContent className="px-2 py-4 2xl:p-6 flex gap-3 items-center">
//                   <Image
//                     className="h-10 w-10 rounded-full"
//                     src={getImageSrcWithFallback(
//                       listingData?.profilePicture ||
//                         "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
//                       profileImageError
//                     )}
//                     height={40}
//                     width={40}
//                     alt="Profile picture"
//                     onError={handleProfileImageError}
//                   />
//                   <div className="me-auto">
//                     <p className="text-[#222222] font-medium text-base">
//                       {listingData?.fullName || listingData?.username || "Unknown User"}
//                     </p>
//                     <div className="flex gap-2 text-[#737373] text-sm items-center">
//                       <p className="flex items-center gap-1">
//                         {listingData?.rating || 0} <Rating />
//                       </p>
//                       <span className="w-1 h-1 rounded-full bg-[#737373]"></span>
//                       <p>{listingData?.swapCount || 0} swaps</p>
//                     </div>
//                   </div>
//                   <Link href={`/profile/${listingData?.userId || "unknown"}`}>
//                     <div className="border border-[#E9E9E9] rounded-2xl gap-1 p-[6px] flex items-center">
//                       <p className="font-medium text-xs text-[#222222]">View profile</p>
//                       <span className="w-4 h-4 rounded-full flex items-center justify-center bg-[#222222]">
//                         <ArrowRight size={12} color="#fff" />
//                       </span>
//                     </div>
//                   </Link>
//                 </CardContent>
//               </Card>
//               <Card className="bg-[#F0FFF6] shadow-none">
//                 <CardContent className="py-3 xp-4 2xl:p-6">
//                   <h6 className="text-[#1A9E1C] font-medium text-xl mb-3">Ready to negotiate?</h6>
//                   <p className="text-[#737373] text-sm mb-3">
//                     Start a conversation with{" "}
//                     {listingData?.fullName || listingData?.username || "the swapper"} to discuss
//                     swap details.
//                   </p>
//                   <Button
//                     onClick={handleNegotiate}
//                     disabled={isStartingSwap}
//                     variant={"default"}
//                     className="rounded-full font-medium text-sm py-3 w-full"
//                     size={"lg"}
//                   >
//                     {isStartingSwap ? "Starting..." : "Negotiate"}
//                   </Button>
//                 </CardContent>
//               </Card>
//             </>
//           ) : (
//             <></>
//           )}
//         </div>
//       </div>

//       {/* Lightbox Modal for Full Screen Zoom */}
//       {isZoomed && (
//         <div
//           className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-200"
//           onClick={() => setIsZoomed(false)}
//         >
//           {/* Close button */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setIsZoomed(false);
//             }}
//             className="absolute top-6 right-6 text-white hover:bg-white/20 p-2 rounded-full transition-colors z-50"
//           >
//             <X size={24} />
//           </button>

//           {/* Modal Content Frame */}
//           <div
//             className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center"
//             onClick={(e) => e.stopPropagation()} // Prevents closing when clicking the asset itself
//           >
//             {isVideo ? (
//               <ReactPlayer
//                 src={mediaUrl}
//                 width="100%"
//                 height="100%"
//                 controls={true}
//                 playing={true}
//               />
//             ) : (
//               <div className="relative w-full h-full">
//                 <Image
//                   alt="Product Preview Full"
//                   fill
//                   src={getImageSrcWithFallback(mediaUrl, imageError)}
//                   className="object-contain"
//                   onError={handleImageError}
//                   priority
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default ListingOverview;

"use client";

import { Card, CardContent } from "@/components/ui/card";
import Rating from "@/app/assets/images/svgs/star_rating.svg";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, MoveLeft, X, ChevronLeft, ChevronRight, Flag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactPlayer from "react-player";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetListingDetails, useStartSwap } from "@/app/_hooks/queries/listing/listing";
import {
  formatCurrency,
  createImageErrorHandler,
  getImageSrcWithFallback,
  formatDateTime,
  displayRating,
} from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import useIsMobile from "@/app/_hooks/useIsMobile";
import { useGetUserInfo } from "@/app/_hooks/queries/auth/auth";

interface ProductOverviewProps {
  listingId: string;
}

const ListingOverview: React.FC<ProductOverviewProps> = ({ listingId }) => {
  const router = useRouter();
  const isMobile = useIsMobile();

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
  const { isFetching, data: userData } = useGetUserInfo({ enabler: true });

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);

  const handleImageError = createImageErrorHandler(setImageError);
  const handleProfileImageError = createImageErrorHandler(setProfileImageError);

  // Extract data from API response safely
  const listingData = data?.result;
  const mediaList = listingData?.media || [];
  const currentMedia = mediaList[activeMediaIndex];
  const isVideo = currentMedia?.mediaType === "Video";

  const mediaUrl =
    currentMedia?.url ||
    "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80";

  const handleNegotiate = () => {
    if (listingData?.isFlagged) return;
    startSwap();
  };

  // Lightbox navigation controls
  const handlePrevMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageError(false);
    setActiveMediaIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
  };

  const handleNextMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageError(false);
    setActiveMediaIndex((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1));
  };

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
  const exchangeList =
    listingData?.swapListRequest?.map((item) => ({
      description: item,
    })) || [];

  // Loading skeleton component
  if (isLoading) {
    return (
      <section className="p-6">
        <Skeleton className="h-6 w-48 mb-6" />
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left side skeleton */}
          <Card className="w-full md:w-[60%] overflow-hidden shadow-none">
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
          <div className="w-full md:w-[40%]">
            <Card className="mb-4 2xl:mb-6 shadow-none">
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
            <Card className="mb-4 2xl:mb-6 shadow-none">
              <CardContent className="p-4 2xl:p-6 flex gap-3 items-center">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="me-auto">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-8 w-24 rounded-[6px]" />
              </CardContent>
            </Card>

            <Card className="bg-[#F0FFF6] shadow-none">
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

  const handleBack = () => {
    router.back();
  };

  return (
    <section className="p-6">
      {isMobile ? (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2" onClick={handleBack}>
            <MoveLeft />
            <h5 className="text-[#000000] font-medium text-[15px]">
              {listingData?.itemName || "Item Name"}
            </h5>
          </div>
          <h6 className="text-[#007AFF] font-medium text-xs">
            {listingData?.estimatedAmount
              ? formatCurrency(listingData.estimatedAmount, listingData.estimatedCurrency || "NGN")
              : "Price not available"}
          </h6>
        </div>
      ) : (
        <h6 className="text-[#007AFF] font-medium mb-6 2xl:mb-8 text-xl">PRODUCT OVERVIEW</h6>
      )}
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-[60%] overflow-hidden shadow-none">
          <CardContent className="p-0">
            {/* Main Media Display (Clickable for Zoom) */}
            <div
              onClick={() => setIsZoomed(true)}
              className="w-full h-[418px] relative bg-black rounded-t-xl overflow-hidden cursor-zoom-in group"
            >
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center text-white font-medium text-sm pointer-events-none">
                Click to expand view
              </div>

              {listingData?.isFlagged && (
                <div className="absolute top-4 left-4 z-20 bg-[#FFF6F6] gap-1.5 flex items-center rounded-xl px-2.5 py-1.5">
                  <Flag size={14} className="text-[#FF3B30]" />
                  <p className="text-[#FF3B30] text-xs font-medium">Flagged</p>
                </div>
              )}

              {mediaList.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={handlePrevMedia}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={handleNextMedia}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-colors"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}

              {isVideo ? (
                <ReactPlayer
                  src={mediaUrl}
                  width="100%"
                  height="100%"
                  controls={true}
                  className="rounded-xl overflow-hidden"
                  style={{ borderRadius: "12px" }}
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

            {/* Thumbnail Preview Horizontal List */}
            {mediaList.length > 1 && (
              <div className="flex gap-2 p-4 pb-0 overflow-x-auto scrollbar-none">
                {mediaList.map((mediaItem: any, index: number) => {
                  const isItemVideo = mediaItem.mediaType === "Video";
                  const isActive = index === activeMediaIndex;

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setActiveMediaIndex(index);
                        setImageError(false);
                      }}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all flex-shrink-0 bg-gray-100
                        ${isActive ? "border-[#007AFF] scale-95 shadow-sm" : "border-transparent hover:border-gray-300"}`}
                    >
                      {isItemVideo ? (
                        <div className="w-full h-full relative flex items-center justify-center bg-gray-900 text-white">
                          <span className="bg-black/70 px-1 py-0.5 rounded text-[8px] tracking-wide absolute bottom-1 right-1 z-10 text-white">
                            Video
                          </span>
                          <video
                            src={mediaItem.url}
                            className="w-full h-full object-cover opacity-80"
                            muted
                          />
                        </div>
                      ) : (
                        <Image
                          alt={`Thumbnail Preview ${index + 1}`}
                          fill
                          src={mediaItem.url}
                          className="object-cover"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tabs and Metadata Info */}
            <div className="p-4">
              <Tabs defaultValue="item-description" className="w-full !rounded-[26px]">
                <TabsList className="grid w-full grid-cols-3">
                  {productTabList.map((_, index) => (
                    <TabsTrigger
                      value={_.value}
                      className={`rounded-[26px] text-[#222222] text-[10px] md:text-sm`}
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
                <TabsContent
                  value="details"
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-2"
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-[#737373] font-normal">Condition</p>
                    <p className="rounded-2xl text-[10.46px] text-center text-[#1A9E1C] px-2 py-1 w-fit font-medium border border-[#E2FFE3] bg-[#F0FFF6]">
                      {listingData?.itemCondition || "Unknown"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-[#737373] font-normal">Category</p>
                    <p className="rounded-2xl text-center text-xs text-[#222222] w-fit px-2 py-1 font-medium border border-[#737373] bg-white">
                      {listingData?.categoryName || "Unknown"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-[#737373] font-normal">Date Listed</p>
                    <p className="text-xs font-medium text-[#222222]">
                      {formatDateTime(new Date())}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
        <div className="w-full md:w-[40%]">
          <Card className="mb-4 2xl:mb-6 shadow-none border-none">
            <CardContent className="p-0 md:p-4 2xl:p-6">
              {!isMobile && (
                <>
                  <h5 className="text-[#000000] font-medium mb-2 text-2xl">
                    {listingData?.itemName || "Item Name"}
                  </h5>
                  <h6 className="text-[#007AFF] font-medium mb-6 2xl:mb-8 text-xl">
                    {listingData?.estimatedAmount
                      ? formatCurrency(
                          listingData.estimatedAmount,
                          listingData.estimatedCurrency || "NGN"
                        )
                      : "Price not available"}
                  </h6>
                </>
              )}
              <div className="bg-[#F7F7F7] py-3 px-4 rounded-[9.94px]">
                <h6 className="text-[#000000] text-[13px] font-medium md:text-xl mb-4 2xl:mb-6">
                  Requested in Exchange
                </h6>
                <ul className="flex flex-col gap-5">
                  {exchangeList.map((des, index) => (
                    <li className="flex gap-2 items-center text-[#737373] text-sm" key={index}>
                      <span className="w-2 h-2 text-xs p-1.5 border-[1.5px] text-black border-[#000000] rounded-full font-bold flex items-center justify-center">
                        ?
                      </span>
                      {des.description}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          {isFetching ? (
            <>
              <div className="flex flex-col gap-3 px-4">
                <Skeleton className="h-32 w-full rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </>
          ) : userData?.result.userRole[0] === "Visitor" ? (
            <>
              <h6 className="text-[14.87px] md:text-xl mb-3 font-medium">About the Swapper</h6>
              <Card className="mb-4 2xl:mb-6 shadow-none">
                <CardContent className="px-2 py-4 2xl:p-6 flex gap-3 items-center">
                  <Image
                    className="h-10 w-10 rounded-full"
                    src={getImageSrcWithFallback(
                      listingData?.profilePicture ||
                        "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
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
                        {displayRating(listingData?.rating)} <Rating />
                      </p>
                      <span className="w-1 h-1 rounded-full bg-[#737373]"></span>
                      <p>{listingData?.swapCount || 0} swaps</p>
                    </div>
                  </div>
                  <Link href={`/profile/${listingData?.userId || "unknown"}`}>
                    <div className="border border-[#E9E9E9] rounded-2xl gap-1 p-[6px] flex items-center">
                      <p className="font-medium text-xs text-[#222222]">View profile</p>
                      <span className="w-4 h-4 rounded-full flex items-center justify-center bg-[#222222]">
                        <ArrowRight size={12} color="#fff" />
                      </span>
                    </div>
                  </Link>
                </CardContent>
              </Card>
              <Card className="bg-[#F0FFF6] shadow-none">
                <CardContent className="py-3 xp-4 2xl:p-6">
                  <h6 className="text-[#1A9E1C] font-medium text-xl mb-3">Ready to negotiate?</h6>
                  <p className="text-[#737373] text-sm mb-3">
                    Start a conversation with{" "}
                    {listingData?.fullName || listingData?.username || "the swapper"} to discuss
                    swap details.
                  </p>
                  <Button
                    onClick={handleNegotiate}
                    disabled={isStartingSwap || !!listingData?.isFlagged}
                    variant={"default"}
                    className="rounded-full font-medium text-sm py-3 w-full"
                    size={"lg"}
                  >
                    {isStartingSwap ? "Starting..." : "Negotiate"}
                  </Button>
                </CardContent>
              </Card>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Expanded Lightbox Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setIsZoomed(false)}
        >
          {/* Top-right Actions Panel */}
          <div className="absolute top-6 right-6 flex items-center gap-4 z-50">
            {mediaList.length > 1 && (
              <span className="text-gray-400 text-sm font-medium tracking-wider bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                {activeMediaIndex + 1} / {mediaList.length}
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(false);
              }}
              className="text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors backdrop-blur-sm"
            >
              <X size={22} />
            </button>
          </div>

          {/* Left Arrow Controller */}
          {mediaList.length > 1 && (
            <button
              onClick={handlePrevMedia}
              className="absolute left-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all backdrop-blur-sm z-50 transform hover:scale-105"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Maximum Footprint Media Container */}
          <div
            className="relative w-[95vw] h-[90vh] flex items-center justify-center transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {isVideo ? (
              <div className="w-full h-full max-w-6xl max-h-[85vh] overflow-hidden rounded-lg">
                <ReactPlayer
                  src={mediaUrl}
                  width="100%"
                  height="100%"
                  controls={true}
                  playing={true}
                />
              </div>
            ) : (
              <div className="relative w-full h-full">
                <Image
                  alt="Product Preview Full"
                  fill
                  src={getImageSrcWithFallback(mediaUrl, imageError)}
                  className="object-contain"
                  onError={handleImageError}
                  priority
                />
              </div>
            )}
          </div>

          {/* Right Arrow Controller */}
          {mediaList.length > 1 && (
            <button
              onClick={handleNextMedia}
              className="absolute right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all backdrop-blur-sm z-50 transform hover:scale-105"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default ListingOverview;
