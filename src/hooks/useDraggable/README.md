# useDraggable

The `useDraggable` hook allows you to make an HTML element draggable within a specified container. It returns a the position of the draggable element and the state of whether or not it is currently being dragged.

## Usage

Here is an example of how to use the `useDraggable` hook:

```tsx
import React, { useRef } from 'react';
import { useDraggable } from '@reactutilities/hooks';

function DraggableBox() {
  const boxRef = useRef(null);
  const containerRef = useRef(null);

  const { position, isDragging } = useDraggable(boxRef, containerRef, {
    onDragStart: () => console.log('Dragging started'),
    onDrag: (dx, dy) => console.log(`Dragged ${dx}px horizontally and ${dy}px vertically`),
    onDragEnd: () => console.log('Dragging ended'),
    axis: 'x',
    bounds: { left: 0, right: 500 },
  });

  return (
    <div ref={containerRef}>
      <div
        ref={boxRef}
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          background: isDragging ? 'red' : 'blue',
          width: '100px',
          height: '100px',
        }}
      />
    </div>
  );
}
```

In this example, we create a DraggableBox component that renders a div that can be dragged horizontally within a container that is specified by the containerRef ref object. The boxRef ref object is used to reference the draggable div element.

The `useDraggable` hook is called with the boxRef, containerRef, and an optional options object. The options object contains properties that allow you to customize the behavior of the draggable element, such as the `onDragStart`, `onDrag`, and `onDragEnd` callback functions, the axis along which to restrict dragging, and the bounds within which to restrict dragging.

The position object returned by the hook contains the current x and y position of the draggable element, while the isDragging boolean indicates whether the element is currently being dragged or not.

Finally, we use the position object to set the left and top CSS properties of the draggable element, and we use the isDragging boolean to set the background color of the element to red when it is being dragged, and blue otherwise.

## API

The `useDraggable` hook takes the following arguments:

|Name|Type|Description|
|---|---|---|
|elementRef|`React.RefObject<HTMLElement>`|A ref object that references the element that you want to make draggable.|
|containerRef|`React.RefObject<HTMLElement>`|A ref object that references the container element that you want to restrict dragging within.|

As well as an optional options object that contains the following properties:

|Name|Type|Description|
|---|---|---|
|onDragStart|`() => void`|A callback function that is called when dragging starts.|
|onDrag|`(dx: number, dy: number) => void`|A callback function that is called during dragging and is passed the horizontal and vertical distance that the element has been dragged.|
|onDragEnd|`() => void`|A callback function that is called when dragging ends.|
|axis|`'x' \| 'y'`|The axis on which to restrict dragging.|
|bounds|`{ left?: number; right?: number; top?: number; bottom?: number }`|The boundaries by which to restrict dragging.|