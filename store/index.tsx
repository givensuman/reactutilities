import React, { createContext, useContext, useState } from "react"
import produce, { type Draft } from "immer"

type Value<T = unknown> = Record<string, T[keyof T]>

export type Store<T = Value> = {
    [K in keyof T]: readonly [
        T[K], 
        React.Dispatch<React.SetStateAction<T[K]>>
    ]
}

type ProviderProps<T = unknown> = React.ProviderProps<Value<T>>

const Context = createContext<any>(null)

export const Store = <T,>({
    value,
    children,
    ...other
}: ProviderProps<T>) => {

    const store = produce(value, draft => {
        for (const key in draft) {
            if (Object.prototype.hasOwnProperty.call(draft, key)) {
                draft[key] = useState(value[key]) as Draft<T[keyof T]>
            }
        }
    }) as Store<T>

    return (
        <Context.Provider value={store} {...other}>
            {children}
        </Context.Provider>
    )
}

export const useStore = <T,>() => {
    const ctx = useContext(Context) as Store<T> | null

    if (!ctx) {
        throw new Error("No context found for useStore. Are you sure you're calling useStore in a descendent of the <Store> provider?")
    }

    return ctx
}