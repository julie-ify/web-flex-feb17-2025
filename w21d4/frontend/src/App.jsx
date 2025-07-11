import './App.css';
import TodoItem from './components/todos/TodoItem';
import Form from './components/todos/Form';
import useAppData from './hooks/useAppData';

const App = () => {
	const { todos, onAdd, onDelete } = useAppData();

	// axios.get('http://localhost:3001/api/todos')
	// .then((res) => setTodos(res.data));

	// useEffect(() => {}) // on mount and on every re-render
	// useEffect(() => {}, []) // run on mount only
	// useEffect(() => {}, [someState]) // run on mount and everytime someState changes

	return (
		<div>
			<h1>Welcome to my Todo App</h1>
			<Form onAdd={onAdd} />
			<ul>
				{todos.map((todo) => {
					return <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />;
				})}
			</ul>
		</div>
	);
};

export default App;
