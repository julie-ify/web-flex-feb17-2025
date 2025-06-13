const state = ['Cheese'];
const copy = [...state, 'Bacon'];

// copy.push('Mushrooms');

// spread operator

// console.log(state)
// console.log(copy)

const obj = { a: 1, b: 2 };
const objCopy = { ...obj }

objCopy.a = 3
console.log(obj)
console.log(objCopy)