"use client";
import Link from "next/link";
import { CATEGORIES } from "@/app/_constants/categories";
import { useSearchParams } from "next/navigation";
import { useGetAllCategories } from "@/app/_hooks/queries/listing/listing";
import { Skeleton } from "@/components/ui/skeleton";

const CategorySidenav = () => {
  const search = useSearchParams();
  const tab = search.get("tab");
  
  const { data: categoriesData, isLoading } = useGetAllCategories({
    enabler: true,
  });

  return (
    <div className="border-r border-[#e3e0e0] w-[20%] h-full overflow-y-auto hide-scrollbar sticky top-0">
      <div className="p-3">
        {CATEGORIES.map((category) => {
        return (
          <div key={category.tab} className="flex flex-col gap-3 mt-5">
            <p className="text-[#007AFF] font-medium text-sm">{category.tab}</p>
            {category.tab === "CATEGORY" && isLoading ? (
              <div className="flex flex-col gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-10 w-full rounded-lg" />
                ))}
              </div>
            ) : category.tab === "CATEGORY" && categoriesData ? (
              <>
                {category.options[0] && (() => {
                  const AllItemsIcon = category.options[0].Icon as unknown as React.ComponentType<any>;
                  return (
                    <Link
                      href={`?tab=${category.options[0].path}`}
                      className={`flex items-center gap-2 py-2 my-1 px-2 ${
                        category.options[0].path === tab
                          ? "bg-[#F4F4F4] rounded-xl border border-[#E3E3E3]"
                          : ""
                      }`}
                    >
                      {AllItemsIcon && <AllItemsIcon className="w-5 h-5" />}
                      <p>{category.options[0].label}</p>
                    </Link>
                  );
                })()}
                {categoriesData.map((apiCategory) => {
                  const staticCategory = category.options.find(
                    (opt) => opt.label.toLowerCase() === apiCategory.categoryName.toLowerCase()
                  );
                  const StaticIcon = staticCategory?.Icon as unknown as React.ComponentType<any> | undefined;
                  return (
                    <Link
                      key={apiCategory.id}
                      href={`?tab=${staticCategory?.path || apiCategory.id}`}
                      className={`flex items-center gap-2 py-2 my-1 px-2 ${
                        (staticCategory?.path || apiCategory.id) === tab
                          ? "bg-[#F4F4F4] rounded-xl border border-[#E3E3E3]"
                          : ""
                      }`}
                    >
                      {StaticIcon ? (
                        <StaticIcon className="w-5 h-5" />
                      ) : (
                        <div className="w-5 h-5 rounded bg-gray-200" />
                      )}
                      <p>{apiCategory.categoryName}</p>
                    </Link>
                  );
                })}
              </>
            ) : (
              category.options.map(({ label, path, Icon }) => {
                const IconComponent = Icon as unknown as React.ComponentType<any>;
                return (
                  <Link
                    key={label}
                    href={`?tab=${path}`}
                    className={`flex items-center gap-2 py-2 my-1 px-2 ${
                      path === tab
                        ? "bg-[#F4F4F4] rounded-xl border border-[#E3E3E3]"
                        : ""
                    }`}
                  >
                    {IconComponent && <IconComponent className="w-5 h-5" />}
                    <p>{label}</p>
                  </Link>
                );
              })
            )}
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default CategorySidenav;
