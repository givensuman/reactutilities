# classnames

A lightweight utility function to easily generate class names from a set of conditions, including support for nested arrays and objects.

## Installation

```bash
npm install @reactutilities/classnames
# or
yarn add @reactutilities/classnames
# or
pnpm add @reactutilities/classnames
```

# Usage

```ts
import cx from '@reactutilities/classnames';

const isActive = true;
const isDisabled = false;

const classNames = cx('button', {
  'button-active': isActive,
  'button-disabled': isDisabled,
  'button-large': { desktop: true, mobile: false },
  'button-red': ['danger', { shadow: true }],
});

console.log(classNames);
// Output: "button button-active button-large-desktop button-red-danger button-red-shadow"
```

## API

This package provides a single default export that accepts any number of arguments. The arguments can be any combination of the following types:

- `string`: A string representing a class name to be included.
- `number`: A number representing a class name to be included.
- `boolean`: A boolean condition that determines whether or not a class name should be included.
- `null`: A null value that will be ignored.
- `undefined`: An undefined value that will be ignored.
- `array`: An array of strings, objects, and/or arrays, which will be flattened and merged with the final set class names.
- `object`: An object where each key represents a class name, and each value is a boolean condition that determines whether or not to include the class name.
- `iterable`: Any iterable object (e.g. Set, Map, etc.) containing values that match any of the above types.

### Nested Arrays/Objects

It also supports nested arrays and objects to provide more flexibility in generating class names. Here's an example of how to use this kind of advanced class structuring:

```ts
import cx from '@reactutilities/classnames';

const classNames = cx('button', {
  'button-active': true,
  'button-large': ['desktop', { tablet: false, mobile: true }],
  'button-red': ['danger', { shadow: true, solid: [{ solid: true }, 'alert'] }],
});

console.log(classNames);
// Output: "button button-active button-large-desktop button-large-mobile button-red-danger button-red-shadow button-red-solid-solid button-red-solid-alert"
```

While this package is not restricted to use in React applications (it has zero dependencies), one of the primary uses of this API is to simplify the `className` prop of JSX elements when complex or dynamic class states are needed.

## Performance

This package compared almost identically to the `classnames` package in benchmarking (used locally on an i7-6500U).

| Package                      | Ops (s⁻¹) | Error (%) |
| ---------------------------- | --------- | --------- |
| `classnames`                 | 5,404,020 | ±0.97     |
| `@reactutilities/classnames` | 5,104,723 | ±1.12     |

## Acknowledgements

This design was lifted from previous work by libraries like `classnames` and `clsx`.

## License

[MIT](https://choosealicense.com/licenses/mit/)
