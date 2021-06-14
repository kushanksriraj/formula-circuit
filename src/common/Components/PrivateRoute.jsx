import { useSelector } from "react-redux";
import { Navigate, Route, useLocation } from "react-router";
import { getLoginStatus } from "../../features/user/userSlice";

export const PrivateRoute = (props) => {
  const isUserLoggedIn = useSelector(getLoginStatus);
  const location = useLocation();

  if (props.loading) {
    return <h1>Loading... in private route</h1>;
  }

  if (isUserLoggedIn) {
    return <Route path={props.path} element={props.element} />;
  }

  return <Navigate to="/login" state={{ from: location.pathname }} replace />;
};
