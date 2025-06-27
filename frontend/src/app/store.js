import { configureStore} from '@reduxjs/toolkit';
import authReducer from '../feature/AuthSlice.js';

export const store = configureStore({
    reducer:{
        auth: authReducer,
    },
});
    