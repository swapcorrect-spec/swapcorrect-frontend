"use client";

import CategorySidenav from "@/app/(main)/category/_components/category-sidenav";
import Categories from "@/app/(main)/category/_components/categories";
import useIsMobile from "@/app/_hooks/useIsMobile";
import Footer from "@/components/shared/footer";
const Category = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <div className="flex min-w-0 mt-20 md:mt-0">
        {!isMobile && <CategorySidenav />}
        <Categories />
      </div>
      <Footer />
    </>
  );
};

export default Category;
