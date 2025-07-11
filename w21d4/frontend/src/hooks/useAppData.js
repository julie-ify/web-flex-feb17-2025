import { useState, useEffect } from 'react';
import axios from 'axios';

const useAppData = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		axios.get('/api/todos').then((res) => setTodos(res.data));
	}, []);

	const onAdd = (task) => {
		axios
			.post('/api/todos', { task })
			.then((res) => setTodos([res.data, ...todos]));
	};

	const onDelete = (todo) => {
		axios.delete(`/api/todos/${todo.id}`).then((res) => {
			let filteredTodos = todos.filter((t) => t.id !== todo.id);
			setTodos([...filteredTodos]);
		});
	};

	return {
		todos,
		onAdd,
		onDelete,
	};
};

export default useAppData;
