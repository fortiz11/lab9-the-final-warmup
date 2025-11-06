# ADR – Choosing Lit for the Task Manager App

## Context
The original codebase uses **Lit**, a lightweight library built on the Web Components standard.  
Its purpose is to simplify creating reusable, reactive UI components using standard HTML, CSS, and JavaScript.  
We needed to decide whether to **keep Lit** or **refactor into vanilla JS**.

## Decision
We decided to **keep using Lit** for this project.

## Rationale
- **Declarative templates:** Lit’s tagged template literals make rendering concise and readable.  
- **Reactive properties:** Automatic updates when component state changes reduce boilerplate.  
- **Web-standard alignment:** Unlike React or Vue, Lit builds directly on native Web Components, requiring no extra runtime or virtual DOM.  
- **Small footprint:** Only ~10 KB minified — suitable for our simple task app.  
- **Easy migration:** Because Lit outputs standard elements, it’s easy to extend or remove later.

## Alternatives Considered
- **Vanilla Web Components:** Possible but more verbose (manual DOM updates, attribute sync).  
- **React/Vue:** Overkill for a small app; higher bundle size and tooling complexity.  
- **Svelte:** Compiles away, but adds a build layer beyond Vite.

## Consequences
- Slight learning curve for decorators and reactivity.  
- Additional dependency (`lit`) to maintain in `package.json`.  
- Easier future component reuse in larger projects.

## Status
✅ Accepted and implemented
