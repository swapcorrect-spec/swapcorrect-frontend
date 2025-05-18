"use client";

import HomeOutline from "@/app/assets/images/home_outline.svg";
import HomeFilled from "@/app/assets/images/home_filled.svg";
import ChatFilled from "@/app/assets/images/chat_filled.svg";
import ChatOutline from "@/app/assets/images/chat_outline.svg";
import SaveFilled from "@/app/assets/images/save_filled.svg";
import SaveOutline from "@/app/assets/images/save_outline.svg";
import Hamburger from "@/app/assets/images/hamburger.svg";
import CategoryFilled from "@/app/assets/images/category_filled.svg";
import CategoryOutline from "@/app/assets/images/category_outline.svg";
import { usePathname } from "next/navigation";
import { PATHS } from "@/app/_constants/paths";
import Link from "next/link";

const Sidebar: React.FC = () => {
  const path = usePathname();

  const SIDEBAR_LIST = [
    {
      title: "Home",
      iconFilled: <HomeFilled />,
      iconOutline: <HomeOutline />,
      link: PATHS.DASHBOARD,
      showCount: false,
    },
    {
      title: "Saves",
      iconFilled: <SaveFilled />,
      iconOutline: <SaveOutline />,
      link: PATHS.SAVES,
      showCount: true,
    },
    {
      title: "Chat",
      iconFilled: <ChatFilled />,
      iconOutline: <ChatOutline />,
      link: PATHS.CHAT,
      showCount: true,
    },
    {
      title: "Category",
      iconFilled: <CategoryFilled />,
      iconOutline: <CategoryOutline />,
      link: PATHS.CATEGORY,
      showCount: false,
    },
  ];
  return (
    <section className="max-w-[99px] w-full border border-[#D9D9D9] bg-white h-screen overflow-y-auto py-7">
      <div className="mb-20 flex items-center justify-center">
        <Hamburger />
      </div>
      <ul className="flex flex-col gap-6 items-center jsutify-center">
        {SIDEBAR_LIST.map(({ title, iconFilled, iconOutline, link }, index) => {
          const isActive = path === link;
          return (
            <li key={index}>
              <Link href={link}>
                <span
                  className={`hover:bg-[#F1F8FF] px-1 py-[6px] rounded-lg flex items-center justify-center ${
                    isActive ? "bg-[#F1F8FF]" : "bg-transparent"
                  }`}
                >
                  {isActive ? iconFilled : iconOutline}
                </span>
                <p
                  className={`font-medium text-xs ${
                    isActive ? "text-[#007AFF]" : "text-[#222222]"
                  }`}
                >
                  {title}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Sidebar;
