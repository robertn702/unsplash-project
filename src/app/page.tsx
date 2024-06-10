import ColorFilterSelect from "@/app/_components/color-filter-select";
import SearchInput from "@/app/_components/search-input";
import SortSelect from "@/app/_components/sort-select";
import { createApi } from "unsplash-js";


const unsplashKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
if (!unsplashKey) {
  throw new Error("unsplash access key is not defined");
}

const unsplash = createApi({
  accessKey: unsplashKey,
});


export default function Home() {
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
