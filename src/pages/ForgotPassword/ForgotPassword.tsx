import React from "react";
import { useNavigate } from "react-router-dom";

import { Formik, FormikProps } from "formik";

import Container from "../../components/Container";
import InputField from "../../components/InputField";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import { forgetPassword } from "../../api/forgetPassword";
import { ForgotPasswordValidation } from "../../validations/forgotPasswordValidation";
import { ForgotPasswordDto } from "../../dto/types";

type Form = ForgotPasswordDto;

export default function ForgotPassword() {
    const navigate = useNavigate();

    const handleSubmit = (values: ForgotPasswordDto) => {
        forgetPassword(values)
            .then(() => navigate("/forgot-password-confirmation",
                { state: { email: values.email } }))
            .catch(error => console.log(error));
    }

    return (
        <Container>
            {/*image*/ }
            <h1 className="text-2xl text-center mt-6 mb-8">Forgot Your Password?</h1>
            <TextField text="Enter your email address and we'll send you an email with a link to reset your password."/>
            <Formik
                onSubmit={ handleSubmit }
                initialValues={ { email: "" } as Form }
                validationSchema={ ForgotPasswordValidation }
            >
                { ({ handleSubmit }: FormikProps<any>) => (
                    <form onSubmit={ handleSubmit }>
                        <InputField
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="Enter email"
                        />
                        <Button
                            label="Continue"
                            type="submit"
                        />
                    </form>
                ) }
            </Formik>
            <span
                onClick={ () => navigate("/login") }
                className="text-center mt-5 mb-5 text-blue-600"
            >
                Back to Login
            </span>
        </Container>
    );
}