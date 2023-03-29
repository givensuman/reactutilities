import React from 'react';

interface ShowProps<T> {
  when: T | undefined | null | false;
  keyed?: boolean;
  fallback?: React.ReactNode | null;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

/**
 * A component that conditionally renders its children or a fallback element.
 *
 * @template T The type of the conditional value.
 * @param {T | undefined | null | false} props.when The value to check against for truthiness.
 * @param {boolean} [props.keyed=false] Whether to wrap the children in a keyed fragment.
 * @param {React.ReactNode | null} [props.fallback=null] The fallback element to render if `when` is falsy.
 * @param {React.ReactNode | ((item: T) => React.ReactNode)} props.children The children to render if `when` is truthy.
 * @returns {() => React.ReactNode} A function that returns the rendered element.
 * 
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function Show<T>({ when, keyed, fallback = null, children }: ShowProps<T>): () => JSX.Element {
  if (!when) {
    if (fallback) return () => <>{fallback}</>
  }

  if (typeof children === 'function') {
    const Child = children(when as T);
    if (keyed) {
      return () => <React.Fragment key={(when as T)?.toString()}>{Child}</React.Fragment>;
    }
    return () => <>{Child}</>;
  }

  if (keyed) {
    return () => <React.Fragment key={(when as T)?.toString()}>{children as React.ReactNode}</React.Fragment>;
  }
  return () => <>{children}</>;
}

export default Show;
