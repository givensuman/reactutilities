import { act, renderHook } from '@testing-library/react-hooks';
import useSessionStorage from '.';

describe('useSessionStorage', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should return the initial value if sessionStorage is empty', () => {
    const { result } = renderHook(() => useSessionStorage('test', 'initialValue'));

    expect(result.current[0]).toBe('initialValue');
  });

  it('should return the value from sessionStorage if it exists', () => {
    sessionStorage.setItem('test', JSON.stringify('storedValue'));

    const { result } = renderHook(() => useSessionStorage('test', 'initialValue'));

    expect(result.current[0]).toBe('storedValue');
  });

  it('should update the sessionStorage value when the state is updated', () => {
    const { result } = renderHook(() => useSessionStorage('test', 'initialValue'));

    expect(sessionStorage.getItem('test')).toBe(JSON.stringify('initialValue'));

    act(() => {
      result.current[1]('updatedValue');
    });

    expect(result.current[0]).toBe('updatedValue');
    expect(sessionStorage.getItem('test')).toBe(JSON.stringify('updatedValue'));
  });
});