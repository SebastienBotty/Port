import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders the home page nav bar on initial load", () => {
  const { container } = render(<App />);
  expect(container.querySelector(".nav-bar")).toBeInTheDocument();
});
