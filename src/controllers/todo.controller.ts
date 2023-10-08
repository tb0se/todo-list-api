import asyncHandler from 'express-async-handler';
import { CustomRequest } from '../types/index';
import { getUserById } from '../queries/user.query';
import {
	createTodo,
	fetchTodos,
	getTodoById,
	removeTodo,
	updateTodoById,
} from '../queries/todo.query';
import {
	addTodoSchema,
	deleteTodoSchema,
	updateTodoSchema,
} from '../schemas/todo.schema';
import { prettyError } from '../utils';

const addTodo = asyncHandler(async (req: CustomRequest, res) => {
	const valid = addTodoSchema.safeParse(req.body);
	if (!valid.success) {
		res.status(400);
		throw new Error(prettyError(valid.error.errors));
	}
	const { text } = req.body;

	const user = await getUserById(Number(req.user?.id!));

	if (!user) {
		res.status(400);
		throw new Error('User does not exist');
	}

	const result = await createTodo(text, user.username);
	if (result) {
		res.status(201).json({
			_id: result.id,
			text: result.text,
		});
	} else {
		res.status(400);
		throw new Error('Invalid data');
	}

	res.status(500);
	throw new Error(
		'Unfortunately we are experiencing a technical error please try again'
	);
});

const getTodos = asyncHandler(async (req: CustomRequest, res) => {
	if (!req.user) {
		res.status(500);
		throw new Error(
			'Unfortunately we are experiencing a technical error please try again'
		);
	}

	const { id } = req.user;

	const user = await getUserById(Number(id));

	if (!user) {
		res.status(400);
		throw new Error('User does not exist');
	}
	const todos = await fetchTodos(user.username);

	res.status(200).json(todos);
});

const updateTodo = asyncHandler(async (req: CustomRequest, res) => {
	const { id } = req.params;
	const { text, done } = req.body;
	const valid = updateTodoSchema.safeParse({ id: Number(id), text, done });
	if (!valid.success) {
		res.status(400);
		throw new Error(prettyError(valid.error.errors));
	}

	const todo = await getTodoById(Number(id));

	if (!todo) {
		res.status(400);
		throw new Error('Todo not found');
	}

	if (!req.user) {
		res.status(500);
		throw new Error(
			'Unfortunately we are experiencing a technical error please try again'
		);
	}
	const user = await getUserById(Number(req.user.id));

	// Check for user
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Make sure the logged in user matches the goal user
	if (todo.userId !== user.id) {
		res.status(401);
		throw new Error('User not authorised');
	}

	const result = await updateTodoById(todo.id, text, done);
	if (result) {
		res.status(200).json({
			id: result.id,
			text: result.text,
			done: result.done,
		});
	} else {
		res.status(400);
		throw new Error('Invalid data');
	}

	res.status(500);
	throw new Error(
		'Unfortunately we are experiencing a technical error please try again'
	);
});

const deleteTodo = asyncHandler(async (req: CustomRequest, res) => {
	const { id } = req.params;
	const valid = deleteTodoSchema.safeParse({ id: Number(id) });
	if (!valid.success) {
		res.status(400);
		throw new Error(prettyError(valid.error.errors));
	}

	const todo = await getTodoById(Number(id));

	if (!todo) {
		res.status(400);
		throw new Error('Todo not found');
	}

	if (!req.user) {
		res.status(500);
		throw new Error(
			'Unfortunately we are experiencing a technical error please try again'
		);
	}
	const user = await getUserById(Number(req.user.id));
	// Check for user
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Make sure the logged in user matches the goal user
	if (todo.userId !== user.id) {
		res.status(401);
		throw new Error('User not authorised');
	}

	const result = await removeTodo(Number(id));
	if (result) {
		res.status(204).json({
			id: result.id,
		});
	} else {
		res.status(400);
		throw new Error('Invalid data');
	}

	res.status(500);
	throw new Error(
		'Unfortunately we are experiencing a technical error please try again'
	);
});

export { getTodos, addTodo, updateTodo, deleteTodo };
