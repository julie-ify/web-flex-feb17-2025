# Intro to TypeScript

## Agenda

- [x] What is TypeScript?
- [x] Why TypeScript?
- [x] Installing & Using TypeScript CLI
- [x] Static vs Dynamic Typing
- [x] Primitive Types
- [x] Arrays & Objects
- [x] Functions & Methods
- [x] Union Types & Generics
- [x] Structural Typing (Duck Typing)

## What is TypeScript?

- Created by Microsoft in 2012.
- Superset of JavaScript – adds types, compiles to JavaScript.
- A programming language that contains all the features of JavaScript language and has been expanded or enhanced to include other features as well.
- Statically typed – catches errors during compile time, not at runtime.
- Runs anywhere JavaScript runs: browser, Node.js etc.
- Supports type inference, so you don’t always have to annotate.
- All JavaScript is valid TypeScript

## Why TypeScript?

Let’s look at a JavaScript bug:

```js
function compact(arr) {
	if (orr.length > 5) {
		return arr.slice(0, 5);
	}
	return arr;
}
// JS gives no error — it fails at runtime.
```

But with TypeScript:

```js
// @ts-check
function compact(arr) {
	if (orr.length > 5) {
		return arr.slice(0, 5);
	}
	return arr;
}

// Error! Cannot find name 'orr' — caught at compile-time!
```

## Installing & Using TypeScript CLI

Install globally:

```bash
npm install -g typescript
tsc --version
```

Initialize:

```bash
tsc --init # creates tsconfig.json
```

Compile files:

```bash
tsc index.ts             # outputs index.js
tsc index.ts --watch     # watches file changes
tsc index.ts --target es6
tsc index.ts --outFile bundle.js
```

> The tsc compiler scans code for type errors before producing `.js` output. Configuration lives in tsconfig.json.

## Static vs Dynamic Typing

- JavaScript is a dynamically typed language
  - Types are determined at runtime.
  - You don’t declare variable types — JavaScript figures it out as the program runs.
  - You can reassign variables to values of different types.

```js
let username = 'Mary';
username = 1; // JS allows it
```

- TypeScript is statically typed language
  - Types are known at compile time — before the code runs.
  - You must (or can) specify types for variables, function parameters, and return values.
  - The compiler will throw errors before you run the code if types don’t match.

```ts
let username = 'Mary';
username = 1; // TS doesn't allows it. It produced Error!
```

## Primitive Types

- Types can be specified using colon (`:`) syntax immediately after the variable name

```ts
const str: string = 'hello world!';
const isLoggedIn: boolean = false;
const num: number = 3.14;
```

- Assigning the wrong type causes a compile error:

```ts
let age: number = 30;
age = 'thirty'; // error TS2322: Type 'string' is not assignable to type 'number'.
```

## Arrays

- Arrays are just collections of a type

```ts
// let TS know that the arr will hold numbers only
const numbers: number[] = [1, 2, 3];
numbers.push(4);
numbers.push('five'); // error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
```

```ts
// let TS know that the arr will hold numbers and booleans
const mixed: (number | boolean)[] = [1, true, 2];
```

## Objects & Interfaces

- Objects are more complex
- We use interface to create the shape of our object
- Interfaces enforce structure
- Interfaces can inherit from other interfaces

```ts
interface Author {
	name: string;
	age: number;
	isActive: boolean;
}

const mary: Author = {
	name: 'Mary Jane',
	age: 30,
	isActive: true,
}; // no error

const mary: Author = {}; // error TS2739: Type '{}' is missing the following properties from type 'Author': name, age, isActive
```

- Optional Parameter

```ts
interface Author {
	name: string;
	age?: number; // optional params are marked with a question mark (?)
	isActive: boolean;
}

const mary: Author = {
	name: 'Mary Jane',
	isActive: true,
}; // no error

// Type Assertion
const mary: Author = {}; // error!
const stephen = {} as Author; // Bypasses type check — Use as with caution as it completely removes the type safety
```

## Functions

- For functions, we specify the type of the arguments and the return type

```ts
// sayHello accepts a string as an argument and returns a string
const sayHello = (name: string): string => {
	return `Hello ${name}`;
};
```

- Return void if no value is returned:

```ts
const logName = (name: string): void => {
	console.log(name);
};
```

- Async function with return type:

```ts
const fetchUser = (id: number): Promise<string> => {
	return new Promise((resolve) => resolve(`User ${id}`));
};
```

- For functions in an Object, we specify the type of the arguments and the return type like so:

```ts
interface Author {
	name: string;
	age?: number;
	isActive: boolean;
	writeBook: (title: string) => boolean;
}
```

## Union Types

- With a union, you can declare that a type could be one of many types.

```ts
let value: string | number;
value = 42;
value = 'hello';
value = true; // Error

let numbers: (string | number)[] = [1, 'hello'];
numbers.push(true); // error TS2345: Argument of type 'boolean' is not assignable to parameter of type 'string | number'.
```

- Useful for flexible input types:

```ts
function getLength(input: string | string[]): number {
	return input.length;
}
```

- Literal unions

```ts
type WindowStates = 'open' | 'closed' | 'minimized';
type PositiveOdd = 1 | 3 | 5 | 7 | 9;

let windowStates: WindowStates = 'open';
windowStates = 'closed';
windowStates = true; // error! Type 'true' is not assignable to type 'WindowStates'.ts(2322)
```

## Generics

- Generics allow us to pass a variable to a type
- We specify the variable in between greater than (`<`) and less than (`>`) signs
- It is common to shorten `Type` to simply `T`

```ts
interface Container<Type> {
	title: string;
	contents: Type;
}

const stringContainer: Container<string> = {
	title: 'Books',
	contents: '1984',
};

const numContainer: Container<number> = {
	title: 'Books',
	contents: 1984,
};
```

- Generic arrays:

```TS
type StringArray = Array<string>;
type ObjectArray = Array<{ name: string }>;
```

## Duck Typing (Structural Typing)

- "If it looks like a duck, walks like a duck, and quacks like a duck, then it's probably a duck." - idiom
- If an object matches the shape, it passes the check
- If TypeScript can infer the type for us, then we don't need to specify it

```ts
// no need to specify string type
const name = 'Alice';
```

```ts
interface User {
	username: string;
	password: string;
}

const logIn = (user: User): boolean => {
	return user.username === 'admin';
};

const user = {
	username: 'admin',
	password: '1234',
};

logIn(user); // works — structure matches
```

```ts
// however, if the object is missing something...
const potentialUser = {
	username: 'johnstamos',
};

const loggedIn = logInUser(potentialUser); // error! Argument of type '{ username: string; isLoggedIn: boolean; }' is not assignable to parameter of type 'User'.
// Property 'password' is missing in type '{ username: string; isLoggedIn: boolean; }' but required in type 'User'.ts(2345)
```

## Extra Notes

- primitive types available in JavaScript: `boolean`, `bigint`, `null`, `number`, `string`, and `undefined`, which you can use in an interface.
- TypeScript introduces advanced types: such as `any` (allow anything), `unknown` (ensure someone using this type declares what the type is), `never` (it’s not possible that this type could happen), and `void` (a function which returns undefined or has no return value).
- Use interface when possible; use `type` when you need `unions`, `intersections`, or `advanced features`

## Useful Links

- [TypeScript Official Site](https://www.typescriptlang.org/)
- [TypeScript Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [TypeScript Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- [TypeScript in 5 Minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
