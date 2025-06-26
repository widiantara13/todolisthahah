import express from 'express';
import {addTask,
        getTasks,
        getTaskById,
        updateTask,
        deleteTask
} from '../controllers/ToDoController.js';
import { verifyLogin } from '../middleware/veryfyMiddle.js';


const TodoRouter = express.Router();

TodoRouter.post("/",verifyLogin, addTask);
TodoRouter.get("/:id",verifyLogin, getTaskById);
TodoRouter.get("/",verifyLogin, getTasks);
TodoRouter.put("/:id",verifyLogin, updateTask);
TodoRouter.delete("/:id",verifyLogin, deleteTask);



export default TodoRouter;