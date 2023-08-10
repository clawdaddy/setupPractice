import { EmployeeManagerPageObject } from "./employeeManagerPageObject";

const page = new EmployeeManagerPageObject(
  "https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html"
);

describe("suite of tests for testing employee manager with page objects", () => {
  beforeAll(async () => {
    console.log({ pageUrl: page.url });
    await page.navigate();
  }, 10000);

  afterAll(async () => {
    await page.driver.quit();
  });

  test("it can create a new employee", async () => {
    await page.createEmployee();
    await page.selectNewEmployee();

    const createdEmployeeName = await page.getEmployeeName();
    expect(createdEmployeeName).toBe("New Employee");

    const createdEmployeePhone = await page.getEmployeePhone();
    expect(createdEmployeePhone).toBe("1234567890");

    const createdEmployeeTitle = await page.getEmployeeTitle();
    expect(createdEmployeeTitle).toBe("New Employee");
  });
  test("it can edit an employee's name", async () => {
    const newName = "Paul";
    await page.editEmployeeName(newName);
    const editedName = await page.getEmployeeName();
    expect(editedName).toBe(newName);
  });
  test("it can edit an employee's phone", async () => {
    const newPhone = 1234567890;
    await page.editEmployeePhone(newPhone);
    const editedPhone = await page.getEmployeePhone();
    expect(editedPhone).toBe(newPhone + "");
  });
  test("it can edit an employee's title", async () => {
    const newTitle = "The Berninator";
    await page.editEmployeeTitle(newTitle);
    const editedTitle = await page.getEmployeeTitle();
    expect(editedTitle).toBe(newTitle);
  });
});
