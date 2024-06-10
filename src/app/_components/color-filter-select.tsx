"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactElement, useState } from "react";

/**
 * Note: These were found in the unsplash-js types. Not sure where they are documented.
 *
 * node_modules/unsplash-js/src/methods/search/types/request.ts
 */
const colorOptions = [
  {key: 'all', label: 'All'},
  {key: 'white', label: 'White'},
  {key: 'black', label: 'Black'},
  {key: 'yellow', label: 'Yellow'},
  {key: 'orange', label: 'Orange'},
  {key: 'red', label: 'Red'},
  {key: 'purple', label: 'Purple'},
  {key: 'magenta', label: 'Magenta'},
  {key: 'green', label: 'Green'},
  {key: 'teal', label: 'Teal'},
  {key: 'blue', label: 'Blue'},
  {key: 'black_and_white', label: 'B&W'}
] as const;

export type ColorFilterSelectProps = Readonly<{}>

export default function ColorFilterSelect({}: ColorFilterSelectProps): ReactElement {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter()
  const urlColor = searchParams.get("color");

  return (
    <label className={"form-control"}>
      <div className={"label"}>
        <div className={"label-text"}>Color</div>
      </div>
      <select
        value={urlColor || undefined}
        className={`select select-bordered`}
        onChange={(e) => {
          const selectedKey = e.target.value;
          // todo: validate the key values
          const params = new URLSearchParams(Array.from(searchParams.entries()));
          if (selectedKey === "all") {
            params.delete("color");
          } else {
            params.set("color", selectedKey);
          }
          router.replace(pathname + "?" + params.toString());
        }}
      >
        {colorOptions.map(({key, label}) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>
    </label>
  );
}