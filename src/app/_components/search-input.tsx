"use client"

import useUpdateSearchParams from "@/app/_hooks/use-update-search-params";
import { useSearchParams } from "next/navigation";
import { ReactElement, useState } from "react";

export type SearchInputProps = Readonly<{}>

export default function SearchInput({}: SearchInputProps): ReactElement {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q");
  const updateSearchParams = useUpdateSearchParams();

  const [query, setQuery] = useState(urlQuery || "")
  return (
    <input
      className="input input-primary"
      type="search"
      placeholder="Search for images..."
      value={query}
      onKeyUp={(e) => {
        // submit on enter
        if (e.key === "Enter") {
          updateSearchParams("q", query);
        }
      }}
      onChange={(e) => {
        setQuery(
          e.target.value
        );
      }}/>
  )
}