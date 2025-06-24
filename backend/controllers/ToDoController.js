import Task from '../models/ToDoModel.js';

export const addTask = async (req, res) => {
    const {title, description, do_date} = req.body;
    if(!title || !description || ! do_date){
        return res.status(422).json({
            msg: "Please fullfill all fields"
        });
    };
    try {
        await Task.create({
            title,
            description,
            do_date
        });
        res.status(201).json({
            msg: "Task added successfully"
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
        console.log(error.message);
    };
};

export const getTasks = async (req, res) => {
    const { do_date } = req.query;
    let whereClause = {}; 
    
    if (do_date) {
        whereClause.do_date = do_date;
    }

    try {
        const response = await Task.findAll({
            where: whereClause 
        });
        res.status(200).json({
            msg: "Tasks fetched successfully",
            data: response
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
        console.log(error.message)
    };
};

export const getTaskById = async (req, res) => {
    
    try {
        const response = await Task.findOne({
        where: {
            id: req.params.id
        }
        });
        if(!response){
            return res.status(404).json({
                msg: "Task not found"
            });
        };
        res.status(200).json({
            msg: "Task fetched successfully",
            data: response
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
        console.log(error.message)

    };
};

export const updateTask = async (req, res) => {
    try {
        const response = await Task.findOne({
        where: {
            id: req.params.id
        }
        });
        if(!response){
            return res.status(404).json({
                msg: "Task not found"
            });
        };
        await Task.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            msg: "Task updated successfully"

        })
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
        console.log(error.message)

    };
};

export const deleteTask = async (req, res) => {
    try {
         const response = await Task.findOne({
        where: {
            id: req.params.id
        }
        });
        if(!response){
            return res.status(404).json({
                msg: "Task not found"
            });
        };
        await Task.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            msg: "Task deleted successfully"

        })
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
        console.log(error.message)
    }
}
