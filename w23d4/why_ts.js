// @ts-check
const compact = (arr) => {
	if(arr.length > 5) {
		return arr.slice(0, 5);
	}

	return arr
}

console.log(compact([1, 2, 3, 4, 5, 6, 7]))