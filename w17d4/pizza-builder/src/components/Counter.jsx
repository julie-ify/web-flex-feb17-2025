import { useState } from 'react';

const Counter = () => {
	const [count, setCount] = useState(0);

	const handleCount = () => {
		// stale state
		// setCount(count + 1);
		// setCount(count + 1);

		setCount((prev) => prev + 1)
		setCount((prev) => prev + 1)
	};

	return (
		<div>
			<p>{count}</p>
			<button onClick={handleCount}>Click me!</button>
		</div>
	);
};

export default Counter;
