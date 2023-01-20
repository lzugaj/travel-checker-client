export type AuthenticationDto = {
    email: string,
    password: string,
}

export type AuthorizationDto = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmationPassword: string;
}

export type ForgotPasswordDto = {
    email: string,
}

export type ResetPasswordDto = {
    newPassword: string;
    confirmedNewPassword: string;
}