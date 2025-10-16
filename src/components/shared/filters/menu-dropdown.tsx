import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SelectFilter } from "./select";
import { Button } from "@/components/ui/button";
import Filter from "@/app/assets/images/svgs/Filter.svg";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useGetAllCategories } from "@/app/_hooks/queries/swap";
import { useMemo, useState, useEffect } from "react";
import { useDebounce } from "@/app/_hooks/useDebounce";

interface selectType {
  value: string;
  text: string;
}

interface iProps {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setLowestRange?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setHighestRange?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setSearchParam?: React.Dispatch<React.SetStateAction<string>>;
  onApplyFilters?: (filters: {
    category: string;
    location: string;
    lowestRange?: number;
    highestRange?: number;
  }) => void;
  categoryList: selectType[];
  locationList: selectType[];
}
const FilterMenu: React.FC<iProps> = ({
  setCategory,
  setLocation,
  setLowestRange,
  setHighestRange,
  setSearchParam,
  onApplyFilters,
  categoryList,
  locationList,
}) => {
  const { data: categoriesData, isLoading, error } = useGetAllCategories({ enabler: true });
  const [rangeValue, setRangeValue] = useState(0);
  const [tempCategory, setTempCategory] = useState("");
  const [tempLocation, setTempLocation] = useState("");
  const [searchValue, setSearchValue] = useState("");
  
  // Debounce search value with 500ms delay
  const debouncedSearchValue = useDebounce(searchValue, 500);

  // Effect to update searchParam when debounced value changes
  useEffect(() => {
    if (setSearchParam) {
      setSearchParam(debouncedSearchValue);
    }
  }, [debouncedSearchValue, setSearchParam]);

  // Transform API data to selectType format
  const apiCategoryList = useMemo(()=> categoriesData?.map(category => ({
    value: category.id, // Use ID for filtering
    text: category.categoryName
  })) || [], [categoriesData]);

  const finalCategoryList = apiCategoryList.length > 0 ? apiCategoryList : categoryList;

  const handleApplyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters({
        category: tempCategory,
        location: tempLocation,
        lowestRange: 0,
        highestRange: rangeValue
      });
    }
    // Update the actual states
    setCategory(tempCategory);
    setLocation(tempLocation);
    if (setLowestRange) setLowestRange(0);
    if (setHighestRange) setHighestRange(rangeValue);
  };

  const handleResetFilters = () => {
    setTempCategory("");
    setTempLocation("");
    setRangeValue(0);
    setCategory("");
    setLocation("");
    if (setLowestRange) setLowestRange(undefined);
    if (setHighestRange) setHighestRange(undefined);
  };

  return (
    <div className="flex gap-4 items-cente mb-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="h-9">
          <Button
            variant="outline"
            className="!h-12 flex items-center border border-[#E9E9E9] w-fit rounded-md text-sm text-[#222222] gap-2"
          >
            <Filter />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[900px] p-5 mt-3" align="start">
          <DropdownMenuGroup className="w-full">
            <h6 className="text-[#007AFF] font-medium mb-3 2xl:mb-4 text-xs">
              FILTER
            </h6>
            <div className="flex gap-5">
              <SelectFilter
                list={finalCategoryList}
                setFilter={setTempCategory}
                placeholder="Category"
                className="!w-full"
                label="Category"
              />
              <div className="w-full">
                <label className="flex justify-between text-sm mb-2 font-medium">
                  <p>Estimated Value</p>
                  <p className="text-[#007AFF]">₦0 - ₦{rangeValue.toLocaleString()}</p>
                </label>
                <div className="bg-[#F3F9FF] !h-10 relative flex items-center justify-center rounded-lg px-2">
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    step="10000"
                    value={rangeValue}
                    onChange={(e) => setRangeValue(Number(e.target.value))}
                    className="w-full rounded-lg !border-0 border-[#D9D9D994]"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-10">
              <Button 
                onClick={handleResetFilters}
                className="bg-[#B2B2B2] text-white font-medium text-sm rounded-[1rem]"
              >
                Reset
              </Button>
              <Button 
                onClick={handleApplyFilters}
                className="font-medium text-sm rounded-[1rem]"
              >
                Apply Filter
              </Button>
            </div>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="max-w-[749px] w-full">
        <Input
          startIcon={<Search />}
          className="w-full !h-8 rounded-lg"
          placeholder="Search items..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterMenu;
