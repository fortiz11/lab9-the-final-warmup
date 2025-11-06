/**
 * TodoModel - Manages the todo list data and business logic
 * Implements the Observer pattern for reactive updates
 */
export class TodoModel {
  constructor(storageService) {
    this.storage = storageService;
    this.todos = this.storage.load("items", []);
    this.listeners = [];
    this.nextId = this.storage.load("nextId", 1);
  }

  /**
   * Subscribe to model changes
   */
  subscribe(listener) {
    // prevent duplicate subscriptions
    if (typeof listener !== "function") return () => {};
    if (this.listeners.indexOf(listener) === -1) {
      this.listeners.push(listener);
    }

    // return an unsubscribe function for convenience
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  /**
   * Notify all subscribers of changes
   */
  notify() {
    // iterate over a shallow copy to avoid issues if listeners change during notification
    const list = Array.from(this.listeners);
    list.forEach((listener) => {
      try {
        listener();
      } catch (e) {
        // keep other listeners alive if one fails
        console.error("Listener error in TodoModel.notify:", e);
      }
    });
  }

  addTodo(text) {
    if (!text || (typeof text === "string" && text.trim() === "")) {
      return null;
    }

    const txt = typeof text === "string" ? text.trim() : String(text);

    const todo = {
      id: this.nextId++,
      text: txt,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    this.todos.push(todo);
    this.save();
    this.notify();
    return todo;
  }

  /**
   * Toggle todo completion status
   */
  toggleComplete(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.save();
      this.notify();
    }
  }

  // Backwards-compatible alias used by some tests / codebases
  toggleTodo(id) {
    return this.toggleComplete(id);
  }

  /**
   * Delete a todo
   */
  deleteTodo(id) {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.save();
    this.notify();
  }

  /**
   * Update todo text
   */
  updateTodo(id, newText) {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) return;

    // Accept either a string or an object like { text: '...' }
    let text = null;
    if (typeof newText === "string") text = newText;
    else if (newText && typeof newText === "object" && "text" in newText)
      text = newText.text;

    if (text && text.trim() !== "") {
      todo.text = text.trim();
      this.save();
      this.notify();
    }
  }

  /**
   * Clear all completed todos
   */
  clearCompleted() {
    this.todos = this.todos.filter((t) => !t.completed);
    this.save();
    this.notify();
  }

  /**
   * Clear all todos
   */
  clearAll() {
    this.todos = [];
    this.save();
    this.notify();
  }

  /**
   * Get count of active todos
   */
  get activeCount() {
    return this.todos.filter((t) => !t.completed).length;
  }

  /**
   * Get count of completed todos
   */
  get completedCount() {
    return this.todos.filter((t) => t.completed).length;
  }

  /**
   * Save todos to storage
   */
  save() {
    this.storage.save("items", this.todos);
    this.storage.save("nextId", this.nextId);
  }
}
