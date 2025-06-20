# Lecture: Data Fetching & Other Side Effects (in React)

## Lecture Outline

- [x] Pure Functions and Side Effects
- [x] `useEffect` Hook
- [x] Dependency Array
- [x] Cleanup
- [x] Data Fetching
- [x] _useEffect Flow_

## Pure Functions

> In JavaScript (and functional programming in general), a **pure function** is a function that meets **two key criteria**:

- Have no side effects

  - It does not modify external variables or state
  - It does not read from global state
  - It does not change the DOM
  - It does not write to a file, send a network request, log to the console, etc.
  - It only does one thing: **returns a value**.

- Always return the same output for the same input.

  - Given the same arguments, a pure function will always return the same result
  - It behaves predictably.

### Examples of Pure Functions

```js
const sum = (num1, num2) => {
	let count = num1 + num2 + 5;
	return count;
};

sum(2, 3); // returns 10
sum(2, 3); // always returns 10
```

### Examples of Impure Functions

```js
let num3 = 5;
const sum = (num1, num2) => {
	let count = num1 + num2 + num3;
	return count;
};

sum(2, 3); // 10 (because num3 is 5)

num3 = 10;
sum(2, 3); // 15 (changed!)
```

```js
const getUser = () => {
	fetch('https://jsonplaceholder.typicode.com/posts'); // performs a side effect
};
```

## What is a side effect

> A side effect is anything a function does that affects the outside world or depends on it, beyond returning a value.

### Side effect in React

> A side effect is any interaction with the outside world from inside a component. Anything that isn't directly related to rendering JSX from props/state.

> We handle **side effects** in React because **components should be pure**, that is, their output (the UI) should depend only on their props and state. But real-world apps need to do more than just render HTML. They need to:

- Fetch data from APIs
- Set up timers
- Log to analytics
- Add/remove event listeners
- Work with non-React libraries or the DOM directly

> All of those are **side effects**. They interact with systems outside React's rendering cycle, and therefore **must not happen during rendering**.

### Why can't we just do side effects directly in the component body?

- Because React renders components many times:

  - On mount (when the component is added to the DOM)
  - On every state/prop change (when component is re-rendered)
  - Sometimes even twice in Strict Mode (to catch bugs)

- So if we put side effect logic (like `fetch()` or `setInterval()`) in the component body, we’d:

  - Fetch data **multiple times**
  - Set up multiple intervals or event listeners
  - Cause memory leaks and buggy behavior

### Common side effects in React

- Setting timers or intervals
- DOM manipulation (outside of JSX)
- Network requests / API requests
- Logging
- Subscribing to events
- WebSocket

## useEffect Hook

- useEffect hook allows you to run side effects after the component renders.

### Syntax

```jsx
useEffect(() => {
	// side effect logic
}, [dependencies]);
```

### Why use `useEffect`?

- React provides the `useEffect()` hook to let you:
  - **Perform side effects** after the component renders
  - **Control when they run** (using the dependency array)
  - **Clean them up** when the component unmounts or dependencies change

## Dependency Array

- The second argument to `useEffect` is a dependency array that lets you specify when you want the hook to run

```jsx
useEffect(() => {}); // runs on every render
useEffect(() => {}, [someVar]); // runs on mount and when someVar changes
useEffect(() => {}, []); // runs only once on mount
```

### Some rules of Hooks

- Call hooks only at the top level (not inside conditionals or loops).
- Call hooks only inside React functions.

### Best Practices

- Don't blindly include all state/props
- Be aware of stale closures
- Avoid unnecessary rerenders

## Cleanup Function

- The useEffect hook can also return a cleanup function that will be called when the component unmounts.
- This is useful for cleaning up after an effect runs (like removing an event listener or clearing a timer)

### Why We Need to Clean Up Effects Like:

- `setInterval`

  - These keep running in the background even after the component unmounts.
  - If not cleared, they may try to update state on a component that no longer exists, causing memory leaks or errors like:

  ```vbnet
  Warning: Can't perform a React state update on an unmounted component
  ```

- WebSocket Connections

  - These stay open and active unless explicitly closed.
  - Without cleanup, they may continue to send/receive data unnecessarily and consume resources.

- Event Listeners

  - If not removed, they can accumulate with every mount/unmount cycle, leading to duplicate or unintended behavior.

### Example of a `setInterval cleanup`

```jsx
import { useEffect, useState } from 'react';

const Timer = () => {
	const [timer, setTimer] = useState(10);

	useEffect(() => {
		if (timer === 0) return; // Stop when timer reaches 0

		const interval = setInterval(() => {
			setTimer((prev) => prev - 1);
		}, 1000); // Decrement every 1 second

		// Cleanup the interval when component unmounts or before next effect runs
		return () => {
			clearInterval(interval);
		};
	}, [timer]); // Re-run effect whenever timer changes

	return (
		<div>
			<h1>Countdown Timer</h1>
			<p>{`Time left: ${timer}`}</p>
		</div>
	);
};

export default Timer;
```

## Data Fetching in React

- `fetch()` Example

```jsx
const MyComponent = () => {
	const [post, setPosts] = useState([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then((res) => res.json())
			.then((data) => setPosts(data))
			.catch((err) => console.error(err));
	}, []);

	return (
		<div>
			{posts.map((post) => {
				return <p key={post.id}>title: {post.title}</p>;
			})}
		</div>
	);
};
```

- `axios` Example

```jsx
import axios from 'axios';

const MyComponent = () => {
	const [post, setPosts] = useState([]);

	useEffect(() => {
		axios
			.get('https://jsonplaceholder.typicode.com/posts')
			.then((response) => setPosts(response.data))
			.catch((error) => console.error(error));
	}, []);

	return (
		<div>
			{posts.map((post) => {
				return <p key={post.id}>title: {post.title}</p>;
			})}
		</div>
	);
};
```

### Combining Promises

- Use `Promise.all` for parallel requests

```jsx
useEffect(() => {
	Promise.all([
		fetch('http://localhost:8001/api/photos').then((res) => res.json()),
		fetch('http://localhost:8001/api/topics').then((res) => res.json()),
	])
		.then(([data1, data2]) => {
			// use both datasets
		})
		.catch((error) => console.error(error));
}, []);
```

## useEffect Flow in React (Functional Components)

- React renders your component
  - JSX is turned into HTML (virtual DOM diffing + actual DOM updates).
  - This is a **pure render**; no side effects yet.
- DOM is updated on the screen
  - The user sees the updated UI.
- Cleanup (if applicable)
  - React runs any cleanup function returned from the **previous effect**.
- Effect is executed
  - React runs the **new** `useEffect()` **callback** after painting the screen.

## Useful Links

- [React Docs: useEffect Hook](https://react.dev/reference/react/useEffect)
- [React Docs: Hook Rules](https://legacy.reactjs.org/docs/hooks-rules.html)
- [Axios](https://axios-http.com/docs/intro)
