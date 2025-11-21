import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useScreenshot(demoUrl?: string) {
  const { data, error } = useSWR(
    demoUrl
      ? `https://api.microlink.io/?url=${demoUrl}&meta=false&screenshot=true`
      : null,
    fetcher
  );

  return {
    screenshot: data?.data?.screenshot?.url || null,
    error,
  };
}
