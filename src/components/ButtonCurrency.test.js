import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ButtonCurrency from "./ButtonCurrency";
import { useSelector, useDispatch } from "react-redux";
import { toggleCurrency } from "../redux/currencySlice";

// Mock react-redux
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mock action
jest.mock("../redux/currencySlice", () => ({
  toggleCurrency: jest.fn(() => ({ type: "currency/toggleCurrency" })),
}));

describe("ButtonCurrency", () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
    dispatchMock.mockClear();
  });

  test("muestra USD cuando la moneda es usd", () => {
    useSelector.mockImplementation((cb) =>
      cb({ currency: { value: "usd" } })
    );

    render(<ButtonCurrency />);
    expect(screen.getByText("USD $")).toBeInTheDocument();
  });

  test("muestra MXN cuando la moneda es mxn", () => {
    useSelector.mockImplementation((cb) =>
      cb({ currency: { value: "mxn" } })
    );

    render(<ButtonCurrency />);
    expect(screen.getByText("MXN $")).toBeInTheDocument();
  });

  test("despacha toggleCurrency al hacer click", () => {
    useSelector.mockImplementation((cb) =>
      cb({ currency: { value: "usd" } })
    );

    render(<ButtonCurrency />);

    fireEvent.click(screen.getByRole("button"));

    expect(dispatchMock).toHaveBeenCalledWith(toggleCurrency());
  });
});
