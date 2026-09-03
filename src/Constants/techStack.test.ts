import { technologies } from "./techStack";

test("technologies list includes Framer Motion and Three.js", () => {
  const names = technologies.map((tech) => tech.name);
  expect(names).toContain("Framer Motion");
  expect(names).toContain("Three.js");

  const framerMotion = technologies.find((tech) => tech.name === "Framer Motion");
  const threeJs = technologies.find((tech) => tech.name === "Three.js");
  expect(framerMotion?.icon.path).toBeTruthy();
  expect(threeJs?.icon.path).toBeTruthy();
});
