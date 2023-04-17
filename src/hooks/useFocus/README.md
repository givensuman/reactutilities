# useFocus

The `useFocus` hook allows you to detect when an element is in focus, such as an input field. It provides a consistent API for handling focus events in React applications, and can be used to run custom code when an element gains or loses focus.

## Usage

To use the `useFocus` hook, simply import it and call it from within a functional component:

```tsx
import { useFocus } from '@reactutilities/hooks';

function MyComponent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const isFocused = useFocus(inputRef, {
    onFocus: () => {
      console.log('Input focused!');
    },
    onBlur: () => {
      console.log('Input blurred!');
    },
  });

  return (
    <div>
      <label>
        Enter your name:
        <input type="text" ref={inputRef} />
      </label>
      {isFocused ? 'Input focused!' : 'Input blurred!'}
    </div>
  );
}
```

In this example, useFocus is called with a React ref to an input element and an object containing onFocus and onBlur event handlers. The isFocused variable is then used to conditionally render a message to the user.

You can also use `useFocus` without passing an event handler object:

```tsx
import { useFocus } from '@reactutilities/hooks';

function MyComponent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const isFocused = useFocus(inputRef);

  return (
    <div>
      <label>
        Enter your name:
        <input type="text" ref={inputRef} />
      </label>
      {isFocused ? 'Input focused!' : 'Input blurred!'}
    </div>
  );
}
``` 

In this example, `useFocus` is called with a React ref to an input element, but no event handler object is passed. The isFocused variable is still used to conditionally render a message to the user.

## API

The `useFocus` hook accepts two arguments:

|Name|Type|Description|
|---|---|---|
|ref|`React.RefObject<T extends HTMLElement>`|The React ref of the element to track.|
|options|`FocusOptions<T>`|Optional object containing onFocus and onBlur event handlers.|

The `FocusOptions` interface has two optional properties:

|Name|Type|Description|
|---|---|---|
|onFocus|`(event?: FocusEvent, node?: T) => void`|Optional callback to run if target element is focused.|
|onBlur|`(event?: FocusEvent, node?: T) => void`|Optional callback to run if target element is blurred.|

The `useFocus` hook returns a boolean indicating whether the element is currently in focus.