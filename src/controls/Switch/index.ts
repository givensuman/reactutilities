import React from 'react';

type MatchProps<T> = {
  when: T | undefined | null | false;
  children: JSX.Element | ((item: T) => JSX.Element);
};

function Match<T>({ when, children }: MatchProps<T>): JSX.Element | null {
  if (!when) return null;

  if (typeof children === 'function') {
    return children(when as T);
  }

  return children;
}

function Switch(props: { fallback?: JSX.Element; children: React.ReactNode }): JSX.Element | null {
  const { fallback, children } = props;

  const matches = React.Children.toArray(children).filter((child) => React.isValidElement(child));

  const match = matches.find((child) => {
    const { when } = (child as React.ReactElement)?.props as MatchProps<any>;
    return !!when;
  });

  if (!match) {
    return fallback ? fallback : null;
  }

  const { children: matchChildren } = (match as React.ReactElement)?.props as MatchProps<any>;
  if (matchChildren) {
    if (typeof matchChildren === 'function') {
      matchChildren((match as React.ReactElement)?.props.when)
    } else return children as React.ReactElement
  }

  return null
}

const Control = {
    Switch, Match
}

export { Control as default, Switch, Match };
