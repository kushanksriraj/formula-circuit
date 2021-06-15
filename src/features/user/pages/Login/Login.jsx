import { useRef } from "react";
import { useSelector } from "react-redux";
import { getLoginStatus, getLoadingStatus } from "../../userSlice";
import { Navigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { LoadingModal } from "../../../../common/Components/LoadingModal/LoadingModal";
import { LoginForm } from "./LoginForm";

export const Login = () => {
  const isUserLoggedIn = useSelector(getLoginStatus);
  const userLoading = useSelector(getLoadingStatus);
  const location = useLocation();
  const pathRef = useRef(location.state);

  return (
    <>
      {isUserLoggedIn && (
        <Navigate to={pathRef.current?.from || "/feed"} replace />
      )}
      {userLoading && <LoadingModal text="Logging in..." />}
      <div className="p-4 bg-gray-50 mt-24 mx-4">
        <div className="text-xl font-semibold text-center">
          Log in to continue
        </div>
        <LoginForm />
        <div className="text-center font-semibold pt-3 border-t">
          Don&apos;t have an account?{" "}
          <Link
            to="/sign-up"
            state={{ from: pathRef.current?.from || "/" }}
            replace
            className="text-blue-600 font-semibold"
          >
            Sign up!
          </Link>
        </div>
      </div>
    </>
  );
};
