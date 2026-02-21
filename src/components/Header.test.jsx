import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

// 🔹 mock del hook useUI
jest.mock("../hooks/useComponentsUI.jsx", () => ({
  useUI: jest.fn(),
}));

// 🔹 mock del botón
jest.mock("./ButtonCurrency.jsx", () => () => <button>Currency</button>);

import { useUI } from "../hooks/useComponentsUI.jsx";

describe("Header", () => {
  let toggleMenuMock;
  let toggleSearchMock;

  beforeEach(() => {
    toggleMenuMock = jest.fn();
    toggleSearchMock = jest.fn();

    useUI.mockReturnValue({
      toggleMenu: toggleMenuMock,
      toggleSearch: toggleSearchMock,
    });
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

  test("renderiza el logo", () => {
    renderComponent();
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });

  test("ejecuta toggleSearch al hacer click en el icono de búsqueda", () => {
    renderComponent();
    const searchIcon = screen.getByLabelText("Buscar");
    fireEvent.click(searchIcon);
    expect(toggleSearchMock).toHaveBeenCalled();
  });

  test("ejecuta toggleMenu al hacer click en el icono del menú", () => {
    renderComponent();
    const menuIcon = screen.getByLabelText("Abrir menú");
    fireEvent.click(menuIcon);
    expect(toggleMenuMock).toHaveBeenCalled();
  });

  test("renderiza los links de navegación", () => {
    renderComponent();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Market")).toBeInTheDocument();
    expect(screen.getByText("Favoritos")).toBeInTheDocument();
  });
});
