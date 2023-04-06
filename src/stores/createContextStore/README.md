StoreProvider

StoreProvider is a React component that creates a store context for managing global state in a React application. The store object contains a get method to retrieve the current state, a set method to update the state, and a subscribe method to listen for changes to the state.
Installation

To install StoreProvider, you can use a package manager like npm or yarn:

bash

npm install @yourorg/store-provider

or

bash

yarn add @yourorg/store-provider

Usage

To use StoreProvider, you can import it and wrap it around the components that need access to the global state:

jsx

import React from 'react';
import { StoreProvider } from '@yourorg/store-provider';
import { Counter } from './Counter';

const initialState = { count: 0 };

function App() {
return (
<StoreProvider initialState={initialState}>
<Counter />
</StoreProvider>
);
}

Then, in any component that needs access to the global state, you can use the useStore hook to retrieve the store object and interact with the state:

jsx

import React from 'react';
import { useStore } from '@yourorg/store-provider';

export function Counter() {
const { get, set } = useStore<{ count: number }>();
const count = get((state) => state.count);

function increment() {
set((state) => ({ count: state.count + 1 }));
}

function decrement() {
set((state) => ({ count: state.count - 1 }));
}

return (
<div>
<p>Count: {count}</p>
<button onClick={increment}>+</button>
<button onClick={decrement}>-</button>
</div>
);
}

API
<StoreProvider>

StoreProvider is a React component that creates a store context for managing global state in a React application.

Props:

    initialState: The initial state object. This object should have a type that can be inferred by TypeScript.

jsx

<StoreProvider initialState={{ count: 0 }}>
...
</StoreProvider>

useStore()

useStore is a hook that returns the store object containing get, set, and subscribe methods to interact with the state.

jsx

const { get, set, subscribe } = useStore<MyStateType>();

get()

get is a method that takes a callback function and returns the result of that function with the current state as its argument.

jsx

const count = get((state) => state.count);

set()

set is a method that takes either a partial state object or a function that returns a partial state object, and updates the global state with that new state.

jsx

set({ count: 10 });

jsx

set((state) => ({ count: state.count + 1 }));

subscribe()

subscribe is a method that takes a key and a listener function, and adds that listener function to the list of listeners for that key. The listener function will be called whenever the state for that key changes.

jsx

function handleChange(newValue) {
console.log('The new count is', newValue.count);
}

useEffect(() => {
const unsubscribe = subscribe('count', handleChange);
return unsubscribe;
}, []);
