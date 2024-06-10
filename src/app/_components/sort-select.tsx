"use client"

import useUpdateSearchParams from "@/app/_hooks/use-update-search-params";
import { useSearchParams } from "next/navigation";
import { ReactElement } from "react";

/**
 * Note: These were found in the unsplash-js types. Not sure where they are documented.
 *
 * node_modules/unsplash-js/src/methods/search/types/request.ts
 */
const sortByOptions = [
  {key: 'relevant', label: 'Relevant'},
  {key: 'latest', label: 'Latest'},
  {key: 'editorial', label: 'Editorial'},
] as const;

export type SortSelectProps = Readonly<{}>

export default function SortSelect({}: SortSelectProps): ReactElement {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  {/* TODO: validate url params */
  }
  const urlSortBy = searchParams.get("sort_by");

  return (
    <label className={"form-control"}>
      <div className={"label"}>
        <div className={"label-text"}>Sort by</div>
      </div>
      <select
        className={"select select-bordered"}
        /* TODO: don't use magic string literals */
        value={urlSortBy || "latest"}
        onChange={(e) => {
          const selectedKey = e.target.value;
          updateSearchParams("sort_by", selectedKey);
        }}
      >
        {sortByOptions.map(({key, label}) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>
    </label>
  );
}