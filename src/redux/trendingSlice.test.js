import reducer, { fetchTrending } from "./trendingSlice";

describe("trendingSlice", () => {
  const initialState = {
    results: [],
    loading: false,
    error: null,
  };

  test("should return initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test("fetchTrending pending sets loading true", () => {
    const state = reducer(
      initialState,
      { type: fetchTrending.pending.type }
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test("fetchTrending fulfilled sets results and loading false", () => {
    const mockTrending = [{ item: { id: "bitcoin" } }];

    const state = reducer(
      initialState,
      {
        type: fetchTrending.fulfilled.type,
        payload: mockTrending,
      }
    );

    expect(state.loading).toBe(false);
    expect(state.results).toEqual(mockTrending);
  });

  test("fetchTrending rejected sets error and loading false", () => {
    const state = reducer(
      initialState,
      {
        type: fetchTrending.rejected.type,
        error: { message: "Failed to fetch trending" },
      }
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe("Failed to fetch trending");
  });
});
