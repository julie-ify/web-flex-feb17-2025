# Lecture: State Management and Immutable Update Patterns

### To Do

- [x] Recap: Components, Props, and State
- [x] Stale state and `prev`
- [x] Immutable Update Patterns with Arrays and Objects
- [x] Update state using the spread operator
- [x] Updating Complex State
- [x] Demonstrate `useReducer`

### Components

- The building blocks of a React app.
- Encapsulate logic and UI in reusable, isolated containers.
- Help manage complexity by hiding details behind simple interfaces.

```js
const Navbar = () => {
	return <h1>Welcome, John!</h1>;
};
```

### Props

- Data passed from parent component to child component.
- They are `read-only`, meaning the child component cannot modify them.

```js
const Navbar = (props) => {
	return <h1>Welcome, {props.username}!</h1>;
};
```

### State

- Data managed within a component.
- Local and persistent through renders.
- Modified/updated using the `useState` hook.

```js
const [count, setCount] = useState(0);
```

### What Is Stale State?

- React state updates are asynchronous. If you're updating state based on the current state, and especially if you're doing it multiple times in a row, there's a chance you'll use an outdated value (called stale state).
- If you reference state directly inside a state-setting function, it might be out of date.
- React batches state updates for performance.

- Example of Stale State

```js
const [count, setCount] = useState(0);

// This won't increment twice as expected
const handleClick = () => {
	setCount(count + 1);
	setCount(count + 1);
};

// count + 1 is evaluated twice with the same value of count (0), so both calls set it to 1.
```

- Solution: Use the Callback Form

```js
const handleClick = () => {
	setCount((prev) => prev + 1);
	setCount((prev) => prev + 1);
};
```

- prev is the latest value of the state when the update runs.
- Always use this form when you’re updating based on the previous state.

### Immutable Update Patterns

- Immutability is an important concept in functional programming.
- In React, you shouldn’t modify state directly.
- Instead, always make a copy of the data you want to change.

From Wikipedia:

> "A persistent data structure is a data structure that always preserves the previous version of itself when it is modified."

### Why Immutability Matters

- Immutable data structures are simpler to construct, test, and use.
- Immutable data is side-effect free (avoids weird bugs in our app).
- Makes it possible to compare the current data to the previous version to see what has changed.
- Predictable updates making React re-render when state changes.

### Common Gotchas with Arrays and Objects

- Arrays and objects in JavaScript are stored as references which means that we can easily change the original object/array without meaning to.

```js
const obj1 = { name: 'Alice' };
const obj2 = obj1; // Obj2 has the same reference as Obj2

obj2.name = 'Bob';
console.log(obj1.name); // 'Bob' 😱
```

- This happens because both obj1 and obj2 point to the same memory. Mutating one affects the other.

### How to Copy and Update State

- Objects:

```js
const user = { name: 'Alice', age: 27 };

// Spread to copy
const newUser = { ...user, name: 'Bob' };

console.log(newUser); // { name: 'Bob', age: 27 }
console.log(user); // { name: 'Alice', age: 27 }
```

- Arrays:

```js
const list = [1, 2, 3];

// Add an item
const newList = [...list, 4];

// Remove an item
const filteredList = list.filter((n) => n !== 2);

// Update an item
const updatedList = list.map((n) => (n === 2 ? 99 : n));
```

- Array methods that don't return a new array are not "pure" (ie. they mutate the original array)

```js
// Mutating (Don't use on state)
array.sort();
array.pop();
array.push();
array.splice();

// Non-Mutating (Safe to use)
const newArr = array.concat();
const newArr = array.map();
const newArr = array.filter();
const newArr = array.slice();
const newArr = [...array];
```

### Updating Complex/Nested State

- React doesn’t deeply watch objects so you need to manually copy nested pieces too.

Bad Example (mutates nested object):

```js
const [person, setPerson] = useState({
	name: 'John',
	hobbies: ['coding'],
});

// This mutates the nested array
person.hobbies.push('reading');
setPerson(person);
```

Good Example (create a new object with new array):

```js
const [person, setPerson] = useState({
	name: 'John',
	hobbies: ['coding'],
});

setPerson((prev) => {
	return {
		...prev,
		hobbies: [...prev.hobbies, 'reading'],
	};
});
```

Full Deep Copy Pattern:

```js
const state = {
	user: {
		name: 'John',
		hobbies: ['coding'],
	},
};

// Shallow copy: nested array is still shared
const copy = { ...state };

// Deep copy
const deepCopy = {
	...state,
	user: {
		...state.user,
		hobbies: [...state.user.hobbies, 'reading'],
	},
};
```

### useReducer: Managing Complex State Logic

- `useReducer` is a React Hook that is useful when:

  - You have **multiple related state values**
  - Your updates depend on the **previous state**
  - State is **complex or deeply nested**
  - You want a **centralized way to update state**

### Summary

- Don’t mutate state — always copy and update
- Use `...` spread operator to copy arrays/objects
- Use functions like `map()`, `filter()`, `concat()` to return new versions
- Use the callback form of `setState()` when needed
- Use `useReducer` for complex states

### Useful Links

- [React Docs: Updating Objects in State](https://react.dev/learn/updating-objects-in-state)
- [React Docs: useReducer](https://react.dev/reference/react/useReducer)
- [ES6 Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [Wikipedia: Persistent Data](https://en.wikipedia.org/wiki/Persistent_data_structure)
