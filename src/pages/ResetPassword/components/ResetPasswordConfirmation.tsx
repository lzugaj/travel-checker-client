import React from "react";
import Container from "../../../components/Container";
import success from "../../../assets/success.png";
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";
import {useNavigate} from "react-router-dom";

export default function ResetPasswordConfirmation() {
    const navigate = useNavigate();

    return (
        <Container>
            <img
                src={success}
                alt="Success"
                className="block m-auto w-1/2 mt-5"
            />
            <h1 className="text-4xl text-center mt-6 mb-8">
                Success!
            </h1>
            <TextField
                text="You have successfully reset your password."
            />
            <Button
                label="Done"
                type="button"
                onClick={() => navigate("/login")}
            />
        </Container>
    );
}