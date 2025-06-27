import express from 'express';
import cors from 'cors';
import db from './config/Config.js';
import SequelizeStore from 'connect-session-sequelize';
import TodoRouter from './routes/ToDoRouter.js';
import UserRouter from './routes/UserRouter.js';
import AuthRouter from './routes/AuthRouter.js';
import session from 'express-session';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store)

const store = new sessionStore({
    db:db
});





(
    async () => {
        try {
            await db.sync();
            store.sync();
            console.log("Create database and tables")
        }catch (error) {
            console.log(error.message +"here")
        }
    }
)();
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json())

app.use('/api/user', UserRouter);
app.use('/api/task', TodoRouter);
app.use('/api/login', AuthRouter);
app.use('/api/logout', AuthRouter);
app.use('/api/islogin', AuthRouter);
app.listen(process.env.APP_PORT, () =>{
    console.log(`Server is running on port ${process.env.APP_PORT}`)
});

