import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

import { generateToken, prettyError } from '../utils';
import {
	createUser,
	getUserByEmail,
	getUserByUsername,
} from '../queries/user.query';
import { registerUserSchema, loginUserSchema } from '../schemas/user.schema';

const registerUser = asyncHandler(async (req, res) => {
	const valid = registerUserSchema.safeParse(req.body);
	if (!valid.success) {
		res.status(400);
		throw new Error(prettyError(valid.error.errors));
	}

	const { username, email, password } = req.body;

	// Check if user exists
	const userByEmail = await getUserByEmail(email);
	const userByUsername = await getUserByUsername(username);
	if (userByEmail || userByUsername) {
		res.status(400);
		throw new Error('User already exists');
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create the user in db
	const result = await createUser(username, email, hashedPassword);

	if (result) {
		res.status(201).json({
			_id: result.id,
			username: result.username,
			email: result.email,
			token: generateToken(result.id.toString()),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}

	res.status(500);
	throw new Error(
		'Unfortunately we are experiencing a technical error please try again'
	);
});

const loginUser = asyncHandler(async (req, res) => {
	const valid = loginUserSchema.safeParse(req.body);
	if (!valid.success) {
		res.status(400);
		throw new Error(prettyError(valid.error.errors));
	}
	const { username, password } = req.body;

	// Get/Check user exits
	const user = await getUserByUsername(username);

	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			_id: user.id,
			username: user.username,
			email: user.email,
			token: generateToken(user.id.toString()),
		});
	} else {
		res.status(400);
		throw new Error('Invalid credentials');
	}

	res.status(500);
	throw new Error(
		'Unfortunately we are experiencing a technical error please try again'
	);
});

export { registerUser, loginUser };
