import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTodo = async (text: string, username: string) => {
	return await prisma.todo.create({
		data: {
			text: text,
			user: {
				connect: { username: username },
			},
		},
	});
};

export const fetchTodos = async (username: string) => {
	return await prisma.user
		.findUnique({
			where: { username: username },
		})
		.todos();
};

export const getTodoById = async (id: number) => {
	return await prisma.todo.findUnique({
		where: { id: id },
	});
};

export const updateTodoById = async (
	id: number,
	text: string,
	done?: boolean
) => {
	return await prisma.todo.update({
		where: { id: id },
		data: { text: text, done: done },
	});
};

export const removeTodo = async (id: number) => {
	return await prisma.todo.delete({
		where: { id: id },
	});
};
