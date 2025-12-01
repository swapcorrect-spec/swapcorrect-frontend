"use client";

import Title from "@/components/shared/tltle";
import SwapCardItem, { SwapCardItemData } from "@/components/shared/swap-card-item";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Box, CircleCheck, Clock4, Hourglass } from "lucide-react";
import { FC, useMemo } from "react";
import { useGetDashboardCard } from "@/app/_hooks/queries/dashboard/dashboard";
import { useSearchSwaps } from "@/app/_hooks/queries/swap/swap";
import { useGetUserInfo } from "@/app/_hooks/queries/auth/auth";
import { getStatusColor } from "@/lib/utils";
import Link from "next/link";
import { PATHS } from "@/app/_constants/paths";
import EmptyItemsState from "@/components/shared/empty-items-state";

const DashboardPage: FC = () => {
  const { data: currentUserData } = useGetUserInfo({
    enabler: true,
  });

  const currentUserId = currentUserData?.result?.id || "";

  const { data: dashboardData, isLoading } = useGetDashboardCard({
    enabler: true,
  });

  const { data: swapsData, isLoading: isLoadingSwaps } = useSearchSwaps({
    enabler: !!currentUserId,
    listingUserId: currentUserId,
    swapListingStatus: "All",
    listingDate: "All",
    pageNumber: 1,
    perpageSize: 10,
  });

  const cardList = useMemo(() => {
    if (!dashboardData?.result) {
      return [];
    }

    const { result } = dashboardData;
    return [
      {
        title: "Listed",
        value: result.listedCount,
        color: "#E0EFFF",
        description: "This month",
        icon: <Box size={16} color="#007AFF" />,
      },
      {
        title: "Ongoing Swap",
        value: result.ongoingCount,
        color: "#C8780026",
        description: "Currently Active",
        icon: <Hourglass size={16} color="#FF6F00" />,
      },
      {
        title: "Pending Swap",
        value: result.pendingConfirmationCount,
        color: "#F7F6FF",
        description: "Awaiting confirmation",
        icon: <Clock4 size={16} color="#8A6CFF" />,
      },
      {
        title: "Completed",
        value: result.completedCount,
        color: "#E4FFE8",
        description: "from last month",
        icon: <CircleCheck size={16} color="#68CC58" />,
      },
    ];
  }, [dashboardData]);

  const recentList = useMemo((): SwapCardItemData[] => {
    if (!swapsData?.items || !currentUserId) {
      return [];
    }

    return swapsData.items.map((swap) => {
      const isSwapper = swap.swapperUserId === currentUserId;
      const otherUserName = isSwapper ? swap.visitorName : swap.swapperName;
      const otherUserImage = isSwapper ? swap.visitorImage : swap.swapperImage;

      const displayStatus =
        swap.status === "Negotiation" ? "Negotiating" : swap.status;

      return {
        name: otherUserName,
        item: swap.listedItem,
        time: swap.lastActivity,
        roomName: swap.roomName,
        status: displayStatus,
        type: "Basic",
        image: otherUserImage,
        key: swap.swapProceedId,
      };
    });
  }, [swapsData, currentUserId]);

  return (
    <section className="p-6">
      <div className="border border-[#E9E9E9] rounded-lg p-6 mb-6">
        <Title title="Dashboard" description="Overview of your swap activities." />
        <div className="grid grid-cols-4 gap-4 mt-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Card
                className="border-1 border-[#E9E9E9] p-3 bg-[#F5F5F5]"
                key={index}
              >
                <CardContent className="p-0">
                  <div className="flex justify-between items-center bg-white rounded-md py-[5px] px-2.5 mb-5 text-black">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="w-[30px] h-[30px] rounded-full" />
                  </div>
                  <div className="px-2.5">
                    <Skeleton className="h-8 w-12 mb-3" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            cardList.map((cardItem, index) => (
              <Card
                className="border-1 border-[#E9E9E9] p-3 bg-[#F5F5F5]"
                key={index}
              >
                <CardContent className="p-0">
                  <div className="flex justify-between items-center bg-white rounded-md py-[5px] px-2.5 mb-5 text-black">
                    <p className="text-sm text-[#000000]">{cardItem.title}</p>
                    <div
                      className="w-[30px] h-[30px] rounded-full flex items-center justify-center"
                      style={{ backgroundColor: cardItem.color }}
                    >
                      {cardItem.icon}
                    </div>
                  </div>
                  <div className="px-2.5">
                    <p className="text-2xl font-medium mb-3">{cardItem.value}</p>
                    <p className="text-xs font-medium text-[#646464]">
                      {cardItem.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
      <div className="border border-[#E9E9E9] rounded-lg p-6">
        <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2 font-medium mb-4">
          <p className="text-[#222222] text-lg font-medium">
            Recent items Activity
          </p>
          <p className="text-[#737373] text-sm">
            Your latest swap interactions
          </p>
        </div>
        <Link href={PATHS.SWAPS}>
                <p className="text-[#007AFF] font-medium text-[15px] cursor-pointer underline">View all</p>
              </Link>
        </div>
        {isLoadingSwaps ? (
          <div className="grid grid-cols-1 gap-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="shadow-none border border-[#E9E9E9]">
                <CardContent className="p-2.5">
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : recentList.length > 0 ? (
          recentList.map((item) => (
            <SwapCardItem
              key={item.key}
              item={item}
              getStatusColor={getStatusColor}
            />
          ))
        ) : (
          <EmptyItemsState 
            title="No recent swap activities"
            description="You haven't had any swap interactions yet. Start swapping to see your activities here!"
          />
        )}
      </div>
    </section>
  );
};

export default DashboardPage;
