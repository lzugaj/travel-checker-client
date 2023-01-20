import React from "react";

type TextFieldProps = {
    children?: React.ReactNode;
    text: string;
}

export default function TextField({ children, text }: TextFieldProps) {
    return (
        <p className="mx-8 mb-3 text-center">{ text } { children }</p>
    );
}