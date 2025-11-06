import { test, expect } from '@playwright/test';

test('add → persist → toggle → delete', async ({ page }) => {
  await page.goto('/');

  // Add
  const form = page.locator('todo-form');
  const input = form.locator('input[type="text"]');
  await input.fill('E2E Task');
  // If your UI uses a button, swap to: await form.locator('button').click();
  await input.press('Enter');

  // Appears in list
  const list = page.locator('todo-list');
  const item = list.locator('todo-item').filter({ hasText: 'E2E Task' });
  await expect(item).toHaveCount(1);

  // Persist on reload
  await page.reload();
  const itemAfter = page.locator('todo-list').locator('todo-item').filter({ hasText: 'E2E Task' });
  await expect(itemAfter).toHaveCount(1);

  // Toggle complete
  const checkbox = itemAfter.locator('input[type="checkbox"]');
  await checkbox.check();
  await expect(checkbox).toBeChecked();

  // Delete (click the specific delete button). Accept the confirmation dialog.
  const deleteBtn = itemAfter.locator('button.delete-btn');
  page.once('dialog', dialog => dialog.accept());
  await deleteBtn.click();
  await expect(page.locator('todo-list').locator('todo-item').filter({ hasText: 'E2E Task' }))
    .toHaveCount(0);
});
