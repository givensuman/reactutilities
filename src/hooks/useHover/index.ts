import { useState, useEffect } from 'react';

interface HoverOptions<T extends HTMLElement> {
  onMouseOver?: (event?: MouseEvent, node?: T) => void;
  onMouseOut?: (event?: MouseEvent, node?: T) => void;
}

/**
 * Detects whether the mouse pointer is hovering over a specified element or not.
 * 
 * @param {React.RefObject<T>} ref A reference to the DOM element to monitor for hover state changes.
 * @param {HoverOptions<T>} options An optional object containing callbacks for `onMouseOver` and `onMouseOut`.
 * 
 * @returns {boolean} A boolean value representing whether the mouse is hovering over the element or not.
 *
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function useHover<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  options: HoverOptions<T> = {}
): boolean {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = (event: MouseEvent) => {
    setIsHovering(true);
    if (options.onMouseOver && ref.current) {
      options.onMouseOver(event, ref.current);
    }
  };
  const handleMouseOut = (event: MouseEvent) => {
    setIsHovering(false);
    if (options.onMouseOut && ref.current) {
      options.onMouseOut(event, ref.current);
    }
  };

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
  }, [ref, options.onMouseOver, options.onMouseOut]);

  return isHovering;
}

export default useHover;