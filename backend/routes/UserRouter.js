import express from 'express';
import {RegisterUser,
        showUser,
        ShowUserByUuid,
        updateUser,
        deleteUser
} from '../controllers/UserController.js';

const UserRouter = express.Router();

UserRouter.post("/register", RegisterUser);
UserRouter.get("/", showUser);
UserRouter.get("/:uuid", ShowUserByUuid);
UserRouter.patch("/:uuid", updateUser);
UserRouter.delete("/:uuid", deleteUser);

export default UserRouter;