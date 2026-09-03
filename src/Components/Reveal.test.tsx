import React from "react";
import { render, screen } from "@testing-library/react";
import Reveal from "./Reveal";

test("renders its children", () => {
  render(
    <Reveal>
      <p>Section content</p>
    </Reveal>
  );
  expect(screen.getByText("Section content")).toBeInTheDocument();
});

test("forwards a custom className to the wrapper", () => {
  const { container } = render(
    <Reveal className="reveal-section">
      <p>Section content</p>
    </Reveal>
  );
  expect(container.querySelector(".reveal-section")).not.toBeNull();
});
