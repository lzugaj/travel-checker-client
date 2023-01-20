import { combineReducers } from "@reduxjs/toolkit";
import { register } from '../pages/Register/Register.slice';

export const rootReducer = combineReducers({
    register,
});

export type RootState = ReturnType<typeof rootReducer>;