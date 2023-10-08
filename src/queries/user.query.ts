import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (
	username: string,
	email: string,
	password: string
) => {
	return await prisma.user.create({
		data: {
			username: username,
			email: email,
			password: password,
		},
	});
};

export const getUserByUsername = async (username: string) => {
	return await prisma.user.findUnique({
		where: { username: username },
	});
};

export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
		where: { email: email },
	});
};

export const getUserById = async (id: number) => {
	return await prisma.user.findUnique({
		where: { id: id },
	});
};
