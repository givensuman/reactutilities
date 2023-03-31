import { useState, useEffect, useRef } from 'react';

/**
 * Allows you to detect when the user is idle.
 *
 * @param {number} idleTime The amount of time (in milliseconds) of inactivity
 * required for the user to be considered idle.
 *
 * @returns {boolean} A boolean value indicating whether the user is currently idle.
 * 
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
const useIdleTimer = (idleTime: number): boolean => {
  const [isIdle, setIsIdle] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | number | null>(null);

  useEffect(() => {
    const onActivity = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => setIsIdle(true), idleTime);
    };

    onActivity();

    document.addEventListener('mousemove', onActivity);
    document.addEventListener('keydown', onActivity);

    return () => {
      document.removeEventListener('mousemove', onActivity);
      document.removeEventListener('keydown', onActivity);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [idleTime]);

  return isIdle;
};

export default useIdleTimer;
