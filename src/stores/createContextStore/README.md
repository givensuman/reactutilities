# createContextStore

A React Context generator that mimics the `createStore` API.

## Usage

To create a new context store, simply call the `createContextStore` function with an initial state:

```tsx
import { createContextStore } from '@reactutilities/stores';

type User = {
  name: string;
  email: string;
  age: number;
};

const { StoreProvider, useStore } = createContextStore<User>({
  name: 'John Doe',
  email: 'john.doe@example.com',
  age: 30,
});
```

This will create a context store with a `get` function that returns the current state, a `set` function that updates the state, and a `subscribe` function that allows you to listen for changes to the state.

Wrap your application with the `StoreProvider` component so that the store is available to all child components:

```tsx
function App() {
  return (
    <StoreProvider initialState={/* initial state */}>
      {/* child components */}
    </StoreProvider>
  );
}
```

Use the `useStore` hook to access the store in any child component:

```tsx
function MyComponent() {
  const { get, set, subscribe } = useStore();

  const currentUser = get(); // { name: 'John Doe', email: 'john.doe@example.com', age: 30 }

  set({ age: 31 }); // Updates the age to 31

  const unsubscribe = subscribe('name', newUser => {
    console.log(`Name changed to ${newUser.name}`);
  });

  // This listener will only be called when the 'name' property changes
  // If the 'email' or 'age' properties change, this listener will not be called

  unsubscribe(); // Removes the listener

  return <div>{/* component JSX */}</div>;
}
```

You can also subscribe to the entire store by not passing a key to the subscribe function:

```tsx
const unsubscribe = subscribe(null, newUser => {
  console.log('User changed:', newUser);
});
```

For dynamic access to the store when using `get` and `set`, use a callback with state as an argument:

```tsx
set(({ age }) => ({ age: age + 1 }));
get(state => state.age);
```
