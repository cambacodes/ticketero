"use client";

import SearchInput from "@/components/SearchInput";
import { searchParser } from "@/lib/searchParams";
import { useQueryState } from "nuqs";

type SearchInputProps = {
  placeholder: string;
};

export default function TicketSearchInput({ placeholder }: SearchInputProps) {
  const [search, setSearch] = useQueryState("search", searchParser);

  const handleSearch = async (value: string) => {
    await setSearch(value);
  };

  return (
    <SearchInput
      value={search}
      onChange={handleSearch}
      placeholder={placeholder}
    />
  );
}
