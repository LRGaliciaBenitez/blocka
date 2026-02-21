import { render, screen } from "@testing-library/react";
import Market from "./Market";

// Mock de componentes
jest.mock("../components/Header", () => () => <div>Header</div>);
jest.mock("../components/MobileMenu", () => () => <div>MobileMenu</div>);
jest.mock("../components/SearchContainer", () => () => <div>SearchContainer</div>);

jest.mock(
  "../components/cards/cardTopCoinsMarket/CardTopCoinsMarket",
  () => () => <div>CardTopCoinsMarket</div>
);

jest.mock(
  "../components/cards/cardAllCoinsMarket/CardAllCoinsMarket",
  () => () => <div>CardAllCoinsMarket</div>
);

jest.mock(
  "../components/cards/cardTrendingMarket/cardTrendingMarket",
  () => () => <div>CardTrendingMarket</div>
);

describe("Market Page", () => {
  test("renders Market page with all main components", () => {
    render(<Market />);

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("SearchContainer")).toBeInTheDocument();
    expect(screen.getByText("MobileMenu")).toBeInTheDocument();

    expect(screen.getByText("CardTopCoinsMarket")).toBeInTheDocument();
    expect(screen.getByText("CardAllCoinsMarket")).toBeInTheDocument();
    expect(screen.getByText("CardTrendingMarket")).toBeInTheDocument();
  });
});
