"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { PATHS } from "@/app/_constants/paths";
import { mockNotifications, notifyType } from "@/app/_constants/notifications";
import { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    localStorage.clear();
    router.push(`/${PATHS.LOGIN}`);
  };

  return (
    <section className="border-[#E9E9E9] border bg-white py-[15px] px-[42px] top-0 sticky flex items-center gap-[110px] z-10 w-full">
      <Link href={`${isLoggedIn ? "/dashboard" : "/"}`} className="flex justify-center">
        <Logo />
      </Link>
      <div className="max-w-[749px] w-full me-auto">
        <Input startIcon={<Search />} className="w-full !h-11 rounded-[2rem]" placeholder="Search items..." />
      </div>
      {isLoggedIn ? (
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
              <Tabs defaultValue="item-description" className="w-full mb-6 sticky top-0 bg-white py-3">
                <TabsList className="flex w-full">
                  {notifyType.map((_, index: number) => (
                    <TabsTrigger value={_.value} className={`rounded-[26px] w-full`} key={index}>
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
