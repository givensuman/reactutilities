import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dynamic from '.';

describe('Dynamic component', () => {
  it('should render a div element with a "data-testid" attribute', () => {
    render(<Dynamic component="div" data-testid="test-div" />);
    const divElement = screen.getByTestId('test-div');
    expect(divElement).toBeInTheDocument();
  });

  it('should render a custom component with props', () => {
    interface CustomProps {
      text: string;
    }
    function CustomComponent(props: CustomProps) {
      return <div>{props.text}</div>;
    }

    render(
      <Dynamic<CustomProps> component={CustomComponent} text="Hello World!" />,
    );
    const divElement = screen.getByText('Hello World!');
    expect(divElement).toBeInTheDocument();
  });

  it('should render a span element with dynamic props', () => {
    render(
      <Dynamic
        component="span"
        className="custom-class"
        data-testid="test-attribute"
      />,
    );
    const spanElement = screen.getByTestId('test-attribute');
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveClass('custom-class');
  });
});
