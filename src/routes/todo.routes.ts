import express from 'express';
import { protect } from '../middleware/auth.middleware';
import {
	getTodos,
	addTodo,
	updateTodo,
	deleteTodo,
} from '../controllers/todo.controller';

const router = express.Router();

router.get('/', protect, getTodos);
router.post('/', protect, addTodo);
router.put('/:id', protect, updateTodo);
router.delete('/:id', protect, deleteTodo);

export { router };
