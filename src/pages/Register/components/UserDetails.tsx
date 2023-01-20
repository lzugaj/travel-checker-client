import React from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import Container from "../../../components/Container";
import InputField from "../../../components/InputField";
import { AuthorizationDto } from "../../../dto/types";
import { usePasswordVisibility } from "../../../hooks/usePasswordVisibility";

type UserDetailsProps = {
    values: AuthorizationDto;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserDetails({ values, onChange }: UserDetailsProps) {
    const { showPassword, onShowPassword } = usePasswordVisibility();

    const handleVisibilityIcon = () => {
        return showPassword ?
            <MdVisibility
                onClick={ onShowPassword }
                className="flex absolute mt-11 mx-10 right-3"
            /> :
            <MdVisibilityOff
                onClick={ onShowPassword }
                className="flex absolute mt-11 mx-10 right-3"
            />;
    }

    return (
        <Container>
            <InputField
                name="email"
                label="Email"
                type="email"
                placeholder="Enter email"
                onChange={ onChange }
                value={ values.email }
            />
            <div>
                { handleVisibilityIcon() }
                <InputField
                    name="password"
                    label="Password"
                    type={ showPassword ? "text" : "password" }
                    placeholder="Enter password"
                    onChange={ onChange }
                    value={ values.password }
                />
            </div>
            <div>
                { handleVisibilityIcon() }
                <InputField
                    name="confirmationPassword"
                    label="Confirm password"
                    type={ showPassword ? "text" : "password" }
                    placeholder="Confirm password"
                    onChange={ onChange }
                    value={ values.confirmationPassword }
                />
            </div>
        </Container>
    );
}