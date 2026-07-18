import { test, expect } from '@playwright/test';

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
    await page.getByRole('link', { name: 'Sauce Labs Backpack' }).click();
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

});