import CategorySidenav from "@/app/(main)/category/_components/category-sidenav";
import Categories from "@/app/(main)/category/_components/categories";
const Category = () => {
  return (
    <div className="flex h-[calc(100vh-72px)]">
      <CategorySidenav />
      <Categories />
    </div>
  );
};

export default Category;
