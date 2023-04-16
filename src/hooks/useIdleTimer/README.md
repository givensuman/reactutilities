# useIdleTimer

The `useIdleTimer` hook is a React hook that allows you to detect when the user is idle. It provides a simple way to check whether the user has been inactive for a specified amount of time.

## Usage

To use the `useIdleTimer` hook, simply import it and call it from within a functional component:

```tsx
import { useIdleTimer } from '@reactutilities/hooks';

function MyComponent() {
  const isIdle = useIdleTimer(30000); // 30 seconds of inactivity required

  return (
    <div>
      {isIdle ? <div>User is idle</div> : <div>User is active</div>}
    </div>
  );
}
```

In this example, `useIdleTimer` is called with a value of 30 seconds. If the user is inactive for 30 seconds, `isIdle` will be set to true.

## API

The `useIdleTimer` hook takes one parameter:

|Name|Type|Description|
|---|---|---|
|idleTime|`number`|The amount of time (in milliseconds) of inactivity required for the user to be considered idle.|

The `useIdleTimer` hook returns a boolean value indicating whether the user is currently idle. If the user is idle, the value will be true. Otherwise, it will be false.