import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUser } from "../../redux/auth/authSlice";
import { useLoginMutation } from "../../redux/auth/authApiSlice";

const SignIn = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setUser({ ...userData, email, isAuthenticated: true }));
      setEmail("");
      setPassword("");
      navigate("/Home");
    } catch (err) {
      if (!err?.originalStatus) {
        setErrMsg("No Server Response");
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

  const handleUserInput = (e) => setEmail(e.target.value);

  const handlePwdInput = (e) => setPassword(e.target.value);

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        {errMsg ? (
          <div className="flex justify-center" ref={errRef}>
            <p className="px-4 py-10 text-green-500 font-medium font-titleFont">
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
                    onChange={handleUserInput}
                    value={email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="john@workemail.com"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                    onChange={handlePwdInput}
                    id="password"
                    value={password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Create password"
                  />
                </div>

                <button className="bg-[#dc2626] hover:bg-[#b91c1c] text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300">
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
