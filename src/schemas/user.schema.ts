import { z } from 'zod';

export const registerUserSchema = z.object({
	username: z
		.string({
			required_error: 'Username is required',
			invalid_type_error: 'Username must be a string',
		})
		.min(3, { message: 'Username must be 3 or more characters' })
		.max(30, { message: 'Username must be 30 or fewer characters' }),
	email: z
		.string({
			required_error: 'Email address is required',
			invalid_type_error: 'Email address must be a string',
		})
		.email({ message: 'Email address is incorrect format' }),
	password: z
		.string({
			required_error: 'Password is required',
			invalid_type_error: 'Password must be a string',
		})
		.min(8, { message: 'Password must be 8 or more characters' }),
});

export const loginUserSchema = z.object({
	username: z
		.string({
			required_error: 'Username is required',
			invalid_type_error: 'Username must be a string',
		})
		.min(3, { message: 'Username must be 3 or more characters' })
		.max(30, { message: 'Username must be 30 or fewer characters' }),
	password: z
		.string({
			required_error: 'Password is required',
			invalid_type_error: 'Password must be a string',
		})
		.min(8, { message: 'Password must be 8 or more characters' }),
});
