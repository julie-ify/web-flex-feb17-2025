// example of a pure function

const add = (num1, num2) => {
	const value = num1 + num2 + 5;
	return value;
};

// console.log(add(2, 3)) // return 10
// console.log(add(2, 3)) // return 10
// console.log(add(2, 3)) // return 10

// example of an impure function
let num3 = 0;

const sum = (num1, num2) => {
	const value = num1 + num2 + num3;
	console.log(value)
	return value;
};

console.log(sum(2, 3)) // 5
num3 = 6
console.log(sum(2, 3)) // 11