import React from 'react';
import { render } from '@testing-library/react';
import Show from '.';

describe('Show', () => {
  it('should render children when `when` is truthy', () => {
    const { getByText } = render(<Show when={true}>Hello World</Show>);
    expect(getByText('Hello World')).toBeInTheDocument();
  });

  it('should render children when `when` is truthy and children is a function', () => {
    const { getByText } = render(<Show when={true}>{() => 'Hello World'}</Show>);
    expect(getByText('Hello World')).toBeInTheDocument();
  });

  it('should render fallback when `when` is falsy', () => {
    const { getByText } = render(<Show when={false} fallback={<div>Fallback</div>}>Hello World</Show>);
    expect(getByText('Fallback')).toBeInTheDocument();
  });

  it('should render fallback when `when` is falsy and children is a function', () => {
    const { getByText } = render(<Show when={false} fallback={<div>Fallback</div>}>{() => 'Hello World'}</Show>);
    expect(getByText('Fallback')).toBeInTheDocument();
  });

  it('should not render fallback when `fallback` is not provided and `when` is falsy', () => {
    const { container } = render(<Show when={false}>Hello World</Show>);
    expect(container.firstChild).toBeNull();
  });

  it('should render a keyed fragment when `keyed` is true', () => {
    const { getByText } = render(<Show when="test" keyed>{() => 'Hello World'}</Show>);
    expect(getByText('Hello World')).toHaveAttribute('key', 'test');
  });
});
