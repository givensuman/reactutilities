import React from 'react';

interface RepeatProps {
  times: number;
  children: React.ReactNode;
}

/**
 * Renders the provided children a specified number of times.
 * 
 * @param {number} props.times The number of times to repeat the children.
 * @param {React.ReactNode} props.children The children to repeat.
 * 
 * @returns A JSX element containing the repeated children.
 * 
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
const Repeat: React.FC<RepeatProps> = ({ times, children }): JSX.Element => {
  const childrenArray = React.Children.toArray(children);
  const repeatedChildren: React.ReactNode[] = [];

  if (childrenArray.length === 0) {
    return <></>;
  }

  for (let i = 0; i < times; i++) {
    childrenArray.forEach((child, j) => {
      if (React.isValidElement(child)) {
        repeatedChildren.push(
          React.cloneElement(child, { key: i.toString() + j.toString() }),
        );
      } else if (typeof child === 'string' || typeof child === 'number') {
        repeatedChildren.push(child.toString());
      }
    });
  }

  return <>{repeatedChildren}</>;
};

export default Repeat;
