import React from 'react';

interface RepeatProps {
  times: number;
  children: React.ReactNode;
}

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
