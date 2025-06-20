import { useState, useEffect } from 'react';

const Timer = () => {
	const [timer, setTimer] = useState(10);

	// setTimeout
	useEffect(() => {
		if (timer === 0) return;

		const intervalId = setInterval(() => {
			setTimer((prev) => prev - 1);
		}, 1000);

		// unmount - when your component is removed from the DOM
		// mount - when your component is created and added to the DOM

		// cleanup function is optional
		// cleanup when the component unmount or before you run the next effect

		const cleanup = () => {
			clearInterval(intervalId);
		};

		return cleanup;
	}, [timer]);

	return (
		<div>
			<h1>Countdown Timer</h1>
			<p>Timer remaining: {timer}</p>
		</div>
	);
};

export default Timer;
