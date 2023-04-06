import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Async from '.';

describe('Async', () => {
  describe('when the promise is resolved', () => {
    const successText = 'Data Loaded Successfully';
    const asyncFn = async () => jest.fn().mockResolvedValue(successText);

    it('renders the success state', async () => {
      render(
        <Async
          await={asyncFn}
          loading={<div>Loading...</div>}
          success={() => <div>{successText}</div>}
        />,
      );
      await waitFor(
        () => expect(screen.getByText(successText)).toBeInTheDocument,
      );
    });

    it('calls the onSuccess callback function', async () => {
      const onSuccess = jest.fn();
      render(
        <Async
          await={asyncFn}
          loading={<div>Loading...</div>}
          success={data => <div>{data as any}</div>}
          onSuccess={onSuccess}
        />,
      );
      await waitFor(() => expect(onSuccess).toHaveBeenCalled);
    });
  });

  describe('when the promise is rejected', () => {
    const errorText = 'Error Loading Data';
    const error = new Error(errorText);
    const asyncFn = jest.fn().mockRejectedValue(error);

    it('renders the error state', async () => {
      render(
        <Async
          await={asyncFn}
          loading={<div>Loading...</div>}
          error={error => <div>{error.message}</div>}
          success={() => null}
        />,
      );
      await waitFor(
        () => expect(screen.getByText(errorText)).toBeInTheDocument,
      );
    });

    it('calls the onError callback function', async () => {
      const onError = jest.fn();
      render(
        <Async
          await={asyncFn}
          loading={<div>Loading...</div>}
          error={error => <div>{error.message}</div>}
          success={() => null}
          onError={onError}
        />,
      );
      await waitFor(() => expect(onError).toHaveBeenCalledWith(error));
    });
  });

  describe('when the loading prop is a function', () => {
    const asyncFn = jest.fn();

    it('renders the loading state', () => {
      render(
        <Async
          await={asyncFn}
          loading={() => <div>Loading...</div>}
          success={() => null}
        />,
      );
      expect(screen.getByText('Loading...')).toBeInTheDocument;
    });

    it('calls the onLoading callback function', async () => {
      const onLoading = jest.fn();
      render(
        <Async
          await={asyncFn}
          loading={() => <div>Loading...</div>}
          success={() => null}
          onLoading={onLoading}
        />,
      );
      expect(onLoading).toHaveBeenCalled();
    });
  });
});
