"use client";
import { Card, CardContent } from "@/components/ui/card";
import Rating from "@/app/assets/images/svgs/star_rating.svg";
import HotPick from "@/app/assets/images/svgs/hot_pick.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";
import { useState } from "react";
import { formatCurrency, createImageErrorHandler, getImageSrcWithFallback } from "@/lib/utils";
import { useStartSwap } from "@/app/_hooks/queries/listing/listing";
import { useAddToFavourite, useRemoveFromFavourite } from "@/app/_hooks/queries/favourite/favourite";

interface MediaItem {
  mediaType: "Image" | "Video" | "Img";
  url: string;
}

interface iProps {
  listingId?: string | number;
  listType?: string;
  itemName?: string;
  estimatedCurrency?: string;
  estimatedAmount?: number;
  itemDescription?: string;
  isFavItem?: boolean;
  reviewStage?: string;
  categoryName?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  profilePicture?: string | null;
  username?: string;
  media?: MediaItem[];
  swapListRequest?: string[];
  itemCondition?: string;

  wantList?: { name: string }[];
  imgUrl?: string;
  productName?: string;
  title?: string;
  rating?: number;
  vendorName?: string;
  price?: string | number;
  showHotpick?: boolean;
}

const ProductDetails: React.FC<iProps> = ({
  listingId,
  listType,
  itemName,
  estimatedCurrency,
  estimatedAmount,
  itemDescription,
  isFavItem,
  reviewStage,
  categoryName,
  fullName,
  email,
  phoneNumber,
  profilePicture,
  username,
  media,
  swapListRequest,
  itemCondition,

  // Legacy fields
  imgUrl,
  rating,
  vendorName,
  wantList,
  productName,
  price,
  showHotpick = true,
}) => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);

  const { startSwap, isPending: isStartingSwap } = useStartSwap({
    listingId: listingId?.toString() || "",
    onSuccess: () => {
      router.push("/chat");
    },
  });

  // Favourite toggle (optimistic UI)
  const [isFav, setIsFav] = useState<boolean>(!!isFavItem);
  const { addToFavourite, isPending: isAddingFav } = useAddToFavourite({
    listId: listingId?.toString() || "",
    onSuccess: () => {
      // Keep the optimistic state
    },
    onError: () => {
      // Revert to original state on error
      setIsFav(!!isFavItem);
    },
  });
  const { removeFromFavourite, isPending: isRemovingFav } = useRemoveFromFavourite({
    listId: listingId?.toString() || "",
    onSuccess: () => {
      // Keep the optimistic state
    },
    onError: () => {
      // Revert to original state on error
      setIsFav(!!isFavItem);
    },
  });

  // Data mapping with fallbacks
  const firstMedia = media?.[0];
  const isVideo = firstMedia?.mediaType === "Video";
  const mediaUrl = firstMedia?.url || imgUrl || "https://randomuser.me/api/portraits/thumb/women/6.jpg";
  const displayName = itemName || productName || "Item";
  const displayPrice = estimatedAmount
    ? formatCurrency(estimatedAmount, estimatedCurrency || "NGN")
    : price || "$75,000 Est.";
  const displayWants = swapListRequest || wantList?.map((item) => item.name) || [];
  const displayAuthor = fullName || username || vendorName || "Jenny Franklin";
  const displayPhoto = profilePicture || "https://randomuser.me/api/portraits/thumb/women/6.jpg";

  const handleImageError = createImageErrorHandler(setImageError);
  const handleProfileImageError = createImageErrorHandler(setProfileImageError);

  const handleSwapNow = () => {
    if (listingId) {
      startSwap();
    }
  };

  return (
    <Card className="bg-white w-full flex p-2 cursor-pointer">
      <CardContent className="h-full flex flex-col flex-grow p-0">
        <div className="mb-4 w-full h-[150px] md:h-[250px] relative transition-all duration-200 rounded-xl">
          {isVideo ? (
            <ReactPlayer
              src={typeof mediaUrl === "string" ? mediaUrl : ""}
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
              src={getImageSrcWithFallback(
                typeof mediaUrl === "string" ? mediaUrl : (mediaUrl as any).src || "",
                imageError
              )}
              className="rounded-xl object-cover"
              onError={handleImageError}
            />
          )}
          <div className=" px-4 w-full absolute top-[16px] flex">
            {showHotpick && (
              <div className="bg-[#FFF6F6] gap-2 flex items-center rounded-xl p-[5px]">
                <HotPick />
                <p className="text-[#FF3B30] text-xs"> Hot Picks</p>
              </div>
            )}
            <button
              type="button"
              aria-label="toggle favourite"
              disabled={isAddingFav || isRemovingFav || !listingId}
              onClick={() => {
                if (!listingId) return;
                // Optimistic update - change UI immediately
                setIsFav(!isFav);
                // Then make API call
                if (isFav) {
                  removeFromFavourite();
                } else {
                  addToFavourite();
                }
              }}
              className="ml-auto bg-[#FFF6F6] w-7 h-7 rounded-full flex items-center justify-center disabled:opacity-60"
            >
              <Heart fill={isFav ? "#ef4444" : "none"} color={isFav ? "#ef4444" : "#6b7280"} size={16} />
            </button>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h6 className="text-xl font-medium">{displayName}</h6>
            <p className="font-medium text-[#007AFF]">{displayPrice}</p>
          </div>
          {categoryName && (
            <p className="text-[#007AFF] font-medium text-[12px] bg-[#007AFF]/10 px-2 py-1 rounded-full w-fit mb-3">
              {categoryName}
            </p>
          )}
          <div className="flex items-start gap-2 mb-3">
            <h6 className="text-[#222222] text-sm font-medium">Wants:</h6>
            {displayWants && displayWants?.length > 0 && (
              <ul className="flex justify-center items-center flex-wrap gap-1 text-[#737373] text-sm">
                {displayWants?.map((item, index: number) => (
                  <li key={index} className="flex items-center">
                    {item}
                    {index !== displayWants.length - 1 && (
                      <span className="mx-2 w-1 h-1 rounded-full bg-[#000000]"></span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="rounded-xl mb-6 text-[#222222] gap-2 px-2 p-2 bg-[#FAFAFA] flex items-center justify-between border border-[#E9E9E9]">
            <div className="flex items-center gap-2">
              <Image
                src={getImageSrcWithFallback(displayPhoto, profileImageError)}
                alt="user photo"
                width={24}
                height={24}
                className="rounded-full"
                onError={handleProfileImageError}
              />
              <p className="font-medium">{displayAuthor}</p>
            </div>
            <p className="flex items-center gap-1">
              {rating || 3.5} <Rating />
            </p>
          </div>
          <Button
            onClick={handleSwapNow}
            disabled={isStartingSwap || !listingId}
            variant={"default"}
            className="rounded-lg font-medium text-sm py-3 w-full"
            size={"lg"}
          >
            {isStartingSwap ? "Starting..." : "Swap Now"}
          </Button>

          <Link href={`/listing/${listingId}`} className="w-full mt-2 inline-block">
            <Button
              disabled={!listingId}
              variant={"outline"}
              className="rounded-lg font-medium text-sm py-3 w-full"
              size={"lg"}
            >
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
