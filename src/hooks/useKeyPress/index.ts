import { useEffect, useState } from 'react';

/**
 * A React hook that detects when a key is pressed and runs an optional callback.
 *
 * @param targetKey The key to detect. Can be a string or a number.
 * @param onKeyPress Optional callback that runs when `targetKey` is pressed.
 * @returns A boolean indicating whether the target key was pressed.
 *
 * For more information, go [here](https://github.com/givensuman/reactutilities).
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
