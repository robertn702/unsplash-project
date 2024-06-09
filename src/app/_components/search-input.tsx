"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactElement, useState } from "react";

export type SearchInputProps = Readonly<{}>

export default function SearchInput({}: SearchInputProps): ReactElement {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter()

  // todo: add default value from url params
  const [query, setQuery] = useState("")
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