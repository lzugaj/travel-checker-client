import React from "react";

type TitleProps = {
    label: string
}

export default function Title({ label }: TitleProps) {
    return (
        <h1 className="text-5xl text-center mt-8 mb-8">
            { label }
        </h1>
    );
}