import { useEffect, useRef } from 'react';

/**
 * Sets up an interval to repeatedly call the provided callback function.
 * 
 * @param {() => void} callback The function to be called repeatedly at the specified interval.
 * @param {number} delay The delay, in milliseconds, between each function call. If set to `null`, the interval will be cleared.
 * 
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef<(() => void) | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      const intervalId = setInterval(tick, delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
}

export default useInterval;
