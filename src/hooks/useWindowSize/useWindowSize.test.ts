import { renderHook } from '@testing-library/react-hooks';
import { useWindowSize } from '.';

describe('useWindowSize', () => {
  it('returns an object with the window width and height', () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current).toHaveProperty('width');
    expect(result.current).toHaveProperty('height');
  });

  it('updates the window size state on resize', () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toEqual(window.innerWidth);
    expect(result.current.height).toEqual(window.innerHeight);

    const newWidth = 500;
    const newHeight = 500;
    window.innerWidth = newWidth;
    window.innerHeight = newHeight;
    window.dispatchEvent(new Event('resize'));

    expect(result.current.width).toEqual(newWidth);
    expect(result.current.height).toEqual(newHeight);
  });
});
