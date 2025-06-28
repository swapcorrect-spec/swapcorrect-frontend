import CategorySidenav from "@/app/(main)/category/_components/category-sidenav";
import Categories from "@/app/(main)/category/_components/categories";
const Category = () => {
  return (
    <div className="flex">
      <CategorySidenav />
      <Categories />
    </div>
  );
};

export default Category;
