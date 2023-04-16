# useInterval

The `useInterval` hook is a simple way to create a setInterval() inside a React functional component using the useEffect() hook. It simplifies the process of setting and clearing intervals in a React application by providing a consistent API that you can use to execute a callback function at a given interval.

## Usage

To use the `useInterval` hook, simply import it and call it from within a functional component:

```tsx
import { useInterval } from '@reactutilities/hooks';

function MyComponent() {
  const [count, setCount] = useState(0);

  useInterval(() => {
    // Increment the count every second
    setCount(count + 1);
  }, 1000);

  return (
    <div>
      Count: {count}
    </div>
  );
}
```

In this example, `useInterval` is called with a callback function that increments the count state every second. The second argument is the delay between intervals in milliseconds.

You can also pass null as the delay to stop the interval:

```tsx
function MyComponent() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(() => {
    setCount(count + 1);
  }, isRunning ? 1000 : null);

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  );
}
```

In this example, the `useInterval` hook is used to increment the count state every second, but only if the isRunning state is true. Clicking the button toggles the isRunning state and starts/stops the interval accordingly.

## API

The `useInterval` hook takes two arguments:

|Name|Type|Description|
|---|---|---|
|callback|`() => void`|The callback function to execute at the given interval.|
|delay|`number \| null`|The delay in milliseconds between intervals. Pass null to stop the interval.|

The hook returns nothing, but it sets up a setInterval() and clears it when the component unmounts.