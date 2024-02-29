import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import signUpValidationSchema from "../../validations/signUpValidationSchema";

const SignUp = () => {
  const [checked, setChecked] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const onSubmit = (values, actions) => {
    const { fullName, email } = values;
    if (checked) {
      actions.resetForm();
      setSuccessMsg(
        `Hello dear ${fullName}, Welcome you to OrelIT Admin panel. We received your Sign up request. We are processing to validate your access. Till then stay connected and additional assistance will be sent to you by your mail at ${email}`
      );
      setChecked(false);
    }
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      address: "",
      city: "",
      country: "",
      zip: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit,
  });

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signin">
              <button
                className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Sign in
              </button>
            </Link>
          </div>
        ) : (
          <form
            className="w-full lgl:w-[500px] h-screen flex items-center justify-center"
            onSubmit={handleSubmit}
          >
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Create your account
              </h1>
              <div className="flex flex-col gap-3">
                {/* client name */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Full Name
                  </p>
                  <input
                    id="fullName"
                    onChange={handleChange}
                    value={values.fullName}
                    className={`${
                      errors.fullName && touched.fullName
                        ? "border-[1px] border-red-400"
                        : ""
                    } w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none`}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="eg. John Doe"
                  />
                  {errors.fullName && touched.fullName ? (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errors.fullName}
                    </p>
                  ) : null}
                </div>
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Email
                  </p>
                  <input
                    id="email"
                    onChange={handleChange}
                    value={values.email}
                    className={`${
                      errors.email && touched.email
                        ? "border-[1px] border-red-400"
                        : ""
                    } w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none`}
                    onBlur={handleBlur}
                    type="email"
                    placeholder="john@workemail.com"
                  />
                  {errors.email && touched.email ? (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errors.email}
                    </p>
                  ) : null}
                </div>
                {/* Phone Number */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Phone Number
                  </p>
                  <input
                    id="phoneNumber"
                    onChange={handleChange}
                    value={values.phoneNumber}
                    className={`${
                      errors.phoneNumber && touched.phoneNumber
                        ? "border-[1px] border-red-400"
                        : ""
                    } w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none`}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="008801234567891"
                  />
                  {errors.phoneNumber && touched.phoneNumber ? (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errors.phoneNumber}
                    </p>
                  ) : null}
                </div>
                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                    id="password"
                    onChange={handleChange}
                    value={values.password}
                    className={`${
                      errors.password && touched.password
                        ? "border-[1px] border-red-400"
                        : ""
                    } w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none`}
                    onBlur={handleBlur}
                    type="password"
                    placeholder="Create password"
                  />
                  {errors.password && touched.password ? (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errors.password}
                    </p>
                  ) : null}
                </div>
                {/* Address */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Address
                  </p>
                  <input
                    id="address"
                    onChange={handleChange}
                    value={values.address}
                    className={`${
                      errors.address && touched.address
                        ? "border-[1px] border-red-400"
                        : ""
                    } w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none`}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="road-001, house-115, example area"
                  />
                  {errors.address && touched.address ? (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errors.address}
                    </p>
                  ) : null}
                </div>
                {/* City */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    City
                  </p>
                  <input
                    id="city"
                    onChange={handleChange}
                    value={values.city}
                    className={`${
                      errors.city && touched.city
                        ? "border-[1px] border-red-400"
                        : ""
                    } w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none`}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Your city"
                  />
                  {errors.city && touched.city ? (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errors.city}
                    </p>
                  ) : null}
                </div>
                {/* Country */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Country
                  </p>
                  <input
                    id="country"
                    onChange={handleChange}
                    value={values.country}
                    className={`${
                      errors.country && touched.country
                        ? "border-[1px] border-red-400"
                        : ""
                    } w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none`}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Your country"
                  />
                  {errors.country && touched.country ? (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errors.country}
                    </p>
                  ) : null}
                </div>
                {/* Zip code */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Zip/Postal code
                  </p>
                  <input
                    id="zip"
                    onChange={handleChange}
                    value={values.zip}
                    className={`${
                      errors.zip && touched.zip
                        ? "border-[1px] border-red-400"
                        : ""
                    } w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none`}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Your country"
                  />
                  {errors.zip && touched.zip ? (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errors.zip}
                    </p>
                  ) : null}
                </div>
                {/* Checkbox */}
                <div className="flex items-start mdl:items-center gap-2">
                  <input
                    onChange={() => setChecked(!checked)}
                    className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                    type="checkbox"
                  />
                  <p className="text-sm text-primeColor">
                    I agree to the OrelIT{" "}
                    <span className="text-blue-500">Terms of Service </span>and{" "}
                    <span className="text-blue-500">Privacy Policy</span>.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${
                    checked
                      ? "bg-[#dc2626] hover:bg-[#b91c1c] hover:text-white cursor-pointer"
                      : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
                  } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300 ${
                    isSubmitting ? "opacity-50" : ""
                  }`}
                >
                  Create Account
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                  Have an Account?{" "}
                  <Link to="/signin">
                    <span className="hover:text-blue-600 duration-300">
                      Sign in
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
