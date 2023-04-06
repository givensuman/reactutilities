import createStore from '.';

describe('createStore', () => {
  it('returns the correct initial state', () => {
    const initialState = { count: 0 };
    const store = createStore(initialState);
    expect(store.get()).toEqual(initialState);
  });

  it('updates the state correctly', () => {
    const initialState = { count: 0 };
    const store = createStore(initialState);
    store.set({ count: 1 });
    expect(store.get()).toEqual({ count: 1 });
  });

  it('updates the state correctly with a function', () => {
    const initialState = { count: 0 };
    const store = createStore(initialState);
    store.set(prevState => ({ count: prevState.count + 1 }));
    expect(store.get()).toEqual({ count: 1 });
  });

  it('calls subscribers when the state is updated', () => {
    const initialState = { count: 0 };
    const store = createStore(initialState);
    const mockSubscriber = jest.fn();
    store.subscribe(null, mockSubscriber);
    store.set({ count: 1 });
    expect(mockSubscriber).toHaveBeenCalledWith({ count: 1 });
  });

  it('only calls subscribers with the correct key when provided', () => {
    const initialState = { count: 0, name: 'John' };
    const store = createStore(initialState);
    const mockCountSubscriber = jest.fn();
    const mockNameSubscriber = jest.fn();
    store.subscribe('count', mockCountSubscriber);
    store.subscribe('name', mockNameSubscriber);
    store.set({ count: 1, name: 'Jane' });
    expect(mockCountSubscriber).toHaveBeenCalledWith({
      count: 1,
      name: 'John',
    });
    expect(mockNameSubscriber).toHaveBeenCalledWith({ count: 1, name: 'Jane' });
  });

  it('allows unsubscribing from a subscriber', () => {
    const initialState = { count: 0 };
    const store = createStore(initialState);
    const mockSubscriber = jest.fn();
    const unsubscribe = store.subscribe(null, mockSubscriber);
    store.set({ count: 1 });
    expect(mockSubscriber).toHaveBeenCalledWith({ count: 1 });
    mockSubscriber.mockClear();
    unsubscribe();
    store.set({ count: 2 });
    expect(mockSubscriber).not.toHaveBeenCalled();
  });
});
