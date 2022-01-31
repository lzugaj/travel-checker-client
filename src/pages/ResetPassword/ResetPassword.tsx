import React, {useState} from "react";
import Container from "../../components/Container";
import {useLocation, useNavigate} from "react-router-dom";
import {Formik, FormikErrors, FormikProps} from "formik";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import Title from "../../components/Title";
import {User} from "../Register/types";
import * as Yup from "yup";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";

type ResetPasswordDto = {
    newPassword: string;
    confirmedNewPassword: string;
}

type Form = ResetPasswordDto;

const ValidationSchema = Yup.object().shape({
    newPassword: Yup.string().required("Password is required")
        .trim()
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]))(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character",
        ),
    confirmedNewPassword: Yup.string().required("Password is required")
        .trim()
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]))(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character",
        ),
});

export default function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = new URLSearchParams(location.search).get("token");
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState<ResetPasswordDto>({
        newPassword: "",
        confirmedNewPassword: "",
    });

    const handleSubmit = async (values: Form) => {
        setUser(values);
        fetch("/api/v1/travel-checker/reset-password?token=" + token, {
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
                    navigate("/reset-password-confirmation");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handlePasswordValidation = (values: Form) => {
        const errors = {} as FormikErrors<ResetPasswordDto>;
        if (values.confirmedNewPassword !== values.newPassword) {
            errors.confirmedNewPassword = "ResetPasswordConfirmation password does not matches with the password you provided.";
        }

        return errors;
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
            <Title label="Reset Password"/>
            <Formik
                initialValues={{
                    newPassword: "",
                    confirmedNewPassword: "",
                } as Form}
                validationSchema={ValidationSchema}
                validate={handlePasswordValidation}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }: FormikProps<any>) => (
                    <form onSubmit={handleSubmit}>
                        {handleVisibilityIcon()}
                        <InputField
                            name="newPassword"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                        />
                        <InputField
                            name="confirmedNewPassword"
                            label="Confirm password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm password"
                        />
                        <Button
                            label="Reset password"
                            type="submit"
                        />
                    </form>
                )}
            </Formik>
            <div className="mt-5">
                <TextField text="Already hava an account?">
                <span
                    onClick={() => navigate("/login")}
                    className="text-blue-600"
                >
                    Sign In
                </span>
                </TextField>
                <TextField text="Don't have an account?">
                    <span
                        onClick={() => navigate("/register")}
                        className="text-blue-600"
                    >
                        Sign Up
                    </span>
                </TextField>
            </div>
        </Container>
    );
}