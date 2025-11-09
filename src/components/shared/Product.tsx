import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Rating from "@/app/assets/images/svgs/star_rating.svg";
import { FC, useState } from "react";
import { IProduct } from "@/interface/IProduct";
import LoginRequiredModal from "@/components/shared/login-required-modal";
import ReactPlayer from "react-player";
import { formatCurrency, createImageErrorHandler, getImageSrcWithFallback } from "@/lib/utils";
import { useStartSwap } from "@/app/_hooks/queries/listing/listing";
import { useAddToFavourite, useRemoveFromFavourite } from "@/app/_hooks/queries/favourite/favourite";

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
    author,
    name,
    isAuthenticated = true,
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
    swapListRequest && swapListRequest.length > 0 ? swapListRequest.join(", ") : wants || "Open to offers";
  const displayAuthor = username || author || "Unknown";
  const displayPhoto = profilePicture || photo || "https://randomuser.me/api/portraits/thumb/women/1.jpg";

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
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    if (listingId) {
      startSwap();
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
    <div className="flex flex-col rounded-xl shadow-none md:shadow-sm bg-white h-full">
      <div className="relative">
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
          <div className="relative w-full h-[150px] md:h-[250px] rounded-xl overflow-hidden">
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
          className="bg-white absolute top-3 right-3 rounded-full p-1 disabled:opacity-60"
        >
          <Heart size={20} fill={isFav ? "#ef4444" : "none"} color={isFav ? "#ef4444" : "#6b7280"} />
        </button>
      </div>
      <div className="flex flex-col gap-1 mt-2 mb-3">
        <div className="flex justify-between items-center">
          <p className="font-medium text-lg">{displayName}</p>
          <p className="text-[#007AFF] font-medium text-sm">{displayPrice}</p>
        </div>

        <p className="text-[#737373] font-normal text-[13px]">
          <span className="text-[#222222] font-medium text-[13px]">Wants:</span> {displayWants}
        </p>
      </div>

      <div className="flex items-center justify-between border border-[#e3e0e0] px-2 py-2 rounded-xl">
        <div className="flex items-center gap-1">
          <Image
            src={getImageSrcWithFallback(displayPhoto, profileImageError)}
            alt="user photo"
            width={40}
            height={40}
            className="rounded-full"
            onError={handleProfileImageError}
          />
          <p className="text-[#222222] font-medium text-[14px]">{displayAuthor}</p>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-[#222222] font-normal text-[15px]">{rating || "N/A"}</p>
          <Rating />
        </div>
      </div>
      <Button className="w-full rounded-lg mt-4 mb-2" onClick={handleSwap} disabled={isStartingSwap || !listingId}>
        {isStartingSwap ? "Starting..." : "Swap Now"}
      </Button>

      <Link href={`/listing/${listingId}`} className="w-full rounded-lg mb-2 inline-block">
        <Button variant="outline" className="w-full rounded-lg mb-2" disabled={!listingId}>
          View Details
        </Button>
      </Link>

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
