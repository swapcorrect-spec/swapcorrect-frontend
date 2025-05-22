"use client";

import { Input } from "@/components/ui/input";
import NotificationMessageCard from "@/components/widget/notify-room";
import { Search } from "lucide-react";
import MessageRoom from "./room";

const ChatRoom: React.FC = () => {
  const chatList = [
    {
      sendAt: "2025-05-06T14:12:00Z",
      message: "Hey, how are you doing?",
      userImgUrl:
        "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
      fullName: "Kehinde Michaels",
    },
    {
      sendAt: "2025-04-25T09:40:00Z",
      message: "Just checking in!",
      userImgUrl:
        "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
      fullName: "Alex Jones",
    },
    {
      sendAt: "2025-04-29T19:05:00Z",
      message: "What's the update?",
      userImgUrl:
        "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
      fullName: "Kehinde Michaels",
    },
    {
      count: 1,
      sendAt: "2025-05-03T07:30:00Z",
      message: "Let’s schedule the call.",
      userImgUrl:
        "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
      fullName: "Lisa Ray",
    },
    {
      count: 1,
      sendAt: "2025-04-20T12:15:00Z",
      message: "Sounds good to me!",
      userImgUrl:
        "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
      fullName: "Kehinde Michaels",
    },
    {
      count: 1,
      sendAt: "2025-05-01T22:45:00Z",
      message: "Thanks for the heads-up.",
      userImgUrl:
        "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
      fullName: "Mark Benson",
    },
    {
      sendAt: "2025-04-28T15:10:00Z",
      message: "I'll send the files later today.",
      userImgUrl:
        "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
      fullName: "Kehinde Michaels",
    },
    {
      count: 1,
      sendAt: "2025-05-05T08:05:00Z",
      message: "Can we meet tomorrow?",
      userImgUrl:
        "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
      fullName: "Nina Osei",
    },
    {
      count: 1,
      sendAt: "2025-04-19T16:25:00Z",
      message: "Already pushed the update.",
      userImgUrl:
        "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
      fullName: "Kehinde Michaels",
    },
    {
      sendAt: "2025-04-30T11:00:00Z",
      message: "Cool, see you then.",
      userImgUrl:
        "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
      fullName: "Sam Adeyemi",
    },
    {
      count: 1,
      sendAt: "2025-04-22T10:50:00Z",
      message: "Can you check the doc?",
      userImgUrl:
        "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
      fullName: "Kehinde Michaels",
    },
    {
      count: 1,
      sendAt: "2025-05-02T13:15:00Z",
      message: "Let’s wrap this up today.",
      userImgUrl:
        "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
      fullName: "Diana Cole",
    },
    {
      sendAt: "2025-04-27T21:30:00Z",
      message: "Meeting rescheduled to 5 PM.",
      userImgUrl:
        "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
      fullName: "Kehinde Michaels",
    },
    {
      count: 1,
      sendAt: "2025-04-24T06:45:00Z",
      message: "Good morning! Ready when you are.",
      userImgUrl:
        "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
      fullName: "Tosin Adebayo",
    },
    {
      sendAt: "2025-05-04T17:00:00Z",
      message: "Don’t forget the report!",
      userImgUrl:
        "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=800&q=80",
      fullName: "Kehinde Michaels",
    },
  ];

  return (
    <section className="flex">
      <div className="max-w-[426px] w-full h-[calc(100vh-72px)] overflow-y-auto hide-scrollbar">
        <div className={`sticky top-0 z-10 p-4 bg-white`}>
          <div className={`flex justify-between items-center mb-4`}>
            <h2 className={`text-base text-[#007AFF] capitalize`}>CHAT</h2>
          </div>
          <Input
            startIcon={<Search />}
            className="w-full !h-9 rounded-lg"
            placeholder="Search items..."
          />
        </div>
        <div className="2xl:px-8 ps-5 pb-8">
          <div className="flex flex-col">
            {chatList.map((_, index: number) => (
              <NotificationMessageCard chat={_} key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 h-[calc(100vh-82px)] overflow-y-auto hide-scrollbar">
        <MessageRoom />
      </div>
    </section>
  );
};

export default ChatRoom;
