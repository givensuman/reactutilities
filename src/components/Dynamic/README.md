# Dynamic

The `Dynamic` component allows you to dynamically render any React component or HTML element and pass props through to it. It is a lightweight component that can be used to create more flexible and reusable UI components.

## Usage

```tsx
import Dynamic from '@reactutilities/components';

function App() {
  return (
    <Dynamic component="div" className="container">
      <h1>Hello, World!</h1>
    </Dynamic>
  );
}
```

## API

There's only one built-in prop:

|Name|Type|Description|
|---|---|---|
|component|`React.ComponentType<T>\|React.ElementType\|keyofJSX.IntrinsicElements`|ThecomponentorHTMLelementtorender.DefaultstoReact.Fragment.|

Any other props passed to `Dynamic` will be forwarded to the rendered component. This allows you to pass custom props to the component you are rendering.

```tsx
<Dynamic component={MyComponent} foo="bar" />
```

In this example, the foo prop will be passed through to MyComponent.
