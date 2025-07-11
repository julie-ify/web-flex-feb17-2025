const TodoItem = (props) => {
	return (
		<li className="d-flex">
			<p>task: {props.todo.task}</p>
			<button onClick={() => props.onDelete(props.todo)}>Delete</button>
		</li>
	);
};

export default TodoItem;
