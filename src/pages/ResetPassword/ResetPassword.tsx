import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Formik, FormikErrors, FormikProps } from "formik";

import Button from "../../components/Button";
import Container from "../../components/Container";
import InputField from "../../components/InputField";
import TextField from "../../components/TextField";
import Title from "../../components/Title";

import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { usePasswordVisibility } from "../../hooks/usePasswordVisibility";
import { ResetPasswordDto } from "../../dto/types";
import { ResetPasswordValidation } from "../../validations/resetPasswordValidation";
import { resetPassword } from "../../api/resetPassword";

type Form = ResetPasswordDto;

export default function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = new URLSearchParams(location.search).get("token") as string;

    const { showPassword, onShowPassword } = usePasswordVisibility();

    const handleSubmit = async (values: ResetPasswordDto) => {
        resetPassword(values, token)
            .then(() => navigate("/reset-password-confirmation"))
            .catch(error => console.log(error));
    }

    const handlePasswordValidation = (values: Form) => {
        const errors = {} as FormikErrors<ResetPasswordDto>;
        if (values.confirmedNewPassword !== values.newPassword) {
            errors.confirmedNewPassword = "ResetPasswordConfirmation password does not matches with the password you provided.";
        }

        return errors;
    }

    const handleVisibilityIcon = () => {
        return showPassword ?
            <MdVisibility
                onClick={ () => onShowPassword }
                className="flex absolute mt-11 mx-10 right-3"
            /> :
            <MdVisibilityOff
                onClick={ () => onShowPassword }
                className="flex absolute mt-11 mx-10 right-3"
            />;
    }

    return (
        <Container>
            <Title label="Reset Password"/>
            <Formik
                initialValues={ {
                    newPassword: "",
                    confirmedNewPassword: "",
                } as Form }
                validationSchema={ ResetPasswordValidation }
                validate={ handlePasswordValidation }
                onSubmit={ handleSubmit }
            >
                { ({ handleSubmit }: FormikProps<any>) => (
                    <form onSubmit={ handleSubmit }>
                        <div>
                            { handleVisibilityIcon() }
                            <InputField
                                name="newPassword"
                                label="Password"
                                type={ showPassword ? "text" : "password" }
                                placeholder="Enter password"
                            />
                        </div>
                        <div>
                            { handleVisibilityIcon() }
                            <InputField
                                name="confirmedNewPassword"
                                label="Confirm password"
                                type={ showPassword ? "text" : "password" }
                                placeholder="Confirm password"
                            />
                        </div>
                        <Button
                            label="Reset password"
                            type="submit"
                        />
                    </form>
                ) }
            </Formik>
            <div className="mt-5">
                <TextField text="Already hava an account?">
                <span
                    onClick={ () => navigate("/login") }
                    className="text-blue-600"
                >
                    Sign In
                </span>
                </TextField>
                <TextField text="Don't have an account?">
                    <span
                        onClick={ () => navigate("/register") }
                        className="text-blue-600"
                    >
                        Sign Up
                    </span>
                </TextField>
            </div>
        </Container>
    );
}