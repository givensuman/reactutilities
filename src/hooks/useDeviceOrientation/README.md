# useDeviceOrientation

The `useDeviceOrientation` hook is a React hook that detects the orientation of the device and returns it as either "portrait" or "landscape".

## Usage

To use the `useDeviceOrientation` hook, simply import it and call it from within a functional component:

```tsx
import { useDeviceOrientation } from '@reactutilities/hooks';

function MyComponent() {
  const orientation = useDeviceOrientation();

  return (
    <div>
      The device orientation is {orientation}.
    </div>
  );
}
```

In this example, `useDeviceOrientation` is called and the orientation value is displayed.

## API

The `useDeviceOrientation` hook returns a string representing the device orientation as "portrait" or "landscape".