import { useState, useReducer } from 'react';

const availableToppings = [
	'Cheese',
	'Bacon',
	'Mushrooms',
	'Pepperoni',
	'pineapple',
	'Olives',
];

const reducer = (state, action) => {
	switch (action.type) {
		case 'TOOGLE_TOPPING':
			return {
				...state,
				toppings: action.payload,
			};

		case 'ADD_CRUST':
			return {
				...state,
				crust: action.payload,
			};

		case 'ADD_SIZE':
			return {
				...state,
				size: action.payload,
			};
	}
};

const PizzaBuilder = () => {
	// const [toppings, setToppings] = useState([]);
	// const [crust, setCrust] = useState('Thin');
	// const [size, setSize] = useState('Small');

	const initialState = {
		toppings: [],
		crust: 'Thin',
		size: 'Small',
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	// const [pizza, setPizza] = useState({
	// 	toppings: [],
	// 	crust: 'Thin',
	// 	size: 'Small',
	// });

	const toggleTopping = (topping) => {
		// setPizza((prev) => {
		// 	const updatedToppings = prev.toppings.includes(topping)
		// 		? prev.toppings.filter((t) => t !== topping)
		// 		: [...prev.toppings, topping];

		// 	return {
		// 		...pizza,
		// 		toppings: updatedToppings,
		// 	};
		// });

		const updatedToppings = state.toppings.includes(topping)
			? state.toppings.filter((t) => t !== topping)
			: [...state.toppings, topping];

		dispatch({
			type: 'TOOGLE_TOPPING',
			payload: updatedToppings,
		});
	};

	const addCrust = (crust) => {
		// setPizza((prev) => {
		// 	return {
		// 		...prev,
		// 		crust,
		// 	};
		// });

		dispatch({
			type: 'ADD_CRUST',
			payload: crust,
		});
	};

	const addSize = (size) => {
		// setPizza((prev) => {
		// 	return {
		// 		...prev,
		// 		size,
		// 	};
		// });

		dispatch({
			type: 'ADD_SIZE',
			payload: size,
		});
	};

	return (
		<div>
			<div>
				<label>Choose size:</label>
				<select
					value={state.size}
					onChange={(event) => addSize(event.target.value)}
				>
					<option>Small</option>
					<option>Medium</option>
					<option>Large</option>
				</select>
			</div>

			<div>
				<label>Choose Crust:</label>
				<select
					value={state.crust}
					onChange={(event) => addCrust(event.target.value)}
				>
					<option>Thick</option>
					<option>Thin</option>
					<option>Stuffed</option>
				</select>
			</div>

			<div>
				<p>Select Toppings:</p>
				<div>
					{availableToppings.map((topping, index) => {
						return (
							<button key={index} onClick={() => toggleTopping(topping)}>
								{topping}
							</button>
						);
					})}
				</div>
			</div>

			<div>
				<p>Your Pizza:</p>
				<p>Crust: {state.crust}</p>
				<p>Size: {state.size}</p>
				<div>
					Toppings:{' '}
					{state.toppings.length > 0 ? state.toppings.join(', ') : 'None'}
				</div>
			</div>
		</div>
	);
};

export default PizzaBuilder;
