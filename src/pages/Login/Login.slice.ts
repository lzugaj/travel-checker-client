import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "./types";

type UserLoginDto = {
    email: string,
    password: string,
}

export type State = {
    isLogged: boolean,
    user: User,
}

const initialState: State = {
    isLogged: false,
    user: {} as User,
}

const loginSlice = createSlice({
    initialState: initialState,
    name: "login",
    reducers: {
        login: (state: State, action: PayloadAction<UserLoginDto>) => {

        }
    },
});

export const login = loginSlice.reducer;