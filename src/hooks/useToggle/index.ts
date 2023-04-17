import { useState, useCallback } from 'react';

/**
 * Provides a boolean toggle state, along with functions to toggle the state and set the state to a specific value.
 *
 * @param {boolean} initialValue The initial boolean value for the toggle state. Defaults to `false`.
 * 
 * @returns {[
 *    boolean,
 *    () => void,
 *    (newValue: boolean) => void
 * ]} A tuple containing the current boolean value of the toggle state, a function to toggle
 * the state between `true` and `false`, and a function to set the state to a specific boolean value.
 *
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function useToggle(initialValue = false) {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggleValue = useCallback(() => {
    setValue(prevValue => !prevValue);
  }, []);

  const setValueWithValidation = useCallback((newValue: boolean) => {
    if (typeof newValue !== 'boolean') {
      throw new Error(
        `useToggle setValue argument must be a boolean, but received ${typeof newValue}`,
      );
    }
    setValue(newValue);
  }, []);

  return [value, toggleValue, setValueWithValidation] as const;
}

export default useToggle;
