# useHover

The `useHover` hook is a simple way to detect whether the mouse pointer is hovering over a specified element or not. It simplifies the process of monitoring hover state changes in React applications by providing a consistent API that you can use to track hover events.

## Usage

To use the `useHover` hook, simply import it and call it from within a functional component:

```tsx
import { useHover } from '@reactutilities/hooks';

function MyComponent() {
  const ref = useRef(null);
  const isHovering = useHover(ref);

  return (
    <div ref={ref}>
      {isHovering ? 'Hovering!' : 'Not hovering.'}
    </div>
  );
}
```

In this example, `useHover` is called with a ref to the element we want to monitor for hover events. The isHovering variable is then used to conditionally render the text "Hovering!" or "Not hovering."

## API

The `useHover` requires a ref to track the hover state of:
|Name|Type|Description|
|---|---|---|
|ref|`React.RefObject<T>`|A reference to the DOM element to monitor for hover state changes.|

The `useHover` hook returns a boolean value representing whether the mouse is currently hovering over the specified element or not.

## Example

Here's an example of how to use useHover to change the background color of an element when the mouse is hovering over it:

```tsx
import { useHover } from '@reactutilities/hooks';

function MyComponent() {
  const ref = useRef(null);
  const isHovering = useHover(ref);

  const backgroundColor = isHovering ? 'blue' : 'white';

  return (
    <div ref={ref} style={{ backgroundColor }}>
      Hover over me!
    </div>
  );
}
```

In this example, we use `useHover` to detect when the mouse is hovering over the element referenced by ref. We then set the backgroundColor of the element to blue when the mouse is hovering over it and white otherwise.