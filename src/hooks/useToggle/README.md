# useToggle

The `useToggle` hook is a React hook that provides a boolean toggle state, along with functions to toggle the state and set the state to a specific value with type validation.

## Usage

To use the `useToggle` hook, simply import it and call it from within a functional component:

```tsx
import { useToggle } from '@reactutilities/hooks';

function MyComponent() {
  const [isOn, toggleIsOn, setIsOn] = useToggle(true);

  return (
    <div>
      <button onClick={toggleIsOn}>Toggle</button>
      <button onClick={() => setIsOn(true)}>Turn On</button>
      <button onClick={() => setIsOn(false)}>Turn Off</button>
      <div>{isOn ? 'ON' : 'OFF'}</div>
    </div>
  );
}
```

In this example, `useToggle` is called with an initial value of true. The isOn state value is then used to conditionally render text and to switch the state using the toggleIsOn function or set it to a specific value using the setIsOn function.

## API

The `useToggle` hook takes one optional parameter:

|Name|Type|Description|
|initialValue|`boolean`|The initial value for the toggle state. Defaults to false.|

The `useToggle` hook returns a tuple containing the current boolean value of the toggle state, a function to toggle the state between true and false, and a function to set the state to a specific boolean value. The tuple is of the type `[boolean, () => void, (newValue: boolean) => void]`.