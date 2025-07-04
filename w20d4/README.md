## End-to-End Testing with Cypress

### Learning Objectives

- [x] Identify the difference between Jest and Cypress
- [x] Install and configure Cypress in a project
- [x] Design End-to-End tests with Cypress
- [x] Write End-to-End tests with Cypress

### What is End-to-End Testing?

End-to-end (E2E) testing checks if the entire application works as expected from the user's perspective. It's like simulating a real user interacting with your app: typing, clicking, and navigating.

### Benefits of End-to-End tests

- Ensure full application functionality
- Reflect real user experience
- Support collaboration across teams
- Serve as integration tests

### Jest vs Cypress

- **Jest**

  - Command line test runner
  - Runs very fast
  - Mostly used for Unit & Integration testing
  - Best for testing functions, components, and logic in isolation
  - Runs in a Node.js environment, not a real browser
  - Supports mocking, spies, and snapshot testing
  - Ideal for test-driven development (TDD) workflows

- **Cypress**
  - Opens an interactive browser (GUI) for debugging
  - Used for Integration & End-to-End testing
  - Performs operations and interacts with the site the way that a real user would (e.g. clicks, typing, scrolling)
  - Simulates real browser behavior and is great for full user flows
  - Runs in a real browser environment, giving access to actual DOM elements
  - Comes with automatic waits and retry logic for DOM updates
  - Built on Mocha and uses Chai for assertions
  - Supports time-travel debugging (see the state of your app at each step)
  - Has built-in screenshot and video recording for test runs
  - Great for catching layout issues and UI bugs

### Installing and Configuring Cypress

#### Step 1: Install Cypress

Cypress can be installed locally to the project (as a dev dependency) or globally on your OS

**Local installation (preferred):**

```bash
npm install --save-dev cypress
```

**Global installation:**

```bash
npm install -g cypress
```

#### Step 2: Run Cypress

If installed locally:

```bash
npx cypress open
```

If installed globally:

```bash
cypress open
```

You can add a script to `package.json` for a quick way to start Cypress:

```json
"scripts": {
  "cypress": "cypress open -P"
}
```

Then run:

```bash
npm run cypress
```

### Cypress Configuration

- We use the `cypress.config.js` file in the main directory to configure Cypress
- Create a `cypress.config.js` file:

```js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000',
		viewportHeight: 1280,
		viewportWidth: 1200,
	},
});
```

### Notes:

- `baseUrl`: where your app is running locally
- `viewportWidth` and `viewportHeight` specify the dimensions for Cypress browser to use (you can adjust these values for mobile testing)

### Writing Cypress Tests

Create a file like `cypress/e2e/homepage.cy.js`

```js
describe('Homepage', () => {
	it('should load the homepage', () => {
		cy.visit('/');
		cy.contains('Welcome');
	});
});
```

### What this test does:

- Visits the homepage
- Verifies "Welcome" text is visible

### Cypress Features

- Built on top of **Mocha** (test framework) and **Chai** (assertions)
- jQuery built-in: use `Cypress.$('selector')`
- Automatically waits for elements (no need for `setTimeout`)
- Live reloads test on save

### Useful Links

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)


