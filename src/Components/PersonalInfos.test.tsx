import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../testUtils";
import PersonalInfos from "./PersonalInfos";

test("renders the value-proposition tagline in English and French", () => {
  const { unmount } = renderWithProviders(<PersonalInfos />, "EN");
  expect(
    screen.getByText(/freelance and institutional web projects/i)
  ).toBeInTheDocument();
  unmount();

  renderWithProviders(<PersonalInfos />, "FR");
  expect(
    screen.getByText(/projets web freelance et institutionnels/i)
  ).toBeInTheDocument();
});
