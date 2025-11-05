import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared-styles.js';

/**
 * TodoForm - Input form for adding new todos
 */
export class TodoForm extends LitElement {
  static properties = {
    inputValue: { state: true }
  };

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        margin-bottom: 20px;
      }

      form {
        display: flex;
        gap: 8px;
      }

      /* keep only form-specific overrides - shared-styles provides button/input base */
      input {
        flex: 1;
        font-size: 16px;
      }

      button {
        padding: 12px 20px;
      }
    `
  ];

  constructor() {
    super();
    this.inputValue = '';
  }

  handleSubmit(e) {
    e.preventDefault();
    const text = this.inputValue.trim();

    if (text) {
      this.dispatchEvent(new CustomEvent('add-todo', {
        detail: { text },
        bubbles: true,
        composed: true
      }));

      this.inputValue = '';
    }
  }

  handleInput(e) {
    this.inputValue = e.target.value;
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <input
          type="text"
          placeholder="What needs to be done?"
          .value=${this.inputValue}
          @input=${this.handleInput}
          aria-label="New todo"
          autofocus
        />
        <button type="submit" ?disabled=${!this.inputValue.trim()}>
          Add
        </button>
      </form>
    `;
  }
}

customElements.define('todo-form', TodoForm);
