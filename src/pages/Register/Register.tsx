import { Formik, FormikErrors, FormikProps } from "formik";
import React, { useState } from "react";
import { Stepper } from 'react-form-stepper';

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { authentication } from "../../api/authentication";

import Container from "../../components/Container";
import Loader from "../../components/Loader";
import TextField from "../../components/TextField";
import Title from "../../components/Title";
import { AuthenticationDto, AuthorizationDto } from "../../dto/types";
import {
    PersonalDetailsValidationSchema,
    UserDetailsValidationSchema
} from "../../validations/authenticationValidation";
import ConfirmDetails from "./components/ConfirmDetails";
import PersonalDetails from "./components/PersonalDetails";
import UserDetails from "./components/UserDetails";

import * as selectors from "./Register.selectors";
import { registerUser } from "./Register.slice";

type Form = AuthorizationDto;

const ValidationSchema = [ UserDetailsValidationSchema, PersonalDetailsValidationSchema ];
const steps = [ "User Details", "Person Details", "Confirm Details" ];

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const status = useSelector(selectors.status);
    const error = useSelector(selectors.error);

    const [ loading, setLoading ] = useState(false);
    const [ step, setStep ] = useState(0);
    const isLast = step === steps.length - 1;
    const [ user, setUser ] = useState<AuthorizationDto>({
        confirmationPassword: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
    });

    React.useEffect(() => {
        if (status === "succeeded" && !error?.message) {
            setLoading(true);
            setTimeout(() => handleAuthentication(user), 3000);
        }
    }, [])

    const handleSubmit = async (values: AuthorizationDto) => {
        if (isLast) {
            dispatch(registerUser(values));
        } else {
            setStep((prevState) => prevState + 1);
        }
    }

    const handleAuthentication = (values: AuthorizationDto) => {
        authentication({ "email": values.email, "password": values.password, } as AuthenticationDto)
            .then((isOk: boolean) => {
                if (isOk) {
                    navigate("/");
                }
            })
            .catch(error => console.log(error));

        setLoading(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(user => ({
            ...user,
            [e.target.name]: e.target.value.trim(),
        }));
    }

    const handlePasswordValidation = (values: AuthorizationDto) => {
        const errors = {} as FormikErrors<AuthorizationDto>;
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
                        values={ user }
                        onChange={ handleChange }
                    />
                );
            case 1:
                return (
                    <PersonalDetails
                        values={ user }
                        onChange={ handleChange }
                    />
                );
            case 2:
                return (
                    <ConfirmDetails
                        values={ user }
                    />
                );
        }
    }

    return (
        <Container>
            <Loader loading={ loading } text="Signing up...">
                <ToastContainer />
                <Title label="Sign Up"/>
                <Stepper
                    steps={ [
                        { label: 'User Details' },
                        { label: 'Personal Details' },
                        { label: 'Confirm Details' }
                    ] }
                    activeStep={ step }
                    styleConfig={ {
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
                    } }
                />
                <Formik
                    initialValues={ {
                        confirmationPassword: "",
                        email: "",
                        firstName: "",
                        lastName: "",
                        password: "",
                    } as Form }
                    validationSchema={ ValidationSchema[step] }
                    validate={ handlePasswordValidation }
                    onSubmit={ handleSubmit }
                    validateOnBlur={ false }
                >
                    { ({ handleSubmit, handleChange, isSubmitting }: FormikProps<any>) => (
                        <form onSubmit={ handleSubmit } onChange={ handleChange } autoComplete="off">
                            { handleStepContent(step) }
                            <div className="p-5 flex flex-wrap justify-center items-center gap-2">
                                {
                                    step !== 0 && (
                                        <button
                                            type="button"
                                            onClick={ () => setStep(step - 1) }
                                            className="flex items-center justify-between bg-blue-600 border border-blue-700 text-left text-white px-10 py-2 rounded shadow-md"
                                        >
                                            Back
                                        </button>
                                    )
                                }
                                <button
                                    type="submit"
                                    disabled={ isSubmitting }
                                    className="flex items-center justify-between bg-blue-600 border border-blue-700 text-left text-white px-10 py-2 rounded shadow-md"
                                >
                                    { isLast ? "Submit" : "Next" }
                                </button>
                            </div>
                        </form>
                    ) }
                </Formik>
                <TextField text="Already hava an account?">
                    <span
                        onClick={ () => navigate("/login") }
                        className="text-blue-600"
                    >
                        Sign In
                    </span>
                </TextField>
            </Loader>
        </Container>
    );
}