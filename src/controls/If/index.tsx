import React from 'react';

type IfProps = {
  condition: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

const If: React.FC<IfProps> = ({ condition, children, fallback }) => {
  return <>{condition ? children : fallback ?? null}</>;
};

export default If;
