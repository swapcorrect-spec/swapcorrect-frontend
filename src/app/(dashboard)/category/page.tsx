import CategorySidenav from "@/app/(dashboard)/category/_components/category-sidenav";
import Categories from "@/app/(dashboard)/category/_components/categories";
import { Suspense } from "react";
const Category = () => {
  return (
    <div className="flex">
      <Suspense fallback={<p>Loading</p>}>
        <CategorySidenav />
        <Categories />
      </Suspense>
    </div>
  );
};

export default Category;
