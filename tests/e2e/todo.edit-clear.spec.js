import { test, expect } from '@playwright/test';

test('edit text → complete → clear completed', async ({ page }) => {
  await page.goto('/');

  // Add base todo
  const form = page.locator('todo-form');
  const input = form.locator('input[type="text"]');
  await input.fill('Edit Me');
  await input.press('Enter');

  const list = page.locator('todo-list');
  // select the first item (avoid relying on text match which changes in edit mode)
  const item = list.locator('todo-item').first();
  await expect(list.locator('todo-item')).toHaveCount(1);

  // Enter edit mode: click the Edit button
  const editBtn = item.locator('button.edit-btn');
  await editBtn.click();

  // Type new text in edit input (ensure selector matches your component)
  // re-query the item since DOM changed
  const editInput = list.locator('todo-item').first().locator('input.edit-input, input[type="text"]');
  await editInput.fill('Edited!');
  await editInput.press('Enter');

  // Confirm text changed
  await expect(list.locator('todo-item').filter({ hasText: 'Edited!' })).toHaveCount(1);

  // Mark completed - re-query the item now that it has new text
  const updatedItem = list.locator('todo-item').filter({ hasText: 'Edited!' }).first();
  const checkbox = updatedItem.locator('input[type="checkbox"]');
  await checkbox.check();

  // Clear completed (assumes a clear-completed button exists in the page/app)
  const clearCompleted = page.locator('button.clear-completed');
  page.once('dialog', dialog => dialog.accept());
  await clearCompleted.click();

  // Completed item is gone
  await expect(page.locator('todo-item').filter({ hasText: 'Edited!' })).toHaveCount(0);
});
