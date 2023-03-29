import React from 'react';

interface ForProps<T> {
  each: T[];
  children: (item: T, index: number) => JSX.Element;
}

/**
 * A component that renders children for each item in an array.
 *
 * @template T The type of each item in the array.
 * @param {T[]} props.each The array of items to render children for.
 * @param {(item: T, index: number) => JSX.Element} props.children A function that accepts each item in the array and its index and returns a JSX element to render.
 * @returns {JSX.Element} The rendered JSX element map.
 * 
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function For<T>({ each, children }: ForProps<T>): JSX.Element {
  return (
    <>
      {each.map((item, index) => children(item, index))}
    </>
  );
}

export default For;