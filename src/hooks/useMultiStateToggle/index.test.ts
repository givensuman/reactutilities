import { renderHook, act } from '@testing-library/react-hooks';
import { useMultiStateToggle } from '.';

describe('useMultiStateToggle', () => {
  it('returns initial state', () => {
    const initialState = { tab1: true, tab2: false };
    const { result } = renderHook(() => useMultiStateToggle(initialState));
    const [state] = result.current;
    expect(state).toEqual(initialState);
  });

  it('toggles state for a specific key', () => {
    const initialState = { tab1: true, tab2: false };
    const { result } = renderHook(() => useMultiStateToggle(initialState));
    const [, toggleValue] = result.current;
    act(() => toggleValue.tab1());
    const [state] = result.current;
    expect(state).toEqual({ tab1: false, tab2: false });
  });

  it('sets state for a specific key', () => {
    const initialState = { tab1: true, tab2: false };
    const { result } = renderHook(() => useMultiStateToggle(initialState));
    const [, , setValueWithValidation] = result.current;
    act(() => setValueWithValidation.tab2(true));
    const [state] = result.current;
    expect(state).toEqual({ tab1: true, tab2: true });
  });

  it('throws an error if setting a non-boolean value', () => {
    const initialState = { tab1: true, tab2: false };
    const { result } = renderHook(() => useMultiStateToggle(initialState));
    const [, , setValueWithValidation] = result.current;
    expect(() => {
      act(() => setValueWithValidation.tab2('string' as any));
    }).toThrowError('useMultiStateToggle setValue argument must be a boolean, but received string');
  });
});
