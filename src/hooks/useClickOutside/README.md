# useClickOutside

A custom React hook that enables you to detect when a user clicks outside of a specific element, such as a dropdown menu or modal.

## Usage

To use the `useClickOutside` hook, simply import it from your module and call it with a React ref pointing to the element that you want to detect clicks outside of, and a handler function that will be called when a click is detected outside of the element:

```tsx
import { useRef } from 'react';
import { useClickOutside } from '@reactutilities/hooks';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    // handle click outside
  };

  useClickOutside(ref, handleClickOutside);

  return <div ref={ref}>My Component</div>;
}
```

Note that the ref should be passed as a generic type to ensure that it points to the correct type of HTML element.

The handler function will be called with a MouseEvent or TouchEvent object, depending on how the click was detected.