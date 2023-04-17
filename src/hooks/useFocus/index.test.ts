import { renderHook, act } from '@testing-library/react-hooks';
import useFocus from '.';

describe('useFocus', () => {
  let ref: React.RefObject<HTMLInputElement>;
  let onFocus: jest.Mock<void, [event?: FocusEvent, node?: HTMLInputElement]>;
  let onBlur: jest.Mock<void, [event?: FocusEvent, node?: HTMLInputElement]>;

  beforeEach(() => {
    ref = { current: document.createElement('input') };
    onFocus = jest.fn();
    onBlur = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return false by default', () => {
    const { result } = renderHook(() => useFocus(ref));
    expect(result.current).toBe(false);
  });

  it('should return true when the element is focused', () => {
    const { result } = renderHook(() => useFocus(ref));
    act(() => {
      ref.current?.focus();
    });
    expect(result.current).toBe(true);
  });

  it('should return false when the element loses focus', () => {
    const { result } = renderHook(() => useFocus(ref));
    act(() => {
      ref.current?.focus();
      ref.current?.blur();
    });
    expect(result.current).toBe(false);
  });

  it('should call the onFocus callback when the element is focused', () => {
    renderHook(() => useFocus(ref, { onFocus }));
    act(() => {
      ref.current?.focus();
    });
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith(expect.any(FocusEvent), expect.any(HTMLInputElement));
  });

  it('should call the onBlur callback when the element loses focus', () => {
    renderHook(() => useFocus(ref, { onBlur }));
    act(() => {
      ref.current?.focus();
      ref.current?.blur();
    });
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledWith(expect.any(FocusEvent), expect.any(HTMLInputElement));
  });

  it('should not call the onFocus callback when it is not provided', () => {
    renderHook(() => useFocus(ref));
    act(() => {
      ref.current?.focus();
    });
    expect(onFocus).not.toHaveBeenCalled();
  });

  it('should not call the onBlur callback when it is not provided', () => {
    renderHook(() => useFocus(ref));
    act(() => {
      ref.current?.focus();
      ref.current?.blur();
    });
    expect(onBlur).not.toHaveBeenCalled();
  });
});