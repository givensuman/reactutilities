import { renderHook, act } from "@testing-library/react-hooks";
import { useMultiStateToggle } from ".";

describe("useMultiStateToggle", () => {
  it("should return initial state object", () => {
    const initialState = { tab1: true, tab2: false };
    const { result } = renderHook(() => useMultiStateToggle(initialState));

    expect(result.current.states).toEqual(initialState);
  });

  it("should toggle state of a key", () => {
    const initialState = { tab1: true, tab2: false };
    const { result } = renderHook(() => useMultiStateToggle(initialState));

    act(() => {
      result.current.toggleState("tab2");
    });

    expect(result.current.states).toEqual({ tab1: true, tab2: true });
  });
});
