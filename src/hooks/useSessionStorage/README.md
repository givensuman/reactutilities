# useSessionStorage

The `useSessionStorage` hook is a custom React hook that provides a simple way to store and retrieve data from the session storage.

## Usage

To use the `useSessionStorage` hook, simply import it and call it from within a functional component:

```tsx
import { useSessionStorage } from '@reactutilities/hooks';

function MyComponent() {
  const [count, setCount] = useSessionStorage('count', 0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

In this example, `useSessionStorage` is called with a key of 'count' and an initial value of 0. The current value of the count is stored in session storage and is retrieved and updated as necessary.

## API

The `useSessionStorage` hook takes two parameters:

|Name|Type|Description|
|---|---|---|
|key|`string`|The key to use for storing and retrieving data from the session storage.|
|initialValue|`T`|The initial value to use if no value is currently stored in session storage for the given key.|

The `useLocalStorage` hook returns a tuple with the following items:

|Index|Type|Description|
|---|---|---|
|0|`T`|The current value being stored.|
|1|`(value: T) => void`|A function to update the value being stored.|

Note that the value you pass to `useSessionStorage` will be stringified and stored in localStorage as a string. When you retrieve the value with `useSessionStorage`, it will be parsed back into its original type.