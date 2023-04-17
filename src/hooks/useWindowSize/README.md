# useWindowSize

The `useWindowSize` hook is a React hook that detects the size of the browser window and returns an object containing its width and height properties. It provides an easy way to keep track of the current window size and to update UI elements in response to changes in window dimensions.

## Usage

To use the `useWindowSize` hook, simply import it and call it from within a functional component:

```tsx
import { useWindowSize } from '@reactutilities/hooks';

function MyComponent() {
  const windowSize = useWindowSize();

  return (
    <div>
      <p>Window width: {windowSize.width}px</p>
      <p>Window height: {windowSize.height}px</p>
    </div>
  );
}
```

In this example, `useWindowSize` is called and the windowSize object is destructured to access its width and height properties. These values are then displayed in the UI.

## API

The `useWindowSize` hook takes no parameters, and returns an object with the following properties:

|Name|Type|Description|
|---|---|---|
|width|`number`|The current width of the browser window, in pixels.|
|height|`number`|The current height of the browser window, in pixels.|

The `useWindowSize` hook also attaches an event listener to the window object to listen for changes in window dimensions. Whenever the window is resized, the hook updates the windowSize object with the new dimensions and returns the updated object.