import React from "react";
import Container from "../../../components/Container";
import {User} from "../types";
import InputField from "../../../components/InputField";

type ConfirmDetailProps = {
    values: User;
}

export default function ConfirmDetails({ values }: ConfirmDetailProps) {
    return (
        <Container>
            <InputField
                name="firstName"
                label="First name"
                type="text"
                value={values.firstName}
                disabled={true}
            />
            <InputField
                name="lastName"
                label="Last name"
                type="text"
                value={values.lastName}
                disabled={true}
            />
            <InputField
                name="email"
                label="Email"
                type="email"
                value={values.email}
                disabled={true}
            />
        </Container>
    );
}