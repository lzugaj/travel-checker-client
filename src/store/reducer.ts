import {combineReducers} from "@reduxjs/toolkit";
import { login } from '../pages/Login/Login.slice';

export const rootReducer = combineReducers({
    login,
});

export type RootState = ReturnType<typeof rootReducer>;