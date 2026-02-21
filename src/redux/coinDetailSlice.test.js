import reducer, { fetchCoinDetail } from "./coinDetailSlice";
import axios from "axios";

jest.mock("axios");

describe("coinDetailSlice", () => {
  const initialState = {
    results: null,
    loading: false,
    error: null,
  };

  test("should return initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test("fetchCoinDetail pending sets loading true", () => {
    const action = { type: fetchCoinDetail.pending.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test("fetchCoinDetail fulfilled sets results and loading false", () => {
    const mockCoin = { id: "bitcoin", name: "Bitcoin" };

    const action = {
      type: fetchCoinDetail.fulfilled.type,
      payload: mockCoin,
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.results).toEqual(mockCoin);
  });

  test("fetchCoinDetail rejected sets error and loading false", () => {
    const action = {
      type: fetchCoinDetail.rejected.type,
      error: { message: "Request failed" },
    };

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe("Request failed");
  });
});
