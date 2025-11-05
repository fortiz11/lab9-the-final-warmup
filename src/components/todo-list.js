import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared-styles.js';
import './todo-item.js';

/**
 * TodoList - Displays a list of todos
 */
export class TodoList extends LitElement {
  static properties = {
    todos: { type: Array }
  };

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }

      .empty-state {
        text-align: center;
        padding: 40px 20px;
        color: var(--muted);
        font-size: 18px;
      }

      .empty-icon {
        font-size: 48px;
        margin-bottom: 16px;
      }

      .list-container {
        max-height: 500px;
        overflow-y: auto;
      }

      /* Custom scrollbar */
      .list-container::-webkit-scrollbar {
        width: 8px;
      }

      .list-container::-webkit-scrollbar-track {
        background: rgba(0,0,0,0.02);
        border-radius: 4px;
      }

      .list-container::-webkit-scrollbar-thumb {
        background: rgba(0,0,0,0.08);
        border-radius: 4px;
      }

      .list-container::-webkit-scrollbar-thumb:hover {
        background: rgba(0,0,0,0.12);
      }
    `
  ];

  constructor() {
    super();
    this.todos = [];
  }

  render() {
    if (this.todos.length === 0) {
      return html`
        <div class="empty-state">
          <div class="empty-icon">📝</div>
          <p>No todos yet. Add one above!</p>
        </div>
      `;
    }

    return html`
      <div class="list-container">
        ${this.todos.map(todo => html`
          <todo-item .todo=${todo}></todo-item>
        `)}
      </div>
    `;
  }
}

customElements.define('todo-list', TodoList);
