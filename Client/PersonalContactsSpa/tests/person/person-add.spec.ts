import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/person');
});

test('has header', async ({ page }) => {
  const heading = page.getByRole('heading', {name: 'New contact'});

  await expect(heading).toBeVisible();
});

test('has action buttons', async ({ page }) => {
  const saveButton = page.getByRole('button', {name: 'Save'});
  const cancelButton = page.getByRole('button', {name: 'Cancel'});

  await expect(cancelButton).toBeEnabled();
  await expect(saveButton).toBeDisabled();
});

test('save valid person shows success', async ({ page }) => {
  await page.getByLabel('First Name:').fill('john');
  await page.getByLabel('Last Name:').fill('smith');
  await page.getByLabel('Phone Number:').fill('01234578');
  await page.getByLabel('IBAN:').fill('AA2323BB4243');
  await page.getByLabel('Country:').fill('Bulgaria');
  await page.getByLabel('City:').fill('Sofia');
  await page.getByLabel('Street:').fill('Pere Toshev 33');

  await page.getByRole('button', {name: 'Save'}).click();

  const successMsg = page.getByText('Person Saved');

  await expect(successMsg).toBeVisible();
});

test('save invalid phone number shows error', async ({ page }) => {
  await page.getByLabel('First Name:').fill('john');
  await page.getByLabel('Last Name:').fill('smith');
  await page.getByLabel('Phone Number:').fill('sdaadsad');
  await page.getByLabel('IBAN:').fill('AA2323BB4243');
  await page.getByLabel('Country:').fill('Bulgaria');
  await page.getByLabel('City:').fill('Sofia');
  await page.getByLabel('Street:').fill('Pere Toshev 33');

  await page.getByRole('button', {name: 'Save'}).click();

  const errorMsg = page.getByText('Error saving Person');

  await expect(errorMsg).toBeVisible();
});

test('save invalid iban shows error', async ({ page }) => {
  await page.getByLabel('First Name:').fill('john');
  await page.getByLabel('Last Name:').fill('smith');
  await page.getByLabel('Phone Number:').fill('012345678');
  await page.getByLabel('IBAN:').fill('423dsa342dsa');
  await page.getByLabel('Country:').fill('Bulgaria');
  await page.getByLabel('City:').fill('Sofia');
  await page.getByLabel('Street:').fill('Pere Toshev 33');

  await page.getByRole('button', {name: 'Save'}).click();

  const errorMsg = page.getByText('Error saving Person');

  await expect(errorMsg).toBeVisible();
});

test('cancel redirects to overview', async ({ page }) => {
  await page.getByRole('button', {name: 'Cancel'}).click();

  await expect(page).toHaveURL('http://localhost:4200/persons');
});
