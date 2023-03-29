import { useEffect, useState } from 'react';

/**
 * Simplifies the process of handling asynchronous functions and updating the UI when the data is ready.
 * 
 * @template T - The type of data being fetched asynchronously.
 * @param {() => Promise<T>} asyncFunction - The asynchronous function to execute.
 * @param {any[]} [deps=[]] - An optional array of dependencies that the hook should watch for changes.
 * @returns {AsyncState<T>} An object containing the state of the asynchronous operation.
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function useAsync<T>(asyncFunction: () => Promise<T>, deps: any[] = []): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    asyncFunction()
      .then((data: T) => {
        setData(data);
      })
      .catch((error: Error) => {
        setError(error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [...deps]);

  return { data, isLoading, isError, error };
}

interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export default useAsync;
