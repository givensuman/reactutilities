import { act, renderHook } from '@testing-library/react-hooks';
import useKeyPress from '.';

describe('useKeyPress', () => {
  it('returns false by default', () => {
    const { result } = renderHook(() => useKeyPress('a'));

    expect(result.current).toBe(false);
  });

  it('returns true when the target key is pressed', () => {
    const { result } = renderHook(() => useKeyPress('a'));

    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(event);
    });

    expect(result.current).toBe(true);
  });

  it('returns false when the target key is released', () => {
    const { result } = renderHook(() => useKeyPress('a'));

    act(() => {
      const downEvent = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(downEvent);

      const upEvent = new KeyboardEvent('keyup', { key: 'a' });
      document.dispatchEvent(upEvent);
    });

    expect(result.current).toBe(false);
  });

  it('calls the provided callback when the target key is pressed', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useKeyPress('a', callback));

    act(() => {
      const event = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(event);
    });

    expect(callback).toHaveBeenCalled();
  });
});