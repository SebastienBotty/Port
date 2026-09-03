import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the home page nav bar on initial load", () => {
  render(<App />);
  expect(screen.getAllByText("GitHub").length).toBeGreaterThan(0);
});
