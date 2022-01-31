import React from "react";
import Container from "../../../components/Container";
import {User} from "../types";
import InputField from "../../../components/InputField";

type PersonalDetailsProps = {
    values: User;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PersonalDetails({ values, onChange }: PersonalDetailsProps) {
    return (
        <Container>
            <InputField
                name="firstName"
                label="First name"
                type="text"
                placeholder="Enter first name"
                onChange={onChange}
                value={values.firstName}
            />
            <InputField
                name="lastName"
                label="Last name"
                type="text"
                placeholder="Enter last name"
                onChange={onChange}
                value={values.lastName}
            />
        </Container>
    );
}