import reducer, { fetchTopCoins } from "./topCoinsSlice";

describe("topCoinsSlice", () => {
  const initialState = {
    results: [],
    loading: false,
    error: null,
  };

  test("should return initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test("fetchTopCoins pending sets loading true", () => {
    const state = reducer(
      initialState,
      { type: fetchTopCoins.pending.type }
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test("fetchTopCoins fulfilled sets results and loading false", () => {
    const mockCoins = [{ id: "btc" }, { id: "eth" }];

    const state = reducer(
      initialState,
      {
        type: fetchTopCoins.fulfilled.type,
        payload: mockCoins,
      }
    );

    expect(state.loading).toBe(false);
    expect(state.results).toEqual(mockCoins);
  });

  test("fetchTopCoins rejected sets error from payload and loading false", () => {
    const state = reducer(
      initialState,
      {
        type: fetchTopCoins.rejected.type,
        payload: "Network error",
      }
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe("Network error");
  });
});
