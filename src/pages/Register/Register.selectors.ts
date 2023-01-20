import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/reducer";
import { State } from './Register.slice';

export const user = createSelector(
    (state: RootState) => state.register,
    (state: State) => state.user,
);

export const isLogged = createSelector(
    (state: RootState) => state.register,
    (state: State) => state.isLogged,
);

export const status = createSelector(
    (state: RootState) => state.register,
    (state: State) => state.status,
);

export const error = createSelector(
    (state: RootState) => state.register,
    (state: State) => state.error,
);