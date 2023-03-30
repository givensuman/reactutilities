type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | { [key: string]: any }
  | Iterable<ClassValue>


/**
 * Returns a string of space-separated class names generated from the given arguments. Supports nested arrays and objects.
 *
 * @param {...ClassValue} args The values to generate class names from. Can be strings, arrays of strings, or objects with boolean values.
 * @returns {string} A string of space-separated class names.
 * 
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
export function classnames(...args: ClassValue[]): string {
    let classes: string[] = [];
  
    for (const arg of args) {
      if (!arg) {
        continue;
      }
  
      if (typeof arg === "string" || typeof arg === "number" || typeof arg === "boolean") {
        classes.push(arg.toString());
      } else if (Array.isArray(arg)) {
        const nested = classnames(...arg);
        if (nested) {
          classes.push(nested);
        }
      } else if (isIterable(arg)) {
        for (const nested of arg) {
          const next = classnames(nested);
          if (next) {
            classes.push(next);
          }
        }
      } else {
        for (const key in arg) {
          if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
  
    return classes.join(" ");
}
  
function isIterable(obj: any): obj is Iterable<ClassValue> {
    return obj && typeof obj[Symbol.iterator] === "function";
}

export default classnames;

