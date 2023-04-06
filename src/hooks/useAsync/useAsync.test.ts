import { renderHook } from '@testing-library/react-hooks';
import useAsync from '.';

describe('useAsync', () => {
  test('should return the correct initial state', () => {
    const asyncFunction = jest.fn();
    const { result } = renderHook(() => useAsync(asyncFunction));

    expect(result.current.data).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('should set isLoading to true when asyncFunction is executing', async () => {
    const asyncFunction = jest.fn(
      () => new Promise(resolve => setTimeout(resolve, 100)),
    );
    const { result, waitForNextUpdate } = renderHook(() =>
      useAsync(asyncFunction),
    );

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
  });

  test('should set data when asyncFunction resolves', async () => {
    const fakeData = { id: 1, title: 'Fake Data' };
    const asyncFunction = jest.fn(() => Promise.resolve(fakeData));
    const { result, waitForNextUpdate } = renderHook(() =>
      useAsync(asyncFunction),
    );

    await waitForNextUpdate();

    expect(result.current.data).toBe(fakeData);
  });

  test('should set isError to true when asyncFunction rejects', async () => {
    const fakeError = new Error('Fake Error');
    const asyncFunction = jest.fn(() => Promise.reject(fakeError));
    const { result, waitForNextUpdate } = renderHook(() =>
      useAsync(asyncFunction),
    );

    await waitForNextUpdate();

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe(fakeError);
  });
});
