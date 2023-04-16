# useFocus

The `useFocus` hook allows you to detect when an element is in focus, such as an input field, in a React functional component.

## Usage

To use the `useFocus` hook, import it and call it from within a functional component, passing a ref to the element you want to track:

```tsx
import { useFocus } from '@reactutilities/hooks';

function MyComponent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const isFocused = useFocus(inputRef);

  return (
    <div>
      <label>
        Input field:
        <input type="text" ref={inputRef} />
      </label>
      <p>{isFocused ? 'The input field is focused' : 'The input field is not focused'}</p>
    </div>
  );
}
```

In this example, the `useFocus` hook is called with a ref to an input element. The isFocused variable is then used to conditionally render a message indicating whether the input element is focused.

## API

The hook requires a ref to track the focus state of.

|Name|Type|Description|
|---|---|---|
|ref|`React.RefObject<HTMLElement>`|The React ref of the element to track.|