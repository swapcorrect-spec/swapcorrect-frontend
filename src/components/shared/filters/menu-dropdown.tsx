import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SelectFilter } from "./select";
import { Button } from "@/components/ui/button";
import Filter from "@/app/assets/images/Filter.svg";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface selectType {
  value: string;
  text: string;
}

interface iProps {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  categoryList: selectType[];
  locationList: selectType[];
}
const FilterMenu: React.FC<iProps> = ({
  setCategory,
  setLocation,
  categoryList,
  locationList,
}) => {
  return (
    <div className="flex gap-4 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="!h-11 flex items-center border border-[#E9E9E9] w-fit rounded-md text-sm text-[#222222] gap-2"
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
                list={categoryList}
                setFilter={setCategory}
                placeholder="Location"
                className="!w-full"
                label="Location"
              />
              <SelectFilter
                list={locationList}
                setFilter={setLocation}
                placeholder="Category"
                className="!w-full"
                label="Category"
              />
              <div className="w-full">
                <label className="flex justify-between text-sm mb-2 font-medium">
                  <p>Estimated Value</p>
                  <p className="text-[#007AFF]">₦0 - ₦1,000,000+</p>
                </label>
                <div className="bg-[#F3F9FF] !h-10 relative flex items-center justify-center rounded-lg px-2">
                  <input
                    type="range"
                    className="w-full rounded-lg !border-0 border-[#D9D9D994]"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-10">
              <Button className="bg-[#B2B2B2] text-white font-medium text-sm rounded-[1rem]">
                Reset
              </Button>
              <Button className="font-medium text-sm rounded-[1rem]">
                Apply Filter
              </Button>
            </div>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="max-w-[749px] w-full">
        <Input
          startIcon={<Search />}
          className="w-full !h-9 rounded-lg"
          placeholder="Search items..."
        />
      </div>
    </div>
  );
};

export default FilterMenu;
