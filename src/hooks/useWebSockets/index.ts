import { useEffect, useRef, useState } from 'react';

interface WebSocketEventMap {
  close: CloseEvent;
  error: Event;
  message: MessageEvent;
  open: Event;
}

type WebSocketEventHandler<K extends keyof WebSocketEventMap> = (
  event: WebSocketEventMap[K],
) => void;

interface UseWebSocketOptions {
  onOpen?: WebSocketEventHandler<'open'>;
  onClose?: WebSocketEventHandler<'close'>;
  onError?: WebSocketEventHandler<'error'>;
  onMessage?: WebSocketEventHandler<'message'>;
  reconnectOnError?: boolean;
}

/**
 * Simplifies the process of setting up and using web sockets for real-time communication.
 *
 * @param url The URL of the WebSocket server.
 * @param options Additional options to configure the WebSocket.
 * @returns An object containing the `send`, `lastMessage`, and `readyState` properties.
 * The `send` function can be used to send messages over the WebSocket connection.
 * The `lastMessage` property can be used to access the last message received over the WebSocket connection.
 * The `readyState` property can be used to check if the connection is currently open.
 *
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
export function useWebSocket(url: string, options: UseWebSocketOptions = {}) {
  const {
    onOpen,
    onClose,
    onError,
    onMessage,
    reconnectOnError = true,
  } = options;
  const [ws, setWebSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const reconnectTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    const handleOpen: WebSocketEventHandler<'open'> = event => {
      setIsConnected(true);
      onOpen?.(event);
    };

    const handleClose: WebSocketEventHandler<'close'> = event => {
      setIsConnected(false);
      onClose?.(event);

      if (reconnectOnError && event.code !== 1000 && event.code !== 1001) {
        // Try to reconnect after a short delay
        reconnectTimeoutRef.current = window.setTimeout(() => {
          setWebSocket(new WebSocket(url));
        }, 1000);
      }
    };

    const handleError: WebSocketEventHandler<'error'> = event => {
      onError?.(event);

      if (reconnectOnError) {
        // Try to reconnect after a short delay
        reconnectTimeoutRef.current = window.setTimeout(() => {
          setWebSocket(new WebSocket(url));
        }, 1000);
      }
    };

    const handleMessage: WebSocketEventHandler<'message'> = event => {
      onMessage?.(event);
    };

    socket.addEventListener('open', handleOpen);
    socket.addEventListener('close', handleClose);
    socket.addEventListener('error', handleError);
    socket.addEventListener('message', handleMessage);

    setWebSocket(socket);

    return () => {
      socket.removeEventListener('open', handleOpen);
      socket.removeEventListener('close', handleClose);
      socket.removeEventListener('error', handleError);
      socket.removeEventListener('message', handleMessage);

      if (reconnectTimeoutRef.current !== null) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      if (isConnected) {
        socket.close();
      }
    };
  }, [url]);

  return [ws, isConnected] as const;
}

export default useWebSocket;
