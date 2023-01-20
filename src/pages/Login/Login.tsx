import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usePasswordVisibility } from "../../hooks/usePasswordVisibility";
import { authentication } from "../../api/authentication";

import { Formik, FormikProps } from "formik";
import { AuthorizationValidation } from '../../validations/authorizationValidation';

import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import Title from "../../components/Title";
import Container from "../../components/Container";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { AuthenticationDto } from "../../dto/types";

import * as selectors from '../Register/Register.selectors';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Form = AuthenticationDto;

export default function Login() {
    const navigate = useNavigate();
    const { showPassword, onShowPassword } = usePasswordVisibility();

    const isLogged = useSelector(selectors.isLogged);
    console.log(isLogged);

    const handleSubmit = async (values: AuthenticationDto) => {
        authentication(values)
            .then((isOk: boolean) => {
                if (isOk) {
                    navigate("/");
                } else {
                    toast.error("You have entered an invalid username or password", {
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
                }
            })
            .catch(error => console.log(error));
    }

    const handleVisibilityIcon = () => {
        return showPassword ?
            <MdVisibility
                onClick={ onShowPassword }
                className="flex absolute mt-11 mx-10 right-3"
            /> :
            <MdVisibilityOff
                onClick={ onShowPassword }
                className="flex absolute mt-11 mx-10 right-3"
            />;
    }

    return (
        <Container>
            <ToastContainer />
            <Title label="Login"/>
            <Formik
                onSubmit={ handleSubmit }
                initialValues={ { email: "", password: "" } as Form }
                validationSchema={ AuthorizationValidation }
            >
                { ({ handleSubmit }: FormikProps<any>) => (
                    <form onSubmit={ handleSubmit }>
                        <InputField
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="Enter email"
                        />
                        { handleVisibilityIcon() }
                        <InputField
                            name="password"
                            label="Password"
                            type={ showPassword ? "text" : "password" }
                            placeholder="Enter password"
                        />
                        <span
                            onClick={ () => navigate("/forgot-password") }
                            className="flex justify-end mx-8 mb-5 text-blue-600"
                        >
                                Forgot Password?
                            </span>
                        <Button
                            label="Login"
                            type="submit"
                        />
                    </form>
                ) }
            </Formik>
            <TextField text="Don't have an account?">
                    <span
                        onClick={ () => navigate("/register") }
                        className="text-blue-600"
                    >
                        Sign Up
                    </span>
            </TextField>

            {isLogged}
        </Container>
    );
}