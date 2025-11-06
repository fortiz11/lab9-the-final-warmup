import { css } from "lit";

// Shared styles for Lit components to avoid duplication and provide a single
// source of truth for common UI tokens (colors, spacing, buttons, inputs).
export const sharedStyles = css`
  /* shared-styles intentionally references global tokens defined in src/styles.css
     do not redeclare tokens here — that keeps a single source of truth in :root */

  * {
    box-sizing: border-box;
  }

  button {
    font: inherit;
    padding: 8px 12px;
    border-radius: var(--radius);
    border: none;
    background: var(--primary);
    color: white;
    cursor: pointer;
    transition: transform 0.06s ease, background 0.15s ease;
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  input[type="text"],
  .edit-input {
    font: inherit;
    padding: 10px 12px;
    border-radius: calc(var(--radius) - 2px);
    border: 1px solid rgba(0, 0, 0, 0.08);
    outline: none;
  }

  input[type="text"]:focus,
  .edit-input:focus {
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.12);
    border-color: var(--primary);
  }

  :host(:focus-visible) {
    outline: 3px solid rgba(102, 126, 234, 0.18);
    outline-offset: 2px;
  }
`;
