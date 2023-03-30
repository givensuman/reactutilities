# css

```ts
import css from '@reactutilities/css';

const cssString = `
    background-color: #008CBA;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0077B5;
    }
`;

const styleObject = css(cssString);
console.log(styleObject);
```