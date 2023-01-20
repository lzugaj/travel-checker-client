import React from "react";
import { useField } from "formik";

import Field from "./Field";

type InputFieldProps = {
    name: string;
    value?: string;
    label: string;
    type: "text" | "password" | "email";
    disabled?: boolean;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    defaultValue?: string;
}

export default function InputField({ name, label, ...props }: InputFieldProps) {
    const [ field, meta ] = useField(name);

    return (
        <Field label={ label } error={ (meta.touched && meta.error) ? meta.error : "" }>
            <input { ...field } { ...props } className="flex border rounded-lg px-3 py-2 mb-3 mx-8"/>
        </Field>
    );
}
