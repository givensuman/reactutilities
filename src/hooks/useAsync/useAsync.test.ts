import { renderHook, act } from '@testing-library/react-hooks';
import useAsync from '.';

describe('useAsync', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useAsync(async () => null));
    expect(result.current).toEqual({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
    });
  });

  it('should fetch data successfully', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAsync(async () => {
        return 'data';
      }),
    );

    await waitForNextUpdate();

    expect(result.current).toEqual({
      data: 'data',
      isLoading: false,
      isError: false,
      error: null,
    });
  });

  it('should handle errors', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAsync(async () => {
        throw new Error('Test Error');
      }),
    );

    await waitForNextUpdate();

    expect(result.current).toEqual({
      data: null,
      isLoading: false,
      isError: true,
      error: new Error('Test Error'),
    });
  });

  it('should re-fetch when dependencies change', async () => {
    const fetchFn = jest.fn();
    fetchFn.mockResolvedValue({ id: 2 });

    const { result, rerender, waitForNextUpdate } = renderHook(
      ({ id }) => useAsync(() => fetchFn(id), [id]),
      { initialProps: { id: 1 } }
    );

    expect(result.current).toEqual({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
    });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      data: { id: 2 },
      isLoading: false,
      isError: false,
      error: null,
    });

    act(() => {
      rerender({ id: 2 });
    });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      data: { id: 2 },
      isLoading: false,
      isError: false,
      error: null,
    });
  });
});
