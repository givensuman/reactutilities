# @reactutilities/components 🧰

Components for streamlining control flow and logic in your React component's JSX

## Installation

You can install the package via npm:

```bash
npm install @reactutilities/components
# or
yarn add @reactutilities/components
# or
pnpm i @reactutilities/components
```

## Components

This package ships with a number of useful components:

<details>
<summary>Async</summary>

```ts
/**
 * A component that allows you to handle asynchronous data loading in a declarative way.
 *
 * @template T The type of data returned by the `await` function.
 *
 * @param {Object} props The props for the `Async` component.
 * @param {() => Promise<T>} props.await A required function that returns a Promise. This function is called when the component mounts and is expected to resolve with the data that will be rendered by the `success` prop or reject with an error that will be passed to the `error` prop.
 * @param {React.ReactNode | ((args: unknown) => React.ReactNode)} [props.loading] An optional React node or function that will be rendered while the `await` function is executing.
 * @param {React.ReactNode | ((error: Error) => React.ReactNode)} [props.error] An optional React node or function that takes an `Error` object as its argument and returns a React node that will be rendered if the `await` function rejects with an error.
 * @param {React.ReactNode | ((data: T) => React.ReactNode)} props.success A required function that takes the data returned by the `await` function as its argument and returns a React node that will be rendered if the `await` function resolves successfully.
 * @param {() => void} [props.onLoading] An optional callback function that will be called when the `await` function is executed.
 * @param {(error: Error) => void} [props.onError] An optional callback function that takes an `Error` object as its argument and will be called if the `await` function rejects with an error.
 * @param {(data: T) => void} [props.onSuccess] An optional callback function that takes the data returned by the `await` function as its argument and will be called if the `await` function resolves successfully.
 *
 * @returns {React.ReactElement} The `Async` component.
 *
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
```

</details>
<details>
    <summary>Dynamic</summary>
</details>
<details>
    <summary>For</summary>
</details>
<details>
    <summary>Repeat</summary>
</details>
<details>
    <summary>Show</summary>
</details>
<details>
    <summary>Switch</summary>
</details>

## Acknowledgements

Many of these components were directly inspired by the "Control Flow" components built into the Solid.js library.
