import { renderHook } from '@testing-library/react-hooks';
import useMediaQuery from '.';

describe('useMediaQuery', () => {
  it('should return true for a valid media query string', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 720px)'));
    expect(result.current).toBe(true);
  });

  it('should return true for a valid media query object with only minWidth', () => {
    const { result } = renderHook(() => useMediaQuery({ minWidth: 720 }));
    expect(result.current).toBe(true);
  });

  it('should return true for a valid media query object with only maxWidth', () => {
    const { result } = renderHook(() => useMediaQuery({ maxWidth: 720 }));
    expect(result.current).toBe(true);
  });

  it('should return true for a valid media query object with only minHeight', () => {
    const { result } = renderHook(() => useMediaQuery({ minHeight: 720 }));
    expect(result.current).toBe(true);
  });

  it('should return true for a valid media query object with only maxHeight', () => {
    const { result } = renderHook(() => useMediaQuery({ maxHeight: 720 }));
    expect(result.current).toBe(true);
  });

  it('should return false for an invalid media query string', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 720)px'));
    expect(result.current).toBe(false);
  });

  it('should return false for an invalid media query object with a string value', () => {
    const { result } = renderHook(() => useMediaQuery({ minWidth: '720px' }));
    expect(result.current).toBe(false);
  });

  it('should return false for an invalid media query object with a negative value', () => {
    const { result } = renderHook(() => useMediaQuery({ maxWidth: -720 }));
    expect(result.current).toBe(false);
  });

  it('should return false for an invalid media query object with an invalid property name', () => {
    const { result } = renderHook(() => useMediaQuery({ invalid: 720 } as any));
    expect(result.current).toBe(false);
  });
});
