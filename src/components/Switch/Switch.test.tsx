import React from 'react';
import { render } from '@testing-library/react';
import Switch from '.';

describe('Switch component', () => {
  it('should render the default case if no case matches', () => {
    const { container } = render(
      <Switch value="unknown">
        <Switch.Case when="one">
          <div>One case</div>
        </Switch.Case>
        <Switch.Case when="two">
          <div>Two case</div>
        </Switch.Case>
        <Switch.Default>
          <div>Default case</div>
        </Switch.Default>
      </Switch>,
    );
    expect(container.innerHTML).toMatch('Default case');
  });

  it('should render the matching case', () => {
    const { container } = render(
      <Switch value="two">
        <Switch.Case when="one">
          <div>One case</div>
        </Switch.Case>
        <Switch.Case when="two">
          <div>Two case</div>
        </Switch.Case>
        <Switch.Default>
          <div>Default case</div>
        </Switch.Default>
      </Switch>,
    );
    expect(container.innerHTML).toMatch('Two case');
  });

  it('should render nothing when there is no default case and no matching case', () => {
    const { container } = render(
      <Switch value="unknown">
        <Switch.Case when="one">
          <div>One case</div>
        </Switch.Case>
        <Switch.Case when="two">
          <div>Two case</div>
        </Switch.Case>
      </Switch>,
    );
    expect(container.innerHTML).toBe('');
  });
});
