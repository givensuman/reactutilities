# @reactutilities/stores 🛍️

An efficient and intuitive way to manage state in your React applications.

## Installation

You can install the package via npm:

```bash
npm install @reactutilities/stores
# or
yarn add @reactutilities/stores
# or
pnpm add @reactutilities/stores
```

## Usage

This package ships with two ways of creating a store:

### createStore

A function that generates a store. Stores created by `createStore` have `get`, `set`, and `subscribe` methods that provide ways to interact with the data inside.

```tsx
import createStore from '@reactutilities/stores';

type State = {
  count: number;
};

const initialState: State = {
  count: 0,
};

const counterStore = createStore(initialState);

function Counter() {
  const count = counterStore.get(state => state.count);

  function increment() {
    counterStore.set({ count: count + 1 });
  }

  function decrement() {
    counterStore.set({ count: count - 1 });
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

export default Counter;
```

### createContextStore

Very similar to `createStore`, but this function generates a `StoreProvider` component and a `useStore` hook, which returns the same kind of store as `createStore`.

```tsx
import { createContextStore } from '@reactutilities/stores';

type State = {
  count: number;
};

const initialState: State = {
  count: 0
};

const { StoreProvider, useStore } = createContextStore(initialState);

function App() {
  return (
    <StoreProvider>
      <Counter />
      <Message />
    </StoreProvider>
  );
}

function Counter() {
  const { get, set } = useStore();

  const count = get(state => state.count)

  const increment = () => {
    set({ count: count + 1 });
  };

  const decrement = () => {
    set({ count: count - 1 });
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

While the end result looks very similar, `createContextStore` has the advantage of some memoizing that `createStore` doesn't, which should result in less unnecessary re-renders.

## License

[MIT](https://choosealicense.com/licenses/mit/)
