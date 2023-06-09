import { useState, useEffect } from 'react';

type Listener<T> = (newValue: T) => void;

type Falsy = undefined | null | false;

type Store<T> = {
  get: <R>(callback: (state: T) => R) => R;
  set: (newValue: Partial<T> | ((prevState: T) => Partial<T>)) => void;
  subscribe: (key: keyof T | Falsy, listener: Listener<T>) => () => void;
};

/**
 * A simple store generator that provides a small and intuitive API for managing global state in a React application.
 * The store object contains a `get` method to retrieve the current state, a `set` method to update the state,
 * and a `subscribe` method to listen for changes to the state.
 *
 * @template T The type of the state object.
 * @param {T} initialState The initial state object.
 * @returns An object containing `get`, `set`, and `subscribe` methods to interact with the state.
 *
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function createStore<T extends object>(initialState: T): Store<T> {
  let state = initialState;
  const listeners = new Set<Listener<T>>();

  function set(newState: Partial<T> | ((prevState: T) => Partial<T>)) {
    const nextState =
      typeof newState === 'function' ? newState(state) : newState;

    if (nextState !== state) {
      state = { ...state, ...nextState };
      listeners.forEach(listener => listener(state));
    }
  }

  function get<R>(callback: (state: T) => R): R {
    const [_, setStateWrapper] = useState<null>(null);
    useEffect(() => {
      const listener = () => setStateWrapper(null);
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    }, []);
    const currentState = state as T;
    return callback(currentState);
  }

  function subscribe(key: keyof T | Falsy, listener: Listener<T>) {
    const newListener = (newValue: T) => {
      if (!key || key in newValue) {
        listener(newValue);
      }
    };
    listeners.add(newListener);
    return () => {
      listeners.delete(newListener);
    };
  }

  return { get, set, subscribe };
}

export default createStore;
