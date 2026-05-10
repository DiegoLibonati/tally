# Tally

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**Tally** is a minimalist counter web application built with vanilla TypeScript and zero runtime dependencies. It renders a single interactive counter that lets the user increment, decrement, or reset a numeric value displayed on screen.

The counter starts at zero and responds to three actions: **Increase** adds one unit to the current value, **Decrease** subtracts one unit, and **Reset** brings the value back to zero regardless of where it stands. Each action is wired to a dedicated button with a descriptive accessible label, making the interface fully navigable via assistive technologies.

Visual feedback is built into the counter display itself: the number turns **green** whenever the value is positive, **red** when it goes negative, and **black** when it sits at zero. This color coding provides an immediate, glanceable indication of the counter's state without requiring any additional UI elements.

The application is structured around a clean component model — factory functions that return DOM elements and expose a `cleanup()` method to safely tear down event listeners. There is no framework, no virtual DOM, and no build-time abstractions beyond TypeScript compilation. The entire runtime footprint is the compiled output of a handful of TypeScript files.

The project is fully covered by an automated test suite using Jest, Testing Library, and jsdom, and enforces strict TypeScript settings, ESLint rules, and Prettier formatting through a pre-commit hook.

## Technologies used

1. Typescript
2. CSS3
3. HTML5
4. Vite

## Libraries used

The stack above is wired together through the following packages — no production dependencies are pulled in at runtime, all tooling lives in `devDependencies`.

#### Dependencies

```
No production dependencies - Pure Vanilla TypeScript
```

#### devDependencies

```
"@eslint/js": "^9.39.2"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"eslint": "^9.39.2"
"eslint-config-prettier": "^10.1.8"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^17.3.0"
"husky": "^9.1.7"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^16.2.7"
"prettier": "^3.8.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.14.0"
"vite": "^7.1.6"
```

## Getting Started

With the dependencies above in mind, the local setup is a straightforward Node workflow:

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`.

## Testing

Once the app runs locally, the same toolchain powers the automated test suite (Jest + Testing Library + jsdom):

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security Audit

Beyond the test suite, dependency health is validated through npm's built-in audit tool.

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Known Issues

None at the moment.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/tally`](https://www.diegolibonati.com.ar/#/project/tally)
