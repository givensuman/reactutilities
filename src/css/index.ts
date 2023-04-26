import j2c from 'j2c';

type StyleObject = { [key: string]: string | number | StyleObject };
type Interpolation = string | number | StyleObject;

type TemplateStringsArrayArgs = TemplateStringsArray & {
  raw: string[];
};

export function css(
  strings: TemplateStringsArray | TemplateStringsArrayArgs,
  ...interpolations: Interpolation[]
): string {
  let result = '';

  // Convert the TemplateStringsArray into a plain string
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < interpolations.length) {
      result += interpolations[i];
    }
  }

  // Use j2c to convert the CSS string into a plain object
  const styleObject = j2c(result);

  // Convert the style object into a string of class names
  let classNames = '';
  for (const className in styleObject) {
    if (styleObject.hasOwnProperty(className)) {
      classNames += className + ' ';
    }
  }

  return classNames.trim();
}
