import express, { Express } from 'express';
import { rateLimit } from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { createClient } from 'redis';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';

import { router as userRouter } from './routes/user.routes';
import { router as todoRouter } from './routes/todo.routes';
import errorHandler from './middleware/error.middleware';
import swaggerSchema from './swagger.json';

import dotenv from 'dotenv';
import { customKeyGenerator } from './utils';

dotenv.config();

const app: Express = express();
const port = Number(process.env.PORT) || 5000;
const hostname = process.env.HOST || 'localhost';
const numberOfProxies = Number(process.env.NO_OF_PROXIES) || 2; // the number of proxies between the user and the server
const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const redisClient = createClient({
	url: process.env.REDIS_URL,
});
(async () => {
	await redisClient.connect();
})();
const limiter = rateLimit({
	store: new RedisStore({
		sendCommand: (...args: string[]) => redisClient.sendCommand(args),
		prefix: 'rate-limit', // Prefix for Redis keys
	}),
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Max requests per IP
	message: 'Too many requests, please try again later.',
	keyGenerator: customKeyGenerator,
});

app.set('trust proxy', numberOfProxies);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors(corsOptions));
app.use(hpp());
app.use(limiter);

app.use('/api/v1/user', userRouter);
app.use('/api/v1/todos', todoRouter);

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSchema));

app.use(errorHandler);

app.listen(port, hostname, () => {
	console.log(`🚀 [server]: Server is running at http://${hostname}:${port}`);
	console.log(`💾 [postgresql]: Connected at ${process.env.DATABASE_URL}`);
});
