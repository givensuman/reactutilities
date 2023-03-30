import * as CSS from 'csstype';
import * as _css from 'css';

function css(cssString: string): CSS.Properties<string | number> {
  const parsedCss = _css.parse(cssString);
  if (!parsedCss.stylesheet) {
    throw new Error('Could not parse CSS');
  }
  
  const styleObject: CSS.Properties<string | number> = {};

  parsedCss.stylesheet.rules
    .filter((rule) => rule.type === 'rule') // Only keep rules of type css.Rule
    .forEach((rule: _css.Rule) => {
      rule.selectors?.forEach((selector) => {
        const classNames = selector.split('.').slice(1);
        classNames.forEach((className) => {
          const declarations = rule.declarations?.filter((declaration) => declaration.type === 'declaration');

          declarations?.forEach((declaration: _css.Declaration) => {
            styleObject[className] = {
              ...styleObject[className],
              [declaration!.property as any]: isNaN(Number(declaration.value)) ? declaration.value : Number(declaration.value),
            };
          });
        });
      });
    });

  return styleObject;
}

export default css;
