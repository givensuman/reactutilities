import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

type Listener<T> = (newValue: T) => void;

type Falsy = undefined | null | false;

type Store<T> = {
  get: <R>(callback: (state: T) => R) => R;
  set: (newValue: Partial<T> | ((prevState: T) => Partial<T>)) => void;
  subscribe: (key: keyof T | Falsy, listener: Listener<T>) => () => void;
};

/**
 * Creates a store context for managing global state in a React application.
 *
 * @template T The type of the state object.
 * @param {Object} props The component props.
 * @param {T} props.initialState The initial state object.
 * @param {React.ReactNode} props.children The child components to be wrapped by the provider.
 * @returns The provider component with a `Store` object containing `get`, `set`, and `subscribe` methods to interact with the state.
 * 
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
export function createContextStore<T extends {}>(initialState: T) {
    const Context = createContext<Store<T> | undefined>(undefined);
  
    type StoreContextProviderProps = {
      children: React.ReactNode;
    };
  
    function StoreProvider({ children }: StoreContextProviderProps) {
      const [state, setState] = useState<T>(initialState);
      const listenersRef = useRef<Set<Listener<T>>>(new Set());
  
      function set(newState: Partial<T> | ((prevState: T) => Partial<T>)) {
        setState((prevState) =>
          typeof newState === 'function' ? { ...prevState, ...newState(prevState) } : { ...prevState, ...newState }
        );
        listenersRef.current.forEach((listener) => listener(state));
      }
  
      function get<R>(callback: (state: T) => R): R {
        const [_, setStateWrapper] = useState<null>(null);
        useEffect(() => {
          const listener = () => setStateWrapper(null);
          listenersRef.current.add(listener);
          return () => {
            listenersRef.current.delete(listener);
          };
        }, []);
        return callback(state);
      }
  
      function subscribe(key: keyof T | Falsy, listener: Listener<T>) {
        const newListener = (newValue: T) => {
          if (!key || key in newValue) {
            listener(newValue);
          }
        };
        listenersRef.current.add(newListener);
        return () => {
          listenersRef.current.delete(newListener);
        };
      }
  
      const store: Store<T> = { get, set, subscribe };
  
      return <Context.Provider value={store}>{children}</Context.Provider>;
    }
  
    function useStore(): Store<T> {
      const store = useContext(Context);
      if (!store) {
        throw new Error('useStore must be used within a StoreProvider');
      }
      return store;
    }
  
    return { StoreProvider, useStore };
  }

export default createContextStore
  