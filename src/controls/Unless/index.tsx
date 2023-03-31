import React from 'react';

type UnlessProps = {
  condition: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

const Unless: React.FC<UnlessProps> = ({ condition, children, fallback }) => {
  return <>{!condition ? children : fallback ?? null}</>;
};

export default Unless;