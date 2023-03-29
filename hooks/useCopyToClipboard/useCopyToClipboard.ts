import { renderHook } from '@testing-library/react-hooks';
import useClipboard from '.';

// Mock the clipboard API for testing purposes
(global as any).navigator.clipboard = {
  writeText: jest.fn(),
};

describe('useClipboard', () => {
  beforeEach(() => {
    // Reset the mock before each test
    (navigator.clipboard.writeText as jest.Mock).mockReset();
  });

  test('should return an array with two items', () => {
    const { result } = renderHook(() => useClipboard());

    expect(result.current).toHaveLength(2);
  });

  test('should call the clipboard API when the copyToClipboard function is called', () => {
    const { result } = renderHook(() => useClipboard());

    const [_, copyToClipboard] = result.current;
    copyToClipboard('Hello, world!');

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Hello, world!');
  });

  test('should set the isCopied state to true when the copy operation succeeds', async () => {
    const { result } = renderHook(() => useClipboard());

    const [isCopied, copyToClipboard] = result.current;
    expect(isCopied).toBe(false);

    await copyToClipboard('Hello, world!');
    expect(isCopied).toBe(true);
  });
});
