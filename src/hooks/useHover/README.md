# useHover

The `useHover` hook is a simple way to detect whether the mouse pointer is hovering over a specified element or not. It simplifies the process of handling hover events in React applications by providing a consistent API that you can use to detect hover state changes.

## Usage

To use the `useHover` hook, simply import it and call it from within a functional component:

```tsx
import { useHover } from '@reactutilities/hooks';

function MyComponent() {
  const ref = useRef(null);
  const isHovering = useHover(ref, {
    onMouseOver: () => {
      console.log('Mouse over detected!');
    },
    onMouseOut: () => {
      console.log('Mouse out detected!');
    },
  });

  return (
    <div ref={ref}>
      {isHovering ? 'Mouse is hovering over the element!' : 'Mouse is not hovering over the element.'}
    </div>
  );
}
```

In this example, `useHover` is called with a ref to the element that we want to monitor for hover state changes. The onMouseOver and onMouseOut callback functions are passed in as an optional options object. The isHovering variable is then used to conditionally render a message to the user.

You can also use `useHover` without passing any callback functions:

```tsx
import { useHover } from '@reactutilities/hooks';

function MyComponent() {
  const ref = useRef(null);
  const isHovering = useHover(ref);

  return (
    <div ref={ref}>
      {isHovering ? 'Mouse is hovering over the element!' : 'Mouse is not hovering over the element.'}
    </div>
  );
}
```

In this example, `useHover` is called with only the ref to the element that we want to monitor for hover state changes. No callback functions are passed in, but the isHovering variable is still used to conditionally render a message to the user.

## API

The `useHover` hook accepts two arguments:

|Name|Type|Description|
|---|---|---|
|ref|`React.RefObject<T>`|A reference to the DOM element to monitor for hover state changes.|
|options|`HoverOptions<T>`|An optional object containing callbacks for onMouseOver and onMouseOut.|

The `HoverOptions` interface has two optional properties:

|Name|Type|Description|
|---|---|---|
|onMouseOver|`(event?: MouseEvent, node?: T) => void`|A callback function that runs when the mouse pointer enters the monitored element. The event parameter is the mouseover event that triggered the callback, and the node parameter is the DOM node being monitored.|
|onMouseOut|`(event?: MouseEvent, node?: T) => void`|A callback function that runs when the mouse pointer leaves the monitored element. The event parameter is the mouseout event that triggered the callback, and the node parameter is the DOM node being monitored.|

The `useHover` hook returns a boolean indicating whether the mouse pointer is currently hovering over the monitored element.