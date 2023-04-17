import { useState, useEffect } from 'react';

/**
 * Returns a stateful value and a function to update it, which persists in the browser's `localStorage`.
 *
 * @template T The type of the value.
 * 
 * @param {string} key The key to use when storing the value in `localStorage`.
 * @param {T} initialValue The initial value to use when the key is not found in `localStorage`.
 * 
 * @returns {[T, (value: T) => void]} A tuple containing the current value and a function to update it.
 *
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      return JSON.parse(storedValue);
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
