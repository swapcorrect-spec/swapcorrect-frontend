"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import ReactPlayer from "react-player";
import Rating from "@/app/assets/images/svgs/star_rating.svg";
import { getImageSrcWithFallback, createImageErrorHandler } from "@/lib/utils";
import { useDeleteListing } from "@/app/_hooks/queries/listing/listing";
import { useQueryClient } from "@tanstack/react-query";
import { SEARCH_ITEMS } from "@/app/_constants/api_contant";

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

  const { deleteListing, isPending: isDeleting } = useDeleteListing({
    onSuccess: () => {
      setShowDeleteModal(false);
      // Invalidate search query to refetch listings
      queryClient.invalidateQueries({ queryKey: [SEARCH_ITEMS] });
    }
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


  return (
    <div className="rounded-xl hover:border hover:border-[#e3e0e0] cursor-pointer p-2">
      <div className="mb-4 w-full h-[350px] relative transition-all duration-200 rounded-xl">
        {isVideo ? (
          <ReactPlayer
            src={typeof mediaUrl === 'string' ? mediaUrl : ''}
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
            src={getImageSrcWithFallback(typeof mediaUrl === 'string' ? mediaUrl : (mediaUrl as any).src || '', imageError)}
            className="rounded-xl object-cover"
            onError={handleImageError}
          />
        )}
      </div>
      <div className="flex flex-col gap-1 mt-2 mb-3">
        <div className="flex justify-between items-center">
          <h6 className="text-xl font-medium">{name}</h6>
          <p className="text-[#222222] rounded-full font-medium text-xs px-2 py-1 border border-[#E9E9E9]">
            {status}
          </p>
        </div>
        {categoryName && (
          <p className="text-[#007AFF] font-medium text-[12px] bg-[#007AFF]/10 px-2 py-1 rounded-full w-fit mb-1">
            {categoryName}
          </p>
        )}
        <p className="text-[#737373] text-sm font-normal">{description}</p>
        <div className="flex justify-between items-center my-2">
          <p className="font-medium text-[#007AFF]">{price}</p>
          <span className="text-[#222222] bg-[#FAFAFA] rounded-full text-xs px-2 py-1 border border-[#E9E9E9]">
            {type}
          </span>
        </div>
        <div className="flex items-start gap-2 mb-2">
          <h6 className="text-[#222222] text-sm font-medium">Wants:</h6>
          {wants && wants.length > 0 ? (
            <ul className="flex justify-center items-center flex-wrap gap-1 text-[#737373] text-sm">
              {wants.map((item, index: number) => (
                <li key={index} className="flex items-center">
                  {item}
                  {index !== wants.length - 1 && (
                    <span className="mx-2 w-1 h-1 rounded-full bg-[#000000]"></span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-[#737373] text-sm">None</span>
          )}
        </div>
      </div>
      <div className="rounded-xl mb-4 text-[#222222] gap-2 px-2 p-2 bg-[#FAFAFA] flex items-center justify-between border border-[#E9E9E9]">
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
          {displayRating.toFixed(1)} <Rating />
        </p>
      </div>
      <div className="flex items-center justify-between">
        {listingId ? (
          <Link href={`/item-listing/${listingId}`}>
            <Button className="" variant={"outline"}>Edit</Button>
          </Link>
        ) : (
          <Button className="" variant={"outline"} disabled>Edit</Button>
        )}
        <Button variant={"outline"} onClick={() => setShowDeleteModal(true)}>
          Delete
        </Button>
        {listingId ? (
          <Link href={`/listing/${listingId}`}>
            <Button variant={"outline"}>View</Button>
          </Link>
        ) : (
          <Button variant={"outline"} disabled>View</Button>
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
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
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
