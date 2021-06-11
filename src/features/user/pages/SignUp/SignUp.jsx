import { useRef, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  getLoginStatus,
  getLoadingStatus,
  signUpUserAsync,
} from "../../userSlice";

export const SignUp = () => {
  const location = useLocation();
  const pathRef = useRef(location.state);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(getLoginStatus);
  const userLoading = useSelector(getLoadingStatus);

  const signUpOnFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const name = e.currentTarget[0].value.trim();
    const username = e.currentTarget[1].value.trim();
    const email = e.currentTarget[2].value.trim();
    const password = e.currentTarget[3].value.trim();

    if (name === "" || email === "" || password === "" || username === "")
      return setError("All fields are required!");

    dispatch(signUpUserAsync({ name, username, email, password }));

    // const response = await signUpUser({
    //   name,
    //   email,
    //   password,
    //   path: "/user/sign-up",
    // });

    // !response && setError("Unable to sign up! Try again.");
  };

  return (
    <>
      {isUserLoggedIn && <Navigate to={pathRef.current?.from || "/"} replace />}
      <div className="">
        <div className="">
          <h2>Sign up to continue</h2>
          <form onSubmit={signUpOnFormSubmit}>
            <div className="">
              <label htmlFor="name">Name</label>
              <input className="border" id="name" type="text" />
            </div>
            <div className="">
              <label htmlFor="name">Username</label>
              <input className="border" id="name" type="text" />
            </div>
            <div className="">
              <label htmlFor="email">Email</label>
              <input className="border" id="email" type="email" />
            </div>
            <div className="">
              <label htmlFor="password">Password</label>
              <div className="">
                <input
                  className="border"
                  id="password"
                  type={showPassword ? "password" : "text"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="material-icons-round"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "visibility" : "visibility_off"}
                </div>
              </div>
            </div>
            <div className="">
              <label htmlFor="confirm-password">Confirm password</label>
              <input
                className="border"
                id="confirm-password"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="">
              {password !== confirmPassword && "Passwords must match!"}
            </div>
            <div className="">{error}</div>
            <div className="">
              <button
                className="border"
                type="submit"
                disabled={password !== confirmPassword}
              >
                {userLoading ? "Signin up.." : "SIGN UP"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
