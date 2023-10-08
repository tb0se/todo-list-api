import { z } from 'zod';

export const addTodoSchema = z.object({
	text: z
		.string({
			required_error: 'Text is required',
			invalid_type_error: 'Text must be a string',
		})
		.min(3, { message: 'Text must be 3 or more characters' })
		.max(30, { message: 'Text must be 30 or fewer characters' }),
});

export const updateTodoSchema = z
	.object({
		id: z
			.number({
				required_error: 'Id is required',
				invalid_type_error: 'Id must be a number',
			})
			.int({ message: 'Id is incorrect format' })
			.positive({ message: 'Id cannot be negative' })
			.finite({ message: 'Id is incorrect format' })
			.safe({ message: 'Id is incorrect format' }),
		text: z
			.string({
				required_error: 'Text is required',
				invalid_type_error: 'Text must be a string',
			})
			.min(3, { message: 'Text must be 3 or more characters' })
			.max(30, { message: 'Text must be 30 or fewer characters' })
			.optional(),
		done: z
			.boolean({
				required_error: 'Done is required',
				invalid_type_error: 'Done must be a string',
			})
			.optional(),
	})
	.refine((input) => input.text !== undefined || input.done !== undefined, {
		message: 'Either text or done is required',
	});

export const deleteTodoSchema = z.object({
	id: z
		.number({
			required_error: 'Id is required',
			invalid_type_error: 'Id must be a number',
		})
		.int({ message: 'Id is incorrect format' })
		.positive({ message: 'Id cannot be negative' })
		.finite({ message: 'Id is incorrect format' })
		.safe({ message: 'Id is incorrect format' }),
});
