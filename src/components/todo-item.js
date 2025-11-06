import { LitElement, html, css } from "lit";
import { sharedStyles } from "../styles/shared-styles.js";

/**
 * TodoItem - Individual todo item component
 */
export class TodoItem extends LitElement {
  static properties = {
    todo: { type: Object },
    isEditing: { state: true },
    editValue: { state: true },
  };

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }

      .todo-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: var(--surface, white);
        border-radius: 8px;
        margin-bottom: 8px;
        transition: transform 0.2s, box-shadow 0.2s;
      }

      .todo-item:hover {
        /* Avoid moving the element on hover which causes a shake */
        box-shadow: var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.06));
        background: rgba(0, 0, 0, 0.02);
      }

      .checkbox {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }

      .todo-text {
        flex: 1;
        font-size: 16px;
        color: #333;
        word-break: break-word;
      }

      .todo-text.completed {
        text-decoration: line-through;
        color: #999;
      }

      .edit-input {
        flex: 1;
        padding: 8px;
        font-size: 16px;
        border-radius: 4px;
      }

      .button-group {
        display: flex;
        gap: 8px;
        /* Ensure action buttons are always visible (not hover-only). Keep a small
         transition for subtle feedback but don't hide them by default. */
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
      }

      button {
        padding: 6px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: background 0.16s, transform 0.08s, box-shadow 0.12s;
        box-shadow: none;
        min-width: 64px;
        /* Ensure buttons show a visible background and text by default */
        background: var(--primary);
        color: white;
      }

      .edit-btn {
        background: var(--success);
        color: white;
      }

      .edit-btn:hover {
        background: #45a049;
        transform: translateY(-1px);
        box-shadow: var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.06));
      }

      .delete-btn {
        background: var(--danger);
        color: white;
      }

      .delete-btn:hover {
        background: #da190b;
        transform: translateY(-1px);
        box-shadow: var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.06));
      }

      .save-btn {
        background: var(--primary);
        color: white;
      }

      .save-btn:hover {
        background: #0b7dda;
        transform: translateY(-1px);
        box-shadow: var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.06));
      }

      .cancel-btn {
        background: #757575;
        color: white;
      }

      .cancel-btn:hover {
        background: #616161;
        transform: translateY(-1px);
        box-shadow: var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.06));
      }
    `,
  ];

  constructor() {
    super();
    this.isEditing = false;
    this.editValue = "";
  }

  handleToggle() {
    this.dispatchEvent(
      new CustomEvent("toggle-todo", {
        detail: { id: this.todo.id },
        bubbles: true,
        composed: true,
      })
    );
  }

  handleDelete(e) {
    // prevent accidental propagation that could trigger other controls
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    if (confirm("Delete this todo?")) {
      this.dispatchEvent(
        new CustomEvent("delete-todo", {
          detail: { id: this.todo.id },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  handleEdit(e) {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    this.isEditing = true;
    this.editValue = this.todo.text;
  }

  handleSave(e) {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    if (this.editValue.trim()) {
      this.dispatchEvent(
        new CustomEvent("update-todo", {
          detail: { id: this.todo.id, text: this.editValue },
          bubbles: true,
          composed: true,
        })
      );
      this.isEditing = false;
    }
  }

  handleCancel(e) {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    this.isEditing = false;
    this.editValue = "";
  }

  handleKeyDown(e) {
    if (e.key === "Enter") {
      this.handleSave();
    } else if (e.key === "Escape") {
      this.handleCancel();
    }
  }

  render() {
    if (this.isEditing) {
      return html`
        <div class="todo-item">
          <input
            class="edit-input"
            type="text"
            .value=${this.editValue}
            @input=${(e) => (this.editValue = e.target.value)}
            @keydown=${this.handleKeyDown}
            autofocus
          />
          <div class="button-group">
            <button class="save-btn" @click=${this.handleSave}>Save</button>
            <button class="cancel-btn" @click=${this.handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      `;
    }

    return html`
      <div class="todo-item">
        <input
          type="checkbox"
          class="checkbox"
          .checked=${this.todo.completed}
          @change=${this.handleToggle}
          aria-label="Toggle todo"
        />
        <span class="todo-text ${this.todo.completed ? "completed" : ""}">
          ${this.todo.text}
        </span>
        <div class="button-group">
          <button
            class="edit-btn"
            @click=${this.handleEdit}
            ?disabled=${this.todo.completed}
            aria-label="Edit todo"
          >
            Edit
          </button>
          <button
            class="delete-btn"
            @click=${this.handleDelete}
            aria-label="Delete todo"
          >
            Delete
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("todo-item", TodoItem);
