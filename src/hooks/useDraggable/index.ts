import React, { useEffect, useState } from 'react';

interface DraggableReturn {
  position: {
    x: number;
    y: number;
  };
  isDragging: boolean;
}

/**
 * Makes an element draggable within a specified container.
 * @param elementRef The ref of the element that will become draggable.
 * @param containerRef The ref of the container element.
 * @param options An optional object containing the following options:
 * - onDragStart: A callback function called when dragging starts.
 * - onDrag: A callback function called during dragging.
 * - onDragEnd: A callback function called when dragging ends.
 * - axis: The axis along which to restrict dragging ('x' or 'y').
 * - bounds: The boundaries within which to restrict dragging (an object with the properties 'left', 'right', 'top', and 'bottom').
 * @returns A ref object that should be passed to the element that you want to make draggable.
 *
 * @see {@link https://github.com/givensuman/useDraggable} for more information.
 */
function useDraggable(
  elementRef: React.RefObject<HTMLElement>,
  containerRef: React.RefObject<HTMLElement>,
  options?: {
    onDragStart?: () => void;
    onDrag?: (dx: number, dy: number) => void;
    onDragEnd?: () => void;
    axis?: 'x' | 'y';
    bounds?: { left?: number; right?: number; top?: number; bottom?: number };
  },
): DraggableReturn {
  const { onDragStart, onDrag, onDragEnd, axis, bounds } = options || {};
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<DraggableReturn['position']>({
    x: 0,
    y: 0,
  });
  const [draggingPosition, setDraggingPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const draggable = elementRef.current;

    if (!container || !draggable) {
      return;
    }

    const handleMouseDown = (event: MouseEvent) => {
      event.preventDefault();

      if (onDragStart) {
        onDragStart();
      }

      setIsDragging(true);
      setDraggingPosition({
        x: event.clientX - draggable.offsetLeft,
        y: event.clientY - draggable.offsetTop,
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      event.preventDefault();

      if (!isDragging) {
        return;
      }

      let dx = event.clientX - draggingPosition.x;
      let dy = event.clientY - draggingPosition.y;

      if (axis === 'x') {
        dy = 0;
      } else if (axis === 'y') {
        dx = 0;
      }

      if (bounds) {
        if (bounds.left !== undefined) {
          dx = Math.max(dx, bounds.left - draggable.offsetLeft);
        }
        if (bounds.right !== undefined) {
          dx = Math.min(
            dx,
            bounds.right - draggable.offsetLeft - draggable.clientWidth,
          );
        }
        if (bounds.top !== undefined) {
          dy = Math.max(dy, bounds.top - draggable.offsetTop);
        }
        if (bounds.bottom !== undefined) {
          dy = Math.min(
            dy,
            bounds.bottom - draggable.offsetTop - draggable.clientHeight,
          );
        }
      }

      setPosition(prevPosition => ({
        x: prevPosition.x + dx,
        y: prevPosition.y + dy,
      }));

      if (onDrag) {
        onDrag(dx, dy);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);

      if (onDragEnd) {
        onDragEnd();
      }
    };

    draggable.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      draggable.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    containerRef,
    elementRef,
    onDragStart,
    onDrag,
    onDragEnd,
    axis,
    bounds,
    isDragging,
    draggingPosition,
  ]);

  useEffect(() => {
    const draggable = elementRef.current;

    if (!draggable) {
      return;
    }

    draggable.style.left = `${position.x}px`;
    draggable.style.top = `${position.y}px`;
  }, [position]);

  return {
    position,
    isDragging,
  };
}

export default useDraggable;
