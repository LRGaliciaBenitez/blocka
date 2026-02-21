import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../components/Search";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import searchCoinsReducer, { fetchSearchCoins, clearSearch } from "../redux/searchCoinsSlice";

jest.mock("../redux/searchCoinsSlice", () => ({
  ...jest.requireActual("../redux/searchCoinsSlice"),
  fetchSearchCoins: jest.fn((query) => ({ type: "fetchSearchCoins", payload: query })),
  clearSearch: jest.fn(() => ({ type: "clearSearch" })),
}));

const renderWithStore = () => {
  const store = configureStore({
    reducer: { searchCoins: searchCoinsReducer },
  });

  render(
    <Provider store={store}>
      <Search />
    </Provider>
  );

  return store;
};

describe("Search component", () => {
  test("se renderiza input y botón", () => {
    renderWithStore();

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("actualiza el valor del input", () => {
    renderWithStore();
    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, { target: { value: "bitcoin" } });
    expect(input.value).toBe("bitcoin");
  });

  test("dispatch fetchSearchCoins al hacer click con texto", () => {
    renderWithStore();
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "ethereum" } });
    fireEvent.click(button);

    expect(fetchSearchCoins).toHaveBeenCalledWith("ethereum");
  });

  test("dispatch fetchSearchCoins al presionar Enter con texto", () => {
    renderWithStore();
    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, { target: { value: "litecoin" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(fetchSearchCoins).toHaveBeenCalledWith("litecoin");
  });

  test("dispatch clearSearch si input está vacío", () => {
    renderWithStore();
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(button);

    expect(clearSearch).toHaveBeenCalled();
  });
});

