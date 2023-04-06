import React from 'react';
import { render } from '@testing-library/react';
import Switch from '.';

describe('Switch', () => {
  it('renders the correct SwitchCase when a match is found', () => {
    const { getByText } = render(
      <Switch value={2}>
        <Switch.Case when={1}>One</Switch.Case>
        <Switch.Case when={2}>Two</Switch.Case>
        <Switch.Case when={3}>Three</Switch.Case>
      </Switch>
    );
    expect(getByText('Two')).toBeInTheDocument;
  });

  it('renders the correct SwitchDefault when no matches are found', () => {
    const { getByText } = render(
      <Switch value={4}>
        <Switch.Case when={1}>One</Switch.Case>
        <Switch.Case when={2}>Two</Switch.Case>
        <Switch.Default>Not found</Switch.Default>
      </Switch>
    );
    expect(getByText('Not found')).toBeInTheDocument;
  });

  it('renders nothing when no matches are found and there is no SwitchDefault', () => {
    const { container } = render(
      <Switch value={4}>
        <Switch.Case when={1}>One</Switch.Case>
        <Switch.Case when={2}>Two</Switch.Case>
      </Switch>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders nested Switch components correctly', () => {
    const { getByText } = render(
      <Switch value={1}>
        <Switch.Case when={1}>
          <Switch value="foo">
            <Switch.Case when="foo">Nested foo</Switch.Case>
            <Switch.Default>Nested not found</Switch.Default>
          </Switch>
        </Switch.Case>
        <Switch.Case when={2}>Two</Switch.Case>
        <Switch.Default>Not found</Switch.Default>
      </Switch>
    );
    expect(getByText('Nested foo')).toBeInTheDocument;
  });
});
