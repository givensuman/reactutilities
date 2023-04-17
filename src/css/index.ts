import { Interpolation, serializeStyles } from '@emotion/serialize';

/**
 * A template literal tag function for serializing CSS styles.
 *
 * @param {(TemplateStringsArray | Interpolation<unknown>)[]} args The template literal strings and interpolated values
 * 
 * @returns A serialized CSS string
 *
 * @example
 * ```
 * const color = 'blue';
 * const fontSize = '16px';
 * const style = css`
 *   color: ${color};
 *   font-size: ${fontSize};
 *   &:hover {
 *     color: red;
 *   }
 * `;
 * ```
 *
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function css(...args: (TemplateStringsArray | Interpolation<unknown>)[]) {
  return serializeStyles(args)
    .styles
    .replace(/\s/g, '');
}

export default css;
