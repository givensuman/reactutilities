# useEventListener

The `useEventListener` hook is a utility function that simplifies the process of adding and removing event listeners in React applications. It provides a consistent API that you can use to attach event listeners to any DOM element.

## Usage

To use the `useEventListener` hook, simply import it and call it from within a functional component:

```tsx
import { useEventListener } from '@reactutilities/hooks';

function MyComponent() {
  const handleScroll = () => {
    console.log('scroll event detected!');
  }

  useEventListener('scroll', handleScroll);

  return <div>Example component</div>;
}
```

In this example, `useEventListener` is called with the event type and event handler. The event listener is automatically added to the window object, since no target parameter is provided.

You can also specify a target element by passing it as the third parameter:

```tsx
function MyComponent() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  useEventListener('keydown', handleKey, document);

  function handleKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      handleClick();
    }
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Click me or press enter!</button>
    </div>
  );
}
```

In this example, `useEventListener` is called with the 'keydown' event, the handleKey function, and the document object as the target element. When the user presses the Enter key anywhere on the page, the handleKey function will be called with the KeyboardEvent object.

You can also pass an array of event types to the useEventListener hook:

```tsx
function MyComponent() {
  const handleKeyDown = () => {
    console.log('keydown event detected!');
  }

  const handleKeyUp = () => {
    console.log('keyup event detected!');
  }

  useEventListener(['keydown', 'keyup'], handleKeyDown);

  return <div>Example component</div>;
}
```

In this example, `useEventListener` is called with an array of event types and a single event handler. The event listener is added to the window object for both the "keydown" and "keyup" events.

## API

The `useEventListener` hook accepts the following parameters:

|Name	|Type	|Description|
|---|---|---|
|eventType|`EventType \| EventType[]`|The event type(s) to listen for.|
|handler|	`EventListenerOrEventListenerObject`|The event handler function.|
|target|`EventTarget`|The target element to attach the listener to. Defaults to `window`.|