import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../testUtils";
import TechContainer from "./TechContainer";
import { technologies } from "../Constants/techStack";

test("still renders the technology name after adding hover motion", () => {
  const react = technologies.find((tech) => tech.name === "React")!;
  renderWithProviders(<TechContainer tech={react} />);
  expect(screen.getByText("React")).toBeInTheDocument();
});
