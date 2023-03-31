import React from 'react';
import { render } from '@testing-library/react';
import Switch from '.';

describe('Switch', () => {
  it('should render the correct case', () => {
    const { getByText } = render(
      <Switch value="green">
        <Switch.Case when="red">
          <div>Red</div>
        </Switch.Case>
        <Switch.Case when="green">
          <div>Green</div>
        </Switch.Case>
        <Switch.Case when="blue">
          <div>Blue</div>
        </Switch.Case>
        <Switch.Default>
          <div>Default</div>
        </Switch.Default>
      </Switch>
    );
    expect(getByText('Green')).toBeInTheDocument();
  });

  it('should render the default case when no case matches', () => {
    const { getByText } = render(
      <Switch value="orange">
        <Switch.Case when="red">
          <div>Red</div>
        </Switch.Case>
        <Switch.Case when="green">
          <div>Green</div>
        </Switch.Case>
        <Switch.Case when="blue">
          <div>Blue</div>
        </Switch.Case>
        <Switch.Default>
          <div>Default</div>
        </Switch.Default>
      </Switch>
    );
    expect(getByText('Default')).toBeInTheDocument();
  });
});
