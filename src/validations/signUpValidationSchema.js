import * as yup from "yup";

const signUpValidationSchema = yup.object().shape({
  fullName: yup.string().required("Please enter full name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .required("Please enter phone number")
    .min(10, "Phone number must be at least 10 characters"),
  password: yup
    .string()
    .required("Please enter the password")
    .min(8, "Password must be at least 8 characters"),
  address: yup.string().required("Please enter the address"),
  city: yup.string().required("Please enter the city"),
  country: yup.string().required("Please enter the country"),
  zip: yup.string().required("Please enter the zip code"),
});

export default signUpValidationSchema;
