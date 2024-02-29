import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/auth/authSlice";
import { resetCart } from "../../redux/orelSlice/orelSlice";
import { useLoginMutation } from "../../redux/auth/authApiSlice";
import { useFormik } from "formik";
import signInValidationSchema from "../../validations/signInValidationSchema";

const SignIn = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    const { email, password } = values;
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setUser({ ...userData, email, isAuthenticated: true }));
      actions.resetForm();
      dispatch(resetCart());
      setErrMsg("");
      navigate("/Home");
    } catch (err) {
      if (!err?.originalStatus) {
        setErrMsg("Login Failed");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef?.current?.focus();
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
      email: "",
      password: "",
    },
    validationSchema: signInValidationSchema,
    onSubmit,
  });

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        {errMsg ? (
          <div className="flex justify-center" ref={errRef}>
            <p className="px-4 py-10 text-color-red text-green-500 font-medium font-titleFont">
              {errMsg}
            </p>
          </div>
        ) : null}
        <div className="w-full lgl:w-1/2 h-full flex justify-center">
          <form
            className="w-full lg:w-[450px] h-screen flex items-center justify-center"
            onSubmit={handleSubmit}
          >
            <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="flex font-titleFont font-semibold text-3xl mdl:text-4xl mb-4 justify-center">
                OrelBuy
              </h1>
              <h4 className="flex justify-center">Hello, Welcome to OrelBuy</h4>
              <div className="flex flex-col gap-3">
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Email
                  </p>
                  <input
                    ref={userRef}
                    id="email"
                    onChange={handleChange}
                    value={values.email}
                    className={`${
                      errors.email && touched.email
                        ? "border-[1px] border-red-400"
                        : ""
                    } w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none`}
                    type="email"
                    placeholder="john@workemail.com"
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                    onChange={handleChange}
                    id="password"
                    value={values.password}
                    className={`${
                      errors.password && touched.password
                        ? "border-[1px] border-red-400"
                        : ""
                    } w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none`}
                    type="password"
                    placeholder="Create password"
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errors.password}
                    </p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${
                    isSubmitting ? "opacity-50" : ""
                  } bg-[#dc2626] hover:bg-[#b91c1c] text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300`}
                >
                  Sign In
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                  Don't have an Account?{" "}
                  <Link to="/signup">
                    <span className="hover:text-blue-600 duration-300">
                      Sign up
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
