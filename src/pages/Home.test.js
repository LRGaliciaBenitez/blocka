import { render, screen } from "@testing-library/react";
import Home from "./Home";

// Mock de componentes hijos
jest.mock("../components/Header", () => () => <div>Header</div>);
jest.mock("../components/MobileMenu", () => () => <div>MobileMenu</div>);
jest.mock("../components/SearchContainer", () => () => <div>SearchContainer</div>);
jest.mock("../components/cards/cardTopCoins/CardTopCoins", () => () => <div>CardTopCoins</div>);
jest.mock("../components/cards/cardTrending/CardTrending", () => () => <div>CardTrending</div>);

describe("Home Page", () => {
  test("renders Home page with main components", () => {
    render(<Home />);

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("SearchContainer")).toBeInTheDocument();
    expect(screen.getByText("MobileMenu")).toBeInTheDocument();
    expect(screen.getByText("CardTopCoins")).toBeInTheDocument();
    expect(screen.getByText("CardTrending")).toBeInTheDocument();
  });
});
