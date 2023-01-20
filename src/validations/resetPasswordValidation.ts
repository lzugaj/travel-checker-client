import * as Yup from 'yup';

export const ResetPasswordValidation = Yup.object().shape({
    newPassword: Yup.string().required("Password is required")
        .trim()
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]))(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character",
        ),
    confirmedNewPassword: Yup.string().required("Password is required")
        .trim()
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]))(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character",
        ),
});