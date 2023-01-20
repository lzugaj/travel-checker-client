import * as Yup from 'yup';

export const UserDetailsValidationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required")
        .trim()
        .matches(
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
            "Email must be in valid form, for example: john.doe@gmail.com",
        ),
    password: Yup.string().required("Password is required")
        .trim()
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]))(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character",
        ),
    confirmationPassword: Yup.string().required("Password is required")
        .trim()
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]))(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character",
        ),
});

export const PersonalDetailsValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required")
        .trim()
        .min(2, "First name must contains at least 2 characters"),
    lastName: Yup.string().required("Last name is required")
        .trim()
        .min(2, "Last name must contains at least 2 characters"),
});