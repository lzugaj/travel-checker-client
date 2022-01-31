import React, {useState} from "react";
import {
    Formik,
    FormikProps
} from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import Container from "../../components/Container";
import InputField from "../../components/InputField";
import TextField from "../../components/TextField";

import Button from "../../components/Button";

type User = {
    email: string;
}

type Form = User;

const ValidationSchema = Yup.object({
    email: Yup.string().required("Email is required")
        .trim()
        .matches(
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
            "Email must be in valid form, for example: john.doe@gmail.com"
        ),
});

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();

    const handleSubmit = (values: Form) => {
        console.log(values);
        setUser(values);
        fetch("/api/v1/travel-checker/forget-password", {
            method: "POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    navigate("/forgot-password-confirmation", { state: { email: values.email } });
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <Container>
            {/*image*/}
            <h1 className="text-2xl text-center mt-6 mb-8">Forgot Your Password?</h1>
            <TextField text="Enter your email address and we'll send you an email with a link to reset your password." />
            <Formik onSubmit={handleSubmit} initialValues={{ email: "" } as Form} validationSchema={ValidationSchema}>
                {({ handleSubmit }: FormikProps<any>) => (
                    <form onSubmit={handleSubmit}>
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
                )}
            </Formik>
            <span
                onClick={() => navigate("/login")}
                className="text-center mt-5 mb-5 text-blue-600"
            >
                Back to Login
            </span>
        </Container>
    );
}