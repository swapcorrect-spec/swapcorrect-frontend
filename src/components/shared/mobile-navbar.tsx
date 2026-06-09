"use client";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/app/assets/images/svgs/logo_mobile.svg";
import Bell from "@/app/assets/images/svgs/Bell.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import ArrowDown from "@/app/assets/images/svgs/arrow_down.svg";
import { IGetUserInfoResponseData } from "@/app/_hooks/queries/auth/auth.type";
import { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PATHS } from "@/app/_constants/paths";
import { notifyType } from "@/app/_constants/notifications";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Notification from "../widget/notification";
import {
  useGetNotifications,
  useGetUnreadNotificationCount,
  useReadNotification,
} from "@/app/_hooks/queries/notification/notification";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  data?: IGetUserInfoResponseData;
}

const MobileNavbar: FC<Props> = ({ data }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const notificationContainerRef = useRef<HTMLDivElement>(null);
  const [isOpenNotifications, setIsOpenNotifications] = useState(false);
  const [unreadOnly, setUnreadOnly] = useState<boolean | undefined>(undefined);
  const [selectedNotification, setSelectedNotification] = useState("");
  const [activeTab, setActiveTab] = useState("all");

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

  const handleLogout = () => {
    queryClient.clear();
    localStorage.clear();
    router.push(`/${PATHS.LOGIN}`);
  };

  const handleLogin = () => {
    router.push(`/${PATHS.LOGIN}`);
  };

  // const handleOpenNotifications = () => {
  //   setIsOpenNotifications(!isOpenNotifications);
  //   setUnreadOnly(undefined);
  // };

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
    <header className="w-full bg-white">
      <nav className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <Logo />
          </div>
        </div>

        {isLoggedIn ? (
          <>
            <div className="flex items-center gap-4">
              {/* <div className="relative">
                <Bell className="h-6 w-6 text-gray-700" />
                <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </div> */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpenNotifications(true);
                    setUnreadOnly(undefined);
                  }}
                  className="relative"
                >
                  <Bell />

                  {!isFetching && unreadCount?.result !== 0 && (
                    <div className="absolute top-[-3px] right-[-2px] text-white bg-[#E42222] w-4 h-4 rounded-full flex items-center justify-center text-xs">
                      {unreadCount?.result}
                    </div>
                  )}
                </button>
              </div>
              {isOpenNotifications && (
                <>
                  <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                    onClick={() => setIsOpenNotifications(false)}
                  />

                  <div className="fixed top-[70px] left-2 right-2 h-[75vh] bg-white rounded-xl shadow-xl z-50 flex flex-col overflow-hidden">
                    <Tabs
                      value={activeTab}
                      defaultValue="all"
                      onValueChange={(value) => {
                        setActiveTab(value);
                        setUnreadOnly(value === "unread" ? true : undefined);
                      }}
                      className="h-full flex flex-col"
                    >
                      <div className="sticky top-0 bg-white z-10 p-3 border-b">
                        <TabsList className="flex w-full bg-[#F3F4F6] rounded-full p-1">
                          {notifyType.map((item) => (
                            <TabsTrigger
                              key={item.value}
                              value={item.value}
                              className="flex-1 rounded-full bg-transparent text-[#6B7280] data-[state=active]:bg-[#fff] data-[state=active]:text-[#6B7280] data-[state=active]:shadow-none"
                            >
                              {item.title}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </div>

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
                          <div className="py-4 text-center text-sm text-gray-500">
                            Loading more...
                          </div>
                        )}
                      </div>
                    </Tabs>
                  </div>
                </>
              )}

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
          </>
        ) : (
          <Button
            variant={"outline"}
            size={"sm"}
            className="rounded-2xl shadow-none"
            onClick={handleLogin}
          >
            Log in
          </Button>
        )}
      </nav>

      {isOpen && (
        <div>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div
            className={`fixed top-0 left-0 h-full w-[260px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <Logo />

              <button onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </div>

            <div className="flex flex-col gap-4 px-4 py-6 text-gray-700">
              <a href={PATHS.HOME} className="hover:text-[#007AFF] transition">
                Home
              </a>
              <a href={PATHS.CATEGORY} className="hover:text-[#007AFF] transition">
                Category
              </a>
              {isLoggedIn && (
                <>
                  <a href={PATHS.DASHBOARD} className="hover:text-[#007AFF] transition">
                    Dashboard
                  </a>
                  <a href={PATHS.SAVES} className="hover:text-[#007AFF] transition">
                    Saves
                  </a>
                  {data && data?.result?.userRole[0] === "Swapper" && (
                    <a href={PATHS.MYLISTING} className="hover:text-[#007AFF] transition">
                      My Listing
                    </a>
                  )}
                  <a href={PATHS.CHAT} className="hover:text-[#007AFF] transition">
                    Chat
                  </a>
                  <a href="/settings" className="hover:text-[#007AFF] transition">
                    Settings
                  </a>
                </>
              )}
              {isLoggedIn ? (
                <Button
                  variant="outline"
                  className="mt-6 border-[#007AFF] text-[#007AFF] hover:bg-[#007AFF]/10 rounded-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="mt-6 border-[#007AFF] text-[#007AFF] hover:bg-[#007AFF]/10 rounded-full"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default MobileNavbar;
