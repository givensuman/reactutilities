import { useState, useEffect } from 'react';

/**
 * Detects the size of the window and returns it as an object.
 *
 * @returns {{
 *    width: number,
 *    height: number
 * }} An object with the `width` and `height` of the window.
 *
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
