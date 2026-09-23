import { test } from '../_fixtures/fixtures';
import { priceFormatStr } from '../../src/common/priceFormatters';
import { COFFEE_PRICES, COFFEE_NAMES } from '../../src/constants';
const testParameters = Object.entries(COFFEE_NAMES).map(
  ([coffeeKey, coffeeName]) => ({
    coffeeName,
    coffeePrice: COFFEE_PRICES[coffeeKey],
  }),
);

testParameters.forEach(({ coffeeName, coffeePrice }) => {
  test(`Check ${coffeeName} has correct cost`, async ({ menuPage }) => {
    const price = priceFormatStr(coffeePrice);

  await menuPage.open();

  await menuPage.assertCoffeeCupCostHasValue(coffeeName, price);
}); 
});
