import { createAction } from "@reduxjs/toolkit";
import { User } from "../../api/types";

export const userRegister = createAction<User>("register/user");