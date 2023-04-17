import { useState, useEffect } from 'react';

interface FocusOptions<T> {
  onFocus?: (event?: FocusEvent, node?: T) => void;
  onBlur?: (event?: FocusEvent, node?: T) => void;
}

/**
 * Allows you to detect when an element is in focus, such as an input field.
 * 
 * @param {React.RefObject<HTMLElement>} ref The React ref of the element to track.
 * @param {FocusHandlers} handlers Optional object containing onFocus and onBlur event handlers.
 * 
 * @returns {boolean} A boolean indicating whether the element is currently in focus.
 *
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function useFocus<T extends HTMLElement>(
  ref: React.RefObject<T>, 
  options: FocusOptions<T> = {}): boolean {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleFocus = (event?: FocusEvent) => {
      setIsFocused(true);
      if (options.onFocus && ref.current) {
        options.onFocus(event, ref.current)
      }
    }
    const handleBlur = (event?: FocusEvent) => {
      setIsFocused(false);
      if (options.onBlur && ref.current) {
        options.onBlur(event, ref.current)
      }
    }

    if (ref.current) {
      ref.current.addEventListener('focus', handleFocus);
      ref.current.addEventListener('blur', handleBlur);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('focus', handleFocus);
        ref.current.removeEventListener('blur', handleBlur);
      }
    };
  }, [ref, options.onFocus, options.onBlur]);

  return isFocused;
}

export default useFocus;