import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { useUI } from "../hooks/useComponentsUI";

// Mock del hook useUI
jest.mock("../hooks/useComponentsUI", () => ({
  useUI: jest.fn(),
}));

describe("MobileMenu", () => {
  const toggleMenuMock = jest.fn();

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <MobileMenu />
      </MemoryRouter>
    );

  beforeEach(() => {
    toggleMenuMock.mockClear();
  });

  test("se muestra visible cuando isOpen es true", () => {
    useUI.mockReturnValue({
      isOpen: true,
      toggleMenu: toggleMenuMock,
    });

    const { container } = renderComponent();

    expect(container.firstChild.className).toContain("translate-x-0");
  });

  test("se oculta cuando isOpen es false", () => {
    useUI.mockReturnValue({
      isOpen: false,
      toggleMenu: toggleMenuMock,
    });

    const { container } = renderComponent();

    expect(container.firstChild.className).toContain("translate-x-full");
  });

  test("renderiza los links del menú", () => {
    useUI.mockReturnValue({
      isOpen: true,
      toggleMenu: toggleMenuMock,
    });

    renderComponent();

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Market")).toBeInTheDocument();
    expect(screen.getByText("Favoritos")).toBeInTheDocument();
  });

  test("ejecuta toggleMenu al hacer click en cerrar", () => {
    useUI.mockReturnValue({
      isOpen: true,
      toggleMenu: toggleMenuMock,
    });

    renderComponent();

    const closeIcon = screen.getByLabelText("Cerrar menú");
    fireEvent.click(closeIcon);

    expect(toggleMenuMock).toHaveBeenCalled();
  });
});
