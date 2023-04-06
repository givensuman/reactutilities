import React, { useState, useEffect } from 'react';

interface AsyncProps<T> {
  await: () => Promise<T>;
  loading?: React.ReactNode | (() => React.ReactNode);
  error?: React.ReactNode | ((error: Error) => React.ReactNode);
  success: React.ReactNode | ((data: T) => React.ReactNode);
  onLoading?: () => void;
  onError?: (error: Error) => void;
  onSuccess?: (data: T) => void;
}

interface AsyncState<T> {
  status: 'idle' | 'pending' | 'error' | 'success';
  data?: T;
  error?: Error;
}

/**
 * Allows you to handle asynchronous data loading in a declarative way.
 *
 * @template T The type of data returned by the `await` function.
 *
 * @param {Object} props The props for the `Async` component.
 * @param {() => Promise<T>} props.await A required function that returns a Promise. This function is called when the component mounts and is expected to resolve with the data that will be rendered by the `success` prop or reject with an error that will be passed to the `error` prop.
 * @param {React.ReactNode | ((args: unknown) => React.ReactNode)} [props.loading] An optional React node or function that will be rendered while the `await` function is executing.
 * @param {React.ReactNode | ((error: Error) => React.ReactNode)} [props.error] An optional React node or function that takes an `Error` object as its argument and returns a React node that will be rendered if the `await` function rejects with an error.
 * @param {React.ReactNode | ((data: T) => React.ReactNode)} props.success A required function that takes the data returned by the `await` function as its argument and returns a React node that will be rendered if the `await` function resolves successfully.
 * @param {() => void} [props.onLoading] An optional callback function that will be called when the `await` function is executed.
 * @param {(error: Error) => void} [props.onError] An optional callback function that takes an `Error` object as its argument and will be called if the `await` function rejects with an error.
 * @param {(data: T) => void} [props.onSuccess] An optional callback function that takes the data returned by the `await` function as its argument and will be called if the `await` function resolves successfully.
 *
 * @returns {React.ReactElement} The `Async` component.
 *
 * @see {@link https://github.com/givensuman/reactutilities} for more information.
 */
function Async<T>({
  await: asyncFn,
  loading,
  error,
  success,
  onLoading,
  onError,
  onSuccess,
}: AsyncProps<T>): JSX.Element {
  const [asyncState, setAsyncState] = useState<AsyncState<T>>({
    status: 'idle',
  });

  const handleAsync = async () => {
    setAsyncState({ status: 'pending' });
    onLoading?.();
    await asyncFn()
      ?.then(data => {
        onSuccess?.(data);
        setAsyncState({ status: 'success', data });
      })
      .catch(error => {
        onError?.(error);
        setAsyncState({ status: 'error', error });
      });
  };

  useEffect(() => {
    handleAsync();
  }, [asyncFn, onLoading, onSuccess, onError]);

  switch (asyncState.status) {
    case 'idle':
    case 'pending':
      return typeof loading === 'function' ? <>{loading()}</> : <>{loading}</>;
    case 'error':
      return typeof error === 'function' ? (
        <>{error(asyncState.error!)}</>
      ) : (
        <>{error}</>
      );
    case 'success':
      return typeof success === 'function' ? (
        <>{success(asyncState.data!)}</>
      ) : (
        <>{success}</>
      );
  }
}

export default Async;
