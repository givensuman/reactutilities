import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import useHover from '.';

describe('useHover', () => {
  test('should detect when the mouse is hovering over an element', () => {
    const Component = () => {
      const ref = useRef(null);
      const isHovering = useHover(ref);

      return (
        <div ref={ref}>
          {isHovering ? 'Hovering' : 'Not hovering'}
        </div>
      );
    };

    const { getByText } = render(<Component />);
    const element = getByText('Not hovering');

    fireEvent.mouseOver(element);

    expect(getByText('Hovering')).toBeInTheDocument();
  });

  test('should call the onMouseOver callback when the mouse enters the element', () => {
    const onMouseOver = jest.fn();
    const Component = () => {
      const ref = useRef(null);
      useHover(ref, { onMouseOver });

      return (
        <div ref={ref}>Hover over me</div>
      );
    };

    const { getByText } = render(<Component />);
    const element = getByText('Hover over me');

    fireEvent.mouseOver(element);

    expect(onMouseOver).toHaveBeenCalled();
  });

  test('should call the onMouseOut callback when the mouse leaves the element', () => {
    const onMouseOut = jest.fn();
    const Component = () => {
      const ref = useRef(null);
      useHover(ref, { onMouseOut });

      return (
        <div ref={ref}>Hover over me</div>
      );
    };

    const { getByText } = render(<Component />);
    const element = getByText('Hover over me');

    fireEvent.mouseOver(element);
    fireEvent.mouseOut(element);

    expect(onMouseOut).toHaveBeenCalled();
  });
});