import css from '.';

describe('css function', () => {
  it('should convert a simple CSS string to a React style object', () => {
    const cssString = 'color: blue; background-color: #ffffff; font-size: 16px; padding: 20px;';
    const expectedStyleObject = {
      color: 'blue',
      backgroundColor: '#ffffff',
      fontSize: 16,
      padding: 20,
    };
    const styleObject = css(cssString);
    expect(styleObject).toEqual(expectedStyleObject);
  });

  it('should convert a CSS string with class names to a React style object', () => {
    const cssString = '.btn { color: blue; background-color: #ffffff; } .btn:hover { color: red; }';
    const expectedStyleObject = {
      btn: {
        color: 'blue',
        backgroundColor: '#ffffff',
      },
      'btn:hover': {
        color: 'red',
      },
    };
    const styleObject = css(cssString);
    expect(styleObject).toEqual(expectedStyleObject);
  });

  it('should convert a CSS string with pseudoselectors to a React style object', () => {
    const cssString = '.btn { color: blue; } .btn:hover { color: red; }';
    const expectedStyleObject = {
      btn: {
        color: 'blue',
      },
      'btn:hover': {
        color: 'red',
      },
    };
    const styleObject = css(cssString);
    expect(styleObject).toEqual(expectedStyleObject);
  });

  it('should handle numeric values correctly', () => {
    const cssString = 'width: 50%; height: 100px;';
    const expectedStyleObject = {
      width: '50%',
      height: 100,
    };
    const styleObject = css(cssString);
    expect(styleObject).toEqual(expectedStyleObject);
  });

  it('should handle vendor-prefixed properties correctly', () => {
    const cssString = '-webkit-border-radius: 5px; border-radius: 5px;';
    const expectedStyleObject = {
      WebkitBorderRadius: '5px',
      borderRadius: '5px',
    };
    const styleObject = css(cssString);
    expect(styleObject).toEqual(expectedStyleObject);
  });
});
