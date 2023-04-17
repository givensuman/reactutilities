import { useEffect, useState } from 'react';

/**
 * Detects when a key is pressed and runs an optional callback.
 *
 * @param {string | number} targetKey The key to detect. Can be a string or a number.
 * @param {(event?: KeyboardEvent) => void} onKeyPress Optional callback that runs when `targetKey` is pressed.
 * 
 * @returns {boolean} A boolean indicating whether the target key was pressed.
 *
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
const useKeyPress = (
  targetKey: string | number,
  onKeyPress?: (event?: KeyboardEvent) => void,
): boolean => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const keyString = String(targetKey);

    const downHandler = (event: KeyboardEvent) => {
      if (event.key === keyString) {
        setKeyPressed(true);
      }
    };

    const upHandler = (event: KeyboardEvent) => {
      if (event.key === keyString) {
        setKeyPressed(false);
      }
    };

    const pressHandler = (event: KeyboardEvent) => {
      if (event.key === keyString) {
        if (onKeyPress) onKeyPress(event);
      }
    };

    document.addEventListener('keydown', downHandler);
    document.addEventListener('keyup', upHandler);
    document.addEventListener('keypress', pressHandler);

    return () => {
      document.removeEventListener('keydown', downHandler);
      document.removeEventListener('keyup', upHandler);
      document.removeEventListener('keypress', pressHandler);
    };
  }, [targetKey]);

  return keyPressed;
};

export default useKeyPress;
