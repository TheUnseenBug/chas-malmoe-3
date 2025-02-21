## Kort projektbeskrivning.

## Vilket UI-ramverk ni använde och varför.

Vi valde Tailwind för att vi redan börjat kika på det förra veckan i vårt Reseplanerarprojekt. Nu ville vi gärna jobba vidare med det då det är en del att sätta sig in i och lära sig. Vi har också installerat Shadcd eftersom att det är ett komponentbibliotekt baserat på Tailwind så tyckte vi att det passade att kika lite på det också.

## Hur man startar projektet (t.ex. npm install och npm run dev).

Klona repot, öppna det i vs code och kör npm install och npm run dev.

## Gruppmedlemmar.

Malmö grupp 3 är: Anton, Dennis, Rhiannon, Alice och Abbas (som ej närvarade idag).

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
