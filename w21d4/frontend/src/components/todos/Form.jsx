import { useState } from 'react';

const Form = (props) => {
	const [task, setTask] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		props.onAdd(task);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="add-task">Add Task</label>
			<div>
				<input
					type="text"
					id="add-task"
					value={task}
					onChange={(e) => setTask(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</div>
		</form>
	);
};

export default Form;
