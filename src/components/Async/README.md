# Async

The `Async` component allows you to handle asynchronous data loading in a declarative way. It takes in an asynchronous function and renders different UI elements based on the state of the asynchronous operation.

## Usage

```tsx
import { Async } from '@reactutilities/components';

function App() {
  const fetchData = async () => {
    const response = await fetch('https://api.example.com/data');
    return response.json();
  };

  return (
    <Async
      await={fetchData}
      loading={<div>Loading...</div>}
      error={(error) => <div>Error: {error.message}</div>}
      success={(data) => <div>Data: {data}</div>}
      onLoading={() => console.log('Loading...')}
      onError={(error) => console.error(error)}
      onSuccess={(data) => console.log(data)}
    />
  );
}
```

## API

The Async component accepts the following props:


|Name	|Type	|Description|
|---|---|---|
|`await`	|() => Promise\<T>	|A required function that returns a Promise. This function is called when the component mounts and is expected to resolve with the data that will be rendered by the success prop or reject with an error that will be passed to the error prop.|
|`loading`	|React.ReactNode \| (() => React.ReactNode)|	An optional React node or function that will be rendered while the await function is executing. If a function is provided, it will receive an unknown argument.|
|`error`	|React.ReactNode \| ((error: Error) => React.ReactNode)|	An optional React node or function that takes an Error object as its argument and returns a React node that will be rendered if the await function rejects with an error.|
`success`	|React.ReactNode \| ((data: T) => React.ReactNode)|	A required function that takes the data returned by the await function as its argument and returns a React node that will be rendered if the await function resolves successfully.|
|`onLoading`	|() => void|	An optional function that is called when the await function is executed.|
|`onError`	|(error: Error) => void	|An optional function that is called if the await function rejects with an error.|
|`onSuccess`	|(data: T) => void	|An optional function that is called if the await function resolves successfully.|