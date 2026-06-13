"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import Logo from "@/app/assets/images/svgs/logo_full.svg";
import SwapperUpgradeLogo from "@/app/assets/images/svgs/swapper_upgrade.svg";
import Bell from "@/app/assets/images/svgs/Bell.svg";
// import Search from "@/app/assets/images/svgs/Search.svg";
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
// import { Input } from "../ui/input";
import Notification from "../widget/notification";
import { PATHS } from "@/app/_constants/paths";
import {
  // mockNotifications,
  notifyType,
} from "@/app/_constants/notifications";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IGetUserInfoResponseData } from "@/app/_hooks/queries/auth/auth.type";
import {
  useGetNotifications,
  useGetUnreadNotificationCount,
  useReadNotification,
} from "@/app/_hooks/queries/notification/notification";
// import { Auth } from "@/app/_config/auth";

interface Props {
  data?: IGetUserInfoResponseData;
  handleToggleMenu?: () => void;
  isOpen?: boolean;
  role?: "Visitor" | "Swapper";
  handleToggleSwapperUpgrade?: () => void;
}

const Navbar: React.FC<Props> = ({
  data,
  handleToggleMenu,
  isOpen,
  role,
  handleToggleSwapperUpgrade,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const notificationContainerRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenNotifications, setIsOpenNotifications] = useState(false);
  const [unreadOnly, setUnreadOnly] = useState<boolean | undefined>(undefined);
  const [selectedNotification, setSelectedNotification] = useState("");
  const { data: unreadCount, isFetching } = useGetUnreadNotificationCount({ enabler: true });
  const {
    data: notificationsResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching: isNotificationFetching,
  } = useGetNotifications({
    unreadOnly,
    enabler: isOpenNotifications,
  });
  const { mutate, isPending: isReadNotificationPending } = useReadNotification({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["useGetNotifications"] });
      queryClient.invalidateQueries({ queryKey: ["useGetUnreadNotificationCount"] });
    },
    onError(_val, _err) {
      console.log("read notification error", _err);
    },
  });

  const notifications = notificationsResponse?.pages.flatMap((page) => page.result.items) ?? [];

  useEffect(() => {
    if (localStorage.getItem("comms-access-token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    router.push(`/${PATHS.LOGIN}`);
  };

  const handleGetStarted = () => {
    router.push(PATHS.SIGNUP);
  };

  const handleLogout = () => {
    queryClient.clear();
    localStorage.clear();
    router.push(`/${PATHS.LOGIN}`);
  };

  const handleOpenNotifications = () => {
    setIsOpenNotifications(!isOpenNotifications);
    setUnreadOnly(undefined);
  };

  const handleNotificationScroll = () => {
    const container = notificationContainerRef.current;

    if (!container || !hasNextPage || isFetchingNextPage) {
      return;
    }

    const reachedBottom =
      container.scrollHeight - container.scrollTop <= container.clientHeight + 20;

    if (reachedBottom) {
      fetchNextPage();
    }
  };

  const handleReadNotification = (notification_id: string) => {
    setSelectedNotification(notification_id);
    mutate({
      payload: {
        notification_id,
      },
    });
  };

  return (
    <section className="border-[#E9E9E9] border bg-white py-[15px] px-[42px] top-0 sticky flex justify-between gap-[110px] z-10 w-full">
      <div className="flex gap-4 items-center justify-center">
        {!isOpen && <Menu className="cursor-pointer" onClick={handleToggleMenu} />}
        <Link href={`${isLoggedIn ? "/home" : "/"}`} className="flex justify-center">
          <Logo />
        </Link>
      </div>
      {/* <div className="max-w-[749px] w-full me-auto">
        <Input
          startIcon={<Search />}
          className="w-full !h-11 rounded-[2rem]"
          placeholder="Search items..."
        />
      </div> */}
      {isLoggedIn ? (
        <div className="flex gap-5 items-center">
          {role === "Visitor" ? (
            <Button
              variant={"default"}
              className="rounded-full font-medium text-sm py-3 !px-[11px] flex items-center gap-1 !h-auto w-full"
              size={"lg"}
              onClick={handleToggleSwapperUpgrade}
            >
              Upgrade to Swapper <SwapperUpgradeLogo />
            </Button>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Swapper
            </div>
          )}
          <DropdownMenu open={isOpenNotifications} onOpenChange={handleOpenNotifications}>
            <DropdownMenuTrigger asChild>
              <div className="relative cursor-pointer">
                <Bell />
                {!isFetching && unreadCount?.result !== 0 && (
                  <div className="absolute top-[-3px] right-[-2px] text-white bg-[#E42222] w-4 h-4 rounded-full items-center justify-center flex text-xs">
                    {!isFetching && unreadCount?.result}
                  </div>
                )}
              </div>
            </DropdownMenuTrigger>
            {/* <DropdownMenuContent className="w-[500px] flex flex-col gap-1 h-[75vh] pb-2 mt-5 py-0">
              <Tabs
                defaultValue="all"
                onValueChange={(value) => {
                  console.log("tab changed:", value, "unreadOnly:", unreadOnly);
                  setUnreadOnly(value === "unread" ? true : undefined);
                }}
                className="w-full mb-6 sticky top-0 bg-white py-3"
              >
                <TabsList className="flex w-full">
                  {notifyType.map((_, index: number) => (
                    <TabsTrigger value={_.value} className={`rounded-[26px] w-full`} key={index}>
                      {_.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <div className="px-2">
                {notifications?.result?.items.map((notify, idx) => (
                  <Notification key={idx} notify={notify} />
                ))}
              </div>
              <div className="px-2">
                {isNotificationsFetching ? (
                  <div className="py-8 text-center">Loading notifications...</div>
                ) : notifications?.result?.items?.length ? (
                  notifications.result.items.map((notify, idx) => (
                    <Notification key={idx} notify={notify} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Bell className="h-10 w-10 text-gray-400 mb-3" />
                    <p className="text-sm font-medium text-gray-600">No notifications</p>
                    <p className="text-xs text-gray-400 mt-1">You&apos;re all caught up.</p>
                  </div>
                )}
              </div>
            </DropdownMenuContent> */}
            <DropdownMenuContent className="w-[500px] h-[75vh] mt-5 p-0">
              <Tabs
                defaultValue="all"
                onValueChange={(value) => {
                  setUnreadOnly(value === "unread" ? true : undefined);
                }}
                className="h-full flex flex-col"
              >
                <div className="sticky top-0 bg-white z-10 p-3 border-b">
                  <TabsList className="flex w-full">
                    {notifyType.map((item) => (
                      <TabsTrigger
                        key={item.value}
                        value={item.value}
                        className="rounded-[26px] w-full"
                      >
                        {item.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {/* <div
                  ref={notificationContainerRef}
                  onScroll={handleNotificationScroll}
                  className="flex-1 overflow-y-auto px-2"
                >
                  {notifications.length === 0 && !isFetching ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <Bell className="w-10 h-10 text-gray-400" />
                      <p className="mt-3 text-sm font-medium">No notifications</p>
                      <p className="text-xs text-gray-500">You&apos;re all caught up.</p>
                    </div>
                  ) : (
                    notifications.map((notify, idx) => (
                      <Notification key={`${notify.id}-${idx}`} notify={notify} />
                    ))
                  )}

                  {isFetchingNextPage && (
                    <div className="py-4 text-center text-sm text-gray-500">Loading more...</div>
                  )}
                </div> */}
                <div
                  ref={notificationContainerRef}
                  onScroll={handleNotificationScroll}
                  className="flex-1 overflow-y-auto px-2"
                >
                  {isNotificationFetching && notifications.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      Loading notifications...
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <Bell className="w-10 h-10 text-gray-400" />
                      <p className="mt-3 text-sm font-medium">No notifications</p>
                      <p className="text-xs text-gray-500">You&apos;re all caught up.</p>
                    </div>
                  ) : (
                    notifications.map((notify, idx) => (
                      <Notification
                        key={`${notify.id}-${idx}`}
                        notify={notify}
                        onRead={handleReadNotification}
                        isPending={isReadNotificationPending}
                        selectedNotification={selectedNotification}
                      />
                    ))
                  )}

                  {isFetchingNextPage && (
                    <div className="py-4 text-center text-sm text-gray-500">Loading more...</div>
                  )}
                </div>
              </Tabs>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center !border-0 gap-2">
                <div className="w-[42px] h-[42px] rounded-full bg-[#007AFF] flex items-center justify-center">
                  <Avatar>
                    <AvatarImage src={data?.result?.profilePicture as string} />
                    <AvatarFallback>{`${data?.result?.firstName?.charAt(0)} ${data?.result?.lastName?.charAt(
                      0
                    )}`}</AvatarFallback>
                  </Avatar>
                </div>
                <ArrowDown />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button className="bg-[#007AFF] rounded-full px-8" onClick={handleLogin}>
            Login
          </Button>
          <Button className="!no-underline" variant={"link"} onClick={handleGetStarted}>
            Get started
          </Button>
        </div>
      )}
    </section>
  );
};

export default Navbar;
