import * as yup from "yup";

const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Please enter the password")
    .min(8, "Password must be at least 8 characters"),
});

export default signInValidationSchema;
