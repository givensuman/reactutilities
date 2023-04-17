import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from '.';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should set the initial value if the key is not in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('myKey', 'myValue'));
    expect(result.current[0]).toEqual('myValue');
  });

  it('should retrieve the value from localStorage if the key is present', () => {
    localStorage.setItem('myKey', JSON.stringify('myStoredValue'));
    const { result } = renderHook(() => useLocalStorage('myKey', 'myValue'));
    expect(result.current[0]).toEqual('myStoredValue');
  });

  it('should update the value in localStorage when the state is updated', () => {
    const { result } = renderHook(() => useLocalStorage('myKey', 'myValue'));
    expect(localStorage.getItem('myKey')).toEqual(JSON.stringify('myValue'));
    act(() => {
      result.current[1]('newValue');
    });
    expect(result.current[0]).toEqual('newValue');
    expect(localStorage.getItem('myKey')).toEqual(JSON.stringify('newValue'));
  });
});
