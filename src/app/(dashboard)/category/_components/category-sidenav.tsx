"use client";
import Link from "next/link";
import { CATEGORIES } from "@/app/_constants/categories";
import { useSearchParams } from "next/navigation";

const CategorySidenav = () => {
  const search = useSearchParams();
  const tab = search.get("tab");

  return (
    <div className="border-r border-[#e3e0e0] w-[20%] p-3">
      {CATEGORIES.map((category) => (
        <div key={category.tab} className="flex flex-col gap-3 mt-5">
          <p className="text-[#007AFF] font-medium text-sm">{category.tab}</p>
          {category.options.map(({ label, path, Icon }) => (
            <Link
              key={label}
              href={`?tab=${path}`}
              className={`flex items-center gap-2 py-2 my-1 px-2 ${
                path === tab
                  ? "bg-[#F4F4F4] rounded-xl border border-[#E3E3E3]"
                  : ""
              }`}
            >
              <Icon />
              <p>{label}</p>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CategorySidenav;
