import css from './index';

describe('css function', () => {
  it('should return a serialized CSS string', () => {
    const style = css`
      color: blue;
      font-size: 16px;
      &:hover {
        color: red;
      }
    `;
    expect(style).toEqual('color:blue;font-size:16px;&:hover{color:red;}');
  });

  it('should handle interpolated values correctly', () => {
    const color = 'blue';
    const fontSize = '16px';
    const style = css`
      color: ${color};
      font-size: ${fontSize};
      &:hover {
        color: red;
      }
    `;
    expect(style).toEqual('color:blue;font-size:16px;&:hover{color:red;}');
  });

  it('should handle nested selectors correctly', () => {
    const style = css`
      color: blue;
      font-size: 16px;
      &:hover {
        color: red;
        & .nested {
          color: green;
        }
      }
    `;
    expect(style).toEqual(
      'color:blue;font-size:16px;&:hover{color:red;& .nested{color:green;}}',
    );
  });

  it('should handle multiple style blocks correctly', () => {
    const style1 = css`
      color: blue;
      font-size: 16px;
    `;
    const style2 = css`
      &:hover {
        color: red;
      }
    `;
    const serialized1 = 'color:blue;font-size:16px;';
    const serialized2 = '&:hover{color:red;}';
    expect(style1).toEqual(serialized1);
    expect(style2).toEqual(serialized2);
  });
});
