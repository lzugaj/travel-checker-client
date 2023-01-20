import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import * as paths from "../../api/paths";
import { Error, User } from "../../api/types";
import { AuthorizationDto } from "../../dto/types";

import { toast } from "react-toastify";

export type State = {
    status: "idle" | "pending" | "succeeded" | "failed";
    isLogged: boolean;
    user: User;
    error: Error | SerializedError | null;
}

const initialState: State = {
    status: "idle",
    isLogged: false,
    user: {} as User,
    error: null,
}

export const registerUser = createAsyncThunk<User, AuthorizationDto, { rejectValue: Error }>(
    "register/registerUser",
    async (data, thunkApi) => {
        const response = await fetch(paths.travelChecker.authorization, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            return thunkApi.rejectWithValue((await response.json()) as Error);
        }

        return (await response.json()) as User;
    }
)

const registerSlice = createSlice({
    name: "register",
    initialState: initialState,
    reducers: {
        /*user: (state: State, action: PayloadAction<User>) => {
            state.isLogged = true;
            state.user = action.payload;
        }*/
    },
    extraReducers: (builder => {
        builder.addCase(registerUser.pending, (state: State) => {
            state.status = "pending";
            state.isLogged = false;
        });

        builder.addCase(registerUser.fulfilled, (state: State, { payload }) => {
            state.status = "succeeded";
            state.isLogged = true;
            state.user = payload;
        });

        builder.addCase(registerUser.rejected, (state: State, action) => {
            state.status = "failed";
            state.isLogged = false;
            if (action.payload) {
                state.error = action.payload;
            } else {
                state.error = action.error;
            }

            toast.error(state.error.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    width: "85%",
                    margin: "15px"
                }
            });
        });
    })
});

export const register = registerSlice.reducer;