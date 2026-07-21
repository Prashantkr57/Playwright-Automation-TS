import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';



test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
});

test('has title', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle("Swag Labs");

});

test('login with valid credentials', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory\.html/);

});

test('adding to cart', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory\.html/);
    await page.getByRole('link', { name: 'Sauce Labs Backpack' }).first().click();
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

});

test('adding two products to cart', async ({ page }) => {

    await page.getByRole('link', { name: 'Sauce Labs Backpack' }).first().click();
    await page.locator('[data-test="add-to-cart"]').click();
    await page.locator('[data-test="back-to-products"]').click();
    await page.getByRole('link', { name: 'Sauce Labs Bike Light' }).first().click();
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

});    