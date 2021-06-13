import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserDataAsync } from "../../features/user/userSlice";
import { BASE_URL } from "../api.config";
import { useAxios } from "./useAxios";

export const useLoadData = () => {
  const { setAxiosBaseURL, setAxiosAuthHeader, setAxiosIntercept } = useAxios();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        setAxiosBaseURL(BASE_URL);
        setAxiosIntercept();
        const localLoginData = localStorage.getItem("login");
        if (localLoginData) {
          const loginData = JSON.parse(localLoginData);
          setAxiosAuthHeader(loginData.token);
          if (loginData.isUserLoggedIn) {
            dispatch(getUserDataAsync());
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
      }
    })();
  }, [setAxiosBaseURL, setAxiosAuthHeader, setAxiosIntercept, dispatch]);
};
