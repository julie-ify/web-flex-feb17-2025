"use strict";
let username = 'Mary';
let num = 1;
// num = 'String';
let isActive = true;
// isActive = 1
let unDefined = undefined;
unDefined = undefined;
// Arrays
const numbers = [1, 2, 3];
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
const mary = {
    username: 'Mary',
    age: 40,
    isActive: true,
};
const john = {
    username: 'John',
};
// Functions
// input => type
// output => type
const sayHello = (name) => {
    return `Hello ${name}`;
};
// console.log(sayHello('string'));
// void
const logName = (name) => {
    console.log(name);
};
// async function
const fetchUser = (id) => {
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
const mySecondCat = {
    owner: 'second cat',
    details: {
        name: 'second',
    },
};
// const myCat: Cat = {
// 	name: 'cat',
// 	owner: 'me'
// }
const dog = {
    name: 'dog',
    sayHello: (name) => {
        return `Hello ${name}`;
    },
};
// Union Types
let value = 2;
(value = 'hello'), (value = true);
const getLength = (input) => {
    return 1;
};
const windowState = 'open';
const stringContainer = {
    title: 'Title 1',
    contents: 'content 1'
};
const firstUser = {
    username: 'Smith',
    password: '123',
};
const logIn = (user) => {
    return user.username === 'Smith';
};
logIn(firstUser);
