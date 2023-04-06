import { useEffect, useState } from 'react';

/**
 * Debounces the execution of a function until a certain amount of time has passed.
 *
 * @template T The type of value being debounced.
 * @param value The value to debounce.
 * @param delay The amount of time (in milliseconds) to wait before executing the debounced function.
 * @returns The debounced value.
 *
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
