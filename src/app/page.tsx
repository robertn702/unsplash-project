"use client"

import ColorFilterSelect from "@/app/_components/color-filter-select";
import SearchInput from "@/app/_components/search-input";
import SortSelect from "@/app/_components/sort-select";
import { createApi } from "unsplash-js";


const unsplashKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
if (!unsplashKey) {
  throw new Error("unsplash access key is not defined");
}
import unsplash from "@/app/_libs/unsplash";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ColorId, SearchOrderBy } from "unsplash-js";

type UnsplashGetPhotosOptions = Parameters<typeof unsplash.search.getPhotos>[0];

export default function Home() {
  // todo: consider using params directly from props
  const searchParams = useSearchParams();

  const unsplashSearchOptions = useMemo<UnsplashGetPhotosOptions>(() => {
    const query = searchParams.get("q");
    const color = searchParams.get("color");
    const orderBy = searchParams.get("order_by");
    const page = searchParams.get("page");

    // TODO: properly validate the search params
    const options: UnsplashGetPhotosOptions = {
      query: query || "",
      color: color as ColorId | undefined,
      orderBy: (orderBy || "latest") as SearchOrderBy,
      page: page ? parseInt(page, 10) : 1
    }

    return options;
  }, [searchParams])

  const {data} = useQuery({
    // TODO: Add relevant search params
    queryKey: ["search", unsplashSearchOptions],
    queryFn: () => {
      return unsplash.search.getPhotos(unsplashSearchOptions)
    },
    // todo: enable when ready
    enabled: false
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* search bar */}
      <SearchInput/>
      {/* filter / sort */}
      <div className={"flex flex-row items-center"}>
        <ColorFilterSelect/>
        <SortSelect/>
      </div>
      {/* image grid */}

      {/* pagination */}
    </main>
  );
}
