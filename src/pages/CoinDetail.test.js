// src/pages/CoinDetail.test.js
import React from "react";
import { screen } from "@testing-library/react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CoinDetail from "./CoinDetail";
import coinDetailReducer, { fetchCoinDetail } from "../redux/coinDetailSlice";

// ---- Mocks de componentes que no nos interesan ----
jest.mock("../components/Spinner.jsx", () => () => <div data-testid="spinner">Spinner Mock</div>);
jest.mock("../components/Header.jsx", () => () => <div>Header Mock</div>);
jest.mock("../components/MobileMenu.jsx", () => () => <div>MobileMenu Mock</div>);
jest.mock("../components/SearchContainer.jsx", () => () => <div>SearchContainer Mock</div>);
jest.mock("../components/FavoriteButton.jsx", () => ({ coin }) => <div>FavoriteButton Mock</div>);

// ---- Mock del thunk ----
jest.mock("../redux/coinDetailSlice", () => {
  const original = jest.requireActual("../redux/coinDetailSlice");
  return {
    __esModule: true,
    ...original,
    fetchCoinDetail: jest.fn(() => ({ type: "coinDetail/fetchCoinDetail/mock" })),
  };
});

// ---- Función render personalizada ----
function render(ui, { preloadedState, store = configureStore({ reducer: { coinDetail: coinDetailReducer, currency: (state = { value: "usd" }) => state }, preloadedState }), route = "/coin/bitcoin" } = {}) {
  window.history.pushState({}, "Test page", route);
  return rtlRender(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/coin/:id" element={ui} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

// ---- Tests ----
describe("CoinDetail component", () => {
  beforeEach(() => {
    fetchCoinDetail.mockClear();
  });

  test("dispatches fetchCoinDetail on mount", () => {
    render(<CoinDetail />);
    expect(fetchCoinDetail).toHaveBeenCalledWith("bitcoin");
  });

  test("shows spinner when loading", () => {
    const preloadedState = { coinDetail: { results: null, loading: true, error: null }, currency: { value: "usd" } };
    render(<CoinDetail />, { preloadedState });
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("shows error message when error exists", () => {
    const preloadedState = { coinDetail: { results: null, loading: false, error: "Failed to fetch" }, currency: { value: "usd" } };
    render(<CoinDetail />, { preloadedState });
    expect(screen.getByText("Error al cargar datos")).toBeInTheDocument();
  });

  test("renders coin information when data is loaded", () => {
    const coinData = {
    name: "Bitcoin",
    symbol: "BTC",
    market_cap_rank: 1,
    image: { large: "bitcoin.png" },
    market_data: {
        current_price: { usd: 30000 },
        price_change_percentage_24h: 2.5,
        market_cap: { usd: 600000000 },
        total_volume: { usd: 35000000 },
        circulating_supply: 19000000,
        max_supply: 21000000,
    },
    description: { en: "Bitcoin description..." },
    links: {
        homepage: ["https://bitcoin.org"],
        blockchain_site: ["https://blockchain.info"],
        repos_url: { github: ["https://github.com/bitcoin"] },
    },
    };


    const preloadedState = { coinDetail: { results: coinData, loading: false, error: null }, currency: { value: "usd" } };
    render(<CoinDetail />, { preloadedState });

    // Verifica elementos renderizados
    const coinName = screen.getAllByText(/Bitcoin/i)[0]; // Solo tomamos el primero (h1)
    expect(coinName).toBeInTheDocument();

    expect(screen.getByText(/BTC/i)).toBeInTheDocument();
    expect(screen.getByText(/\$30,000/i)).toBeInTheDocument();
    expect(screen.getByText(/2.50/i)).toBeInTheDocument();
    expect(screen.getByText(/Rank #1/i)).toBeInTheDocument();
    expect(screen.getByText(/Market Cap/i)).toBeInTheDocument();
    expect(screen.getByText(/\$600,000,000/i)).toBeInTheDocument();
    expect(screen.getByText(/Volume 24h/i)).toBeInTheDocument();
    expect(screen.getByText(/\$35,000,000/i)).toBeInTheDocument();
    expect(screen.getByText(/Circulating Supply/i)).toBeInTheDocument();
    expect(screen.getByText(/19,000,000/i)).toBeInTheDocument();
    expect(screen.getByText(/Max Supply/i)).toBeInTheDocument();
    expect(screen.getByText(/21,000,000/i)).toBeInTheDocument();
    expect(screen.getByText(/Bitcoin description/i)).toBeInTheDocument();
    expect(screen.getByText(/Website/i)).toBeInTheDocument();
    expect(screen.getByText(/Explorer/i)).toBeInTheDocument();
    expect(screen.getByText(/GitHub/i)).toBeInTheDocument();
  });
});
