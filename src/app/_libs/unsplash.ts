import { createApi } from "unsplash-js";

const unsplashKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
if (!unsplashKey) {
  throw new Error("unsplash access key is not defined");
}

const unsplash = createApi({
  accessKey: unsplashKey,
});

export default unsplash;
