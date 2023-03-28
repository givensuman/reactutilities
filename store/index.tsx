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