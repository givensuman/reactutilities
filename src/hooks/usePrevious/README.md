# usePrevious

The `usePrevious` hook is a React hook that allows you to retrieve the previous value of a given variable or state. It is useful in situations where you need to compare the current and previous values of a variable or state to trigger an action.

## Usage

To use the `usePrevious` hook, simply import it and call it from within a functional component:

```tsx
import { usePrevious } from './usePrevious';

function MyComponent() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  useEffect(() => {
    if (count > prevCount) {
      console.log('Count increased!');
    }
  }, [count, prevCount]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

In this example, `usePrevious` is called with count, which is the current value of a state variable. The prevCount variable is then used to store the previous value of count, which is compared to the current value in an useEffect hook.

## API

The `usePrevious` hook takes one parameter:

|Name|Type|Description|
|---|---|---|
|value|`T`|The current value of a variable or state.|

The usePrevious hook returns the previous value of the given variable or state. If there is no previous value, undefined is returned.

## Example

```tsx
import { usePrevious } from './usePrevious';

function MyComponent() {
  const [name, setName] = useState('Alice');
  const prevName = usePrevious(name);

  useEffect(() => {
    if (prevName && prevName !== name) {
      console.log(`Name changed from ${prevName} to ${name}`);
    }
  }, [name, prevName]);

  return (
    <div>
      <p>Name: {name}</p>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
    </div>
  );
}
```

In this example, `usePrevious` is called with name, which is the current value of a state variable. The prevName variable is then used to store the previous value of name, which is compared to the current value in an useEffect hook. If the value has changed, a message is logged to the console.