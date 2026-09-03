import { workArr } from "./experiences";

test("workArr contains the WHM Projects / European Commission entry", () => {
  expect(workArr).toHaveLength(1);

  const entry = workArr[0];
  expect(entry.name.EN).toBe("WHM Projects");
  expect(entry.name.FR).toBe("WHM Projects");
  expect(entry.secondTitle.EN).toBe("Freelance Developer — Client: European Commission");
  expect(entry.secondTitle.FR).toBe("Développeur freelance — Client : Commission européenne");
  expect(entry.dates.start.EN).toBe("Jun 2026");
  expect(entry.dates.end.EN).toBe("Jun 2026");
  expect(entry.dates.start.FR).toBe("Juin 2026");
  expect(entry.dates.end.FR).toBe("Juin 2026");
});
