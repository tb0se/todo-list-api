import { Request } from 'express';
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

function customKeyGenerator(req: Request): string {
	if (!req.ip) {
		console.error('Warning: request.ip is missing!');
		return req.socket.remoteAddress!;
	}

	return req.ip.replace(/:\d+[^:]*$/, '');
}

export { generateToken, prettyError, customKeyGenerator };
