import Logo from "@/app/assets/images/logo_full.svg";
import SwapperUpgradeLogo from "@/app/assets/images/swapper_upgrade.svg";
import Bell from "@/app/assets/images/Bell.svg";
import Search from "@/app/assets/images/Search.svg";
import Avatar from "@/app/assets/images/Avatar.svg";
import ArrowDown from "@/app/assets/images/arrow_down.svg";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../ui/input";

const Navbar: React.FC = () => {
  return (
    <section className="shadow-lg border-[#E9E9E9] border bg-white py-[15px] px-[42px] top-0 sticky flex items-center gap-[110px] z-10 w-full">
      <div className="flex justify-center">
        <Logo />
      </div>
      <div className="max-w-[749px] w-full me-auto">
        <Input
          startIcon={<Search />}
          className="w-full !h-11 rounded-[2rem]"
          placeholder="Search items..."
        />
      </div>
      <div className="flex gap-5 items-center">
        <Button
          variant={"default"}
          className="rounded-full font-medium text-sm py-3 !px-[11px] flex items-center gap-1 !h-auto w-full"
          size={"lg"}
        >
          Upgrade to Swapper <SwapperUpgradeLogo />
        </Button>
        <div className="relative">
          <Bell />
          <div className="absolute top-[-3px] right-[-2px] text-white bg-[#E42222] w-4 h-4 rounded-full items-center justify-center flex text-xs">
            4
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center !border-0 gap-2">
              <div className="w-[42px] h-[42px] rounded-full bg-[#007AFF] flex items-center justify-center">
                <Avatar />
              </div>
              <ArrowDown />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
};

export default Navbar;
