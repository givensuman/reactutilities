import { useState, useEffect } from 'react';

/**
 * Throttles the execution of a function to a certain number of times within a given time period.
 *
 * @template T The type of value being throttled.
 * @param value The value to throttle.
 * @param limit The maximum number of times the function can be called within the given time period.
 * @param period The time period (in milliseconds) during which the maximum number of function calls is limited.
 * @returns The throttled value.
 *
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function useThrottle<T>(value: T, limit: number, period: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const [callCount, setCallCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setThrottledValue(value);
      setCallCount(0);
    }, period);

    return () => clearInterval(interval);
  }, [value, period]);

  useEffect(() => {
    if (callCount < limit) {
      setThrottledValue(value);
      setCallCount(count => count + 1);
    }
  }, [value, limit, callCount]);

  return throttledValue;
}

export default useThrottle;
