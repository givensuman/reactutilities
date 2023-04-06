import { renderHook, act } from '@testing-library/react-hooks';
import useToggle from '.';

describe('useToggle', () => {
  it('should initialize with the default value of false', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toBe(false);
  });

  it('should initialize with the provided value', () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current[0]).toBe(true);
  });

  it('should toggle the boolean value', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1](); // toggleValue
    });

    expect(result.current[0]).toBe(true);
  });

  it('should set the boolean value with type validation', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[2](true); // setValueWithValidation
    });

    expect(result.current[0]).toBe(true);

    expect(() => {
      act(() => {
        // should throw error with descriptive message
        // @ts-ignore
        result.current[2]('invalid value'); // setValueWithValidation
      });
    }).toThrow(
      'useToggle setValue argument must be a boolean, but received string',
    );
  });
});
