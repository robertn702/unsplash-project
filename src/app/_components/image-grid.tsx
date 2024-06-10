import Image from "next/image";
import { ReactElement } from "react";
import { Photos } from "unsplash-js/src/methods/search/types/response";

export type ImageGridProps = Readonly<{
  isLoading: boolean,
  images: Photos["results"],
}>

export default function ImageGrid({images, isLoading}: ImageGridProps): ReactElement {
  if (isLoading) {
    return <div className={`flex-grow`}>Loading...</div>
  }

  if (!isLoading && images.length === 0) {
    return <div
      className={`flex flex-grow items-center justify-center text-center`}>{`We couldn't find any images that match your search`}</div>
  }

  return (
    <div className={"flex-grow grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}>
      {images.map((i) => (
        // TODO: calculate responsive heights
        <div className={"aspect-square w-full relative h-32"} key={i.id}>
          <Image src={i.urls.regular}
                 alt={i.alt_description || ""}
                 fill
                 objectFit={"cover"}
          />
        </div>
      ))}
    </div>
  );
}