import React from "react";
import Container from "./Container";

type ButtonProps = {
    label: string;
    type?: "submit" | "button";
    onClick?: () => void;
    disabled? : boolean;
}

export default function Button({ label, ...props }: ButtonProps) {
    return (
        <Container>
            <button {...props} className="bg-blue-600 text-white shadow-md border rounded-lg px-3 py-2 mx-8 m-3">
                {label}
            </button>
        </Container>
    );
}