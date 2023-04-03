import React from 'react';
import { render, screen } from '@testing-library/react';
import Repeat from '.';

describe('Repeat', () => {
  it('should render the children the specified number of times', () => {
    render(
      <Repeat times={3}>
        <span>Hello!</span>
      </Repeat>
    );
    expect(screen.getAllByText('Hello!').length).toBe(3);
  });

  it('should render each child with a unique key', () => {
    render(
      <Repeat times={3}>
        <span>Hello!</span>
      </Repeat>
    );
    const elements = screen.getAllByText('Hello!');
    const keys = elements.map((el) => el.getAttribute('data-testid'));
    expect(new Set(keys).size).toBe(elements.length);
  });

  it('should skip non-element children', () => {
    render(
      <Repeat times={3}>
        <span>Hello!</span>
        {null}
        {undefined}
        {123}
      </Repeat>
    );
    expect(screen.getAllByText('Hello!').length).toBe(3);
  });
});
