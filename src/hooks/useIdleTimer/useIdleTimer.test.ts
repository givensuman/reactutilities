import { renderHook, act } from '@testing-library/react-hooks';
import useIdleTimer from '.';

describe('useIdleTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return false when the user is active', () => {
    const { result } = renderHook(() => useIdleTimer(5000));

    expect(result.current).toBe(false);

    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
    });

    expect(result.current).toBe(false);

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown'));
    });

    expect(result.current).toBe(false);
  });

  it('should return true when the user is idle for the specified amount of time', () => {
    const { result } = renderHook(() => useIdleTimer(5000));

    expect(result.current).toBe(false);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current).toBe(true);
  });

  it('should reset the idle timer when the user becomes active', () => {
    const { result } = renderHook(() => useIdleTimer(5000));

    expect(result.current).toBe(false);

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(result.current).toBe(false);

    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
    });

    expect(result.current).toBe(false);

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(result.current).toBe(false);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(false);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(true);
  });
});
