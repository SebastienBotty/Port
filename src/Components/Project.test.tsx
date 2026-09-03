import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../testUtils";
import Project from "./Project";
import { checkCar } from "../translations/projectsContainer";

test("still renders the project name and description after adding hover motion", () => {
  renderWithProviders(<Project projectData={checkCar} />);
  expect(screen.getByText("CheckCar")).toBeInTheDocument();
});
