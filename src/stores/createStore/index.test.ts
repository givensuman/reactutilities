import { renderHook } from '@testing-library/react-hooks';
import createStore from '.';

describe('createStore', () => {
  it('should provide a `get` method to retrieve the current state', () => {
    const { result } = renderHook(() => createStore({ foo: 'bar' }));
    expect(result.current.get(state => state.foo)).toBe('bar');
  });

  it('should provide a `set` method to update the state', () => {
    const { result } = renderHook(() => createStore({ foo: 'bar' }));
    result.current.set({ foo: 'baz' });
    expect(result.current.get(state => state.foo)).toBe('baz');
  });

  it('should allow setting state using a function that returns a partial state object', () => {
    const { result } = renderHook(() => createStore({ foo: 'bar' }));
    result.current.set(prevState => ({ foo: prevState.foo + 'baz' }));
    expect(result.current.get(state => state.foo)).toBe('barbaz');
  });

  it('should provide a `subscribe` method to listen for changes to the state', () => {
    const { result } = renderHook(() => createStore({ foo: 'bar' }));
    const callback = jest.fn();
    const unsubscribe = result.current.subscribe('foo', callback);
    result.current.set({ foo: 'baz' });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({ foo: 'baz' });
    unsubscribe();
    result.current.set({ foo: 'qux' });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should allow subscribing to all state changes by passing a falsy key', () => {
    const { result } = renderHook(() => createStore({ foo: 'bar', baz: 'qux' }));
    const callback = jest.fn();
    const unsubscribe = result.current.subscribe(null, callback);
    result.current.set({ foo: 'baz' });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({ foo: 'baz', baz: 'qux' });
    result.current.set({ baz: 'quux' });
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith({ foo: 'baz', baz: 'quux' });
    unsubscribe();
    result.current.set({ foo: 'qux' });
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
