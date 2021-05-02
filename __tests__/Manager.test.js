const Manager = require("../lib/Manager");

test("Can set office number via constructor", () => {
  const testValue = "officeNumber";
  const e = new Manager("Foo", 1, "test@test.com", testValue);
  expect(e.officeNumber).toBe(testValue);
});

test("getRole() should return \"Intern\"", () => {
  const testValue = "Manager";
  const e = new Manager("Foo", 1, "test@test.com", "OfficeNumber");
  expect(e.getRole()).toBe(testValue);
});

test("Can get office number via getOfficeNumber()", () => {
  const testValue = "officeNumber";
  const e = new Manager("Foo", 1, "test@test.com", testValue);
  expect(e.getOfficeNumber()).toBe(testValue);
});