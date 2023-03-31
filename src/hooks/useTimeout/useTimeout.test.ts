import { renderHook, act } from '@testing-library/react-hooks';
import useTimeout from '.';

describe('useTimeout', () => {
  jest.useFakeTimers();

  it('should call the callback after the specified delay', () => {
    const callback = jest.fn();
    const delay = 1000;
    renderHook(() => useTimeout(callback, delay));

    act(() => {
      jest.advanceTimersByTime(delay);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should cancel the timeout if the delay changes', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(({ delay }) => useTimeout(callback, delay), { initialProps: { delay: 1000 } });

    rerender({ delay: 500 });
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('should cancel the timeout if the component unmounts', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useTimeout(callback, 1000));

    unmount();
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(0);
  });
});
