# create

A simple state management library that provides a small and intuitive API for managing global state in a React application.

## Usage

To create a new store, simply call the create function with an initial state:

```tsx
import { create } from '@reactutilities/stores';

type User = {
  name: string;
  email: string;
  age: number;
};

const userStore = create<User>({
  name: 'John Doe',
  email: 'john.doe@example.com',
  age: 30,
});
```

This will create a store with a `get` function that returns the current state, a `set` function that updates the state, and a `subscribe` function that allows you to listen for changes to the state.

This all works without contexts through the magic of closures.

```tsx
const currentUser = userStore.get(); // { name: 'John Doe', email: 'john.doe@example.com', age: 30 }

userStore.set({ age: 31 }); // Updates the age to 31

const unsubscribe = userStore.subscribe('name', (newUser) => {
  console.log(`Name changed to ${newUser.name}`);
});

// This listener will only be called when the 'name' property changes
// If the 'email' or 'age' properties change, this listener will not be called

unsubscribe(); // Removes the listener
```

You can also subscribe to the entire store by not passing a key to the `subscribe` function:

```tsx
const unsubscribe = userStore.subscribe(_, (newUser) => {
  console.log('User changed:', newUser);
});
```

## Acknowledgments

While not interchangeable, this API was inspired by the `zustand` library.