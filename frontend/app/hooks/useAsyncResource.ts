import { useCallback, useEffect, useState } from "react";

export const useAsyncResource = <T,>(loader: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loader();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load data");
    } finally {
      setIsLoading(false);
    }
  }, [loader]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, isLoading, error, refresh: load };
};
