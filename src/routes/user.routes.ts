import express from 'express';
import { loginUser, registerUser } from '../controllers/user.controller';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);

export { router };
