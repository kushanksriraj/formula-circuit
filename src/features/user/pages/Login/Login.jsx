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
  const getRoute = () => {
    if (pathRef.current?.from) {
      // if user logs out from profile, he won't
      // be redirected to profile on login
      if (pathRef.current.from !== "/profile") {
        return pathRef.current.from;
      }
      return "/feed";
    }
    return "/feed";
  };
  return (
    <>
      {isUserLoggedIn && <Navigate to={getRoute()} replace />}
      {userLoading && <LoadingModal text="Logging in..." />}
      <div className="mt-24 max-w-sm mx-auto p-2">
        <div className="p-4 bg-gray-50">
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
      </div>
    </>
  );
};
