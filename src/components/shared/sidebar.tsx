"use client";

import HomeOutline from "@/app/assets/images/svgs/home_outline.svg";
import HomeFilled from "@/app/assets/images/svgs/home_filled.svg";
import ChatFilled from "@/app/assets/images/svgs/chat_filled.svg";
import ChatOutline from "@/app/assets/images/svgs/chat_outline.svg";
import SaveFilled from "@/app/assets/images/svgs/save_filled.svg";
import SaveOutline from "@/app/assets/images/svgs/save_outline.svg";
import CategoryFilled from "@/app/assets/images/svgs/category_filled.svg";
import CategoryOutline from "@/app/assets/images/svgs/category_outline.svg";
import { usePathname, useRouter } from "next/navigation";
import { PATHS } from "@/app/_constants/paths";
import Link from "next/link";
import { ArrowLeftRight, LayoutDashboard, ListCheck, LogOut, X } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import LogoutConfirmModal from "@/components/shared/logout-confirm-modal";

type Props = {
  handleToggleMenu?: () => void;
  role?: "Visitor" | "Swapper";
};

const Sidebar: React.FC<Props> = ({ handleToggleMenu, role }) => {
  const path = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const SIDEBAR_LIST = [
    {
      title: "Home",
      iconFilled: <HomeFilled />,
      iconOutline: <HomeOutline />,
      link: PATHS.HOME,
      showCount: false,
    },
    {
      title: "Dashboard",
      iconFilled: <LayoutDashboard size={22} color="#007AFF" strokeWidth={2.25} />,
      iconOutline: <LayoutDashboard size={22} color="#222222" strokeWidth={2} />,
      link: PATHS.DASHBOARD,
      showCount: false,
    },
    {
      title: "Category",
      iconFilled: <CategoryFilled />,
      iconOutline: <CategoryOutline />,
      link: PATHS.CATEGORY,
      showCount: false,
    },
    {
      title: "My Swaps",
      iconFilled: <ArrowLeftRight size={22} color="#007AFF" />,
      iconOutline: <ArrowLeftRight size={22} color="#222222" />,
      link: PATHS.SWAPS,
      showCount: true,
    },
    {
      title: "Saves",
      iconFilled: <SaveFilled />,
      iconOutline: <SaveOutline />,
      link: PATHS.SAVES,
      showCount: true,
    },
    {
      title: "My Listing",
      iconFilled: <ListCheck size={22} color="#007AFF" />,
      iconOutline: <ListCheck size={22} color="#222222" />,
      link: PATHS.MYLISTING,
      showCount: false,
      hideFor: ["Visitor"],
    },
    {
      title: "Chat",
      iconFilled: <ChatFilled />,
      iconOutline: <ChatOutline />,
      link: PATHS.CHAT,
      showCount: true,
    },
  ];

  const handleLogout = () => {
    queryClient.clear();
    localStorage.clear();
    setIsLogoutModalOpen(false);
    router.push(`/${PATHS.LOGIN}`);
  };

  const isRouteActive = (link: string) => {
    if (link === PATHS.HOME) return path === link;
    return path === link || path.startsWith(`${link}/`);
  };

  return (
    <section className="max-w-[99px] w-full border border-[#D9D9D9] bg-white z-50 h-screen py-7 relative top-0 flex flex-col">
      <div className="mb-20 flex items-center justify-center shrink-0">
        <X className="cursor-pointer" onClick={handleToggleMenu} />
      </div>

      <ul className="flex flex-col gap-6 items-center justify-center flex-1 overflow-y-auto min-h-0">
        {SIDEBAR_LIST.filter((item) => !item.hideFor?.includes(role as string)).map(
          ({ title, iconFilled, iconOutline, link }, index) => {
            const isActive = isRouteActive(link);

            return (
              <li key={index}>
                <Link href={link} className="flex flex-col items-center">
                  <span
                    className={`hover:bg-[#F1F8FF] px-1.5 py-[6px] rounded-lg flex items-center justify-center ${
                      isActive ? "bg-[#F1F8FF]" : "bg-transparent"
                    }`}
                  >
                    {isActive ? iconFilled : iconOutline}
                  </span>
                  <p
                    className={`font-medium text-xs text-center mt-0.5 ${
                      isActive ? "text-[#007AFF]" : "text-[#222222]"
                    }`}
                  >
                    {title}
                  </p>
                </Link>
              </li>
            );
          }
        )}
      </ul>

      <div className="mt-auto pt-6 shrink-0 flex flex-col items-center">
        <button
          type="button"
          onClick={() => setIsLogoutModalOpen(true)}
          className="flex flex-col items-center gap-1 group"
        >
          <span className="hover:bg-[#FEF2F2] px-1 py-[6px] rounded-lg flex items-center justify-center">
            <LogOut size={20} className="text-[#E42222]" />
          </span>
          <p className="font-medium text-xs text-[#E42222]">Logout</p>
        </button>
      </div>

      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </section>
  );
};

export default Sidebar;
