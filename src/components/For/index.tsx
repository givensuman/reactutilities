import React from 'react';

interface ForProps<T> {
  each: T[];
  fallback?: React.ReactNode | null;
  children: (item: T, index: number) => JSX.Element;
}

/**
 * A component that renders children for each item in an array.
 *
 * @template T The type of each item in the array.
 * @param {T[]} props.each The array of items to render children for.
 * @param {JSX.Element} props.fallback The fallback element to render if the list is empty.
 * @param {(item: T, index: number) => JSX.Element} props.children A function that accepts each item in the array and its index and returns a JSX element to render.
 * @returns {JSX.Element} The rendered JSX element map.
 * 
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function For<T>({ each, fallback, children }: ForProps<T>): JSX.Element {
  const hasItems = each && each.length > 0

  if (!hasItems && fallback) {
    return <>{fallback}</>
  }

  return (
    <>
      {each.map((item, index) => children(item, index))}
    </>
  );
}

export default For;