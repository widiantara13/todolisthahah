import express from 'express';
import {addTask,
        getTasks,
        getTaskById,
        updateTask,
        deleteTask
} from '../controllers/ToDoController.js';

const TodoRouter = express.Router();

TodoRouter.post("/", addTask);
TodoRouter.get("/:id", getTaskById);
TodoRouter.get("/", getTasks);
TodoRouter.put("/:id", updateTask);
TodoRouter.delete("/:id", deleteTask);



export default TodoRouter;