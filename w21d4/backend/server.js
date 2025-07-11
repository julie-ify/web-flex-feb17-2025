const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
let todos = require('./data');

const app = express();
const PORT = 3001;

// middewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // parses JSON and attach it to the req.body

// GET - /api/todos
app.get('/api/todos', (req, res) => {
	res.json(todos);
});

let nextId = 4;
// POST - /api/todos
app.post('/api/todos', (req, res) => {
	const task = req.body.task;
	const todo = {
		id: nextId++,
		task,
		done: false,
	};

	todos.push(todo);
	res.status(201).json(todo);
});

// DELETE - /api/todos/:id
app.delete('/api/todos/:id', (req, res) => {
	const id = Number(req.params.id);

	todos = todos.filter((todoId) => todoId.id !== id);
	res.status(204).end();
});

app.listen(PORT, () => {
	console.log(`the server is running on port ${PORT}`);
});
