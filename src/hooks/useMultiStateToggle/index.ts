import { useState } from 'react';

type StateMap = { [key: string]: boolean };

/**
 * Allows you to toggle between multiple states, useful for things like tabs or accordion menus.
 * 
 * @param {StateMap} initialState An object where each key represents a state name and the value represents whether the state is currently active or not.
 * 
 * @returns {[
 *    StateMap,
 *    { [key: keyof StateMap]: () => void },
 *    { [key: keyof StateMap]: (newValue: boolean) => void }
 * ]} A tuple containing the current state object, a function to toggle the state of a specific key, and a function to set the state of a specific key directly.
 *
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
export const useMultiStateToggle = (initialState: StateMap) => {
  const [states, setStates] = useState<StateMap>(initialState);

  const toggleValue = Object.keys(initialState).reduce((acc, key) => {
    acc[key] = () => setStates(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
    return acc;
  }, {} as { [key: keyof typeof states]: () => void });

  const setValueWithValidation = Object.keys(initialState).reduce((acc, key) => {
    acc[key] = (newValue: boolean) => {
      if (typeof newValue !== 'boolean') {
        throw new Error(
          `useMultiStateToggle setValue argument must be a boolean, but received ${typeof newValue}`,
        );
      }
      setStates(prevState => ({
        ...prevState,
        [key]: newValue
      }));
    }
    return acc;
  }, {} as { [key: keyof typeof states]: (newValue: boolean) => void });

  return [states, toggleValue, setValueWithValidation] as const;
};