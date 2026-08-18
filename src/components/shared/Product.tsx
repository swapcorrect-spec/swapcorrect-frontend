import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, Info, Flag } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import Rating from "@/app/assets/images/svgs/star_rating.svg";
import { FC, useState } from "react";
import { IProduct } from "@/interface/IProduct";
import LoginRequiredModal from "@/components/shared/login-required-modal";
import ReactPlayer from "react-player";
import { formatCurrency, createImageErrorHandler, getImageSrcWithFallback, displayRating } from "@/lib/utils";
import { useStartSwap } from "@/app/_hooks/queries/listing/listing";
import {
  useAddToFavourite,
  useRemoveFromFavourite,
} from "@/app/_hooks/queries/favourite/favourite";
import { Avatar, AvatarImage } from "../ui/avatar";

type Props = Prettify<Omit<IProduct, "id">> & {
  isAuthenticated?: boolean;
};

const Product: FC<Props> = (props) => {
  const {
    listingId,
    itemName,
    estimatedAmount,
    estimatedCurrency,
    media,
    profilePicture,
    username,
    swapListRequest,
    isFavItem,
    image,
    photo,
    price,
    rating,
    wants,
    name,
    isAuthenticated = true,
    fullName,
    isFlagged = false,
  } = props;
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);

  const firstMedia = media && media.length > 0 ? media[0] : null;
  const isVideo = firstMedia?.mediaType === "Video";
  const mediaUrl =
    firstMedia?.url ||
    image ||
    "https://plus.unsplash.com/premium_photo-1664537979073-a467fa628555?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2371";

  const displayName = itemName || name || "Item";
  const displayPrice = estimatedAmount
    ? formatCurrency(estimatedAmount, estimatedCurrency || "NGN")
    : price || "Price not set";
  const displayWants =
    swapListRequest && swapListRequest.length > 0
      ? swapListRequest.join(", ")
      : wants || "Open to offers";
  const displayAuthor = fullName || username || "Unknown";
  const displayPhoto =
    profilePicture ||
    photo ||
    "https://images.unsplash.com/vector-1742875355318-00d715aec3e8?q=80&w=1480&auto=format&fit=crop";

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

  // Handle image load errors using utility functions
  const handleImageError = createImageErrorHandler(setImageError);
  const handleProfileImageError = createImageErrorHandler(setProfileImageError);

  const handleSwap = () => {
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
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
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
    <div className="flex flex-col rounded-xl border border-[#E9E9E9] shadow-[0_2px_12px_rgba(0,0,0,0.06)] bg-white h-full p-2.5">
      <div className="relative shrink-0">
        {isVideo ? (
          <div className="relative w-full h-[150px] md:h-[250px] rounded-xl overflow-hidden">
            <ReactPlayer
              src={typeof mediaUrl === "string" ? mediaUrl : ""}
              width="100%"
              height="100%"
              controls
              className="react-player"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={handleViewDetails}
            disabled={!listingId}
            aria-label="View listing details"
            className="relative w-full h-[150px] md:h-[250px] rounded-xl overflow-hidden cursor-pointer disabled:cursor-default"
          >
            <Image
              src={getImageSrcWithFallback(
                typeof mediaUrl === "string" ? mediaUrl : (mediaUrl as any).src || "",
                imageError
              )}
              alt="Product Preview"
              fill
              className="object-cover"
              onError={handleImageError}
            />
          </button>
        )}

        {isFlagged && (
          <div className="absolute top-3 left-3 z-10 bg-[#FFF6F6] gap-1.5 flex items-center rounded-xl px-2 py-1">
            <Flag size={12} className="text-[#FF3B30]" />
            <p className="text-[#FF3B30] text-xs font-medium">Flagged</p>
          </div>
        )}

        <button
          type="button"
          aria-label="toggle favourite"
          disabled={isAddingFav || isRemovingFav || !listingId}
          onClick={() => {
            if (!isAuthenticated) {
              setShowLoginModal(true);
              return;
            }
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
          className="bg-white absolute top-3 right-3 rounded-full p-1 disabled:opacity-60 z-10"
        >
          <Heart
            size={20}
            fill={isFav ? "#ef4444" : "none"}
            color={isFav ? "#ef4444" : "#6b7280"}
          />
        </button>
      </div>
      <div className="flex flex-col gap-1 mt-2 mb-2 flex-1 min-h-0">
        <div className="flex justify-between items-start gap-2 w-full min-h-[28px]">
          <p className="font-medium text-lg leading-7 truncate min-w-0 flex-1">{displayName}</p>

          <Popover.Root>
            <Popover.Trigger asChild>
              <button
                type="button"
                className="text-[#007AFF] font-medium text-sm underline shrink-0 whitespace-nowrap pt-0.5"
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

        <div className="flex items-start gap-1 text-[13px] min-h-[40px]">
          <span className="text-[#222222] font-bold text-xs shrink-0 leading-5 flex items-center gap-1">
            {(swapListRequest?.length ?? 0) > 1 && (
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
                    <span className="font-semibold">Wants:</span> The user would like to exchange any
                    of the listed items.
                    <Popover.Arrow className="fill-black" width={10} height={6} />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            )}
            Wants:
          </span>
          <span className="text-[#737373] line-clamp-2 leading-5">{displayWants}</span>
        </div>
      </div>

      <div className="mt-auto shrink-0">
        <div className="flex items-center justify-between border border-[#e3e0e0] px-2 py-1.5 rounded-xl mb-3">
          <div className="flex items-center gap-1 min-w-0">
            <Avatar>
              <AvatarImage src={getImageSrcWithFallback(displayPhoto, profileImageError) as string} />
            </Avatar>
            <p className="text-[#222222] font-medium text-[14px] truncate">{displayAuthor}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <p className="text-[#222222] font-normal text-[15px]">{displayRating(rating)}</p>
            <Rating />
          </div>
        </div>
        {!isFlagged && (
          <Button
            className="w-full rounded-lg mb-1.5"
            onClick={handleSwap}
            disabled={isStartingSwap || !listingId}
          >
            {isStartingSwap ? "Starting..." : "Swap Now"}
          </Button>
        )}

        <Button
          variant="outline"
          className={`w-full rounded-lg mb-1 ${isFlagged ? "mt-0" : ""}`}
          disabled={!listingId}
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </div>

      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
        title="Login Required to Swap"
        description="You need to be logged in to swap items. Please sign in to continue with your swap and start trading!"
        actionText="Go to Login"
      />
    </div>
  );
};

export default Product;
