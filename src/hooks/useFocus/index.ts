import { useState, useEffect } from 'react';

/**
 * This hook allows you to detect when an element is in focus, such as an input field.
 * @param ref - The React ref of the element to track.
 * @returns A boolean indicating whether the element is currently in focus.
 *
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
export const useFocus = (ref: React.RefObject<HTMLElement>): boolean => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);

    if (ref.current) {
      ref.current.addEventListener('focus', onFocus);
      ref.current.addEventListener('blur', onBlur);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('focus', onFocus);
        ref.current.removeEventListener('blur', onBlur);
      }
    };
  }, [ref]);

  return isFocused;
};

export default useFocus;
