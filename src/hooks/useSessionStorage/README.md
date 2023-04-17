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

The `useSessionStorage` hook returns a tuple containing the current value and a function to update the value in session storage. The function takes a single parameter, the new value to be stored in session storage.

Note that the values stored in session storage are always strings. Therefore, when using useSessionStorage, it's recommended to use JSON.stringify and JSON.parse to store and retrieve non-string values.