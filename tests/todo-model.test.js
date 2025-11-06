import { test, beforeEach } from 'node:test';
import assert from 'node:assert';
import { TodoModel } from '../src/models/todo-model.js';


 // Mock storage service for testing
 
class MockStorage {
  constructor() {
    this.data = {};
  }
  save(key, value) {
    this.data[key] = value;
  }
  load(key, defaultValue) {
    return this.data[key] !== undefined ? this.data[key] : defaultValue;
  }
  remove(key) {
    delete this.data[key];
  }
  clear() {
    this.data = {};
  }
}

let storage;
let model;

beforeEach(() => {
  storage = new MockStorage();
  model = new TodoModel(storage);
});


 // MockStorage sanity checks
test('MockStorage: save/load/remove/clear work as expected', () => {
  storage.save('k', { a: 1 });
  assert.deepEqual(storage.load('k', {}), { a: 1 });

  // default when missing
  assert.deepEqual(storage.load('missing', { def: true }), { def: true });

  // remove one key
  storage.remove('k');
  assert.equal(storage.load('k', null), null);

  // clear all
  storage.save('a', 1);
  storage.save('b', 2);
  storage.clear();
  assert.equal(Object.keys(storage.data).length, 0);
});


 //Model: add & validation

test('TodoModel - addTodo should add a new todo', () => {
  model.addTodo('Test todo');
  assert.strictEqual(model.todos.length, 1);
  assert.strictEqual(model.todos[0].text, 'Test todo');
  assert.strictEqual(model.todos[0].completed, false);
});

test('TodoModel - should not add empty todos', () => {
  model.addTodo('');
  model.addTodo('   ');
  assert.strictEqual(model.todos.length, 0);
});

//Model: toggle/update/delete
test('toggleTodo flips completion and updates counts (if provided)', () => {
  const t = model.addTodo('A');

  // optional count properties (if your model exposes them)
  if ('activeCount' in model) {
    assert.equal(model.activeCount, 1);
    assert.equal(model.completedCount, 0);
  }

  model.toggleTodo(t.id);
  assert.equal(model.todos[0].completed, true);

  if ('activeCount' in model) {
    assert.equal(model.activeCount, 0);
    assert.equal(model.completedCount, 1);
  }
});

test('updateTodo trims text and ignores empty', () => {
  const t = model.addTodo('Milk');
  model.updateTodo(t.id, { text: '  Oat milk  ' });
  assert.equal(model.todos[0].text, 'Oat milk');

  // If your model no-ops on blank updates, this should remain unchanged
  model.updateTodo(t.id, { text: '   ' });
  assert.equal(model.todos[0].text, 'Oat milk');
});

test('deleteTodo removes the correct item', () => {
  const a = model.addTodo('A');
  const b = model.addTodo('B');
  model.deleteTodo(a.id);
  assert.deepEqual(model.todos.map(t => t.text), ['B']);
});


 // Model: clear helpers

test('clearCompleted removes only completed items', () => {
  const a = model.addTodo('A');
  const b = model.addTodo('B');
  model.toggleTodo(a.id); // complete A
  model.clearCompleted();
  assert.deepEqual(model.todos.map(t => t.text), ['B']);
});

test('clearAll empties list and resets counts (if provided)', () => {
  model.addTodo('A');
  model.addTodo('B');
  model.clearAll?.(); // if method exists
  // Fall back: if the model uses a different name like clear()
  if (typeof model.clearAll !== 'function' && typeof model.clear === 'function') {
    model.clear();
  }
  assert.equal(model.todos.length, 0);

  if ('activeCount' in model) {
    assert.equal(model.activeCount, 0);
    assert.equal(model.completedCount, 0);
  }
});


 // Model: persistence roundtrip
 
test('persists through storage (constructor reload)', () => {
  const s = new MockStorage();
  const m1 = new TodoModel(s);
  m1.addTodo('Persist me');

  // simulate "reload" by constructing a new model with same storage
  const m2 = new TodoModel(s);
  // if your model loads on construct, the item should be present
  assert.equal(m2.todos[0].text, 'Persist me');
});
