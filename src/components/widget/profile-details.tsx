import { Card, CardContent } from "../ui/card";
import Listed from "@/app/assets/images/svgs/listed.svg";
import Swaps from "@/app/assets/images/svgs/swaps.svg";
import Ratings from "@/app/assets/images/svgs/ratings.svg";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { getImageSrcWithFallback, createImageErrorHandler } from "@/lib/utils";
import Link from "next/link";
import { PATHS } from "@/app/_constants/paths";

interface ProfileDetailsHeaderProps {
  userData?: {
    firstName: string;
    lastName: string;
    profilePicture: null | string;
    userName: string;
    userRole: string[];
    listingCount: number;
    swapCount: number;
    rating: number;
  };
}

const ProfileDetailsHeader: React.FC<ProfileDetailsHeaderProps> = ({ userData }) => {
  const [imageError, setImageError] = useState(false);
  
  const profileImageSrc = userData?.profilePicture 
    ? getImageSrcWithFallback(userData.profilePicture, imageError)
    : "https://plus.unsplash.com/premium_photo-1664537979073-a467fa628555?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2371";
  
  const displayName = userData ? `${userData.firstName} ${userData.lastName}` : "Mutiu Ganiyu";
  const userRole = userData?.userRole?.[0] || "Swapper";
  const listingCount = userData?.listingCount ?? 12;
  const swapCount = userData?.swapCount ?? 12;
  const rating = userData?.rating ?? 12;

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex items-center gap-3 w-full mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#F4CE9B]">
            <Image
              src={profileImageSrc}
              height={56}
              width={56}
              alt="User profile"
              className="w-14 h-14 rounded-full"
              onError={createImageErrorHandler(setImageError)}
            />
          </div>
          <div className="me-auto">
            <h5 className={`text-[#222222] text-lg font-medium`}>
              {displayName}
            </h5>
          </div>
        </div>
        <div className="flex gap-3 mb-6">
          <Button>{userRole}</Button>
          <Link href={PATHS.CHAT} passHref>
          <Button
            className="items-center flex border-[#E9E9E9] text-[#222222]"
            variant="outline"
          >
            Open Chat
            <div className="bg-[#303030] rounded-full w-[14px] h-[14px]">
              <ArrowRight size={12} color="#fff" />
            </div>
          </Button>
          </Link>
        </div>
        <div className="flex gap-2">
          <div className="border-[#E9E9E9] border p-2 rounded-md w-full">
            <div className="flex gap-1 items-center mb-2 text-sm text-[#737373]">
              <Listed />
              <p>Listed</p>
            </div>
            <h6 className="font-medium text-lg">{listingCount}</h6>
          </div>
          <div className="border-[#E9E9E9] border p-2 rounded-md w-full">
            <div className="flex gap-1 items-center mb-2 text-sm text-[#737373]">
              <Swaps />
              <p>Swaps</p>
            </div>
            <h6 className="font-medium text-lg">{swapCount}</h6>
          </div>
          <div className="border-[#E9E9E9] p-2 border rounded-md w-full">
            <div className="flex gap-1 items-center mb-2 text-sm text-[#737373]">
              <Ratings />
              <p>Ratings</p>
            </div>
            <h6 className="font-medium text-lg">{rating}</h6>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileDetailsHeader;
