import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useUpdateSearchParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter()

  return useCallback((key: string, value: string | null): void => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.replace(pathname + "?" + params.toString());
  }, [pathname, router, searchParams])


}