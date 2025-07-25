let username: string = 'Mary';
let num: number = 1;
// num = 'String';
let isActive: boolean = true;
// isActive = 1
let unDefined = undefined;
unDefined = undefined;

// Arrays
const numbers: (string | number)[] = [1, 2, 3];
numbers.push('a');
// numbers.push(true)

// objects
const myObj = {
	username: 'Mary',
	age: 1,
	pets: {
		dog: 'god1',
	},
	arr: [1, 2, 3],
};

// interface
interface Person {
	id?: number;
	username: string;
	age: number;
	isActive: boolean;
}

const mary: Person = {
	username: 'Mary',
	age: 40,
	isActive: true,
};

const john: Person = {
	username: 'John',
} as Person;

// Functions
// input => type
// output => type

const sayHello = (name: string): string => {
	return `Hello ${name}`;
};

// console.log(sayHello('string'));

// void
const logName = (name: string): void => {
	console.log(name);
};

// async function
const fetchUser = (id: number): Promise<string> => {
	return new Promise((resolve, reject) => {
		if (id === 1) {
			return resolve(`User id ${id}`);
		}

		return reject(`ERROR!: User id. ${id}`);
	});
};

fetchUser(2)
	.then((res) => console.log(res))
	.catch((err) => console.log(err));

interface Animal {
	name: string;
	sayHello?: (name: string) => string;
}

// interface Cat extends Animal {
// 	owner: string
// }

interface Cat {
	owner: string;
	details: Animal;
}

const mySecondCat: Cat = {
	owner: 'second cat',
	details: {
		name: 'second',
	},
};

// const myCat: Cat = {
// 	name: 'cat',
// 	owner: 'me'
// }

const dog: Animal = {
	name: 'dog',
	sayHello: (name) => {
		return `Hello ${name}`;
	},
};

// Union Types
let value: string | number | boolean = 2;
(value = 'hello'), (value = true);

const getLength = (input: string | number): string | number => {
	return 1;
};

type WindowState = 'open' | 'closed' | 'minimized';

const windowState: WindowState = 'open';
// const windowState2: WindowState = 'removed'


// Generic
interface Container<Type> {
	title: string,
	contents: Type
}

const stringContainer: Container<string> = {
	title: 'Title 1',
	contents: 'content 1'
}

// Structural Typing
// const fName = 'John'
// fName = 1

interface User {
	username: string,
	password: string
}

const firstUser = {
	username: 'Smith',
	password: '123',
}

const logIn = (user: User): boolean => {
	return user.username === 'Smith';
}

logIn(firstUser)
