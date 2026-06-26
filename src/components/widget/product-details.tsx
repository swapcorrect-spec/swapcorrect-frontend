"use client";
import { Card, CardContent } from "@/components/ui/card";
import Rating from "@/app/assets/images/svgs/star_rating.svg";
import HotPick from "@/app/assets/images/svgs/hot_pick.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Heart, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";
import { useState } from "react";
import { formatCurrency, createImageErrorHandler, getImageSrcWithFallback } from "@/lib/utils";
import { useStartSwap } from "@/app/_hooks/queries/listing/listing";
import {
  useAddToFavourite,
  useRemoveFromFavourite,
} from "@/app/_hooks/queries/favourite/favourite";
import * as Popover from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "../ui/avatar";

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
  const mediaUrl =
    firstMedia?.url || imgUrl || "https://randomuser.me/api/portraits/thumb/women/6.jpg";
  const displayName = itemName || productName || "Item";
  const displayPrice = estimatedAmount
    ? formatCurrency(estimatedAmount, estimatedCurrency || "NGN")
    : price || "$75,000 Est.";
  const displayWants = swapListRequest || wantList?.map((item) => item.name) || [];
  const displayAuthor = fullName || username || vendorName || "Jenny Franklin";
  const displayPhoto =
    profilePicture ||
    "https://images.unsplash.com/vector-1742875355318-00d715aec3e8?q=80&w=1480&auto=format&fit=crop";

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
              <Heart
                fill={isFav ? "#ef4444" : "none"}
                color={isFav ? "#ef4444" : "#6b7280"}
                size={16}
              />
            </button>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center w-full">
            <h6 className="text-xl font-medium">{displayName}</h6>

            <Popover.Root>
              <Popover.Trigger asChild>
                <button type="button" className="text-[#007AFF] font-medium text-sm underline">
                  View Est. Value
                </button>
              </Popover.Trigger>

              <Popover.Portal>
                <Popover.Content
                  side="left"
                  align="center"
                  sideOffset={8}
                  collisionPadding={12}
                  className="z-50 rounded-md bg-black px-3 py-2 text-sm text-white shadow-lg font-bold"
                >
                  {displayPrice}
                  <Popover.Arrow className="fill-black" width={12} height={6} />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
          {categoryName && (
            <p className="text-[#007AFF] font-medium text-[12px] bg-[#007AFF]/10 px-2 py-1 rounded-full w-fit mb-3">
              {categoryName}
            </p>
          )}
          <div className="flex items-center gap-2 mb-3">
            {displayWants.length > 1 && (
              <Popover.Root>
                <Popover.Trigger asChild>
                  <button
                    type="button"
                    aria-label="Wants information"
                    className="mt-[1px] text-[#737373] hover:text-[#222222] flex items-center gap-1"
                  >
                    <Info size={14} color="blue" />
                    <span className="text-[#222222] font-bold text-xs">Wants:</span>
                  </button>
                </Popover.Trigger>

                <Popover.Portal>
                  <Popover.Content
                    side="top"
                    align="start"
                    sideOffset={6}
                    collisionPadding={12}
                    className="z-50 max-w-[240px] rounded-md bg-black px-3 py-2 text-xs text-white shadow-lg"
                  >
                    <span className="font-semibold">Wants:</span> The user would like to exchange
                    any of the listed items.
                    <Popover.Arrow className="fill-black" width={10} height={6} />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            )}
            {displayWants.length === 1 && (
              <span className="text-[#222222] font-bold text-xs">Wants:</span>
            )}

            <div className="text-[#737373]">
              {displayWants && displayWants.length > 0 && (
                <ul className="flex flex-wrap items-center gap-2 text-sm text-[#737373] leading-none">
                  {displayWants.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="capitalize">{item}</span>
                      {index !== displayWants.length - 1 && (
                        <span className="mx-2 h-1 w-1 rounded-full bg-black" />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="rounded-xl mb-6 text-[#222222] gap-2 px-2 p-2 bg-[#FAFAFA] flex items-center justify-between border border-[#E9E9E9]">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={getImageSrcWithFallback(displayPhoto, profileImageError) as string}
                />
              </Avatar>
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
