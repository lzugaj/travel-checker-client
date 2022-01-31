import React, {useState} from "react";
import {Formik, FormikErrors, FormikProps} from "formik";
import {useNavigate} from "react-router-dom";
import * as Yup from 'yup';

import Container from "../../components/Container";
import Title from "../../components/Title";
import UserDetails from "./components/UserDetails";
import PersonalDetails from "./components/PersonalDetails";
import ConfirmDetails from "./components/ConfirmDetails";
import TextField from "../../components/TextField";

import { Stepper } from 'react-form-stepper';

import {User} from "./types";

const UserDetailsValidationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required")
        .trim()
        .matches(
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
            "Email must be in valid form, for example: john.doe@gmail.com",
        ),
    password: Yup.string().required("Password is required")
        .trim()
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]))(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character",
        ),
    confirmationPassword: Yup.string().required("Password is required")
        .trim()
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]))(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character",
        ),
});

const PersonalDetailsValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required")
        .trim()
        .min(2, "First name must contains at least 2 characters"),
    lastName: Yup.string().required("Last name is required")
        .trim()
        .min(2, "Last name must contains at least 2 characters"),
});

const ValidationSchema = [UserDetailsValidationSchema, PersonalDetailsValidationSchema];
const steps = ["User Details", "Person Details", "Confirm Details"]

export default function Register() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const isLast = step === steps.length - 1;
    const [user, setUser] = useState<User>({
        confirmationPassword: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
    });

    const handleSubmit = async () => {
        if (isLast) {
            console.log(user);
            fetch("/api/v1/travel-checker/authorization", {
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
                        fetch("/api/v1/travel-checker/authentication", {
                            method: "POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "email": user.email,
                                "password": user.password,
                            }),
                        })
                            .then((response) => {
                                console.log(response);
                                if (response.ok) {
                                    navigate("/");
                                }
                            })
                            .catch((error) => console.log(error));
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setStep((prevState) => prevState + 1);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(user => ({
            ...user,
            [e.target.name]: e.target.value.trim(),
        }));
    }

    const handlePasswordValidation = (values: User) => {
        const errors = {} as FormikErrors<User>;
        if (values.confirmationPassword !== values.password) {
            errors.confirmationPassword = "ResetPasswordConfirmation password does not matches with the password you provided.";
        }

        return errors;
    }

    const handleStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <UserDetails
                        values={user}
                        onChange={handleChange}
                    />
                );
            case 1:
                return (
                    <PersonalDetails
                        values={user}
                        onChange={handleChange}
                    />
                );
            case 2:
                return (
                    <ConfirmDetails
                        values={user}
                    />
                );
        }
    }

    return (
        <Container>
            <Title label="Sign Up"/>

            <Stepper
                steps={[
                    { label: 'User Details' },
                    { label: 'Personal Details' },
                    { label: 'Confirm Details' }
                ]}
                activeStep={step}
                styleConfig={{
                    activeBgColor: "#1043B2",
                    activeTextColor: "#ffffff",
                    completedBgColor: "#0e265b",
                    completedTextColor: "#ffffff",
                    inactiveBgColor: "#3B3A3AFF",
                    inactiveTextColor: "#ffffff",
                    size: "2em",
                    circleFontSize: "1em",
                    labelFontSize: "0.875rem",
                    borderRadius: "50%",
                    fontWeight: "500"
                }}
            />

            <Formik
                initialValues={{
                    confirmationPassword: "",
                    email: "",
                    firstName: "",
                    lastName: "",
                    password: "",
                } as User}
                validationSchema={ValidationSchema[step]}
                validate={handlePasswordValidation}
                onSubmit={handleSubmit}
            >
                {({handleSubmit, handleChange, isSubmitting}: FormikProps<any>) => (
                    <form onSubmit={handleSubmit} onChange={handleChange} autoComplete="off">
                        {handleStepContent(step)}
                        <div className="p-5 flex flex-wrap justify-center items-center gap-2">
                            {
                                step !== 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setStep(step - 1)}
                                        className="flex items-center justify-between bg-blue-600 border border-blue-700 text-left text-white px-10 py-2 rounded shadow-md"
                                    >
                                        Back
                                    </button>
                                )
                            }
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center justify-between bg-blue-600 border border-blue-700 text-left text-white px-10 py-2 rounded shadow-md"
                            >
                                {isLast ? "Submit" : "Next"}
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
            <TextField text="Already hava an account?">
                <span
                    onClick={() => navigate("/login")}
                    className="text-blue-600"
                >
                    Sign In
                </span>
            </TextField>
        </Container>
    );
}