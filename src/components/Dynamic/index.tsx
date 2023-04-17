import React, { ComponentType, ElementType } from 'react';

type DynamicProps<T = {}> = {
  component?: ComponentType<T> | ElementType | keyof JSX.IntrinsicElements;
} & T;

/**
 * Allows you to dynamically render any React component
 * or HTML element and pass props through to it.
 *
 * @template T - The props type for the component.
 * 
 * @param {React.ComponentType<T>|React.ElementType|keyof JSX.IntrinsicElements} props.component The component or HTML element to render.
 * 
 * @returns {JSX.Element} The rendered component or HTML element.
 *
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function Dynamic<T = {}>({
  component: Component = React.Fragment,
  ...props
}: DynamicProps<T>) {
  return <Component {...props} />;
}

export default Dynamic;
