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

test('has edit button disabled', async ({ page }) => {
  const editButton = page.getByRole('button', { name: 'Edit' });

  await expect(editButton).toBeDisabled();
});

test('has action buttons', async ({ page }) => {
  await page.locator('.p-selectable-row').nth(0).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  const saveButton = page.getByRole('button', { name: 'Save' });
  const cancelButton = page.getByRole('button', { name: 'Cancel' });

  await expect(cancelButton).toBeEnabled();
  await expect(saveButton).toBeEnabled();
});

test('edit existing person shows success', async ({ page }) => {
  await page.locator('.p-selectable-row').nth(0).click();
  await page.getByRole('button', { name: 'Edit' }).click();

  await page.getByLabel('Country:').fill('Romania');
  await page.getByLabel('City:').fill('Constanta');
  await page.getByRole('button', { name: 'Save' }).click();

  const successMsg = page.getByText('Person Saved');

  await expect(successMsg).toBeVisible();
});

test('update invalid phone number shows error', async ({ page }) => {
  await page.locator('.p-selectable-row').nth(0).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByLabel('Phone Number:').fill('sdaadsad');

  await page.getByRole('button', { name: 'Save' }).click();

  const errorMsg = page.getByText('Error saving Person');

  await expect(errorMsg).toBeVisible();
});

test('cancel edit redirects to overview', async ({ page }) => {
  await page.locator('.p-selectable-row').nth(0).click();
  await page.getByRole('button', { name: 'Edit' }).click();

  await page.getByRole('button', { name: 'Cancel' }).click();

  await expect(page).toHaveURL('http://localhost:4200/persons');
});
