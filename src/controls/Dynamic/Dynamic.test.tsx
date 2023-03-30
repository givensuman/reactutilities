import React from 'react';
import { render } from '@testing-library/react';
import Dynamic from '.';

describe('Dynamic', () => {
    it('should render the given component with props', () => {
      const Component = () => <div data-testid="test-component">Hello, world!</div>;
      const props = { foo: 'bar', baz: 42 };
      const { getByTestId } = render(<Dynamic component={Component} {...props} />);
      const element = getByTestId('test-component');
      expect(element).toHaveTextContent('Hello, world!');
      expect(element).toHaveAttribute('foo', 'bar');
      expect(element).toHaveAttribute('baz', '42');
    });
  
    it('should render the given HTML element with props', () => {
      const props = { foo: 'bar', baz: 42 };
      const { getByTestId } = render(<Dynamic component="span" {...props}>Hello, world!</Dynamic>);
      const element = getByTestId('dynamic');
      expect(element.tagName.toLowerCase()).toBe('span');
      expect(element).toHaveTextContent('Hello, world!');
      expect(element).toHaveAttribute('foo', 'bar');
      expect(element).toHaveAttribute('baz', '42');
    });
  });