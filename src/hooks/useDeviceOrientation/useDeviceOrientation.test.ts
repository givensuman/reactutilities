import { renderHook } from '@testing-library/react-hooks';
import useDeviceOrientation from '.';

describe('useDeviceOrientation', () => {
  it('should return "portrait" or "landscape"', () => {
    const { result } = renderHook(() => useDeviceOrientation());
    expect(result.current).toMatch(/^(portrait|landscape)$/);
  });
  
  it('should return "portrait" if the window is in portrait mode', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockReturnValue({ matches: true }),
    });
    const { result } = renderHook(() => useDeviceOrientation());
    expect(result.current).toBe('portrait');
  });

  it('should return "landscape" if the window is in landscape mode', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockReturnValue({ matches: false }),
    });
    const { result } = renderHook(() => useDeviceOrientation());
    expect(result.current).toBe('landscape');
  });
});
