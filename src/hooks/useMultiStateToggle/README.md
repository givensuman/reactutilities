# useMultiStateToggle

The `useMultiStateToggle` hook is a React hook that allows you to toggle between multiple states, such as those used for tabs or accordion menus. It provides a simple way to keep track of the current state of each item, toggle the state of a specific item, and set the state of a specific item directly.

## Usage

To use the `useMultiStateToggle` hook, simply import it and call it from within a functional component:

```tsx
import { useMultiStateToggle } from '@reactutilities/hooks';

function MyComponent() {
  const [ states, toggleValue, setValue ] = useMultiStateToggle({
    tab1: true,
    tab2: false,
    tab3: false,
  });

  return (
    <div>
      <button onClick={toggleValue.tab1}>Toggle Tab 1</button>
      <button onClick={() => setValue.tab2(true)}>Activate Tab 2</button>
      <button onClick={() => setValue.tab3(false)}>Deactivate Tab 3</button>
      {states.tab1 && <div>Tab 1 content</div>}
      {states.tab2 && <div>Tab 2 content</div>}
      {states.tab3 && <div>Tab 3 content</div>}
    </div>
  );
}
```

In this example, `useMultiStateToggle` is called with an initial state object containing three keys, each representing a tab. The toggleValue function can be called to toggle the state of a specific tab, and the setValue function can be called to set the state of a specific tab directly. The states object contains the current state of each tab.

## API

The `useMultiStateToggle` hook takes one parameter:

|Name|Type|Description|
|---|---|---|
|initialState|`{ [key: string]: boolean }`|An object where each key represents a state name and the value represents whether the state is currently active or not.|

The `useMultiStateToggle` hook returns an array containing three items:

|Index|Type|Description|
|---|---|---|
|0|`{ [key: string]: boolean }`|An object where each key represents a state name and the value represents whether the state is currently active or not.|
|1|`{ [key: string]: () => void }`|An object containing functions to toggle the state of each key.|
|2|`{ [key: string]: (newValue: boolean) => void }`|An object containing functions to set the state of each key directly.|

The toggle function (`index=1`) takes no parameters and returns void. When called, it toggles the current state of the associated key.

The set (`index=2`) function takes one parameter:

|Name|Type|Description|
|---|---|---|
|newValue|`boolean`|The new value to set the associated key to.|

When called, it sets the state of the associated key to the provided value. If the value is not a boolean, an error is thrown.