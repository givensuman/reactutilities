# Switch

The `Switch` component allows you to render a set of child elements based on a given value. It takes in a value to check against and any valid React nodes as children.

## Usage

```tsx
import { Switch } from '@reactutilities/components';

function App() {
  const status = 'pending';

  return (
    <Switch value={status}>
      <Switch.Case when="pending">
        <div>Your request is being processed...</div>
      </Switch.Case>
      <Switch.Case when="approved">
        <div>Your request has been approved!</div>
      </Switch.Case>
      <Switch.Case when="rejected">
        <div>Your request has been rejected.</div>
      </Switch.Case>
      <Switch.Default>
        <div>Please wait for a response.</div>
      </Switch.Default>
    </Switch>
  );
}
```

This will render "Your request is being processed..." if status is "pending", "Your request has been approved!" if status is "approved", "Your request has been rejected." if status is "rejected", and "Please wait for a response." if status is any other value.

It's worth noting that the `Switch` component filters children to detect the correct `Switch.Case`, so any React nodes other than `Switch.Case` and `Switch.Default` will not be rendered.

## API

The `Switch` component accepts the following props:

|Name|Type|Description|
|---|---|---|
|value|`T`|A required value to check against.|
|children|`React.ReactNode`|A required set of valid React nodes that should be rendered based on the value.|

The `Switch.Case` and `Switch.Default` components are used to define individual cases within the Switch component. Both require childre, and `Switch.Case` accepts the following prop:


|Name|Type|Description|
|---|---|---|
|when|`T`|A required value to check against for equality.|