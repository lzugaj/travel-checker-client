import React from "react";

import Container from "../../../components/Container";
import InputField from "../../../components/InputField";

import {User} from "../types";

type UserDetailsProps = {
    values: User;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserDetails({ values, onChange }: UserDetailsProps) {
    return (
        <Container>
            <InputField
                name="email"
                label="Email"
                type="email"
                placeholder="Enter email"
                onChange={onChange}
                value={values.email}
            />
            <InputField
                name="password"
                label="Password"
                type="password"
                placeholder="Enter password"
                onChange={onChange}
                value={values.password}
            />
            <InputField
                name="confirmationPassword"
                label="Confirm password"
                type="password"
                placeholder="Confirm password"
                onChange={onChange}
                value={values.confirmationPassword}
            />
        </Container>
    );
}