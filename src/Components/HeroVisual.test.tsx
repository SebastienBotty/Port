import React from "react";
import { render } from "@testing-library/react";
import HeroVisual from "./HeroVisual";

function setPrefersReducedMotion(matches: boolean) {
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}

test("renders a static fallback with no 3D canvas when prefers-reduced-motion is set", () => {
  setPrefersReducedMotion(true);
  const { container } = render(<HeroVisual />);
  expect(container.querySelector("canvas")).toBeNull();
  expect(container.querySelector(".hero-visual-static")).not.toBeNull();
});
