import React from 'react';
import { render } from '@testing-library/react';
import For from '.';

describe('For component', () => {
  it('should render each item in the array', () => {
    const items = ['apple', 'banana', 'cherry'];
    const { getByText } = render(
      <For each={items}>
        {(item, index) => <div key={index}>{item}</div>}
      </For>
    );
    expect(getByText('apple')).toBeInTheDocument;
    expect(getByText('banana')).toBeInTheDocument;
    expect(getByText('cherry')).toBeInTheDocument;
  });

  it('should pass the correct item and index to the children function', () => {
    const items = ['apple', 'banana', 'cherry'];
    const childrenFn = jest.fn();
    render(
      <For each={items}>
        {childrenFn}
      </For>
    );
    expect(childrenFn).toHaveBeenCalledTimes(3);
    expect(childrenFn.mock.calls[0][0]).toBe('apple');
    expect(childrenFn.mock.calls[0][1]).toBe(0);
    expect(childrenFn.mock.calls[1][0]).toBe('banana');
    expect(childrenFn.mock.calls[1][1]).toBe(1);
    expect(childrenFn.mock.calls[2][0]).toBe('cherry');
    expect(childrenFn.mock.calls[2][1]).toBe(2);
  });
});
