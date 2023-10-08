import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import { CustomRequest } from '../types/index';
import { getUserById } from '../queries/user.query';

const jwtSecret = process.env.JWT_SECRET;

const protect = asyncHandler(async (req: CustomRequest, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			// Get token from header
			token = req.headers.authorization.split(' ')[1];

			// Verify token
			const decoded = jwt.verify(token, jwtSecret!);
			if (typeof decoded !== 'object' || !('id' in decoded)) {
				res.status(401);
				throw new Error('Invalid token');
			}

			const user = await getUserById(Number(decoded.id));
			if (!user) {
				res.status(401);
				throw new Error('Invalid token');
			}

			req.user = user;

			next();
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error('Not authorised');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Not authorised, no token');
	}
});

export { protect };
