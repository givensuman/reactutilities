import { renderHook } from '@testing-library/react-hooks';
import usePrevious from '.';

describe('usePrevious', () => {
  it('should return undefined on initial render', () => {
    const { result } = renderHook(() => usePrevious('test'));
    expect(result.current).toBe(undefined);
  });

  it('should return the previous value', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'test' },
    });

    expect(result.current).toBe(undefined);

    rerender({ value: 'updated' });
    expect(result.current).toBe('test');

    rerender({ value: 'changed' });
    expect(result.current).toBe('updated');
  });
});
