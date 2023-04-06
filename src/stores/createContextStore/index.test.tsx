import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import createContextStore from '.';

describe('useStore', () => {
  it('should update state when set method is called', () => {
    const TestComponent = () => {
      const { get, set } = useStore<{ count: number }>({ count: 0 });
      const incrementCount = () =>
        set({ count: get(state => state.count + 1) });
      return (
        <div>
          <span data-testid="count">{get(state => state.count)}</span>
          <button data-testid="increment-btn" onClick={incrementCount}>
            Increment
          </button>
        </div>
      );
    };
    render(
      <StoreProvider>
        <TestComponent />
      </StoreProvider>,
    );
    const count = screen.getByTestId('count');
    expect(count.textContent).toBe('0');
    const incrementBtn = screen.getByTestId('increment-btn');
    userEvent.click(incrementBtn);
    expect(count.textContent).toBe('1');
    userEvent.click(incrementBtn);
    expect(count.textContent).toBe('2');
  });

  it('should update only subscribed state when set method is called with a specific key', () => {
    const TestComponent = () => {
      const { get, set, subscribe } = useStore<{ count: number; name: string }>(
        { count: 0, name: '' },
      );
      const updateName = () => set({ name: 'John Doe' });
      const incrementCount = () =>
        set({ count: get(state => state.count + 1) });
      subscribe('name', state => console.log('name updated', state.name));
      subscribe('count', state => console.log('count updated', state.count));
      return (
        <div>
          <span data-testid="count">{get(state => state.count)}</span>
          <button data-testid="increment-btn" onClick={incrementCount}>
            Increment
          </button>
          <span data-testid="name">{get(state => state.name)}</span>
          <button data-testid="update-name-btn" onClick={updateName}>
            Update Name
          </button>
        </div>
      );
    };
    render(
      <StoreProvider>
        <TestComponent />
      </StoreProvider>,
    );
    const count = screen.getByTestId('count');
    expect(count.textContent).toBe('0');
    const incrementBtn = screen.getByTestId('increment-btn');
    userEvent.click(incrementBtn);
    expect(count.textContent).toBe('1');
    const name = screen.getByTestId('name');
    expect(name.textContent).toBe('');
    const updateNameBtn = screen.getByTestId('update-name-btn');
    userEvent.click(updateNameBtn);
    expect(name.textContent).toBe('John Doe');
  });
});
