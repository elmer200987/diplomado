import express from 'express';

const app = express();

import authRoutes from './routes/auth.routes.js'
import usersRoutes from './routes/users.routes.js'
import taskRoutes from './routes/task.routes.js'
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';
import {authtenticateToken} from './middlewares/authenticate.js';

//middlewares
app.use(morgan('dev'))
app.use(express.json());

//routes
app.use('/api/login', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/tasks', authtenticateToken, taskRoutes);

app.use(notFound)
app.use(errorHandler)

export default app;