import { useRef } from "react";
import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { getLoadingStatus, getLoginStatus } from "../../userSlice";
import { SignUpForm } from "./SignUpForm";
import { LoadingModal } from "../../../../common/Components";

export const SignUp = () => {
  const location = useLocation();
  const pathRef = useRef(location.state);
  const userLoading = useSelector(getLoadingStatus);
  const isUserLoggedIn = useSelector(getLoginStatus);

  return (
    <>
      {isUserLoggedIn && (
        <Navigate to={pathRef.current?.from || "/feed"} replace />
      )}
      {userLoading && <LoadingModal text="Signing up..." />}
      <div className="mt-24 max-w-sm mx-auto p-2">
        <div className="p-4 bg-gray-50">
          <div className="">
            <div className="text-xl font-semibold text-center">
              Sign up to continue
            </div>
            <SignUpForm />
          </div>
        </div>
      </div>
    </>
  );
};
