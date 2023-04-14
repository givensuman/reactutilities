import { useState } from 'react';

/**
 * Allows you to copy text or other data to the clipboard.
 * @returns A tuple containing a boolean representing whether the copy operation was successful,
 * and a function that can be called to copy text to the clipboard.
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function useCopyToClipboard(): [boolean, (text: string) => void] {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => setIsCopied(true));
  };

  return [isCopied, copyToClipboard];
}

export default useCopyToClipboard;
