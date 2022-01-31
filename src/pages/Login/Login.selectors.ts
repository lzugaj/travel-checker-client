import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../../store/reducer";
import {State} from "./Login.slice";

export const users = createSelector(
    (state: RootState) => state.login,
    (state: State) => state.isLogged
);