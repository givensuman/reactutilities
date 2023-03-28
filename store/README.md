# @reactutilities/store 📦

An efficient and intuitive way to manage state in your React applications

## Installation

You can install the package via npm:
```bash
npm install @reactutilities/store
# or 
yarn add @reactutilities/store
# or 
pnpm i @reactutilities/store
```

## Usage

This package exports two main things, `Store` and `useStore`.

### Store

The `Store` component creates a global state store and makes it available to all descendent components through the `useStore` hook.

```ts
import React from "react"
import { Store } from "@reactutilities/store"
import Counter from "./Counter"

export default function App() {
    return (
        <Store value={{
            count: 0
        }}>
            <Counter />
        </Store>
    )
}
```
It works like any other Context.Provider, accepting a `value` prop that should reflect the initial state of your store.

### useStore

The `useStore` hook provides access to the global state from any descendent component of the `Store` provider.

```ts
import useStore from "@reactutilities/store"

export default function Counter() {
    const {
        count: [ count, setCount ]
    } = useStore()

    return (
        <button onClick={() => setCount(state => state + 1)}>
            {count}
        </button>
    )
}
```
Any keys passed to as the initial state of the store are transformed into a `useState` instance, and can be accessed or updated through the conventional `[state, setState]` API.

## Type-safety

By default, there's no way for `useStore` to know the contents of your store. This can be solved by either:

Passing the store shape as a generic:
```ts
const {
    count: [ count, setCount ]
} = useStore<{ count: number }>()
```
Or by writing a custom hook that *does* know the contents of your store:

```ts
import useStore from "@reactutilities/store"

export const store = {
    count: 0
}

export default function useTypedStore<T = typeof store>() {
    return useStore<T>()
}
```
Alternatively, you can manually create a typed store with the `Store` type export, which essentially transforms the shape of your store into the return type of `useStore`:
```ts
import type { Store } from "@reactutilities/store"

export const store = {
    count: 0
}

export type StoreType = Store<typeof store>
```

## Source
This package is less than 50 lines of code. The only dependencyies are `React` and `immer`, which it uses to efficiently transform the initial store into state. This is the entirety of the source code:
```ts
import React, { createContext, useContext, useState } from "react"
import produce, { type Draft } from "immer"

type Value<T = unknown> = Record<string, T extends object ? T[keyof T] : unknown>

export type Store<T = Value> = {
    [K in keyof T]: readonly [
        T[K], 
        React.Dispatch<React.SetStateAction<T[K]>>
    ]
}

type ProviderProps = React.ProviderProps<Value>

const Context = createContext<Store | null>(null)

export const Store = ({
    value,
    children,
    ...other
}: ProviderProps) => {

    const store = produce(value, (draft: Draft<Store>) => {
        for (const key in draft) {
            if (Object.prototype.hasOwnProperty.call(draft, key)) {
                draft[key] = useState(value[key])
            }
        }
    }) as Store

    return (
        <Context.Provider value={store} {...other}>
            {children}
        </Context.Provider>
    )
}

export const useStore = <T extends Value,>() => {
    const ctx = useContext(Context)

    if (!ctx) {
        throw new Error("No context found for useStore. Are you sure you're calling useStore in a descendent of the <Store> provider?")
    }

    return ctx as Store<T>
}

export default useStore
```

## License
[MIT](https://choosealicense.com/licenses/mit/)