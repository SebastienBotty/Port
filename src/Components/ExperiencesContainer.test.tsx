import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../testUtils";
import ExperiencesContainer from "./ExperiencesContainer";

test("toggling to Work shows the WHM Projects entry, toggling back shows studies", () => {
  renderWithProviders(<ExperiencesContainer />);

  // Studies are shown by default.
  expect(screen.getByText("Self-learning")).toBeInTheDocument();
  expect(screen.queryByText("WHM Projects")).not.toBeInTheDocument();

  fireEvent.click(screen.getByText("Experiences"));
  expect(screen.getByText("WHM Projects")).toBeInTheDocument();
  expect(screen.queryByText("Self-learning")).not.toBeInTheDocument();

  fireEvent.click(screen.getByText("Studies"));
  expect(screen.getByText("Self-learning")).toBeInTheDocument();
});
