import React from 'react';
import { render } from '@testing-library/react';
import Repeat from '.';

describe('Repeat', () => {
  it('renders children the specified number of times', () => {
    const { container } = render(<Repeat times={3}>Hello</Repeat>);
    expect(Array.from(container.childNodes).flat().length).toEqual(3);
    expect(container.innerHTML).toEqual('HelloHelloHello');
  });

  it('renders multiple children the specified number of times', () => {
    const { container } = render(
      <Repeat times={2}>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </Repeat>,
    );
    expect(container.childNodes.length).toEqual(4);
    expect(container.innerHTML).toEqual(
      '<p>Paragraph 1</p><p>Paragraph 2</p><p>Paragraph 1</p><p>Paragraph 2</p>',
    );
  });

  it('renders no children if times is zero', () => {
    const { container } = render(<Repeat times={0}>Hello</Repeat>);
    expect(container.childNodes.length).toEqual(0);
  });

  it('renders no children if children is not provided', () => {
    const { container } = render(<Repeat times={3}>{undefined as any}</Repeat>);
    expect(container.childNodes.length).toEqual(0);
  });

  it('renders no children if children is an empty array', () => {
    const { container } = render(<Repeat times={3}>{[]}</Repeat>);
    expect(container.childNodes.length).toEqual(0);
  });

  it('renders no children if children is null', () => {
    const { container } = render(<Repeat times={3}>{null}</Repeat>);
    expect(container.childNodes.length).toEqual(0);
  });

  it('renders no children if children is undefined', () => {
    const { container } = render(<Repeat times={3}>{undefined}</Repeat>);
    expect(container.childNodes.length).toEqual(0);
  });
});
