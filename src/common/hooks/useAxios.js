import axios from "axios";
import { useNavigate } from "react-router";

export const useAxios = () => {
  const navigate = useNavigate();

  const setAxiosBaseURL = (BASE_URL) => {
    axios.defaults.baseURL = BASE_URL;
  };

  const setAxiosIntercept = () => {
    const UNAUTHORIZED = 401;
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === UNAUTHORIZED) {
          // logOutUser();
          navigate("/login", { replace: true });
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
