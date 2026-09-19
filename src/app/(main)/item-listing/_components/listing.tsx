"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import ReactPlayer from "react-player";
import { Check, Copy, Share2 } from "lucide-react";
import Rating from "@/app/assets/images/svgs/star_rating.svg";
import { getImageSrcWithFallback, createImageErrorHandler } from "@/lib/utils";
import { useDeleteListing } from "@/app/_hooks/queries/listing/listing";
import { useQueryClient } from "@tanstack/react-query";
import { SEARCH_ITEMS } from "@/app/_constants/api_contant";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

interface MediaItem {
  mediaType: "Image" | "Video" | "Img";
  url: string;
}

type Props = {
  listingId?: string;
  name: string;
  status: string;
  description: string;
  price: string;
  type: string;
  date: string;
  wants: string[];
  categoryName?: string;
  media?: MediaItem[];
  profilePicture?: string | null;
  fullName?: string;
  username?: string;
  rating?: number;
};

// Simple WhatsApp Icon SVG component
const WhatsAppIcon = () => (
  <svg className="w-4 h-4 fill-[#25D366]" viewBox="0 0 24 24">
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.994 9.994 0 004.779 1.217h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.038-5.176-2.925-7.062A9.925 9.925 0 0012.012 2zm5.835 14.167c-.247.692-1.228 1.282-1.996 1.347-.525.044-1.212.08-3.504-.863-2.931-1.206-4.821-4.18-4.968-4.375-.146-.195-1.196-1.593-1.196-3.039 0-1.446.757-2.158 1.026-2.451.27-.293.585-.366.78-.366.195 0 .39.002.56.01.182.008.427-.069.668.51.248.595.845 2.062.918 2.21.073.148.122.321.024.516-.098.195-.147.317-.293.488-.146.171-.307.382-.439.513-.146.146-.298.305-.128.597.171.293.758 1.25 1.626 2.023 1.115.992 2.057 1.301 2.35 1.447.293.146.463.122.634-.073.171-.195.731-.853.926-1.146.195-.293.39-.244.658-.146.268.098 1.706.804 2.001.951.293.146.488.22.56.341.073.122.073.707-.174 1.399z" />
  </svg>
);

