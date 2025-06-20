import { useEffect, useState } from 'react';

const Count = () => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		document.title = `Count: ${count}`;
	}, [count]); // runs on mount and when count changes

	// useEffect(() => {
	// 	document.title = 'Count';
	// }); // runs on every render

	// useEffect(() => {
	// 	document.title = `Count: ${count}`
	// }, []) // runs only once on mount

	return (
		<div>
			<h1>Counter: {count}</h1>
			<button onClick={() => setCount((prev) => prev + 1)}>increment!</button>
		</div>
	);
};

export default Count;
