import React from "react";

type FieldProps = {
    children: React.ReactNode;
    label: string;
    error?: string;
}

export default function Field({ children, label, error }: FieldProps) {
    return (
        <div className="flex flex-col justify-center">
            <p className="mb-2 mx-8">{label}</p>
            {children}
            {error && (<p className="text-red-500 mb-2 mx-8">{error}</p>)}
        </div>
    );
}