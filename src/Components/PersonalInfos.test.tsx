import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../testUtils";
import PersonalInfos from "./PersonalInfos";

test("renders the value-proposition tagline in English and French", () => {
  const { unmount } = renderWithProviders(<PersonalInfos />, "EN");
  expect(
    screen.getByText(/freelance clients and public institutions/i)
  ).toBeInTheDocument();
  unmount();

  renderWithProviders(<PersonalInfos />, "FR");
  expect(
    screen.getByText(/clients freelance comme pour des institutions publiques/i)
  ).toBeInTheDocument();
});

test("renders a CTA button and the client trust line", () => {
  renderWithProviders(<PersonalInfos />, "EN");
  expect(screen.getByText("Let's talk about your project →")).toBeInTheDocument();
  expect(screen.getByText(/WHM Projects/i)).toBeInTheDocument();
  expect(screen.getByText(/European Commission/i)).toBeInTheDocument();
});
