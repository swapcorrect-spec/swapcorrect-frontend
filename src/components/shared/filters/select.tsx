"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface selectType {
  value: string;
  text: string;
}
interface IProps {
  list: selectType[];
  placeholder?: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  label?: string;
}

export function SelectFilter({
  list,
  placeholder = "Select option",
  setFilter,
  className,
  label = "",
}: IProps) {
  return (
    <div className="w-full">
      <Select
        onValueChange={(value) => {
          setFilter(value);
        }}
      >
        {label && (
          <p className="text-[#01190F] font-medium text-sm mb-2">{label}</p>
        )}
        <SelectTrigger className={cn("w-full h-10", className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="">
          <SelectGroup>
            {list?.map((list, index: number) => (
              <SelectItem value={list?.value} key={index}>
                {list?.text}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
