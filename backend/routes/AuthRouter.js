import express from 'express';
import { Login, isLogin, Logout} from  '../controllers/Auth.js';

const AuthRouter = express.Router();

AuthRouter.post("/", Login);
AuthRouter.get("/", isLogin);
AuthRouter.delete("/", Logout);

export default AuthRouter;