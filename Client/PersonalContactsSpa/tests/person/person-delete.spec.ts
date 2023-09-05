import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');

  await page.getByRole('button', { name: 'New' }).click();

  await page.getByLabel('First Name:').fill('ivan');
  await page.getByLabel('Last Name:').fill('ivanov');
  await page.getByLabel('Phone Number:').fill('1234567');
  await page.getByLabel('IBAN:').fill('AA44VV4324');
  await page.getByLabel('Country:').fill('Serbia');
  await page.getByLabel('City:').fill('Belgrad');
  await page.getByLabel('Street:').fill('Novak Metkovetz 23');
  await page.getByRole('button', { name: 'Save' }).click();
});

test('has delete button disabled', async ({ page }) => {
  const deleteButton = page.getByRole('button', { name: 'Delete' });

  await expect(deleteButton).toBeDisabled();
});

test('delete existing person shows success', async ({ page }) => {
  await page.locator('.p-selectable-row').nth(0).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();

  const successMsg = page.getByText('Person Deleted');

  await expect(successMsg).toBeVisible();
});

test('cancel deleting person hides popup', async ({ page }) => {
  await page.locator('.p-selectable-row').nth(0).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('button', { name: 'No' }).click();

  const popup = page.getByText('Confirm');

  await expect(popup).toBeHidden();
});
