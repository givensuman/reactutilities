import { act, renderHook } from '@testing-library/react-hooks';
import { useRef } from 'react';
import useEventListener from '.';

describe('useEventListener', () => {
  test('attaches and detaches an event listener', () => {
    const handler = jest.fn();
    const target = document.createElement('div');
    const { unmount } = renderHook(() => useEventListener('click', handler, target));

    // trigger a click event on the target
    act(() => {
      target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(handler).toHaveBeenCalledTimes(1);

    // unmount the hook and trigger the event again
    unmount();

    act(() => {
      target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('handles multiple event types', () => {
    const handler = jest.fn();
    const target = document.createElement('div');
    const { unmount } = renderHook(() =>
      useEventListener(['mousedown', 'touchstart'], handler, target)
    );

    // trigger a mousedown event on the target
    act(() => {
      target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    expect(handler).toHaveBeenCalledTimes(1);

    // trigger a touchstart event on the target
    act(() => {
      target.dispatchEvent(new TouchEvent('touchstart', { bubbles: true }));
    });

    expect(handler).toHaveBeenCalledTimes(2);

    // unmount the hook and trigger the events again
    unmount();

    act(() => {
      target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    act(() => {
      target.dispatchEvent(new TouchEvent('touchstart', { bubbles: true }));
    });

    expect(handler).toHaveBeenCalledTimes(2);
  });

  test('works with ref targets', () => {
    const handler = jest.fn();
    const ref = useRef<HTMLButtonElement>(null);
    const { unmount } = renderHook(() => useEventListener('click', handler, ref.current ?? window));

    // trigger a click event on the ref's current element
    act(() => {
      ref.current?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(handler).toHaveBeenCalledTimes(1);

    // unmount the hook and trigger the event again
    unmount();

    act(() => {
      ref.current?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
