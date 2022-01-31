import {createAction} from "@reduxjs/toolkit";
import {User} from "./types";

export const userLogin = createAction<User>("login/login");