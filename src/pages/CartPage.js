const { expect } = require('@playwright/test');

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartListLocator = page.getByRole('list').nth(1);

    this.notCoffeeMessage = page.getByText('No coffee, go add some.');
    this.totalCheckout = page.getByTestId('checkout');
  }

  coffeeListItemLocator(name) {
    return this.cartListLocator.getByRole('listitem').filter({ hasText: name });
  }

  coffeeListItemNameCell(name) {
    return this.coffeeListItemLocator(name).locator('div').nth(0);
  }

  coffeeListItemUnitCell(name) {
    return this.coffeeListItemLocator(name).locator('div').nth(1);
  }

  coffeeListItemTotalCostCell(name) {
    return this.coffeeListItemLocator(name).locator('div').nth(3);
  }

  async open() {
    await this.page.goto('/cart');
  }

  async waitForLoading() {
    await this.page.waitForURL('/cart');
  }

  async reload() {
    await this.page.reload();
  }

  async clickRemoveCoffeeButton(coffeeName) {
    const removeButton = this.coffeeListItemLocator(coffeeName).getByRole(
      'button',
      { name: `Remove one ${coffeeName}` },
    );
    await removeButton.click();
  }

  async clickRemoveOneCoffeeButton(coffeeName) {
    await this.clickRemoveCoffeeButton(coffeeName);
  }

  async clickAddOneCoffeeButton(coffeeName) {
    const addButton = this.coffeeListItemLocator(coffeeName).getByRole(
      'button',
      { name: `Add one ${coffeeName}` },
    );
    await addButton.click();
  }

  async assertCoffeeItemIsVisible(coffeeName) {
    await expect(this.coffeeListItemLocator(coffeeName)).toBeVisible();
  }

  async assertCoffeeItemIsHidden(coffeeName) {
    await expect(this.coffeeListItemLocator(coffeeName)).toBeHidden();
  }

  async assertCoffeeNameContainsCorrectText(name) {
    await expect(this.coffeeListItemNameCell(name)).toContainText(name);
  }

  async assertCoffeeUnitContainsCorrectText(name, text) {
    await expect(this.coffeeListItemUnitCell(name)).toContainText(text);
  }

  async assertCoffeeTotalCostContainsCorrectText(name, text) {
    await expect(this.coffeeListItemTotalCostCell(name)).toContainText(text);
  }

  async assertNoCoffeeMessageIsVisible() {
    await expect(this.notCoffeeMessage).toBeVisible();
  }

  async assertTotalCheckoutContainsValue(value) {
    await expect(this.totalCheckout).toContainText(value);
  }
}
