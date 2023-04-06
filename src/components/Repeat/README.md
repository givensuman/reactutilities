# Repeat

The `Repeat` component allows you to repeat a set of child elements a certain number of times. It takes in a number of times to repeat the children, and any valid React nodes as children.

## Usage

```tsx
import { Repeat } from '@reactutilities/components';

function App() {
  return (
    <Repeat times={3}>
      <p>Hello World</p>
    </Repeat>
  );
}
```

This will render:

```html
<p>Hello World</p>
<p>Hello World</p>
<p>Hello World</p>
```

## API

The `Repeat` component accepts the following props:
|Name |Type |Description|
|---|---|---|
|times |`number`|A required number that specifies the number of times to repeat the child elements.|
|children |`React.ReactNode` |A required set of valid React nodes to be repeated.|

## Example

Here's an example that demonstrates how to use the `Repeat` component:

```tsx
import { Repeat } from '@reactutilities/components';
import StarIcon from './icons';

function Rating({ rating }: { rating: number }) {
  return (
    <div>
      <p>Your rating:</p>
      <p>
        <Repeat times={Math.min(rating, 5)}>
          <StarIcon />
        </Repeat>
        <Repeat times={Math.max(5 - rating, 0)}>
          <StarIcon isFilled={false} />
        </Repeat>
      </p>
    </div>
  );
}
```

In this example, the Repeat component is used to render a series of StarIcon components based on the given rating prop. If the rating is greater than 5, only 5 stars will be displayed. If the rating is less than 0, no stars will be displayed. Empty stars are displayed if there are fewer than 5 filled stars.
