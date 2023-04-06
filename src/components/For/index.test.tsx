import React from 'react';
import { render, screen } from '@testing-library/react';
import For from '.';

describe('For component', () => {
  it('renders children for each item in the array', () => {
    const data = ['apple', 'banana', 'cherry'];
    render(<For each={data}>{item => <div key={item}>{item}</div>}</For>);
    expect(screen.getByText('apple')).toBeInTheDocument;
    expect(screen.getByText('banana')).toBeInTheDocument;
    expect(screen.getByText('cherry')).toBeInTheDocument;
  });

  it('renders fallback if the array is empty', () => {
    const data: string[] = [];
    render(
      <For each={data} fallback={<div>no items</div>}>
        {item => <div key={item}>{item}</div>}
      </For>,
    );
    expect(screen.getByText('no items')).toBeInTheDocument;
  });

  it('returns an array of children for each item in the array', () => {
    const data = ['apple', 'banana', 'cherry'];
    const children = (item: string) => <div key={item}>{item}</div>;
    const result = render(<For each={data}>{children}</For>);
    const renderedChildren = data.map(item => result.getByText(item));
    expect(renderedChildren.length).toBe(3);
  });

  it('passes the index as the second argument to the children function', () => {
    const data = ['apple', 'banana', 'cherry'];
    const children = jest.fn((item, index) => <div key={item}>{index}</div>);
    render(<For each={data}>{children}</For>);
    expect(children).toHaveBeenCalledTimes(3);
    expect(children).toHaveBeenCalledWith('apple', 0);
    expect(children).toHaveBeenCalledWith('banana', 1);
    expect(children).toHaveBeenCalledWith('cherry', 2);
  });
});
