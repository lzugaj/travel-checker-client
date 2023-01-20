import React from "react";
import {
    useLocation,
    useNavigate
} from "react-router-dom";

import Container from "../../../components/Container";
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";

import success from '../../../assets/success.png';

type ConfirmationProps = {
    email: string;
}

export default function ForgotPasswordConfirmation() {
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state as ConfirmationProps;

    return (
        <Container>
            <img
                src={ success }
                alt="Success"
                className="block m-auto w-1/2 mt-5"
            />
            <h1 className="text-4xl text-center mt-6 mb-8">
                Success!
            </h1>
            <TextField
                text={ `An email has been sent to your rescue email address ${ email }. Follow the directions in the email to reset your password.` }
            />
            <Button
                label="Done"
                type="button"
                onClick={ () => navigate("/login") }
            />
        </Container>
    );
}