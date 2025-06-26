import express from 'express';
import cors from 'cors';
import db from './config/Config.js'
import TodoRouter from './routes/ToDoRouter.js';
import UserRouter from './routes/UserRouter.js';
import AuthRouter from './routes/AuthRouter.js';
import session from 'express-session';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: 'auto'
    }
}));

(
    async () => {
        try {
            await db.sync();
            console.log("Create database and tables")
        }catch (error) {
            console.log(error.message +"here")
        }
    }
)();

app.use(cors({
    origin: process.env.CLIENT,
    credential: true
}));

app.use(express.json())

app.use('/user', UserRouter);
app.use('/task', TodoRouter);
app.use('/login', AuthRouter);
app.use('/logout', AuthRouter);
app.use('/islogin', AuthRouter);
app.listen(process.env.APP_PORT, () =>{
    console.log(`Server is running on port ${process.env.APP_PORT}`)
});

