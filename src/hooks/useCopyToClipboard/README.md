# useCopyToClipboard

`useCopyToClipboard` is a custom React hook that allows you to copy text or other data to the clipboard. It returns a tuple containing a boolean representing whether the copy operation was successful, and a function that can be called to copy text to the clipboard.

## Usage

```tsx
import { useCopyToClipboard } from '@reactutilities/hooks';

function MyComponent() {
  const [isCopied, copyToClipboard] = useCopyToClipboard();

  const handleCopyClick = () => {
    copyToClipboard('Hello, world!');
  };

  return (
    <>
      {isCopied ? <div>Copied to clipboard!</div> : null}
      <button onClick={handleCopyClick}>Copy to clipboard</button>
    </>
  );
}
```

## API

The `useCopyToClipboard` hook returns a tuple containing three items:

|Index|Type|Description|
|---|---|---|
|0|`boolean`|A boolean representing whether the copy operation was successful.|
|1|`(text: string) => void`|A function that can be called to copy text to the clipboard.|
