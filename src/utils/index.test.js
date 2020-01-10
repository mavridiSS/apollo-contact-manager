import { validate } from "./index";

const mockData = {
  name: { error: true, helperText: "This field is required" },
  contact: { error: true, helperText: "This field is required" }
};

it("valites correctly", () => {
  const result = validate({ name: "", contact: "" });
  expect(result).toEqual(mockData);
});
