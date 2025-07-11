## Concluding React

## Lecture Objectives

- [x] Create an Express backend
- [x] Create a React frontend
- [x] Data fetching with `useEffect`
- [x] State management and immutable patterns
- [x] Custom hooks

## Running this Demo

#### After Cloning

Open a terminal window:

```bash
cd backend # Enter the backend folder
npm install # Install dependencies
npm start # Start the Express server
```

Open a second terminal window:

```bash
cd frontend # Enter the frontend folder
npm install # Install dependencies
npm run dev # Start the React development server

# Node version 22+ is required
```

Todo App

- BackEnd (Express)
  - API - JSON
- FrontEnd (React)

### Data

```js
let todos = [
	{
		id: 1,
		task: 'Wash the dishes',
		done: false,
	},
	{
		id: 2,
		task: 'Prepare for final project',
		done: false,
	},
	{
		id: 3,
		task: 'Prepare for Ruby',
		done: false,
	},
];
```

### API Endpoints

Index, Create, Delete,

- Index: GET `/api/todos` (Show all todos)
- Create: POST `/api/todos` (create a new todo)
- Delete: DELETE `/api/todos/:id` (Delete a single todo)

### Helpful Resources

- [JavaScript ES6 Module Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Components and Props](https://react.dev/learn/your-first-component)
- [Using the State Hook](https://react.dev/reference/react/useState)
- [useEffect Hook](https://react.dev/reference/react/useEffect)
- [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
