import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Switch, Match } from '.';

describe('Switch', () => {
  it('should render fallback when no matches are found', () => {
    const { container } = render(
      <Switch fallback={<div>Not Found</div>}>
        <Match when={false}>
          <div>Match 1</div>
        </Match>
        <Match when={false}>
          <div>Match 2</div>
        </Match>
      </Switch>
    );
    expect(container).toContainHTML('<div>Not Found</div>');
  });

  it('should render the matched component', () => {
    const { container } = render(
      <Switch fallback={<div>Not Found</div>}>
        <Match when={true}>
          <div>Matched</div>
        </Match>
        <Match when={false}>
          <div>Not Matched</div>
        </Match>
      </Switch>
    );
    expect(container).toContainHTML('<div>Matched</div>');
  });
});

describe('Match', () => {
  it('should render its children when the condition is truthy', () => {
    const { container } = render(
      <Match when={true}>
        <div>Matched</div>
      </Match>
    );
    expect(container).toContainHTML('<div>Matched</div>');
  });

  it('should not render its children when the condition is falsy', () => {
    const { container } = render(
      <Match when={false}>
        <div>Not Matched</div>
      </Match>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should render its children with the item when the children is a function', () => {
    const { container } = render(
      <Match when={{ name: 'John' }}>
        {({ name }) => <div>Hello, {name}!</div>}
      </Match>
    );
    expect(container).toContainHTML('<div>Hello, John!</div>');
  });
});
