"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  createImageErrorHandler,
  formatSwapStatus,
  getImageSrcWithFallback,
  getStatusColor,
} from "@/lib/utils";
import MomentAgo from "@/components/moment-ago";

export interface SwapCardItemData {
  name: string;
  item: string;
  time: string;
  roomName: string | null;
  status: string;
  type: string;
  image: string | null;
  key: string;
  requestItem?: string;
  roleLabel?: string;
}

interface SwapCardItemProps {
  item: SwapCardItemData;
  getStatusColor?: (status: string) => string;
}

const SwapCardItem: FC<SwapCardItemProps> = ({ item, getStatusColor: getColor = getStatusColor }) => {
  const router = useRouter();
  const [itemImageError, setItemImageError] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);

  const displayStatus = formatSwapStatus(item.status);
  const profileSrc = getImageSrcWithFallback(item.image || "", profileImageError);
  const thumbSrc = getImageSrcWithFallback(item.image || "", itemImageError);
  const hasRoom = Boolean(item.roomName);

  const handleCardClick = () => {
    if (!item.roomName) return;
    router.push(`/chat?roomName=${encodeURIComponent(item.roomName)}`);
  };

  return (
    <Card
      className={`shadow-none border border-[#E9E9E9] transition-colors ${
        hasRoom ? "cursor-pointer hover:border-[#007AFF]/50 hover:bg-[#F8FBFF]" : ""
      }`}
      onClick={handleCardClick}
      role={hasRoom ? "link" : undefined}
      tabIndex={hasRoom ? 0 : undefined}
      onKeyDown={(e) => {
        if (!hasRoom) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <CardContent className="p-3 flex gap-3 items-center">
        <div className="w-[66px] h-[66px] rounded-lg overflow-hidden bg-[#F5F5F5] shrink-0">
          <Image
            className="w-full h-full object-cover"
            src={thumbSrc}
            height={66}
            width={66}
            alt={item.name || "Swap counterpart"}
            onError={createImageErrorHandler(setItemImageError)}
          />
        </div>

        <div className="mr-auto min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <p className="text-black font-medium text-base truncate">{item.item}</p>
            <span
              className={`border rounded-full py-0.5 px-2.5 text-[10px] font-medium whitespace-nowrap ${getColor(
                item.status
              )}`}
            >
              {displayStatus}
            </span>
          </div>

          {item.requestItem && (
            <p className="text-xs text-[#737373] mb-2 truncate">
              Requested: <span className="text-[#222222]">{item.requestItem}</span>
            </p>
          )}

          <div className="text-sm items-center gap-2 hidden md:flex min-w-0">
            <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 bg-[#E9E9E9]">
              <Image
                className="w-full h-full rounded-full object-cover"
                src={profileSrc}
                height={24}
                width={24}
                alt={item.name}
                onError={createImageErrorHandler(setProfileImageError)}
              />
            </div>
            <p className="text-[#222222] truncate">{item.name}</p>
            {item.roleLabel && (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-[#D9D9D9] shrink-0" />
                <p className="text-[#737373] shrink-0">{item.roleLabel}</p>
              </>
            )}
            <div className="w-1.5 h-1.5 rounded-full bg-[#D9D9D9] shrink-0" />
            <p className="text-[#737373] shrink-0">
              <MomentAgo createdAt={item.time} />
            </p>
          </div>

          <div className="text-sm block md:hidden min-w-0">
            <div className="flex items-center gap-2 mb-1 min-w-0">
              <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 bg-[#E9E9E9]">
                <Image
                  className="w-full h-full rounded-full object-cover"
                  src={profileSrc}
                  height={24}
                  width={24}
                  alt={item.name}
                  onError={createImageErrorHandler(setProfileImageError)}
                />
              </div>
              <p className="text-[#222222] truncate">{item.name}</p>
            </div>
            <div className="flex items-center gap-2">
              {item.roleLabel && (
                <>
                  <p className="text-[#737373]">{item.roleLabel}</p>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D9D9D9]" />
                </>
              )}
              <p className="text-[#737373]">
                <MomentAgo createdAt={item.time} />
              </p>
            </div>
          </div>
        </div>

        {hasRoom && (
          <div
            className="border border-[#E9E9E9] rounded-2xl gap-1 p-[6px] flex items-center shrink-0 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="flex items-center gap-1"
              onClick={handleCardClick}
            >
              <p className="font-medium text-xs text-[#222222]">Open Chat</p>
              <span className="w-4 h-4 rounded-full flex items-center justify-center bg-[#222222]">
                <ArrowRight size={12} color="#fff" />
              </span>
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SwapCardItem;
