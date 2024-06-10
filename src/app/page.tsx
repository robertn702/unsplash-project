import ColorFilterSelect from "@/app/_components/color-filter-select";
import SearchInput from "@/app/_components/search-input";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* search bar */}
      <SearchInput/>
      {/* filter / sort */}
      <div className={"flex flex-row items-center"}>
        <ColorFilterSelect/>
      </div>
      {/* image grid */}
      {/* pagination */}
    </main>
  );
}
