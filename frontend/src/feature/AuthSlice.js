import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

export const RegisterUser = createAsyncThunk("user/RegisterUser", async(user, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:5000/api/user/register",{
            email: user.email,
            fullName: user.fullName,
            password: user.password,
            confirmPassword: user.confirmPassword
        });
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        };
    };    
});
export const LoginUser = createAsyncThunk("user/LoginUser", async(user, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:5000/api/login",{
            email: user.email,
            password: user.password
        });
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        };
    };    
});

export const isLogin = createAsyncThunk("user/isLogin", async(_, thunkAPI) => {
    try {
        const response = await axios.get("http://localhost:5000/api/islogin");
        return response.data;
    
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        };
    };
});

export const LogOut = createAsyncThunk("user/LogOut", async() => {
    await axios.delete("http://localhost:5000/api/logout");

});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        //Register
        builder.addCase(RegisterUser.pending, (state) =>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        });
        builder.addCase(RegisterUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
            state.message = action.payload.msg;
        });
        builder.addCase(RegisterUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = null;
            state.message = action.payload;
        });

        //Login
        builder.addCase(LoginUser.pending, (state) =>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
            state.message = action.payload.msg;
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = null;
            state.message = action.payload;
        });

        //isLogin
        builder.addCase(isLogin.pending, (state) =>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        });
        builder.addCase(isLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
            state.message = action.payload.msg;
        });
        builder.addCase(isLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = null;
            state.message = action.payload;
        });

        //Logout
        builder.addCase(LogOut.pending, (state) =>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        });
        builder.addCase(LogOut.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
            state.message = action.payload.msg;
        });
        builder.addCase(LogOut.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = null;
            state.message = action.payload;
        });

    }
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;

