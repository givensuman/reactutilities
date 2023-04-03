import React from 'react';

interface RepeatProps {
  times: number;
  children: React.ReactNode;
}

const Repeat: React.FC<RepeatProps> = ({ times, children }) => {
  const childrenArray = React.Children.toArray(children);
  const repeatedChildren = [];

  for (let i = 0; i < times; i++) {
    const child = childrenArray[i % childrenArray.length]
    if (React.isValidElement(child)) {
      repeatedChildren.push(React.cloneElement(child, { key: i }));

    }
  }
  
  return <>{repeatedChildren}</>;
};

export default Repeat;
