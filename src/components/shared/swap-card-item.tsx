"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getImageSrcWithFallback, createImageErrorHandler } from "@/lib/utils";
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
}

interface SwapCardItemProps {
  item: SwapCardItemData;
  getStatusColor: (status: string) => string;
}

const SwapCardItem: FC<SwapCardItemProps> = ({ item, getStatusColor }) => {
  const [itemImageError, setItemImageError] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);

  return (
    <Card className="shadow-none border border-[#E9E9E9]">
      <CardContent className="p-2.5 flex gap-3 items-center">
        <div className="w-[66px] h-[66px] rounded-lg overflow-hidden bg-gray-200">
          <Image
            className="w-full h-full object-cover"
            src={getImageSrcWithFallback(
              "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
              itemImageError
            )}
            height={66}
            width={66}
            alt="Item image"
            onError={createImageErrorHandler(setItemImageError)}
          />
        </div>
        <div className="mr-auto">
          <div className="mb-2 flex items-center gap-2">
            <p className="text-black font-medium text-base">{item.item}</p>
            <span
              className={`border-1 rounded-lg py-1 px-3 text-[10px] ${getStatusColor(item.status)}`}
            >
              {item.status}
            </span>
          </div>

          <div className="me-auto text-sm flex items-center gap-3">
            <div className="w-[24px] h-[24px] rounded-full overflow-hidden">
              <Image
                className="w-full h-full rounded-full object-cover"
                src={getImageSrcWithFallback(item.image || "", profileImageError)}
                height={24}
                width={24}
                alt="Profile picture"
                onError={createImageErrorHandler(setProfileImageError)}
              />
            </div>
            <p className="text-[#222222]">{item.name}</p>
            <div className="w-[6px] h-[6px] rounded-full bg-[#222222]"></div>
            <p className="text-[#737373]">{item.type}</p>
            <div className="w-[6px] h-[6px] rounded-full bg-[#222222]"></div>
            <p className="text-[#737373]">
              <MomentAgo createdAt={item.time} />
            </p>
          </div>
        </div>
        {item.roomName && (
          <Link href={`/chat?roomName=${item.roomName}`}>
            <div className="border border-[#E9E9E9] rounded-2xl gap-1 p-[6px] flex items-center">
              <p className="font-medium text-xs text-[#222222]">Open Chat</p>
              <span className="w-4 h-4 rounded-full flex items-center justify-center bg-[#222222]">
                <ArrowRight size={12} color="#fff" />
              </span>
            </div>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default SwapCardItem;

