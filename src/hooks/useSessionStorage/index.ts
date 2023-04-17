import { useState, useEffect } from 'react';

/**
 * Provides a way to store and retrieve data from the session storage.
 * 
 * @template T The type of the value.
 * 
 * @param {string} key The key to use for storing and retrieving data from the session storage.
 * @param {T} initialValue The initial value to use if no value is currently stored in session storage for the given key.
 * 
 * @returns {[T, (value: T) => void]} A tuple containing the current value and a function to update the value in session storage.
 *
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function useSessionStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [state, setState] = useState<T>(() => {
    const storedValue = sessionStorage.getItem(key);
    if (storedValue !== null) {
      try {
        return JSON.parse(storedValue);
      } catch (error) {
        return storedValue as T;
      }
    }
    return initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default useSessionStorage;
