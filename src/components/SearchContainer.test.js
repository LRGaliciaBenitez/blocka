import React from "react";
import { render, screen } from "@testing-library/react";
import SearchContainer from "./SearchContainer";
import { useSelector } from "react-redux";
import { useUI } from "../hooks/useComponentsUI";

// Mock Redux
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));


jest.mock("../hooks/useComponentsUI", () => ({
  useUI: jest.fn(),
}));

// Mock SearchCard, Search y Spinner
jest.mock("./cards/searchCard/searchCard.jsx", () => ({ coin }) => (
  <div data-testid="search-card">{coin.symbol}</div>
));
jest.mock("./Search", () => () => <div>Search Mock</div>);
jest.mock("./Spinner.jsx", () => () => <div>Spinner Mock</div>);

describe("SearchContainer", () => {
  const toggleSearchMock = jest.fn();

  beforeEach(() => {
    useSelector.mockClear();
    useUI.mockClear();
  });

  test("muestra loading", () => {
    useUI.mockReturnValue({
      searchOpen: true,
      toggleSearch: toggleSearchMock,
    });

    useSelector.mockReturnValue({
      results: [],
      loading: true,
      error: null,
    });

    render(<SearchContainer />);
    expect(screen.getByText("Spinner Mock")).toBeInTheDocument();
  });

  test("muestra error", () => {
    useUI.mockReturnValue({
      searchOpen: true,
      toggleSearch: toggleSearchMock,
    });

    useSelector.mockReturnValue({
      results: [],
      loading: false,
      error: "Algo falló",
    });

    render(<SearchContainer />);
    expect(screen.getByText(/error al cargar datos/i)).toBeInTheDocument();
  });

  test("muestra resultados cuando hay datos", () => {
    useUI.mockReturnValue({
      searchOpen: true,
      toggleSearch: toggleSearchMock,
    });

    useSelector.mockReturnValue({
      results: [
        { id: "btc", symbol: "BTC" },
        { id: "eth", symbol: "ETH" },
      ],
      loading: false,
      error: null,
    });

    render(<SearchContainer />);

    expect(screen.getAllByTestId("search-card")).toHaveLength(2);
    expect(screen.getByText("BTC")).toBeInTheDocument();
    expect(screen.getByText("ETH")).toBeInTheDocument();
  });

  test("muestra mensaje cuando no hay resultados", () => {
    useUI.mockReturnValue({
      searchOpen: true,
      toggleSearch: toggleSearchMock,
    });

    useSelector.mockReturnValue({
      results: [],
      loading: false,
      error: null,
    });

    render(<SearchContainer />);
    expect(
      screen.getByText(/no se encontraron resultados/i)
    ).toBeInTheDocument();
  });
});
