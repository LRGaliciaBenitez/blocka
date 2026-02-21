import reducer, {
  nextPage,
  prevPage,
  resetPage,
  fetchAllCoins,
} from "./allCoinsSlice";

import axios from "axios";

jest.mock("axios");

describe("allCoinsSlice", () => {
  const initialState = {
    results: [],
    page: 1,
    loading: false,
    error: null,
  };

  test("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  // 🔹 Reducers
  test("nextPage should increment page", () => {
    const state = reducer(initialState, nextPage());
    expect(state.page).toBe(2);
  });

  test("prevPage should decrement page if page > 1", () => {
    const state = reducer({ ...initialState, page: 3 }, prevPage());
    expect(state.page).toBe(2);
  });

  test("prevPage should not go below 1", () => {
    const state = reducer(initialState, prevPage());
    expect(state.page).toBe(1);
  });

  test("resetPage should reset page to 1", () => {
    const state = reducer({ ...initialState, page: 5 }, resetPage());
    expect(state.page).toBe(1);
  });

  // 🔹 Async Thunk
  test("fetchAllCoins pending sets loading true", () => {
    const action = { type: fetchAllCoins.pending.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test("fetchAllCoins fulfilled sets results and loading false", () => {
    const mockData = [{ id: "bitcoin" }, { id: "ethereum" }];

    const action = {
      type: fetchAllCoins.fulfilled.type,
      payload: mockData,
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.results).toEqual(mockData);
  });

  test("fetchAllCoins rejected sets error and loading false", () => {
    const action = {
      type: fetchAllCoins.rejected.type,
      error: { message: "Network error" },
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe("Network error");
  });
});
