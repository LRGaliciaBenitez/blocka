import reducer, {
  fetchSearchCoins,
  clearSearch,
} from "./searchCoinsSlice";

describe("searchCoinsSlice", () => {
  const initialState = {
    results: [],
    loading: false,
    error: null,
  };

  test("should return initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test("clearSearch should reset state", () => {
    const modifiedState = {
      results: [{ id: "btc" }],
      loading: true,
      error: "Error",
    };

    const state = reducer(modifiedState, clearSearch());

    expect(state).toEqual(initialState);
  });

  test("fetchSearchCoins pending sets loading true", () => {
    const state = reducer(
      initialState,
      { type: fetchSearchCoins.pending.type }
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test("fetchSearchCoins fulfilled sets results and loading false", () => {
    const mockPayload = {
      coins: [{ id: "bitcoin", name: "Bitcoin" }],
    };

    const state = reducer(
      initialState,
      {
        type: fetchSearchCoins.fulfilled.type,
        payload: mockPayload,
      }
    );

    expect(state.loading).toBe(false);
    expect(state.results).toEqual(mockPayload.coins);
  });

  test("fetchSearchCoins rejected sets error and loading false", () => {
    const state = reducer(
      initialState,
      {
        type: fetchSearchCoins.rejected.type,
        error: { message: "Search failed" },
      }
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe("Search failed");
  });
});
