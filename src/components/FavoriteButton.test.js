import { render, screen, fireEvent } from "@testing-library/react";
import FavoriteButton from "../components/FavoriteButton";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer, { toggleFavorite } from "../redux/favoritesSlice";

// Coin de prueba
const coin = {
  id: "bitcoin",
  name: "Bitcoin",
  symbol: "BTC",
  image: { small: "bitcoin.png" },
};

// Helper para render con store
const renderWithStore = (preloadedState) => {
  const store = configureStore({
    reducer: { favorites: favoritesReducer },
    preloadedState,
  });

  render(
    <Provider store={store}>
      <FavoriteButton coin={coin} />
    </Provider>
  );

  return store;
};

describe("FavoriteButton component", () => {
  test("se renderiza correctamente cuando no es favorito", () => {
    renderWithStore({ favorites: { coins: [] } });

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    // Clase cuando NO es favorito
    expect(button).toHaveClass("bg-bg-card text-text-secondary");
    // Icono estrella vacío
    expect(button.querySelector("i")).toHaveClass("bi-star");
  });

  test("se renderiza correctamente cuando es favorito", () => {
    renderWithStore({ favorites: { coins: [coin] } });

    const button = screen.getByRole("button");
    // Clase cuando es favorito
    expect(button).toHaveClass("bg-yellow-400 text-black");
    // Icono estrella llena
    expect(button.querySelector("i")).toHaveClass("bi-star-fill");
  });

  test("click en botón agrega o quita favorito", () => {
    const store = renderWithStore({ favorites: { coins: [] } });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const state = store.getState();
    expect(state.favorites.coins).toHaveLength(1);
    expect(state.favorites.coins[0].id).toBe("bitcoin");
  });
});
