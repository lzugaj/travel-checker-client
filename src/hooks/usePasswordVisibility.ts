import { useState } from "react";

export function usePasswordVisibility() {
    const [ showPassword, setShowPassword ] = useState(false);

    const onShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return {
        showPassword,
        onShowPassword
    }
}