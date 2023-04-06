import { useState } from 'react';

type StateMap = { [key: string]: boolean };

/**
 * Allows you to toggle between multiple states, useful for things like tabs or accordion menus.
 * @param initialState An object where each key represents a state name and the value represents whether the state is currently active or not.
 * @returns An object containing the current state object and a function to toggle the state of a specific key.
 *
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
export const useMultiStateToggle = (initialState: StateMap) => {
  const [states, setStates] = useState<StateMap>(initialState);

  const toggleState = (key: string) => {
    setStates(prevState => ({ ...prevState, [key]: !prevState[key] }));
  };

  return { states, toggleState };
};
