"use client";

import Logo from "@/app/assets/images/svgs/logo_full.svg";
import SwapperUpgradeLogo from "@/app/assets/images/svgs/swapper_upgrade.svg";
import Bell from "@/app/assets/images/svgs/Bell.svg";
import Search from "@/app/assets/images/svgs/Search.svg";
import Avatar from "@/app/assets/images/svgs/Avatar.svg";
import ArrowDown from "@/app/assets/images/svgs/arrow_down.svg";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../ui/input";
import Notification from "../widget/notification";
import Link from "next/link";

const Navbar: React.FC = () => {
  const mockNotifications = [
    {
      read: false,
      title: "New Chat Message",
      description: "You’ve received a new message from Jane.",
      time: "2025-05-24T08:45:00Z",
      type: "new-chat",
    },
    {
      read: true,
      title: "Offer Accepted",
      description: "Your service offer was accepted by Daniel.",
      time: "2025-05-23T16:20:00Z",
      type: "offer-accepted",
    },
    {
      read: false,
      title: "New Review",
      description: "John left a review on your profile.",
      time: "2025-05-24T09:00:00Z",
      type: "new-review",
    },
    {
      read: true,
      title: "Offer Declined",
      description: "Your offer was declined by Sarah.",
      time: "2025-05-22T14:10:00Z",
      type: "offer-declined",
    },
    {
      read: false,
      title: "New Service Request",
      description: "You have a new service request from Mike.",
      time: "2025-05-24T07:30:00Z",
      type: "new-request",
    },
    {
      read: false,
      title: "New Chat Message",
      description: "Alex sent you a message.",
      time: "2025-05-24T10:15:00Z",
      type: "new-chat",
    },
    {
      read: true,
      title: "Offer Accepted",
      description: "Liam accepted your service offer.",
      time: "2025-05-21T11:00:00Z",
      type: "offer-accepted",
    },
    {
      read: false,
      title: "New Review",
      description: "Emma gave you a 5-star rating.",
      time: "2025-05-24T06:50:00Z",
      type: "new-review",
    },
    {
      read: true,
      title: "Offer Declined",
      description: "Michael declined your proposal.",
      time: "2025-05-20T18:25:00Z",
      type: "offer-declined",
    },
    {
      read: false,
      title: "New Service Request",
      description: "Chloe just submitted a new request.",
      time: "2025-05-24T09:40:00Z",
      type: "new-request",
    },
  ];
  const notifyType = [
    {
      title: "All Notifications",
      value: "all",
    },
    {
      title: "Unread",
      value: "unread",
    },
  ];

  return (
    <section className="border-[#E9E9E9] border bg-white py-[15px] px-[42px] top-0 sticky flex items-center gap-[110px] z-10 w-full">
      <div className="flex justify-center">
        <Logo />
      </div>
      <div className="max-w-[749px] w-full me-auto">
        <Input
          startIcon={<Search />}
          className="w-full !h-11 rounded-[2rem]"
          placeholder="Search items..."
        />
      </div>
      <div className="flex gap-5 items-center">
        <Button
          variant={"default"}
          className="rounded-full font-medium text-sm py-3 !px-[11px] flex items-center gap-1 !h-auto w-full"
          size={"lg"}
        >
          Upgrade to Swapper <SwapperUpgradeLogo />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative cursor-pointer">
              <Bell />
              <div className="absolute top-[-3px] right-[-2px] text-white bg-[#E42222] w-4 h-4 rounded-full items-center justify-center flex text-xs">
                4
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[500px] flex flex-col gap-1 h-[75vh] pb-2 mt-5 py-0">
            <Tabs
              defaultValue="item-description"
              className="w-full mb-6 sticky top-0 bg-white py-3"
            >
              <TabsList className="flex w-full">
                {notifyType.map((_, index: number) => (
                  <TabsTrigger
                    value={_.value}
                    className={`rounded-[26px] w-full`}
                    key={index}
                  >
                    {_.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="px-2">
              {mockNotifications.map((notify, idx) => (
                <Notification key={idx} notify={notify} />
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center !border-0 gap-2">
              <div className="w-[42px] h-[42px] rounded-full bg-[#007AFF] flex items-center justify-center">
                <Avatar />
              </div>
              <ArrowDown />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
};

export default Navbar;
