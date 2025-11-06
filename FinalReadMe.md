# 🧩 Lab 9 – The Final Warm-Up  
**Author:** Francis Ortiz  
**Repo:** [fortiz11/lab9-the-final-warmup](https://github.com/fortiz11/lab9-the-final-warmup)  
**Course:** COMP 305 – Software Design  

## 🌐 Deployment

The application is deployed using **Netlify** for automated continuous deployment. 

Link: (https://lovely-zuccutto-7c2724.netlify.app/)


---

## 🎯 Overview
This lab transformed a rough, AI-generated **Task Manager App** built with **Lit** into a polished, documented, and tested web application.  
The goal was to practice professional engineering habits: testing, CI/CD, documentation, and code quality.

---

## 🏗️ Tech Stack
- **Framework:** Lit (Web Components)
- **Build Tool:** Vite
- **Testing:** Node’s built-in test runner (unit)
- **End-to-End:** Playwright
- **CI/CD:** GitHub Actions
- **Docs:** JSDoc (HTML output in `/docs`)
- **Linting:** ESLint

---

## 🚀 How to Run

### Development
```bash
npm install
npm run dev
```
## 📄 Docs & Architecture

- **JSDoc Site:**  
  Generated HTML documentation for all source files is available in:  
  [`/docs/index.html`](./docs/index.html)

- **ADR (Architecture Decision Record):**  
  Documented rationale for choosing the **Lit** framework and its implications for the project:  
  [`docs/adr/0001-choose-lit.md`](./docs/adr/0001-choose-lit.md)

- **Documentation Overview:**  
  The documentation covers:
  - `TodoModel` — Core app logic, todo management, and persistence.
  - `StorageService` — LocalStorage wrapper for saving and loading data.
  - `Components` — Lit-based UI elements (form, list, items, etc.).
  - `Main.js` — Application bootstrap and component rendering.
  - `Tests` — Unit and E2E structure for verifying functionality.
  - `ADR` — Decision rationale and alternatives considered.

- **How to View Docs:**
  ```bash
  npm run docs

## ⚙️ Continuous Integration

GitHub Actions automatically runs a full CI pipeline on every push or pull request to maintain code quality and reliability.

The workflow includes:
- ✅ **Linting:** Ensures consistent style using ESLint and Prettier.  
- ✅ **Unit Tests:** Runs all tests with Node’s built-in test runner to verify app logic.  
- ✅ **E2E Tests:** Executes Playwright tests to validate UI and user flows.  
- ✅ **Build Step:** Runs Vite build to ensure the project compiles successfully.  
- ✅ **Documentation Generation:** Generates up-to-date JSDoc documentation.  



## ✅ Features Implemented
| Feature | Description |
|:--|:--|
| **Code Cleanup** | Refactored brown-field AI-generated code for readability, consistency, and maintainability. |
| **Linting** | Configured ESLint and Prettier for consistent code style and automatic formatting. |
| **Unit Tests** | Added comprehensive unit tests for `TodoModel` and `StorageService` with 9 passing assertions. |
| **E2E Tests** | Added Playwright E2E tests covering core user flows: add → reload → toggle → delete. |
| **GitHub Actions CI** | Configured CI pipeline to lint, test, build, and deploy automatically on each push. |
| **JSDoc Documentation** | Added detailed documentation for all JS modules with generated HTML output (`/docs/index.html`). |
| **ADR Decision Record** | Added `docs/adr/0001-choose-lit.md` explaining rationale for using Lit framework. |
| **CSS Variables & Styling** | Introduced CSS variables for color palette and theme consistency across components. |
| **Improved Repo Organization** | Clean project structure following professional conventions for `src/`, `tests/`, and `docs/`. |
