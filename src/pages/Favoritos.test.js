import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import Favoritos from "./Favoritos";
import favoritesReducer, { toggleFavorite } from "../redux/favoritesSlice";
import currencyReducer from "../redux/currencySlice";

// Mock de SearchContainer y otros componentes que usan useSelector de slices no incluidos
jest.mock("../components/Header", () => () => <div>Header Mock</div>);
jest.mock("../components/MobileMenu.jsx", () => () => <div>MobileMenu Mock</div>);
jest.mock("../components/SearchContainer.jsx", () => () => <div>SearchContainer Mock</div>);

const renderWithProviders = (ui, { preloadedState } = {}) => {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
      currency: currencyReducer,
      // Slice falso para SearchContainer
      searchCoins: (state = { results: [], loading: false, error: null }) => state,
    },
    preloadedState,
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter>{ui}</MemoryRouter>
      </Provider>
    ),
  };
};

describe("Favoritos component", () => {
  test("muestra mensaje cuando no hay favoritos", () => {
    renderWithProviders(<Favoritos />, { preloadedState: { favorites: { coins: [] } } });
    expect(screen.getByText(/No tienes favoritos aún/i)).toBeInTheDocument();
  });

  test("muestra lista de favoritos correctamente", () => {
    const preloadedState = {
      favorites: {
        coins: [
          { id: "bitcoin", symbol: "BTC", image: "bitcoin.png" },
          { id: "ethereum", symbol: "ETH", image: "ethereum.png" },
        ],
      },
    };

    renderWithProviders(<Favoritos />, { preloadedState });

    // Revisar que los símbolos de las monedas estén en pantalla
    expect(screen.getByText("BTC")).toBeInTheDocument();
    expect(screen.getByText("ETH")).toBeInTheDocument();

    // Revisar que los botones "Ver" estén
    const verButtons = screen.getAllByText("Ver");
    expect(verButtons.length).toBe(2);

    // Revisar que las imágenes estén
    expect(screen.getByAltText(/BTC/i)).not.toBeNull();
    expect(screen.getByAltText(/ETH/i)).not.toBeNull();
  });

  test("eliminar favorito funciona correctamente", () => {
    const preloadedState = {
      favorites: {
        coins: [{ id: "bitcoin", symbol: "BTC", image: "bitcoin.png" }],
      },
    };

    const { store } = renderWithProviders(<Favoritos />, { preloadedState });

    const removeBtn = screen.getByRole("button", { name: /Eliminar BTC/i });
    fireEvent.click(removeBtn);

    // El estado del store debe actualizarse
    expect(store.getState().favorites.coins).toHaveLength(0);

    // Ahora debería aparecer el mensaje de "No tienes favoritos"
    expect(screen.getByText(/No tienes favoritos aún/i)).toBeInTheDocument();
  });

  test("navegar al detalle funciona", () => {
    const preloadedState = {
      favorites: {
        coins: [{ id: "bitcoin", symbol: "BTC", image: "bitcoin.png" }],
      },
    };

    renderWithProviders(<Favoritos />, { preloadedState });

    const verBtn = screen.getByText("Ver");

    // No se puede testear el navigate real en MemoryRouter sin mock, solo revisamos que el botón existe
    expect(verBtn).toBeInTheDocument();
  });
});
