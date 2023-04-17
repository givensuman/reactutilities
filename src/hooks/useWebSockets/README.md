# useWebSocket

The `useWebSocket` hook is a React hook that simplifies the process of setting up and using web sockets for real-time communication.

## Usage

To use the `useWebSocket` hook, simply import it and call it from within a functional component:

```tsx
import { useWebSocket } from '@reactutilities/hooks';

function MyComponent() {
  const [webSocket, isConnected] = useWebSocket('wss://example.com');

  const sendMessage = (message: string) => {
    if (webSocket) {
      webSocket.send(message);
    }
  };

  return (
    <div>
      <div>WebSocket is {isConnected ? 'connected' : 'disconnected'}</div>
      {webSocket && (
        <div>Last message received: {webSocket.lastMessage}</div>
      )}
      <button onClick={() => sendMessage('Hello, server!')}>
        Send message
      </button>
    </div>
  );
}
```

In this example, `useWebSocket` is called with a URL of wss://example.com. The hook returns an array containing the WebSocket instance and a boolean value indicating whether the connection is currently open. The sendMessage function sends a message over the WebSocket connection.

## API

The `useWebSocket` hook takes two parameters:

|Name|Type|Description|
|---|---|---|
|url|`string`|The URL of the WebSocket server.|
|options|`UseWebSocketOptions`|Additional options to configure the WebSocket.|

The `UseWebSocketOptions` interface has the following properties:

|Name|Type|Default|Description|
|---|---|---|---|
|onOpen|`WebSocketEventHandler<'open'>`|undefined|A callback function to run when the WebSocket connection is opened.|
|onClose|`WebSocketEventHandler<'close'>`|undefined|A callback function to run when the WebSocket connection is closed.|
|onError|`WebSocketEventHandler<'error'>`|undefined|A callback function to run when an error occurs on the WebSocket connection.|
|onMessage|`WebSocketEventHandler<'message'>`|undefined|A callback function to run when a message is received over the WebSocket connection.|
|reconnectOnError|`boolean`|true|A boolean value indicating whether the hook should automatically attempt to reconnect to the WebSocket server if an error occurs or the connection is closed unexpectedly.|

The `useWebSocket` hook returns an array containing the WebSocket instance and a boolean value indicating whether the connection is currently open. The WebSocket instance has the following properties:

|Name|Type|Description|
|---|---|---|
|send|`(message: string) => void`|A function that sends a message over the WebSocket connection.|
|lastMessage|`string`|The last message received over the WebSocket connection.|
|readyState|`number`|The current state of the WebSocket connection.|

Note that the lastMessage and readyState properties are only available after the connection has been established.