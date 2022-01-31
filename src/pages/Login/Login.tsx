import React, { useState } from "react";
import {
    Formik,
    FormikProps
} from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import * as actions from './Login.actions';

import Title from "../../components/Title";
import Container from "../../components/Container";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import TextField from "../../components/TextField";

import {
    MdVisibilityOff,
    MdVisibility
} from "react-icons/md";
import {useDispatch} from "react-redux";

type User = {
    email: string;
    password: string;
}

type Form = User;

const ValidationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required")
        .trim()
        .matches(
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
            "Email must be in valid form, for example: john.doe@gmail.com"
        ),
    password: Yup.string().required("Password is required")
        .trim()
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]))(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        ),
});

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState<User>();

    const handleSubmit = async (values: User) => {
        console.log(values);
        setUser(values);
        fetch("/api/v1/travel-checker/authentication", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    navigate("/");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleVisibilityIcon = () => {
        return showPassword ?
            <MdVisibility
                onClick={handlePasswordVisibility}
                className="flex absolute mt-11 mx-10 right-3"
            /> :
            <MdVisibilityOff
                onClick={handlePasswordVisibility}
                className="flex absolute mt-11 mx-10 right-3"
            />;
    }

    return (
        <Container>
            <Title label="Login"/>
            <Formik
                onSubmit={handleSubmit}
                initialValues={{ email: "", password: "" } as Form}
                validationSchema={ValidationSchema}
            >
                {({ handleSubmit }: FormikProps<any>) => (
                    <form onSubmit={handleSubmit}>
                        <InputField
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="Enter email"
                        />
                        {handleVisibilityIcon()}
                        <InputField
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                        />
                        <span
                            onClick={() => navigate("/forgot-password")}
                            className="flex justify-end mx-8 mb-5 text-blue-600"
                        >
                                Forgot Password?
                            </span>
                        <Button
                            label="Login"
                            type="submit"
                        />
                    </form>
                )}
            </Formik>
            <TextField text="Don't have an account?">
                    <span
                        onClick={() => navigate("/register")}
                        className="text-blue-600"
                    >
                        Sign Up
                    </span>
            </TextField>
        </Container>
    );
}