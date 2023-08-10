import {
  WebDriver,
  Builder,
  By,
  Capabilities,
  until,
} from "selenium-webdriver";

export interface BasePageOptions {
  driver?: WebDriver;
  url?: string;
}

class BasePageObject {
  driver: WebDriver;
  url: string | undefined;
  constructor({ driver, url }: BasePageOptions) {
    this.driver =
      driver || new Builder().withCapabilities(Capabilities.chrome()).build();
    this.url = url || undefined;
  }
  async navigate(url?: string) {
    if (url) return await this.driver.get(url);
    else if (this.url) return await this.driver.get(this.url);
    else
      return Promise.reject(
        "BasePage.navigate() needs a url defined on the page objects, or one passed in."
      );
  }
  async getElement(elementBy: By) {
    await this.driver.wait(until.elementLocated(elementBy));
    const element = await this.driver.findElement(elementBy);
    await this.driver.wait(until.elementIsVisible(element));
    return element;
  }
  async click(elementBy: By) {
    return (await this.getElement(elementBy)).click();
  }
  async setInput(elementBy: By, keys: any) {
    const input = await this.getElement(elementBy);
    await input.clear();
    return input.sendKeys(keys);
  }
  async getText(elementBy: By) {
    return (await this.getElement(elementBy)).getText();
  }
  async getAttribute(elementBy: By, attribute: string) {
    return (await this.getElement(elementBy)).getAttribute(attribute);
  }
}

export class EmployeeManagerPageObject extends BasePageObject {
  addEmployeeButton = By.name("addEmployee");
  nameInput = By.name("nameEntry");
  phoneInput = By.name("phoneEntry");
  titleInput = By.name("titleEntry");
  newEmployeeListItem = By.name("employee11");
  constructor(url: string) {
    super({ url });
  }
  async createEmployee() {
    await this.click(this.addEmployeeButton);
  }
  async selectNewEmployee() {
    await this.click(this.newEmployeeListItem);
  }
  async getEmployeeName() {
    return await this.getAttribute(this.nameInput, "value");
  }
  async editEmployeeName(name: string) {
    await this.setInput(this.nameInput, name);
  }
  async getEmployeePhone() {
    return await this.getAttribute(this.phoneInput, "value");
  }
  async editEmployeePhone(phone: number) {
    await this.setInput(this.phoneInput, phone);
  }
  async getEmployeeTitle() {
    return await this.getAttribute(this.titleInput, "value");
  }
  async editEmployeeTitle(title: string) {
    await this.setInput(this.titleInput, title);
  }
}
