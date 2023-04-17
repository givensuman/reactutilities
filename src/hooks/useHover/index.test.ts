import { renderHook } from '@testing-library/react-hooks';
import useHover from '.';

describe('useHover', () => {
  test('should return false when the mouse is not hovering over the element', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() => useHover(ref));

    expect(result.current).toBe(false);
  });

  test('should return true when the mouse is hovering over the element', () => {
    const div = document.createElement('div');
    const ref = { current: div };
    const { result } = renderHook(() => useHover(ref));

    const mouseoverEvent = new MouseEvent('mouseover', {
      bubbles: true,
      cancelable: true,
    });
    div.dispatchEvent(mouseoverEvent);

    expect(result.current).toBe(true);
  });

  test('should return false again when the mouse leaves the element', () => {
    const div = document.createElement('div');
    const ref = { current: div };
    const { result } = renderHook(() => useHover(ref));

    const mouseoverEvent = new MouseEvent('mouseover', {
      bubbles: true,
      cancelable: true,
    });
    div.dispatchEvent(mouseoverEvent);

    const mouseoutEvent = new MouseEvent('mouseout', {
      bubbles: true,
      cancelable: true,
    });
    div.dispatchEvent(mouseoutEvent);

    expect(result.current).toBe(false);
  });
});
