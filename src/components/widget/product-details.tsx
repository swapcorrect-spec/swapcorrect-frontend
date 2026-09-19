"use client";
import { Card, CardContent } from "@/components/ui/card";
import Rating from "@/app/assets/images/svgs/star_rating.svg";
import HotPick from "@/app/assets/images/svgs/hot_pick.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Heart, Info, Flag } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";
import { useState } from "react";
import {
  formatCurrency,
  createImageErrorHandler,
  getImageSrcWithFallback,
  displayRating,
} from "@/lib/utils";
import { useStartSwap } from "@/app/_hooks/queries/listing/listing";
import {
  useAddToFavourite,
  useRemoveFromFavourite,
} from "@/app/_hooks/queries/favourite/favourite";
import * as Popover from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import LoginRequiredModal from "../shared/login-required-modal";
import { useAuth } from "@/app/_context/auth-context";

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
  isFlagged?: boolean;
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
  isFlagged = false,
}) => {
  const router = useRouter();
  const { isAuthenticated, isHydrated } = useAuth();

  const [imageError, setImageError] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // const loggedIn = isHydrated && isAuthenticated;

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
    if (isFlagged) return;
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    if (listingId) {
      startSwap();
    }
  };

  const handleViewDetails = () => {
    if (listingId) {
      router.push(`/listing/${listingId}`);
    }
  };

  const handleLogin = () => {
    setShowLoginModal(false);
    router.push("/login");
  };
  const handleSignup = () => {
    setShowLoginModal(false);
    router.push("/signup");
  };

  return (
    <>
      <Card className="bg-white w-full h-full flex flex-col p-2 sm:p-2.5 cursor-pointer border border-[#E9E9E9] shadow-[0_2px_12px_rgba(0,0,0,0.06)] rounded-xl overflow-hidden">
        <CardContent className="h-full flex flex-col flex-grow p-0">
          <div
            className="mb-2 w-full h-[130px] sm:h-[160px] md:h-[220px] relative transition-all duration-200 rounded-xl shrink-0"
            onClick={handleViewDetails}
            role="button"
            tabIndex={listingId ? 0 : -1}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleViewDetails();
              }
            }}
            aria-label="View listing details"
          >
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
            <div className="px-2 sm:px-4 w-full absolute top-[10px] sm:top-[16px] flex items-center gap-1.5 sm:gap-2">
              {showHotpick && (
                <div className="bg-[#FFF6F6] gap-1.5 sm:gap-2 flex items-center rounded-xl px-1.5 py-1 sm:p-[5px]">
                  <HotPick />
                  <p className="text-[#FF3B30] text-[10px] sm:text-xs"> Hot Picks</p>
                </div>
              )}
              {isFlagged && (
                <div className="bg-[#FFF6F6] gap-1 flex items-center rounded-xl px-1.5 py-1">
                  <Flag size={12} className="text-[#FF3B30]" />
                  <p className="text-[#FF3B30] text-[10px] sm:text-xs font-medium">Flagged</p>
                </div>
              )}
              <button
                type="button"
                aria-label="toggle favourite"
                disabled={isAddingFav || isRemovingFav || !listingId}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!listingId) return;
                  setIsFav(!isFav);
                  if (isFav) {
                    removeFromFavourite();
                  } else {
                    addToFavourite();
                  }
                }}
                className="ml-auto bg-[#FFF6F6] w-7 h-7 rounded-full flex items-center justify-center disabled:opacity-60 shrink-0"
              >
                <Heart
                  fill={isFav ? "#ef4444" : "none"}
                  color={isFav ? "#ef4444" : "#6b7280"}
                  size={16}
                />
              </button>
            </div>
          </div>

          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex justify-between items-start gap-1.5 w-full">
              <h6 className="text-base sm:text-lg md:text-xl font-medium leading-6 sm:leading-7 truncate min-w-0 flex-1">
                {displayName}
              </h6>

              <Popover.Root>
                <Popover.Trigger asChild>
                  <button
                    type="button"
                    className="text-[#007AFF] font-medium text-xs sm:text-sm underline shrink-0 whitespace-nowrap pt-0.5"
                  >
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
              <p className="text-[#007AFF] font-medium text-[10px] sm:text-[12px] bg-[#007AFF]/10 px-2 py-0.5 sm:py-1 rounded-full w-fit my-1">
                {categoryName}
              </p>
            )}

            <div className="flex items-start gap-1 mb-2">
              <span className="text-[#222222] font-bold text-xs shrink-0 leading-5 flex items-center gap-1">
                {displayWants.length > 1 && (
                  <Popover.Root>
                    <Popover.Trigger asChild>
                      <button
                        type="button"
                        aria-label="Wants information"
                        className="text-[#007AFF] hover:text-[#0056b3]"
                      >
                        <Info size={14} />
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
                        <span className="font-semibold">Wants:</span> The user would like to
                        exchange any of the listed items.
                        <Popover.Arrow className="fill-black" width={10} height={6} />
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                )}
                Wants:
              </span>

              <div className="text-[#737373] min-w-0 flex-1">
                {displayWants && displayWants.length > 0 ? (
                  <p className="text-xs sm:text-sm text-[#737373] leading-5 line-clamp-2 capitalize">
                    {displayWants.join(", ")}
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm text-[#737373] leading-5">Open to offers</p>
                )}
              </div>
            </div>

            <div className="mt-auto shrink-0">
              <div className="rounded-xl mb-2 text-[#222222] gap-2 px-2 py-1 bg-[#FAFAFA] flex items-center justify-between border border-[#E9E9E9]">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                    <AvatarImage
                      src={getImageSrcWithFallback(displayPhoto, profileImageError) as string}
                    />
                  </Avatar>
                  <p className="font-medium text-xs sm:text-sm truncate">{displayAuthor}</p>
                </div>
                <p className="flex items-center gap-1 text-xs shrink-0">
                  {displayRating(rating)} <Rating />
                </p>
              </div>

              {!isFlagged && (
                <Button
                  onClick={handleSwapNow}
                  disabled={isStartingSwap || !listingId}
                  variant={"default"}
                  className="bg-[#007AFF] hover:bg-[#0062cc] rounded-lg font-medium text-xs sm:text-sm !h-8 sm:!h-10 py-1.5 w-full"
                  size={"lg"}
                >
                  {isStartingSwap ? "Starting..." : "Swap Now"}
                </Button>
              )}

              <Link
                href={`/listing/${listingId}`}
                className={`w-full inline-block ${isFlagged ? "mt-0" : "mt-1.5"}`}
              >
                <Button
                  disabled={!listingId}
                  variant={"outline"}
                  className="rounded-lg font-medium text-xs sm:text-sm !h-8 sm:!h-10 py-1.5 w-full"
                  size={"lg"}
                >
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
        title="Login Required to Swap"
        description="You need to be logged in to swap items. Please sign in to continue with your swap and start trading!"
        actionText="Go to Login"
      />
    </>
  );
};

export default ProductDetails;
