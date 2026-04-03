"use client";

import { Menu, Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/app/assets/images/svgs/logo_mobile.svg";
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
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PATHS } from "@/app/_constants/paths";

interface Props {
  data?: IGetUserInfoResponseData;
}

const MobileNavbar: FC<Props> = ({ data }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("comms-access-token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push(`/${PATHS.LOGIN}`);
  };

  const handleLogin = () => {
    router.push(`/${PATHS.LOGIN}`);
  };

  return (
    <header className="w-full bg-white">
      <nav className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsOpen(true)} className="p-2 rounded-md hover:bg-gray-100 transition">
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <Logo />
          </div>
        </div>

        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center">
                4
              </span>
            </div>
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
          <Button variant={"outline"} size={"sm"} className="rounded-2xl shadow-none" onClick={handleLogin}>
            Log in
          </Button>
        )}
      </nav>

      {isOpen && (
        <div>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)}></div>
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
                  <a href={PATHS.MYLISTING} className="hover:text-[#007AFF] transition">
                    My Listing
                  </a>
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
