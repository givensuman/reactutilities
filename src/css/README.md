# @reactutilities/css 🌈

A template literal tag function for serializing CSS styles. Uses the `serializeStyles` function from `@emotion/serialize`.

## Usage

To use the css function, first install the package:

```bash
npm install @reactutilities/css
# or
yarn add @reactutilities/css
# or
pnpm add @reactutilities/css
```

Then import it into your code:

```typescript
import css from '@reactutilities/css';

const color = 'blue';
const fontSize = '16px';
const style = css`
  color: ${color};
  font-size: ${fontSize};
  &:hover {
    color: red;
  }
`;
console.log(style); // "color:blue;font-size:16px;&:hover{color:red;}"
```

You can use the serialized CSS string as a React style prop or in any other context where you need a CSS string.

## Acknowledgments

This package is based on the serializeStyles function from the Emotion library. Emotion is a powerful CSS-in-JS library with many advanced features and integrations. If you need more advanced styling capabilities, you should check out Emotion.

## License

[MIT](https://choosealicense.com/licenses/mit/)
