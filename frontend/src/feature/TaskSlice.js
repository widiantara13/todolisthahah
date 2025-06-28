import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    tasks : [],
    selectedTask : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""


}

export const getTasks = createAsyncThunk("task/getTasks", async(_, thunkAPI) => {
    try {
        const response = await axios.get("http://localhost:5000/api/task");
        return response.data.data;

    } catch (error) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
    }
});
    
export const getTaskById = createAsyncThunk("task/getTaskById", async(id, thunkAPI) => {
    try {
        const response  = await axios.get(`http://localhost:5000/api/task/${id}`);
        return response.data;
    } catch (error) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
    }
});

export const addTask = createAsyncThunk("task/addTask", async(task, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:5000/api/task", {
            title: task.title,
            description: task.description,
            do_date: task.do_date,
            
        });
        return response.data;
    } catch (error) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
    };
});

export const updateTask = createAsyncThunk("task/updateTask", async(task, thunkAPI) => {
    try {
        const response = await axios.patch(`http://localhost:5000/api/task/${task.id}`,{
            title: task.title,
            description: task.description,
            do_date: task.do_date,
            status: task.status
        });
        return response.data;
    } catch (error) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message); 
    };
});

export const deleteTask = createAsyncThunk("task/deleteTask", async(id, thunkAPI) => {
    try {
        await axios.delete(`http://localhost:5000/api/task/${id}`);
        return id;
    } catch (error) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message); 
    };
});

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers:{
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        //getTasks
        builder.addCase(getTasks.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";

        });
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.tasks = action.payload;
            state.message = action.payload.msg;

        });
        builder.addCase(getTasks.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.tasks = [];
            state.message = action.payload;
        });

        //getTaskById
        builder.addCase(getTaskById.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        });
        builder.addCase(getTaskById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.selectedTask = action.payload;
            state.message = ""
        });
        builder.addCase(getTaskById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.selectedTask = [];
            state.message = action.payload;
        });

        //addTask
        builder.addCase(addTask.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        })
        builder.addCase(addTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.selectedTask = action.payload;
            state.message = action.payload.msg;
        })
        builder.addCase(addTask.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.selectedTask = [];
            state.message = action.payload;
        })
    }
});
    
export const {reset} = taskSlice.actions;
export default taskSlice.reducer;

