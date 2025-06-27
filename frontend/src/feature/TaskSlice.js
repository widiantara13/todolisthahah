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
        return response.data;

    } catch (error) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
    }
});
    
export const getTaskById = createAsyncThunk("task/getTaskById", async(id, thunkAPI) => {