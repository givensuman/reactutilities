import React, { createContext, useContext, useState } from "react"
import produce, { type Draft } from "immer"

type Value<T = unknown> = Record<string, T extends object ? T[keyof T] : unknown>

/**
 * Type used to transform object into stateful store.
 * 
 * Replaces each key with the type of the return of a `useState` call.
 * 
 * For more information, go [here](https://github.com/givensuman/reactutilities).
 */
export type StoreType<T = Value> = {
    [K in keyof T]: readonly [
        T[K], 
        React.Dispatch<React.SetStateAction<T[K]>>
    ]
}

type ProviderProps = React.ProviderProps<Value>

const Context = createContext<StoreType | null>(null)

/**
 * The context provider component for the \@reactutilities/store package.
 * 
 * Creates a global state store and makes it available to all descendent components through the `useStore` hook.
 * 
 * @param value - A simple object that should reflect the initial state of your store.
 * 
 * For more information, go [here](https://github.com/givensuman/reactutilities).
 */
export const Store = ({
    value,
    children,
    ...other
}: ProviderProps) => {

    const store = produce(value, (draft: Draft<StoreType>) => {
        for (const key in draft) {
            if (Object.prototype.hasOwnProperty.call(draft, key)) {
                draft[key] = useState(value[key])
            }
        }
    }) as StoreType

    return (
        <Context.Provider value={store} {...other}>
            {children}
        </Context.Provider>
    )
}

/**
 * The context consumer hook for the \@reactutilities/store package.
 * 
 * Provides access to the global state from any descendent component of the `Store` provider.
 * 
 * @returns A transformation of the store passed through the `value` prop of the `Store` provider, where each key maps to a `useState` instance, and can be accessed or updated through the conventional `[state, setState]` API.
 * 
 * For more information, go [here](https://github.com/givensuman/reactutilities).
 */
export const useStore = <T extends Value,>() => {
    const ctx = useContext(Context)

    if (!ctx) {
        throw new Error("No context found for useStore. Are you sure you're calling useStore in a descendent of the <Store> provider?")
    }

    return ctx as StoreType<T>
}

export default useStore