import { Request } from 'express';

type User = {
	id: number | string;
	email: string;
	username: string;
	password: string;
	active: boolean;
};

export interface CustomRequest extends Request {
	user?: User;
}
