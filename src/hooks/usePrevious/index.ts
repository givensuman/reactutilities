import { useRef, useEffect } from 'react';

/**
 * Returns the previous value of a given variable or state.
 *
 * @template T The type of the value.
 * 
 * @param {T} value The current value.
 * 
 * @returns {T | undefined} The previous value.
 * 
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;
