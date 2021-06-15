import axios from "axios";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { logOutUserAsync } from "../../features/user/userSlice";

export const useAxios = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const setAxiosBaseURL = (BASE_URL) => {
    axios.defaults.baseURL = BASE_URL;
  };

  const setAxiosIntercept = () => {
    const UNAUTHORIZED = 401;
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === UNAUTHORIZED) {
          dispatch(logOutUserAsync()).then(
            () =>
              location.pathname !== "/" &&
              navigate("/login", {
                replace: true,
                state: { from: location.pathname },
              })
          );
        }
        return Promise.reject(error);
      }
    );
  };

  const setAxiosAuthHeader = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      return;
    }
    delete axios.defaults.headers.common["Authorization"];
  };

  return {
    setAxiosBaseURL,
    setAxiosAuthHeader,
    setAxiosIntercept,
  };
};
