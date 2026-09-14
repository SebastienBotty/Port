import { technologies } from "./techStack";

test("technologies list includes Framer Motion", () => {
  const names = technologies.map((tech) => tech.name);
  expect(names).toContain("Framer Motion");

  const framerMotion = technologies.find((tech) => tech.name === "Framer Motion");
  expect(framerMotion?.icon?.path).toBeTruthy();
});
