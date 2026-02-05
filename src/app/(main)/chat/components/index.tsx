"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import NotificationMessageCard from "@/components/widget/notify-room";
import { Search } from "lucide-react";
import MessageRoom from "./room";
import { useGetActiveChatUsers } from "@/app/_hooks/queries/chat/chat";
import { getImageSrcWithFallback } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import EmptyChatRoom from "./empty-room";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Auth } from "@/app/_config/auth";
import { useConfirmPayment } from "@/app/_hooks/queries/payment/payment";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const ChatRoom: React.FC = () => {
  const currentUser = Auth.getDecodedJwt()?.jti;

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useGetActiveChatUsers({
    enabler: true,
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const roomName = searchParams.get("roomName");
  const transactionRef = searchParams.get("trxref") || "";
  const paymentRef = searchParams.get("reference") || "";

  const [isShowChat, setIsShowChat] = useState(false);
  const [isConfirmingPayment, setIsConfirmingPayment] = useState(false);

  const cleanPaymentParams = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("trxref");
    params.delete("reference");

    const queryString = params.toString();
    const updatedUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(updatedUrl);
  };

  const { mutate } = useConfirmPayment({
    onSuccess(_val: { result: string }) {
      console.log(_val);
      cleanPaymentParams();
      queryClient.invalidateQueries({ queryKey: ["useGetActiveChatUsers"] });
      setIsConfirmingPayment(false);
      toast.success(_val.result);
    },
    onError(_err) {
      toast.error(_err);
    },
  });

  useEffect(() => {
    if (paymentRef && transactionRef) {
      setIsConfirmingPayment(true);
    }
  }, [transactionRef, paymentRef]);

  useEffect(() => {
    if (isConfirmingPayment) {
      mutate({
        payload: {
          reference: paymentRef,
        },
      });
    }
  }, [isConfirmingPayment]);

  const chatList = (
    data?.result?.map((chat) => ({
      sendAt: chat.time || new Date().toISOString(),
      message: chat.message || "No messages yet",
      userImgUrl: chat.url
        ? getImageSrcWithFallback(chat.url, false)
        : "https://plus.unsplash.com/premium_photo-1664537979073-a467fa628555?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2371",
      fullName: chat.name,
      count: chat.unreadCount > 0 ? chat.unreadCount : undefined,
      userStatus: chat.userStatus,
      userId: chat.userId,
      chatRoomName: chat.chatRooomName,
    })) || []
  ).sort((a, b) => {
    // Sort by sendAt time in descending order (newest first)
    const timeA = new Date(a.sendAt).getTime();
    const timeB = new Date(b.sendAt).getTime();
    return timeB - timeA;
  });

  // Find the selected chat data
  const selectedChat = chatList.find((chat) => chat.chatRoomName === roomName);

  if (isLoading) {
    return (
      <section className="flex h-[calc(100vh-72px)]">
        <div className="max-w-[426px] w-full h-full flex flex-col border-r border-[#EEEEEE]">
          <div className={`sticky top-0 z-10 p-4 bg-white border-b border-[#EEEEEE]`}>
            <div className={`flex justify-between items-center mb-4`}>
              <h2 className={`text-base text-[#007AFF] capitalize`}>CHAT</h2>
            </div>
            <Input
              startIcon={<Search />}
              className="w-full !h-9 rounded-lg"
              placeholder="Search items..."
            />
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            <div className="2xl:px-8 ps-5 pb-8">
              <div className="flex flex-col">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="hover:bg-[#F9F9F9] border-b-[0.8px] border-[#0E0E0E0D] p-3 flex gap-[10px] items-center"
                  >
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="w-2 h-2 rounded-full" />
                      </div>
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="text-right">
                      <Skeleton className="h-3 w-12 mb-1" />
                      <Skeleton className="w-4 h-4 rounded-full ml-auto" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 h-full overflow-hidden">
          <div className="flex h-full w-full flex-col items-center justify-center text-center border border-[#EEEEEE] border-t-0">
            <div className="space-y-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <>
      <section className="flex h-[calc(100vh-72px)]">
        <div
          className={`
    max-w-[426px] w-full h-full flex flex-col border-r border-[#EEEEEE]
    ${isShowChat ? "hidden md:flex" : "flex"} 
  `}
        >
          <div className={`sticky top-0 z-10 p-4 bg-white border-b border-[#EEEEEE]`}>
            <div className={`flex justify-between items-center mb-4`}>
              <h2 className={`text-base text-[#007AFF] capitalize`}>CHAT</h2>
            </div>
            <Input
              startIcon={<Search />}
              className="w-full !h-9 rounded-lg"
              placeholder="Search items..."
            />
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            <div className="2xl:px-8 ps-5 pb-8">
              <div className="flex flex-col">
                {chatList
                  ?.filter((user) => user.userId !== currentUser)
                  ?.map((chat, index: number) => (
                    <NotificationMessageCard
                      chat={chat}
                      key={index}
                      setIsShowChat={setIsShowChat}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`
    flex-1 h-full
    ${isShowChat ? "flex md:flex" : "hidden md:flex"}
  `}
        >
          {roomName ? (
            <MessageRoom
              userName={selectedChat?.fullName || ""}
              userProfileUrl={selectedChat?.userImgUrl || ""}
              userId={selectedChat?.userId || ""}
              setIsShowChat={setIsShowChat}
            />
          ) : (
            <EmptyChatRoom hideMarketplaceLink={chatList.length < 1} />
          )}
        </div>
      </section>
      {isConfirmingPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            <p className="text-lg font-semibold text-slate-800">Confirming Payment...</p>
            <p className="text-sm text-slate-500">Please do not refresh the page.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatRoom;
