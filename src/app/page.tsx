"use client"

import ColorFilterSelect from "@/app/_components/color-filter-select";
import ImageGrid from "@/app/_components/image-grid";
import ImagePagination from "@/app/_components/image-pagination";
import SearchInput from "@/app/_components/search-input";
import SortSelect from "@/app/_components/sort-select";
import unsplash from "@/app/_libs/unsplash";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ColorId, SearchOrderBy } from "unsplash-js";

type UnsplashGetPhotosOptions = Parameters<typeof unsplash.search.getPhotos>[0];

export default function Home() {
  // todo: consider using params directly from props
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const color = searchParams.get("color");
  const orderBy = searchParams.get("sort_by");
  const page = searchParams.get("page");

  const unsplashSearchOptions = useMemo<UnsplashGetPhotosOptions>(() => {

    // TODO: properly validate the search params
    const options: UnsplashGetPhotosOptions = {
      query: query || "",
      color: color as ColorId | undefined,
      orderBy: (orderBy || "latest") as SearchOrderBy,
      page: page ? parseInt(page, 10) : 1,
      // divisible by 2, 3, 4 for even responsive grid
      perPage: 12,
    }

    return options;
  }, [color, orderBy, page, query])

  const {data, isLoading} = useQuery({
    queryKey: ["search", unsplashSearchOptions],
    queryFn: () => {
      return unsplash.search.getPhotos(unsplashSearchOptions)
    },
  })

  return (
    <main className={`
      flex 
      min-h-screen 
      flex-col 
      items-center 
      justify-between 
      p-8 
      gap-2
      md:p-24
    `}>
      <SearchInput/>
      <div className={"flex flex-row gap-4 items-center justify-center w-full"}>
        <ColorFilterSelect/>
        <SortSelect/>
      </div>
      <ImageGrid isLoading={isLoading} images={data?.response?.results || []}/>
      <ImagePagination isDisabled={isLoading || !data?.response} totalPages={data?.response?.total_pages}/>
    </main>
  );
}
