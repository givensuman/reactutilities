import React, { useState, useEffect } from 'react';

interface AsyncProps<T> {
  asyncFn: () => Promise<T>;
  loading?: React.ReactNode;
  error?: (error: Error) => React.ReactNode;
  success: (data: T) => React.ReactNode;
}

interface AsyncState<T> {
  status: 'idle' | 'pending' | 'error' | 'success';
  data?: T;
  error?: Error;
}

function Async<T>({ asyncFn, loading, error, success }: AsyncProps<T>): React.ReactElement {
  const [asyncState, setAsyncState] = useState<AsyncState<T>>({
    status: 'idle',
  });

  useEffect(() => {
    setAsyncState({ status: 'pending' });
    asyncFn()
      .then((data) => setAsyncState({ status: 'success', data }))
      .catch((error) => setAsyncState({ status: 'error', error }));
  }, [asyncFn]);

  switch (asyncState.status) {
    case 'idle':
    case 'pending':
      return <>{loading}</>;
    case 'error':
      return <>{error ? error(asyncState.error!) : null}</>;
    case 'success':
      return <>{success(asyncState.data!)}</>;
  }
}

export default Async;
