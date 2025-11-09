"use client";

import CategorySidenav from "@/app/(main)/category/_components/category-sidenav";
import Categories from "@/app/(main)/category/_components/categories";
import useIsMobile from "@/app/_hooks/useIsMobile";
const Category = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <div className="flex h-[calc(100vh-72px)]">
        {!isMobile && <CategorySidenav />}
        <Categories />
      </div>
    </>
  );
};

export default Category;
