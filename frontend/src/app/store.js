import { configureStore} from '@reduxjs/toolkit';
import authReducer from '../feature/AuthSlice.js';
import taskReducer from '../feature/TaskSlice.js';


export const store = configureStore({
    reducer:{
        auth: authReducer,
        task: taskReducer
    },
});
    