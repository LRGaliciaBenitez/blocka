import reducer, { toggleFavorite } from "./favoritesSlice";

describe("favoritesSlice", () => {
  const mockCoin = { id: "bitcoin", name: "Bitcoin" };

  beforeEach(() => {
    // Mock limpio de localStorage antes de cada test
    Storage.prototype.getItem = jest.fn(() => null);
    Storage.prototype.setItem = jest.fn();
  });

  test("should return initial state with empty favorites", () => {
    const state = reducer(undefined, { type: undefined });
    expect(state.coins).toEqual([]);
  });

  test("should add coin to favorites if it does not exist", () => {
    const state = reducer(
      { coins: [] },
      toggleFavorite(mockCoin)
    );

    expect(state.coins).toHaveLength(1);
    expect(state.coins[0]).toEqual(mockCoin);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test("should remove coin from favorites if it already exists", () => {
    const state = reducer(
      { coins: [mockCoin] },
      toggleFavorite(mockCoin)
    );

    expect(state.coins).toHaveLength(0);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
