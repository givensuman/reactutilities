# useTimeout

The `useTimeout` hook is a React hook that allows you to execute a function after a specified amount of time has passed. It provides an easy way to delay the execution of a function.
## Usage

To use the `useTimeout` hook, simply import it and call it from within a functional component:

```tsx
import { useTimeout } from '@reactutilities/hooks';

function MyComponent() {
  useTimeout(() => {
    console.log('This message will appear after 2 seconds');
  }, 2000); // Wait for 2 seconds before executing the function

  return (
    <div>
      <p>This message will appear immediately</p>
    </div>
  );
}
```

In this example, `useTimeout` is called with a delay of 2000 milliseconds. The callback function will be executed after 2 seconds.

## API

The `useTimeout` hook takes two parameters:

|Name|Type|Description|
|callback|`() => void`|The function to execute after the timeout has elapsed.|
|delay|`number`|The amount of time (in milliseconds) to wait before executing the function.|

The `useTimeout` hook does not return any value, as it simply executes the given function after the specified delay.