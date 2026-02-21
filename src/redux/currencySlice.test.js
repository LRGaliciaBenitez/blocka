import reducer, { toggleCurrency } from "./currencySlice";

describe("currencySlice", () => {
  const initialState = {
    value: "usd",
  };

  test("should return initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test("should toggle currency from usd to mxn", () => {
    const state = reducer(initialState, toggleCurrency());
    expect(state.value).toBe("mxn");
  });

  test("should toggle currency from mxn back to usd", () => {
    const state = reducer({ value: "mxn" }, toggleCurrency());
    expect(state.value).toBe("usd");
  });
});
