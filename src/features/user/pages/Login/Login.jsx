import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getLoginStatus,
  getLoadingStatus,
  logUserAsync,
} from "../../userSlice";
import { Navigate, useLocation } from "react-router";
import { Link } from "react-router-dom";

export const Login = () => {
  const isUserLoggedIn = useSelector(getLoginStatus);
  const userLoading = useSelector(getLoadingStatus);
  const dispatch = useDispatch();
  const location = useLocation();
  const pathRef = useRef(location.state);
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState("");

  const loginOnFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const email = e.currentTarget[0].value.trim();
    const password = e.currentTarget[1].value.trim();

    if (email === "" || password === "")
      return setError("Both fields are required! Try again.");

    dispatch(logUserAsync({ email, password }));
  };

  return (
    <>
      {isUserLoggedIn && <Navigate to={pathRef.current?.from || "/"} replace />}
      {userLoading && <div>Loading..... in login page</div>}
      <div className="">
        <div className="">
          <h2>Log in to continue</h2>
          <form onSubmit={loginOnFormSubmit}>
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
                />
                <div
                  className="material-icons-round"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "visibility" : "visibility_off"}
                </div>
              </div>
            </div>
            <div className="">{error}</div>
            <div className="">
              <button className="border" type="submit">
                LOG IN
              </button>
            </div>
          </form>
          <div className="">
            Don&apos;t have an account?{" "}
            <Link
              to="/sign-up"
              state={{ from: pathRef.current?.from || "/" }}
              replace
            >
              Sign up
            </Link>
            .
          </div>
        </div>
      </div>
    </>
  );
};
