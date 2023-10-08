import jwt from 'jsonwebtoken';
import { ZodIssue } from 'zod';

const generateToken = (id: string) => {
	return jwt.sign({ id }, process.env.JWT_SECRET || 'secrettoken', {
		expiresIn: '7d',
	});
};

const prettyError = (error: ZodIssue[]) => {
	const errorMessages = error.map((err) => err.message);
	return errorMessages.toString();
};

export { generateToken, prettyError };
