import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  getUserDataAsync,
  setInitialLoadingFalse,
} from "../../features/user/userSlice";
import { BASE_URL } from "../api.config";
import { useAxios } from "./useAxios";

export const useInitialize = () => {
  const { setAxiosAuthHeader, setAxiosBaseURL, setAxiosIntercept } = useAxios();
  const dispatch = useDispatch();

  const initializeApp = useCallback(() => {
    (async () => {
      try {
        setAxiosBaseURL(BASE_URL);
        setAxiosIntercept();
        const localLoginData = localStorage.getItem("login");
        if (localLoginData) {
          const loginData = JSON.parse(localLoginData);
          setAxiosAuthHeader(loginData.token);
        }
        dispatch(getUserDataAsync()).then(() =>
          dispatch(setInitialLoadingFalse())
        );
      } catch (err) {
        dispatch(setInitialLoadingFalse());
        console.error(err);
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { initializeApp };
};
