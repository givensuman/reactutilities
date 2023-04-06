import { renderHook, act } from '@testing-library/react-hooks';
import useWebSocket from '.';

const mockWebSocket = {
  send: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  readyState: WebSocket.OPEN,
  lastMessage: null,
};

jest.spyOn(global, 'WebSocket').mockImplementation(() => mockWebSocket);

describe('useWebSocket', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should open a WebSocket connection', () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:3000'));

    expect(global.WebSocket).toHaveBeenCalledTimes(1);
    expect(global.WebSocket).toHaveBeenCalledWith('ws://localhost:3000');
    expect(mockWebSocket.addEventListener).toHaveBeenCalledTimes(2);
    expect(mockWebSocket.addEventListener).toHaveBeenCalledWith(
      'open',
      expect.any(Function),
    );
    expect(mockWebSocket.addEventListener).toHaveBeenCalledWith(
      'message',
      expect.any(Function),
    );
    expect(result.current.readyState).toBe(WebSocket.CONNECTING);
  });

  it('should send messages over the WebSocket connection', () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:3000'));

    act(() => {
      result.current.send('test message');
    });

    expect(mockWebSocket.send).toHaveBeenCalledTimes(1);
    expect(mockWebSocket.send).toHaveBeenCalledWith('test message');
  });

  it('should update lastMessage when a message is received', () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:3000'));

    const messageEvent = new MessageEvent('message', {
      data: 'test message',
    });

    act(() => {
      mockWebSocket.dispatchEvent(messageEvent);
    });

    expect(result.current.lastMessage).toBe('test message');
  });

  it('should update readyState when the connection is opened or closed', () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:3000'));

    const openEvent = new Event('open');
    act(() => {
      mockWebSocket.readyState = WebSocket.OPEN;
      mockWebSocket.dispatchEvent(openEvent);
    });

    expect(result.current.readyState).toBe(WebSocket.OPEN);

    const closeEvent = new Event('close');
    act(() => {
      mockWebSocket.readyState = WebSocket.CLOSED;
      mockWebSocket.dispatchEvent(closeEvent);
    });

    expect(result.current.readyState).toBe(WebSocket.CLOSED);
  });

  it('should remove event listeners when the component unmounts', () => {
    const { unmount } = renderHook(() => useWebSocket('ws://localhost:3000'));

    expect(mockWebSocket.removeEventListener).not.toHaveBeenCalled();

    unmount();

    expect(mockWebSocket.removeEventListener).toHaveBeenCalledTimes(2);
    expect(mockWebSocket.removeEventListener).toHaveBeenCalledWith(
      'open',
      expect.any(Function),
    );
    expect(mockWebSocket.removeEventListener).toHaveBeenCalledWith(
      'message',
      expect.any(Function),
    );
  });
});
