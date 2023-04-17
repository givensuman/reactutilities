import { useState, useEffect } from 'react';

/**
 * Detects whether the mouse pointer is hovering over a specified element or not.
 * 
 * @param {React.RefObject<T>} ref A reference to the DOM element to monitor for hover state changes.
 * 
 * @returns {boolean} A boolean value representing whether the mouse is hovering over the element or not.
 *
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function useHover<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
): boolean {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => setIsHovering(true);
  const handleMouseOut = () => setIsHovering(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);

      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [ref]);

  return isHovering;
}

export default useHover;
