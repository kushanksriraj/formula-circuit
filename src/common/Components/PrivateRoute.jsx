import { Navigate, Route } from "react-router";

export const PrivateRoute = (props) => {
  const isUserLoggedIn = true;

  if (isUserLoggedIn) {
    return <Route {...props} />;
  }
  return <Navigate to="/" />;
};
