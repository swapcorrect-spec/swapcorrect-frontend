import { Star } from "lucide-react";
import Image from "next/image";
import { getImageSrcWithFallback, createImageErrorHandler } from "@/lib/utils";
import { useState } from "react";
import { UserReviewItem } from "@/app/_hooks/queries/review/review.type";

type ReviewsProps = {
  review: UserReviewItem;
};

const getReviewerName = (review: UserReviewItem) => {
  if (review.raterFullName) return review.raterFullName;
  if (review.fullName) return review.fullName;
  if (review.firstName || review.lastName) {
    return `${review.firstName || ""} ${review.lastName || ""}`.trim();
  }
  return review.raterName || review.userName || review.username || "Anonymous";
};

const getReviewDate = (review: UserReviewItem) => {
  const raw = review.created || review.createdAt || review.dateCreated;
  if (!raw) return "";
  try {
    const date = new Date(raw);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

const Reviews: React.FC<ReviewsProps> = ({ review }) => {
  const [imageError, setImageError] = useState(false);
  const score = review.rateScore ?? review.rating ?? 0;
  const name = getReviewerName(review);
  const photo =
    review.raterProfilePicture ||
    review.profilePicture ||
    "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="border-[#E9E9E9] border p-2 rounded-md w-full">
      <div className="flex items-center gap-3 w-full mb-1">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F4CE9B]">
          <Image
            src={getImageSrcWithFallback(photo, imageError)}
            height={32}
            width={32}
            alt={name}
            className="w-8 h-8 rounded-full object-cover"
            onError={createImageErrorHandler(setImageError)}
          />
        </div>
        <div className="me-auto">
          <h5 className="text-[#222222] text-sm font-medium">{name}</h5>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => {
            const filled = index < score;
            return (
              <Star
                key={index}
                size={12}
                className={filled ? "fill-[#F5A524] text-[#F5A524]" : "text-[#D1D5DB]"}
              />
            );
          })}
        </div>
      </div>
      <p className="text-sm text-[#222222] font-medium mb-1">
        {review.description || "No comment provided."}
      </p>
      {getReviewDate(review) && (
        <p className="text-[#737373] text-xs">{getReviewDate(review)}</p>
      )}
    </div>
  );
};

export default Reviews;
