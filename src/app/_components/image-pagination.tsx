import useUpdateSearchParams from "@/app/_hooks/use-update-search-params";
import { clsx } from "clsx";
import { useSearchParams } from "next/navigation";
import { ReactElement } from "react";

export type ImagePaginationProps = Readonly<{
  isDisabled: boolean,
  totalPages?: number
}>

export default function ImagePagination({isDisabled, totalPages}: ImagePaginationProps): ReactElement {
  const searchParams = useSearchParams();
  const urlPage = searchParams.get("page");
  const pageNum = urlPage ? parseInt(urlPage) : 1;

  const updateSearchParams = useUpdateSearchParams();

  return (
    <div className={"join"}>
      <button
        className={clsx("join-item btn", {"btn-disabled": isDisabled || !pageNum || pageNum <= 1})}
        onClick={() => {
          // go to first
          updateSearchParams("page", "1");
        }}>«
      </button>
      <button
        className={clsx("join-item btn", {"btn-disabled": isDisabled || !pageNum || pageNum <= 1})}
        onClick={() => {
          // go to previous
          updateSearchParams("page", (pageNum - 1).toString());
        }}>‹
      </button>
      <button className="join-item btn">{`${urlPage || "1"}`}</button>
      <button
        className={clsx("join-item btn", {"btn-disabled": isDisabled || !pageNum || !totalPages || pageNum >= totalPages})}
        onClick={() => {
          // go to next
          updateSearchParams("page", (pageNum + 1).toString());
        }}>›
      </button>
      <button
        className={clsx("join-item btn", {"btn-disabled": isDisabled || !pageNum || !totalPages || pageNum >= totalPages})}
        onClick={() => {
          if (!totalPages) return;
          // go to last
          updateSearchParams("page", totalPages.toString());
        }}>»
      </button>
    </div>
  );
}