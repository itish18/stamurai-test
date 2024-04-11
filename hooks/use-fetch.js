import { useCallback, useState } from "react";

export const useFetch = (action, options) => {
  const [error, setError] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (input) => {
      setIsLoading(true);

      try {
        const result = await action(input);

        if (!result) {
          return;
        }

        if (result.error) {
          setError(result.error);
          options.onError?.(result.error);
        }

        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result.data);
        }
      } finally {
        setIsLoading(false);
        options.onComplete?.();
      }
    },
    [action, options]
  );

  return {
    execute,

    error,
    data,
    isLoading,
  };
};
