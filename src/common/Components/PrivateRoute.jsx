import { useSelector } from "react-redux";
import { Navigate, Route, useLocation } from "react-router";
import {
  getLoadingStatus,
  getLoginStatus,
} from "../../features/user/userSlice";

export const PrivateRoute = (props) => {
  const isUserLoggedIn = useSelector(getLoginStatus);
  const userLoading = useSelector(getLoadingStatus);
  const location = useLocation();

  if (userLoading) {
    return <h1>Loading...</h1>;
  }

  if (isUserLoggedIn) {
    return <Route {...props} />;
  }

  return <Navigate to="/login" state={{ from: location.pathname }} replace />;
};