const Listing: FC<Props> = ({
  listingId,
  name,
  description,
  price,
  status,
  type,
  wants,
  categoryName,
  media,
  profilePicture,
  fullName,
  username,
  rating,
}) => {
  const queryClient = useQueryClient();
  const [imageError, setImageError] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const { deleteListing, isPending: isDeleting } = useDeleteListing({
    onSuccess: () => {
      setShowDeleteModal(false);
      // Invalidate search query to refetch listings
      queryClient.invalidateQueries({ queryKey: [SEARCH_ITEMS] });
    },
  });

  // Get first media item
  const firstMedia = media?.[0];
  const isVideo = firstMedia?.mediaType === "Video";
  const mediaUrl = firstMedia?.url || "https://randomuser.me/api/portraits/thumb/women/6.jpg";
  const displayPhoto = profilePicture || "https://randomuser.me/api/portraits/thumb/women/6.jpg";
  const displayAuthor = fullName || username || "User";
  const displayRating = rating || 0;

  const handleImageError = createImageErrorHandler(setImageError);
  const handleProfileImageError = createImageErrorHandler(setProfileImageError);

  const handleDelete = () => {
    if (listingId) {
      deleteListing(listingId);
    }
  };

  const productUrl =
    typeof window !== "undefined" ? `${window.location.origin}/listing/${listingId}` : "";
  const shareText = `Check out "${name}" for swap on SwapCorrect! 👇\n${productUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  const handleCopyLink = () => {
    if (productUrl) {
      navigator.clipboard.writeText(productUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-xl hover:border hover:border-[#e3e0e0] cursor-pointer p-1.5">
      <div className="mb-2 w-full h-[140px] md:h-[160px] relative transition-all duration-200 rounded-xl overflow-hidden">
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
      </div>
      <div className="flex flex-col gap-1 mt-1 mb-2">
        <div className="flex justify-between items-center gap-2">
          <h6 className="text-base font-medium truncate">{name}</h6>
          <p className="text-[#222222] rounded-full font-medium text-[10px] px-2 py-0.5 border border-[#E9E9E9] shrink-0">
            {status}
          </p>
        </div>
        {categoryName && (
          <p className="text-[#007AFF] font-medium text-[11px] bg-[#007AFF]/10 px-2 py-0.5 rounded-full w-fit">
            {categoryName}
          </p>
        )}
        <p className="text-[#737373] text-xs font-normal line-clamp-2">{description}</p>
        <div className="flex justify-between items-center my-1">
          <p className="font-medium text-sm text-[#007AFF]">{price}</p>
          <span className="text-[#222222] bg-[#FAFAFA] rounded-full text-[10px] px-2 py-0.5 border border-[#E9E9E9]">
            {type}
          </span>
        </div>
        <div className="flex items-start gap-1.5 mb-1 min-h-[20px]">
          <h6 className="text-[#222222] text-xs font-medium shrink-0">Wants:</h6>
          {wants && wants.length > 0 ? (
            <ul className="flex items-center flex-wrap gap-1 text-[#737373] text-xs">
              {wants.map((item, index: number) => (
                <li key={index} className="flex items-center">
                  {item}
                  {index !== wants.length - 1 && (
                    <span className="mx-1.5 w-1 h-1 rounded-full bg-[#000000]"></span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-[#737373] text-xs">None</span>
          )}
        </div>
      </div>
      <div className="rounded-lg mb-2 text-[#222222] gap-2 px-2 py-1.5 bg-[#FAFAFA] flex items-center justify-between border border-[#E9E9E9]">
        <div className="flex items-center gap-2 min-w-0">
          <Avatar className="h-7 w-7">
            <AvatarImage src={getImageSrcWithFallback(displayPhoto, profileImageError) as string} />
          </Avatar>
          <p className="font-medium text-sm truncate">{displayAuthor}</p>
        </div>
        <p className="flex items-center gap-1 text-xs shrink-0">
          {displayRating.toFixed(1)} <Rating />
        </p>
      </div>
      <div className="flex items-center justify-between gap-1.5">
        {listingId ? (
          <Link href={`/item-listing/${listingId}`}>
            <Button className="!h-8 text-xs px-3" variant={"outline"}>
              Edit
            </Button>
          </Link>
        ) : (
          <Button className="!h-8 text-xs px-3" variant={"outline"} disabled>
            Edit
          </Button>
        )}
        <Button
          className="!h-8 text-xs px-3"
          variant={"outline"}
          onClick={() => setShowDeleteModal(true)}
        >
          Delete
        </Button>
        {listingId ? (
          <Link href={`/listing/${listingId}`}>
            <Button className="!h-8 text-xs px-3" variant={"outline"}>
              View
            </Button>
          </Link>
        ) : (
          <Button className="!h-8 text-xs px-3" variant={"outline"} disabled>
            View
          </Button>
        )}
        {status !== "Pending" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="!h-8 text-xs px-3 flex items-center gap-1.5" variant={"outline"}>
                <Share2 className="w-3.5 h-3.5 text-slate-600" />
                <span>Share</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-48 bg-white border border-[#E9E9E9] p-1 shadow-lg rounded-xl"
            >
              <DropdownMenuItem asChild className="cursor-pointer">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  <WhatsAppIcon />
                  <span>WhatsApp (Status & Chat)</span>
                </a>
              </DropdownMenuItem>

              {/* Copy Link Option */}
              <DropdownMenuItem
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-500" />
                )}
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* <Button variant={"outline"}>Feature</Button> */}
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Listing</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{name}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Deleting...
                </div>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Listing;
