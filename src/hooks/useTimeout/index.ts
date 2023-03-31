import { useEffect, useRef } from 'react';

/**
 * Allows you to execute a function after a specified amount of time has passed.
 *
 * @param callback - The function to execute after the timeout has elapsed.
 * @param delay - The amount of time, in milliseconds, to wait before executing the function.
 * 
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
const useTimeout = (callback: () => void, delay: number): void => {
  const savedCallback = useRef<() => void>(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const id = setTimeout(() => {
      savedCallback.current();
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [delay]);
};

export default useTimeout;
