"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactElement, useState } from "react";

export type SearchInputProps = Readonly<{}>

export default function SearchInput({}: SearchInputProps): ReactElement {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter()
  const urlQuery = searchParams.get("q");

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
          const params = new URLSearchParams(Array.from(searchParams.entries()));
          params.set("q", query);
          router.replace(pathname + "?" + params.toString());
        }
      }}
      onChange={(e) => {
        setQuery(
          e.target.value
        );
      }}/>
  )
}