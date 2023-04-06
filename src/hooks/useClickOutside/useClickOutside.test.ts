import { renderHook } from '@testing-library/react-hooks';
import useOnClickOutside from '.';

describe('useOnClickOutside', () => {
  let ref: React.RefObject<HTMLDivElement>;
  let handler: jest.Mock<any, any>;

  beforeEach(() => {
    ref = { current: document.createElement('div') };
    handler = jest.fn();
  });

  afterEach(() => {
    handler.mockReset();
  });

  it('should call handler when clicking outside of the ref element', () => {
    renderHook(() => useOnClickOutside(ref, handler));

    const outsideElement = document.createElement('div');
    document.body.appendChild(outsideElement);
    outsideElement.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true }),
    );

    expect(handler).toHaveBeenCalled();
  });

  it('should not call handler when clicking inside of the ref element', () => {
    renderHook(() => useOnClickOutside(ref, handler));

    const insideElement = document.createElement('div');
    if (ref.current) {
      ref.current.appendChild(insideElement);
    }
    insideElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(handler).not.toHaveBeenCalled();
  });

  it('should remove event listeners on unmount', () => {
    const { unmount } = renderHook(() => useOnClickOutside(ref, handler));

    unmount();

    const outsideElement = document.createElement('div');
    document.body.appendChild(outsideElement);
    outsideElement.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true }),
    );

    expect(handler).not.toHaveBeenCalled();
  });
});
