import EmptyMessageRoom from "./empty-room";
import Image from "next/image";
import { Send } from "lucide-react";
import { useState } from "react";
import MomentAgo from "@/components/moment-ago";
import { Input } from "@/components/ui/input";
import SwapModalContent from "./swap-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Gallery from "@/app/assets/images/svgs/Gallery.svg";
import Smiley from "@/app/assets/images/svgs/smiley.svg";

type ChatListProps = {
  id: string;
  message: string;
  time: string;
  isText: boolean;
  fileUrl?: {
    imgUrl: string;
  }[];
};

const MessageRoom: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [swapType, setSwapType] = useState<string>("");
  const chatList: ChatListProps[] = [
    {
      id: "2",
      message: "Yo bro, you dey?",
      time: "2025-05-06T18:00:00Z",
      isText: true,
      fileUrl: [
        {
          imgUrl:
            "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    {
      id: "1",
      message: "I dey here boss 😅, wetin sup?",
      time: "2025-05-06T18:01:22Z",
      isText: true,
      fileUrl: [
        {
          imgUrl:
            "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    {
      id: "2",
      message: "Guy I just see your new drop, clean 🔥",
      time: "2025-05-06T18:02:40Z",
      isText: true,
    },
    {
      id: "2",
      message: "You run am with that designer again?",
      time: "2025-05-06T18:03:10Z",
      isText: true,
    },
    {
      id: "1",
      message: "Yeah yeah, same guy from the last project",
      time: "2025-05-06T18:03:50Z",
      isText: true,
    },
    {
      id: "1",
      message: "E sharp well now, abi?",
      time: "2025-05-06T18:04:20Z",
      isText: true,
    },
    {
      id: "2",
      message: "No cap, you burst my head 🧠",
      time: "2025-05-06T18:05:00Z",
      isText: true,
    },
    {
      id: "2",
      message: "You fit drop contact?",
      time: "2025-05-06T18:05:15Z",
      isText: true,
    },
    {
      id: "1",
      message: "Bet, I go send am now now",
      time: "2025-05-06T18:05:40Z",
      isText: true,
    },
    {
      id: "1",
      message: "Check your WhatsApp",
      time: "2025-05-06T18:06:00Z",
      isText: true,
    },
    {
      id: "2",
      message: "I see am. Nice one 💯",
      time: "2025-05-06T18:06:30Z",
      isText: true,
    },
    {
      id: "1",
      message: "Anytime bro 🙌",
      time: "2025-05-06T18:07:00Z",
      isText: true,
    },
    {
      id: "2",
      message: "Make we link this weekend? Maybe catch ball ⚽️",
      time: "2025-05-06T18:07:45Z",
      isText: true,
    },
    {
      id: "1",
      message: "For sure! Saturday works?",
      time: "2025-05-06T18:08:10Z",
      isText: true,
    },
    {
      id: "2",
      message: "Lock am. I go ping you",
      time: "2025-05-06T18:08:30Z",
      isText: true,
    },
  ];

  const onOpenChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="border border-[#EEEEEE] border-t-0">
      <div
        className={`border-b py-4 px-5 flex justify-between sticky bg-white top-0 z-10 items-center`}
      >
        <div className="flex items-center gap-3 w-full">
          <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#F4CE9B] rounded-full">
            <Image
              src="https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80"
              height={40}
              width={40}
              alt="User profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="me-auto">
            <h5 className={`text-[#222222] text-lg font-medium`}>
              Mutiu Ganiyu
            </h5>
          </div>
          <Button
            className="!h-9 rounded-xl font-medium"
            onClick={() => setIsOpen(!isOpen)}
          >
            Request Swap
          </Button>
        </div>
      </div>
      <div className={`py-3 px-6 h-full overflow-y-auto hide-scrollbar`}>
        {chatList.length < 1 ? (
          <EmptyMessageRoom />
        ) : (
          <div>
            <div className="flex flex-col">
              {chatList.map((chat, index: number) => {
                const user = chat.id === "1";
                const isLastFromSender =
                  index === chatList.length - 1 ||
                  chatList[index + 1]?.id !== chat.id;

                return (
                  <div key={index} className="flex flex-col">
                    <div
                      className={`flex gap-2 items-start  ${
                        index === 0 || chatList[index - 1]?.id !== chat.id
                          ? "mt-6"
                          : "mt-[6px]"
                      }`}
                    >
                      {!user && (
                        <div className="w-8 h-8">
                          {isLastFromSender ? (
                            <div className="bg-[#F2F8FF] rounded-full w-8 h-8 flex items-end justify-center">
                              <Image
                                src="https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80"
                                height={32}
                                width={32}
                                alt="User profile"
                                className="w-8 h-8 rounded-full"
                              />
                            </div>
                          ) : (
                            <div className="w-8 h-8" />
                          )}
                        </div>
                      )}
                      <div className="w-full">
                        <div
                          className={`relative text-sm rounded-[10px] max-w-[80%] w-fit p-3 ${
                            user
                              ? "ml-auto bg-[#007AFF] text-white"
                              : "bg-[#F3F3F3] text-[#222222]"
                          }`}
                        >
                          <div className="flex gap-1 justify-between items-end">
                            <p className={`font-gilroy-medium text-base`}>
                              {chat?.message}
                            </p>
                          </div>
                        </div>
                        {chat?.fileUrl && chat?.fileUrl?.length > 0 && (
                          <div
                            className={`cursor-pointer mt-[6px] max-w-[250px] w-full h-[190px] rounded-[10px] ${
                              user ? "ml-auto" : ""
                            }`}
                          >
                            <Image
                              height={178}
                              width={236}
                              alt="Random images"
                              src={chat?.fileUrl[0].imgUrl}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className={`mt-1 text-[8px] flex gap-2 items-end ${
                        user ? "justify-end pr-3" : "pl-11"
                      }`}
                    >
                      {(index === chatList.length - 1 ||
                        chatList[index + 1]?.id !== chat.id) && (
                        <span>
                          <MomentAgo createdAt={chat?.time} />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div
        className={` flex items-center py-4 px-6 gap-[10px] border-[#EEEEEE] border-t sticky bg-white bottom-0 z-10`}
      >
        <div>
          <Gallery />
        </div>
        <div>
          <Smiley />
        </div>
        <div className={`flex-1 relative !h-13 `}>
          <Input className={`nav-search `} placeholder="Add a comment..." />
        </div>
        <div
          className={`h-12 w-12 rounded-full flex items-center justify-center text-white bg-[#0A4751]`}
        >
          <Send size={20} />
        </div>
      </div>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="left-[50%] max-w-[428px] translate-x-[-50%] overflow--y-scrollp-5">
          <SwapModalContent
            swapType={swapType}
            setSwapType={setSwapType}
            handleClose={onOpenChange}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MessageRoom;
