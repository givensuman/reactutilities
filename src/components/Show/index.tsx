import React from 'react';

interface ShowProps<T, K> {
  when: T | undefined | null | boolean;
  unless?: K | undefined | null | boolean;
  fallback?: React.ReactNode | null;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

/**
 * A component that conditionally renders its children or a fallback element.
 *
 * @template T The type of the conditional value for `when`.
 * @template K The type of the conditional value for `unless`.
 * @param {T | undefined | null | boolean} props.when The value to check against for truthiness.
 * @param {K | undefined | null | boolean} props.unless The value to check against for falsiness. Supercedes `when` condition if truthy.
 * @param {boolean} [props.keyed=false] Whether to wrap the children in a keyed fragment.
 * @param {React.ReactNode | null} [props.fallback=null] The fallback element to render if `when` is falsy.
 * @param {React.ReactNode | ((item: T) => React.ReactNode)} props.children The children to render if `when` is truthy.
 * @returns {() => React.ReactNode} A function that returns the rendered element.
 *
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function Show<T, K>({
  when,
  unless,
  fallback = null,
  children,
}: ShowProps<T, K>): JSX.Element {
  if (!when || unless) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return <></>;
  }

  if (typeof children === 'function') {
    const Child = children(when as T);
    return <>{Child}</>;
  }

  return <>{children}</>;
}

export default Show;
