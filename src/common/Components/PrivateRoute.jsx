import { useSelector } from "react-redux";
import { Navigate, Route, useLocation } from "react-router";
import {
  getInitialLoading,
  getLoginStatus,
} from "../../features/user/userSlice";
import { Loading } from ".";

export const PrivateRoute = (props) => {
  const isUserLoggedIn = useSelector(getLoginStatus);
  const initialLoading = useSelector(getInitialLoading);
  const location = useLocation();

  if (initialLoading) {
    return <Loading />;
  }

  if (isUserLoggedIn) {
    return <Route {...props} />;
  }

  return <Navigate to="/login" state={{ from: location.pathname }} replace />;
};
