import React, { ReactNode } from 'react';

type CaseProps = {
  children: ReactNode;
  when: any;
};

type DefaultProps = {
  children: ReactNode;
};

type SwitchProps = {
  value: any;
  children: ReactNode;
};

function Switch(props: SwitchProps): JSX.Element {
  const { value, children } = props;

  let defaultCase: ReactNode | null = null;

  const childrenArray = React.Children.toArray(children);

  const cases = childrenArray.filter(
    child => React.isValidElement<CaseProps>(child) && child.type === 'Case',
  ) as React.ReactElement<CaseProps>[];

  for (let i = 0; i < cases.length; i++) {
    const child = cases[i];
    if (child.props.when === value) {
      return <>{child.props.children}</>;
    }
  }

  const defaultCases = childrenArray.filter(
    child =>
      React.isValidElement<DefaultProps>(child) && child.type === 'Default',
  ) as React.ReactElement<DefaultProps>[];

  if (defaultCases.length > 0) {
    defaultCase = defaultCases[0].props.children;
  }

  return <>{defaultCase}</>;
}

function Case(props: CaseProps): JSX.Element {
  return <>{props.children}</>;
}

function Default(props: DefaultProps): JSX.Element {
  return <>{props.children}</>;
}

Switch.Case = Case;
Switch.Default = Default;

export default Switch;
