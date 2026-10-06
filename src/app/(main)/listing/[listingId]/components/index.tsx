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
import {
  ArrowRight,
  MoveLeft,
  X,
  ChevronLeft,
  ChevronRight,
  Flag,
  Check,
  Copy,
  Share2,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProductOverviewProps {
  listingId: string;
}

const WhatsAppIcon = () => (
  <svg className="h-4 w-4 fill-[#25D366]" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.994 9.994 0 004.779 1.217h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.038-5.176-2.925-7.062A9.925 9.925 0 0012.012 2zm5.835 14.167c-.247.692-1.228 1.282-1.996 1.347-.525.044-1.212.08-3.504-.863-2.931-1.206-4.821-4.18-4.968-4.375-.146-.195-1.196-1.593-1.196-3.039 0-1.446.757-2.158 1.026-2.451.27-.293.585-.366.78-.366.195 0 .39.002.56.01.182.008.427-.069.668.51.248.595.845 2.062.918 2.21.073.148.122.321.024.516-.098.195-.147.317-.293.488-.146.171-.307.382-.439.513-.146.146-.298.305-.128.597.171.293.758 1.25 1.626 2.023 1.115.992 2.057 1.301 2.35 1.447.293.146.463.122.634-.073.171-.195.731-.853.926-1.146.195-.293.39-.244.658-.146.268.098 1.706.804 2.001.951.293.146.488.22.56.341.073.122.073.707-.174 1.399z" />
  </svg>
);

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
  const [copied, setCopied] = useState(false);
  const [showSwapSafetyModal, setShowSwapSafetyModal] = useState(false);

  const handleImageError = createImageErrorHandler(setImageError);
  const handleProfileImageError = createImageErrorHandler(setProfileImageError);

  // Extract data from API response safely
  const listingData = data?.result;
  const mediaList = listingData?.media || [];
  const currentMedia = mediaList[activeMediaIndex];
  const isVideo = currentMedia?.mediaType === "Video";

  const displayName = listingData?.itemName || "Item";

  const productUrl =
    typeof window !== "undefined" && listingId
      ? `${window.location.origin}/listing/${listingId}`
      : "";
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `Check out "${displayName}" for swap on SwapCorrect!\n${productUrl}`
  )}`;

  const mediaUrl =
    currentMedia?.url ||
    "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80";

  const handleNegotiate = () => {
    if (listingData?.isFlagged) return;
    startSwap();
  };

  const handleSwapNow = () => {
    if (listingData?.isFlagged) return;
    // if (!isAuthenticated) {
    //   setShowLoginModal(true);
    //   return;
    // }
    if (listingId) {
      setShowSwapSafetyModal(true);
    }
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

  const handleCopyLink = async () => {
    if (!productUrl) return;

    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be unavailable in insecure contexts.
    }
  };

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

  const handleProceedWithSwap = () => {
    setShowSwapSafetyModal(false);
    if (listingId) {
      // startSwap();
      handleNegotiate();
    }
  };

  return (
    <>
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
                ? formatCurrency(
                    listingData.estimatedAmount,
                    listingData.estimatedCurrency || "NGN"
                  )
                : "Price not available"}
            </h6>
          </div>
        ) : (
          <div
            onClick={handleBack}
            className="flex items-center cursor-pointer mb-6 2xl:mb-8 gap-2"
          >
            <MoveLeft />
            <h6 className="text-[#007AFF] font-medium text-xl">PRODUCT OVERVIEW</h6>
          </div>
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
              {/* <div className="p-4">
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
            </div> */}
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

                  {/* Item Description Tab */}
                  <TabsContent value="item-description">
                    <p className="text-sm text-[#737373]">
                      {listingData?.itemDescription || "No description available"}
                    </p>
                  </TabsContent>

                  {/* Details Tab */}
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

                  {/* Swap Guideline Tab */}
                  <TabsContent value="swap-guideline" className="space-y-4 pt-2">
                    {/* Title & Warning Header */}
                    <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm md:text-base">
                      <span>⚠️</span>
                      <h4>Remote Swap Guideline</h4>
                    </div>

                    <p className="text-xs md:text-sm text-[#737373] italic">
                      Can’t meet in person?
                    </p>

                    {/* Guidelines List */}
                    <ul className="space-y-2.5 text-xs md:text-sm text-[#222222] leading-4">
                      <li className="flex items-start gap-2">
                        <span className="text-[#007AFF] font-bold">•</span>
                        <p>
                          <strong className="font-semibold">Visitor sends first:</strong> Send your
                          agreed item to the swapper using the agreed delivery method.
                        </p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#007AFF] font-bold">•</span>
                        <p>
                          <strong className="font-semibold">Swapper sends after receiving:</strong>{" "}
                          The listed item should be sent once the visitor’s item has been received.
                        </p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#007AFF] font-bold">•</span>
                        <p>
                          <strong className="font-semibold">Track your parcel:</strong> Keep proof
                          of postage and delivery.
                        </p>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#007AFF] font-bold">•</span>
                        <p>
                          <strong className="font-semibold">Communicate:</strong> Keep each other
                          updated about delays or delivery issues.
                        </p>
                      </li>
                    </ul>

                    {/* Important Disclaimer Notice */}
                    <div className="bg-[#FFF8F0] border border-[#FFE3C6] rounded-xl p-3 text-xs text-[#664D03] space-y-1">
                      <p>
                        <strong className="font-semibold">Important:</strong> Remote swaps are
                        arranged directly between users. Swap Correct does not hold or exchange
                        items on your behalf.
                      </p>
                      <p className="font-medium text-red-600">
                        If anything feels suspicious, stop and report it.
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
                {listingData?.reviewStage === "Approved" && (
                  <div className="mb-2 md:mb-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          aria-label="Share listing"
                          disabled={!listingId}
                          onClick={(event) => event.stopPropagation()}
                          className="h-7 w-7 rounded-full text-center bg-[#007AFF] disabled:opacity-60"
                        >
                          <Share2 size={14} className="text-[#fff] mx-auto" />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuPortal>
                        <DropdownMenuContent
                          align="end"
                          sideOffset={4}
                          className="z-50 w-48 rounded-xl border border-[#E9E9E9] bg-white p-1 shadow-lg"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <DropdownMenuItem asChild className="cursor-pointer">
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                            >
                              <WhatsAppIcon />
                              <span>WhatsApp (Status & Chat)</span>
                            </a>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(event) => event.stopPropagation()}
                            onSelect={(event) => {
                              event.preventDefault();
                              void handleCopyLink();
                            }}
                            className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            {copied ? (
                              <Check className="h-4 w-4 text-emerald-600" />
                            ) : (
                              <Copy className="h-4 w-4 text-slate-500" />
                            )}
                            <span>{copied ? "Copied!" : "Copy Link"}</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenuPortal>
                    </DropdownMenu>
                  </div>
                )}
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
            ) : userData?.result.userRole[0] === "Visitor" ||
              userData?.result.userRole[0] === "Swapper" ? (
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
                      onClick={handleSwapNow}
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
      <Dialog open={showSwapSafetyModal} onOpenChange={setShowSwapSafetyModal}>
        <DialogContent className="w-[95vw] max-w-lg rounded-xl p-0">
          <div className="p-6 sm:p-7">
            <DialogHeader className="space-y-3 text-left">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#007AFF]/10 text-[#007AFF]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <DialogTitle className="text-xl font-semibold text-[#222222]">
                Swap Safety Centre
              </DialogTitle>
              <DialogDescription className="text-sm leading-6 text-[#555555]">
                Stay safe when swapping.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-5 space-y-3">
              <h3 className="text-sm font-semibold text-[#222222]">Before you agree to a swap:</h3>
              <ul className="space-y-2.5">
                {[
                  "Check the item and the other user carefully.",
                  "Ask questions about the item’s condition and ownership.",
                  "Meet in a safe, public place when possible.",
                  "Don’t share unnecessary personal or financial information.",
                  "Never send money or valuables unless you fully understand and agree to the arrangement.",
                  "If something feels suspicious, don’t proceed.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-5 text-[#555555]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#007AFF]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="border-l-2 border-[#007AFF] bg-[#007AFF]/5 py-2 pl-3 text-sm leading-5 text-[#555555]">
                Swap Correct provides the platform for users to connect, but each swap is agreed and
                carried out between the users involved.
              </p>
            </div>

            <DialogFooter className="mt-6 gap-2 sm:gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-lg"
                onClick={() => setShowSwapSafetyModal(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="rounded-lg text-white bg-[#222222] hover:bg-[#222222db]"
                onClick={handleProceedWithSwap}
                disabled={isStartingSwap}
              >
                {isStartingSwap ? "Starting..." : "Proceed"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ListingOverview;
