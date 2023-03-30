import { renderHook, act } from '@testing-library/react-hooks';
import useDebounce from '.';

describe('useDebounce', () => {
  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 500));
    expect(result.current).toBe('hello');
  });

  it('debounces the value after the delay', async () => {
    jest.useFakeTimers();

    const { result, rerender } = renderHook((props) => useDebounce(props.value, props.delay), {
      initialProps: { value: 'hello', delay: 500 },
    });

    expect(result.current).toBe('hello');

    rerender({ value: 'world', delay: 500 });

    // The value should not change immediately
    expect(result.current).toBe('hello');

    // Fast forward time by 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // The value should be updated to 'world' after the delay
    expect(result.current).toBe('world');

    jest.useRealTimers();
  });
});
