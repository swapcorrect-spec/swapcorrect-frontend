"use client";

import { PATHS } from "@/app/_constants/paths";
import EmptyChatImage from "@/app/assets/images/pngs/empty_chat.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";


interface EmptyChatRoomProps {
  hideMarketplaceLink?: boolean;
}

export default function EmptyChatRoom({ hideMarketplaceLink = false }: EmptyChatRoomProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-center border border-[#EEEEEE] border-t-0">
      <Image src={EmptyChatImage} alt="Empty Chat" width={206} height={206} className="mb-4" />
      <h4 className={`text-xl text-[#222222] mb-1 font-medium`}>
      No messages yet
      </h4>
      <p className={`text-sm max-w-[388px] mb-8 w-full text-center text-[#737373]`}>
      Say hello and start the swap! Use this chat to negotiate and share shipping updates.
      </p>
      {!hideMarketplaceLink && (
        <Link 
          href={`${PATHS.CATEGORY}`}
          className="w-full rounded-full mb-2 inline-block"
        >
          <Button 
            variant="default"
            className="max-w-[185px] w-full rounded-lg mb-2" 
          >
            Go to Marketplace
          </Button>
        </Link>
      )}
    </div>
  );
}
