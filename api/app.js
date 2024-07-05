import express from 'express';
import taskRouter from './routes/task_route.js';
import categoryRouter from './routes/category_route.js';
import authRouter from './routes/auth_route.js';
import userRouter from './routes/user_route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/tasks', taskRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.listen(8800, () => {
    console.log('Server is running on port 8800');
})