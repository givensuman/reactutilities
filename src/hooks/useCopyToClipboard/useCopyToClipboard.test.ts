import { renderHook, act } from '@testing-library/react-hooks';
import useCopyToClipboard from '.';

describe('useCopyToClipboard', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  (global as any).navigator.clipboard = {
    writeText: jest.fn(Promise.resolve)
  }

  test('should set the isCopied state to true when the copy operation succeeds', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCopyToClipboard());
    const [, copyToClipboard] = result.current;

    copyToClipboard('test text');
    await waitForNextUpdate();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
    expect(result.current[0]).toBe(true);
  });

  test('should set the isCopied state to false when the copy operation fails', async () => {
    jest.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(undefined);

    const { result, waitForNextUpdate } = renderHook(() => useCopyToClipboard());
    const [, copyToClipboard] = result.current;

    copyToClipboard('test text');
    await waitForNextUpdate();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
    expect(result.current[0]).toBe(false);
  });
});