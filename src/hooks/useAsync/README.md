# useAsync

The `useAsync` hook is a simple way to manage asynchronous operations and update the UI when the data is ready. It simplifies the process of handling promises in React applications by providing a consistent API that you can use to retrieve data asynchronously.


## Usage

To use the `useAsync` hook, simply import it and call it from within a functional component:

```tsx
import { useAsync } from '@reactutilities/hooks';

function MyComponent() {
  const { data, isLoading, isError, error } = useAsync(async () => {
    const response = await fetch('/api/data');
    return response.json();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      {data?.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

In this example, useAsync is called with an asynchronous function that fetches data from an API and returns a JSON response. The `data`, `isLoading`, `isError`, and `error` variables are then destructured from the return value of the `useAsync` hook.

If `isLoading` is true, a loading message is displayed. If `isError` is true, an `error` message is displayed. Otherwise, the `data` is displayed.

You can also pass an array of dependencies to the `useAsync` hook. If any of these dependencies change, the hook will be re-executed with the new values:

```tsx
function MyComponent({ userId }: { userId: string }) {
  const { data, isLoading, isError, error } = useAsync(async () => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  }, [userId]);

  // ...
}
```

In this example, the `useAsync` hook is called with a function that fetches data for a specific user ID. The userId prop is passed as a dependency to the hook so that it will be re-executed whenever the userId prop changes.


## API

The `useAsync` hook returns an object with the following properties:

|Name|Type|Description|
|---|---|---|
|data|`T \| null`|The data returned by the asynchronous function. If the function has not yet completed, this will be null.|
|isLoading|`boolean`|A boolean indicating whether the asynchronous function is currently executing.|
|isError|`boolean`|A boolean indicating whether an error occurred during the execution of the asynchronous function.|
|error|`Error \| null`|The error object returned by the asynchronous function, if an error occurred. If no error occurred, this will be null.|