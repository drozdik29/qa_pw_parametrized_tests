import { test } from '../_fixtures/fixtures';
import { COFFEE_PRICES, COFFEE_NAMES } from '../../src/constants';
const testParameters = Object.entries(COFFEE_NAMES).map(
  ([coffeeKey, coffeeName]) => ({
    coffeeName,
    coffeePrice: COFFEE_PRICES[coffeeKey],
  }),
);

testParameters.forEach(({ coffeeName }) => {
test(`Check ${coffeeName} removed from Cart after clicking remove`, async ({
  cartPage,
  menuPage,
}) => {
  await menuPage.open();
  await menuPage.clickCoffeeCup(coffeeName);

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.clickRemoveCoffeeButton(coffeeName);
  await cartPage.assertNoCoffeeMessageIsVisible();
});
});
