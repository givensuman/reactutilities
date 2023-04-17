import React, { useEffect } from 'react';

type AnyEvent = MouseEvent | TouchEvent;

/**
 * Allows you to detect when a user clicks outside of a specific element, such as a dropdown menu or modal.
 * 
 * @param {React.RefObject<T>} ref A React ref pointing to the element that the click should be detected outside of.
 * @param {event: AnyEvent} handler A function that will be called when a click is detected outside of the element.

 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: AnyEvent) => void,
): void {
  useEffect(() => {
    const listener = (event: AnyEvent) => {
      const el = ref?.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default useClickOutside;
