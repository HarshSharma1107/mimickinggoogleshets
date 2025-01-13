# React + TypeScript + Vite

------------------------------
first enter the value in the A1=5
and the enter second value in A2=5
then write formula in A3 or in formulabar(select an emty cell) like =SUM(A1,A2) then press Enter

1. Installation and Setup
------------------------
-> Clone the repository using git clone https://github.com/HarshSharma1107/mimickinggoogleshets
-> Install dependencies using npm install/ npm i
-> Start the application using npm start

2. Key Features Implemented
•	and Drop Interface Formatting cells Spreadsheet Interface with drag functionality, cell dependencies, and basic cell formatting
•	Mathematical Functions (SUM, AVERAGE, MAX, MIN, COUNT)
•	Data Quality Functions (TRIM, UPPER, LOWER, REMOVE_DUPLICATES, FIND_AND_REPLACE)

3.Data Entry and Validation
4.Testing functionality
5.Bonus Features Implemented

If Function and filters

Technologies Used
React+vite, Typescript, HTML,CSS.

Supported Formulas
SUM(range)
=SUM(A1,A3)

AVERAGE(range)
=AVERAGE(A1,A3)
MIN(range)
=MIN(A1,A3)

UPPER(cell)
Converts text in a cell to uppercase.
UPPER(A1)

LOWER(cell)
Converts text in a cell to lowercase.
LOWER(A1)

TRIM(cell)
Removes extra spaces from text in a cell.

TRIM(A1)

IF Formula:

Syntax: =IF(A1>50, "Yes", "No")
Checks a condition (e.g., A1>50) and returns a value (Yes or No).
FILTER Formula:

Syntax: =FILTER(A1:A10, A1:A10>50)
Filters the range A1:A10 to return values meeting the condition (e.g., greater than 50).



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
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
