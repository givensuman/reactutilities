# Show

The `Show` component allows you to conditionally render a set of child elements or a fallback element based on a given value. It takes a `when` condition to check for truthiness, an `unless` condition to check for falsiness, and any valid React nodes as children.

## Usage

```tsx
import { Show } from '@reactutilities/components';

function App() {
  const isLoading = true;
  const data = {
    name: 'John Doe',
    age: 30,
  };

  return (
    <Show when={!isLoading} fallback={<div>Loading...</div>}>
      <div>
        <h1>{data.name}</h1>
        <p>Age: {data.age}</p>
      </div>
    </Show>
  );
}
```

This will render Loading... if `isLoading` is truthy, and the content if `isLoading` is falsy.

## API

The `Show` component accepts the following props:

| Name     | Type                                                | Description                                                                                                                                                                                         |
| -------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| when     | `T \| undefined \| null \| boolean`                 | A required value to check against for truthiness.                                                                                                                                                   |
| unless   | `K \| undefined \| null \|boolean`                  | An optional value to check against for falsiness. Supercedes `when` condition if truthy.                                                                                                            |
| fallback | `React.ReactNode \| null`                           | An optional fallback element to render if when is falsy.                                                                                                                                            |
| children | `React.ReactNode \| ((item: T) => React.ReactNode)` | A required set of valid React nodes to be rendered if when is truthy, or a function that returns valid React nodes when when is truthy. The value of when is passed as an argument to the function. |

## Example

Here's an example that demonstrates how to use the `Show` component:

```tsx
import { Show } from '@reactutilities/components';

function UserProfile({ user }: { user: { name: string; age: number } | null }) {
  return (
    <Show when={user} fallback={<div>User not found.</div>}>
      <div>
        <h1>{user.name}</h1>
        <p>Age: {user.age}</p>
      </div>
    </Show>
  );
}
```

In this example, the `Show` component is used to render user profile information if the user prop is passed, and a "User not found." message if user is undefined.
