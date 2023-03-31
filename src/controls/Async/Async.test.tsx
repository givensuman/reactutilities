import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';

import Async from '.';

describe('Async', () => {
  it('should render the loading state initially', () => {
    const asyncFn = jest.fn();
    render(<Async asyncFn={asyncFn} loading={<div>Loading...</div>} success={() => null} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render the success state when the promise resolves', async () => {
    const asyncFn = jest.fn().mockResolvedValue('data');
    render(<Async asyncFn={asyncFn} loading={<div>Loading...</div>} success={(data) => <div>{data as any}</div>} />);
    await waitFor(() => expect(screen.getByText('data')).toBeInTheDocument());
  });

  it('should render the error state when the promise rejects', async () => {
    const error = new Error('error');
    const asyncFn = jest.fn().mockRejectedValue(error);
    render(<Async asyncFn={asyncFn} loading={<div>Loading...</div>} error={(error) => <div>Error: {error.message}</div>} success={() => null} />);
    await waitFor(() => expect(screen.getByText('Error: error')).toBeInTheDocument());
  });
});
