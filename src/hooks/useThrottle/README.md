# useThrottle

The `useThrottle` hook is a React hook that allows you to throttle the execution of a function to a certain number of times within a given time period. It provides a simple way to limit the frequency of function calls, improving performance and reducing unnecessary rendering.

## Usage

To use the `useThrottle` hook, simply import it and call it from within a functional component:

```tsx
import { useThrottle } from '@reactutilities/hooks';

function MyComponent() {
  const [value, setValue] = useState('');
  const throttledValue = useThrottle(value, 5, 1000); // 5 calls within 1 second

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
      <div>Throttled value: {throttledValue}</div>
    </div>
  );
}
```

In this example, `useThrottle` is called with a value, a limit of 5 calls, and a period of 1000 milliseconds. If the handleChange function is called more than 5 times within 1 second, throttledValue will only be updated 5 times.

## API

The `useThrottle` hook takes three parameters:

|Name|Type|Description|
|value|`T`|The value to throttle.|
|limit|`number`|The maximum number of times the function can be called within the given time period.|
|period|`number`|The time period (in milliseconds) during which the maximum number of function calls is limited.|

The `useThrottle` hook returns the throttled value. The value will be updated at most limit times within every period milliseconds.

## Notes

Note that `useThrottle` does not guarantee that the value will be updated at exactly limit times within every period milliseconds. Instead, it provides a best-effort approximation of the desired behavior.

Also note that `useThrottle` does not work well with values that change rapidly, such as mouse or touch events. In these cases, it may be better to use a debounce or a different approach to limit the frequency of function calls.