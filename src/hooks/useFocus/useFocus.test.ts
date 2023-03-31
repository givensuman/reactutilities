import { renderHook } from '@testing-library/react-hooks';
import useFocus from '.';

describe('useFocus', () => {
  it('returns false by default', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useFocus(ref));
    expect(result.current).toBe(false);
  });

  it('returns true when element is in focus', () => {
    const ref = { current: document.createElement('input') };
    const { result } = renderHook(() => useFocus(ref));
    ref.current.focus();
    expect(result.current).toBe(true);
  });

  it('returns false when element loses focus', () => {
    const ref = { current: document.createElement('input') };
    const { result } = renderHook(() => useFocus(ref));
    ref.current.focus();
    ref.current.blur();
    expect(result.current).toBe(false);
  });

  it('removes event listeners when component unmounts', () => {
    const ref = { current: document.createElement('input') };
    const { unmount } = renderHook(() => useFocus(ref));
    expect(() => {
      ref.current.focus();
      unmount();
      ref.current.blur();
    }).not.toThrow();
  });
});
