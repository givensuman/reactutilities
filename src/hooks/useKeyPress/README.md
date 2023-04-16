# useKeyPress

The `useKeyPress` hook is a simple way to detect when a specific key is pressed on the keyboard and optionally run a callback function when the key is pressed. It simplifies the process of handling key events in React applications by providing a consistent API that you can use to detect key presses.

## Usage

To use the useKeyPress hook, simply import it and call it from within a functional component:

```tsx
import { useKeyPress } from '@reactutilities/hooks';

function MyComponent() {
  const isKeyPressed = useKeyPress('Enter', () => {
    console.log('Enter key pressed!');
  });

  return (
    <div>
      {isKeyPressed ? 'Enter key pressed!' : 'Press Enter key'}
    </div>
  );
}
```

In this example, `useKeyPress` is called with the targetKey of 'Enter' and a callback function that logs a message to the console when the Enter key is pressed. The `isKeyPressed` variable is then used to conditionally render a message to the user.

You can also use `useKeyPress` without passing a callback function:

```tsx
import { useKeyPress } from '@reactutilities/hooks';

function MyComponent() {
  const isKeyPressed = useKeyPress('Enter');

  return (
    <div>
      {isKeyPressed ? 'Enter key pressed!' : 'Press Enter key'}
    </div>
  );
}
```

In this example, `useKeyPress` is called with the targetKey of 'Enter', but no callback function is passed. The `isKeyPressed` variable is still used to conditionally render a message to the user.

## API

The `useKeyPress` hook accepts two arguments:

|Name|Type|Description|
|---|---|---|
|targetKey|`string \| number`|The key to detect. Can be a string or a number.|
|onKeyPress|`(event?: KeyboardEvent) => void`|Optional callback that runs when targetKey is pressed.|

The useKeyPress hook returns a boolean indicating whether the target key was pressed.