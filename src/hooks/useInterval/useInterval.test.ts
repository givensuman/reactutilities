import { renderHook } from '@testing-library/react-hooks';
import useInterval from '.';

describe('useInterval', () => {
  jest.useFakeTimers();

  it('should call the callback function repeatedly at the given interval', () => {
    const callback = jest.fn();
    const interval = 1000;
    renderHook(() => useInterval(callback, interval));

    jest.advanceTimersByTime(interval * 3);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('should not call the callback function if the interval is null', () => {
    const callback = jest.fn();
    const interval = null;
    renderHook(() => useInterval(callback, interval));

    jest.advanceTimersByTime(10000);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should change the interval when the delay prop changes', () => {
    const callback = jest.fn();
    const interval1 = 1000;
    const interval2 = 500;
    const { rerender } = renderHook(
      ({ interval }) => useInterval(callback, interval),
      { initialProps: { interval: interval1 } }
    );

    jest.advanceTimersByTime(interval1);
    expect(callback).toHaveBeenCalledTimes(1);

    rerender({ interval: interval2 });

    jest.advanceTimersByTime(interval2 * 2);
    expect(callback).toHaveBeenCalledTimes(4);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});
