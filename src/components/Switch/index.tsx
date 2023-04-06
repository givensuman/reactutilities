import React, { ReactNode } from 'react';

type SwitchProps<T> = {
  value: T;
  children: ReactNode;
};

type SwitchCaseProps<T = undefined> = {
  when: T;
  children?: ReactNode;
};

type SwitchDefaultProps = {
  children?: ReactNode;
};

/**
 * Renders the first child `Switch.Case` component whose `when` prop matches the `value` prop of the `Switch` component, or the first `Switch.Default` component if no `Switch.Case` components match.
 * 
 * @template T The type of the `value` prop for the `Switch` component.
 * 
 * @param {T} props.value The value to compare against the `when` prop of each child `Switch.Case` component.
 * @param {React.ReactNode} props.children - The child components to render.
 * 
 * @returns The matching `Switch.Case` or `Switch.Default` component, or `null` if no match is found.
 * 
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function Switch<T>({ value, children }: SwitchProps<T>): JSX.Element | null {
  let defaultChild: React.ReactElement<SwitchDefaultProps> | null = null;

  for (let i = 0; i < React.Children.count(children); i++) {
    if (children) {
      const child = (children as React.ReactElement<SwitchCaseProps | SwitchDefaultProps>[])[i];

      if (child.type === SwitchCase && (child as React.ReactElement<SwitchCaseProps>).props.when === value) {
        return child;
      } else if (child.type === SwitchDefault) {
        defaultChild = child;
      }
    }
  }

  return defaultChild;
}

/**
 * Conditionally renders children if `when` prop matches the `value` prop of a `Switch` parent component.
 * 
 * @template T The type of the `when` prop for the `SwitchCase` component.
 * 
 * @param {T} props.when The value to compare against the `value` prop of the parent `Switch` component.
 * @param {React.ReactNode} props.children The child components to render if the `when` prop matches.
 * 
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
export function SwitchCase<T>({ children }: SwitchCaseProps<T>): JSX.Element {
  return <>{children}</>;
}

/**
 * Fallback for a `Switch` parent component if no matching `Switch.Case` is found.
 * 
 * @param {React.ReactNode} props.children The child components to render if no `SwitchCase` components match.
 * 
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
export function SwitchDefault({ children }: SwitchDefaultProps) {
  return <>{children}</>;
}

Switch.Case = SwitchCase;
Switch.Default = SwitchDefault;

export default Switch;
