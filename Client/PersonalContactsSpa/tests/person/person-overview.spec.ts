import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test('has header', async ({ page }) => {
  const header = page.getByRole('heading');
  
  await expect(header).toHaveText('My Personal Contacts');
});

test('has action buttons', async ({ page }) => {
    const newButton = page.getByRole('button', {name: 'New'});
    const editButton = page.getByRole('button', {name: 'Edit'});
    const deleteButton = page.getByRole('button', {name: 'Delete'});

    await expect(newButton).toBeEnabled();
    await expect(editButton).toBeDisabled();
    await expect(deleteButton).toBeDisabled();
  });
  
  test('can open new person page', async ({ page }) => {
    await page.getByRole('button', {name: 'New'}).click();

    const heading = page.getByRole('heading', {name: 'New contact'});
    await expect(page).toHaveURL('http://localhost:4200/person');
    await expect(heading).toBeVisible();
  });
  