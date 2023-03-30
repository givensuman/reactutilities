import { renderHook, act } from '@testing-library/react-hooks';
import useThrottle from '.';

describe('useThrottle', () => {
  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useThrottle('hello', 2, 1000));
    expect(result.current).toBe('hello');
  });

  it('throttles the value to the specified limit', () => {
    jest.useFakeTimers();

    const { result, rerender } = renderHook((props) => useThrottle(props.value, props.limit, props.period), {
      initialProps: { value: 'hello', limit: 2, period: 1000 },
    });

    expect(result.current).toBe('hello');

    act(() => {
      rerender({ value: 'world', limit: 2, period: 1000 });
    });

    expect(result.current).toBe('hello');

    act(() => {
      rerender({ value: 'goodbye', limit: 2, period: 1000 });
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('goodbye');

    act(() => {
      rerender({ value: 'foo', limit: 1, period: 500 });
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('hello');

    act(() => {
      rerender({ value: 'bar', limit: 1, period: 500 });
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('bar');

    jest.useRealTimers();
  });
});
