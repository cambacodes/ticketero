"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortParser } from "@/lib/searchParams";
import { LucideSortAsc, LucideSortDesc } from "lucide-react";
import { useQueryStates } from "nuqs";

import { Button } from "./ui/button";

export type SortSelectOption = {
  sortKey: string;
  label: string;
};

type SortSelectProps = {
  options: SortSelectOption[];
};

const SortSelect = ({ options }: SortSelectProps) => {
  const [sortValue, setSortValue] = useQueryStates(sortParser);

  const handleSort = async (newSortKey: string) => {
    const newSortDirection =
      sortValue.sortKey === newSortKey
        ? sortValue.sortValue === "asc"
          ? "desc"
          : "asc"
        : sortValue.sortValue;

    await setSortValue({
      sortKey: newSortKey,
      sortValue: newSortDirection,
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            {sortValue.sortValue === "asc" ? (
              <LucideSortDesc />
            ) : (
              <LucideSortAsc />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {options.map((option) => (
            <DropdownMenuCheckboxItem
              checked={sortValue.sortKey === option.sortKey}
              key={option.sortKey}
              onSelect={() => handleSort(option.sortKey)}
              className="flex justify-between"
            >
              <span>{option.label}</span>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { SortSelect };
